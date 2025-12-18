// Hook de seguridad para autenticación y autorización
import { useState, useEffect } from 'react';
import { supabase } from '../supabase/supabaseClient';
import { logSeguridad } from '../utils/seguridad';

export const useSeguridad = () => {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Verificar autenticación y permisos
  const verificarAutenticacion = async () => {
    try {
      const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !authUser) {
        setUsuario(null);
        setError('No autenticado');
        logSeguridad('INTENTO_ACCESO_NO_AUTENTICADO', null);
        return false;
      }

      // Obtener datos del usuario desde la tabla usuarios
      const { data: usuarioDB, error: dbError } = await supabase
        .from('usuarios')
        .select('*')
        .eq('uid', authUser.id)
        .single();

      if (dbError || !usuarioDB) {
        setUsuario(null);
        setError('Usuario no encontrado en la base de datos');
        logSeguridad('USUARIO_NO_ENCONTRADO_DB', null, { uid: authUser.id });
        return false;
      }

      if (!usuarioDB.rol) {
        setUsuario(null);
        setError('Usuario sin rol asignado');
        logSeguridad('USUARIO_SIN_ROL', usuarioDB);
        return false;
      }

      setUsuario(usuarioDB);
      setError(null);
      logSeguridad('USUARIO_AUTENTICADO_CORRECTAMENTE', usuarioDB);
      return true;

    } catch (error) {
      setError('Error en la verificación de autenticación');
      logSeguridad('ERROR_VERIFICACION_AUTH', null, { error: error.message });
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Verificar si el usuario tiene un rol específico
  const tieneRol = (rolRequerido) => {
    if (!usuario) return false;
    
    if (Array.isArray(rolRequerido)) {
      return rolRequerido.includes(usuario.rol);
    }
    
    return usuario.rol === rolRequerido;
  };

  // Verificar si el usuario es administrador
  const esAdmin = () => {
    return tieneRol('admin');
  };

  // Verificar si el usuario puede acceder a una funcionalidad
  const puedeAcceder = (funcionalidad) => {
    if (!usuario) return false;
    
    const permisos = {
      'usuarios.crear': ['admin'],
      'usuarios.editar': ['admin'],
      'usuarios.eliminar': ['admin'],
      'usuarios.ver': ['admin'],
      'usuarios.editarme': ['admin', 'encargado', 'empleado'],
      'clientes.crear': ['admin', 'encargado', 'empleado'],
      'clientes.editar': ['admin', 'encargado', 'empleado'],
      'clientes.eliminar': ['admin'],
      'clientes.ver': ['admin', 'encargado', 'empleado'],
      'reparaciones.crear': ['admin', 'encargado', 'empleado'],
      'reparaciones.editar': ['admin', 'encargado', 'empleado'],
      'reparaciones.eliminar': ['admin'],
      'reparaciones.ver': ['admin', 'encargado', 'empleado'],
      'tpv.usar': ['admin', 'encargado', 'empleado'],
      'tpv.productos': ['admin', 'encargado', 'empleado'],
      'tpv.ventas': ['admin', 'encargado', 'empleado'],
      'tpv.facturacion': ['admin', 'encargado', 'empleado'],
      'empresa.configurar': ['admin', 'encargado'],
    };
    
    const rolesPermitidos = permisos[funcionalidad];
    if (!rolesPermitidos) {
      logSeguridad('FUNCIONALIDAD_NO_DEFINIDA', usuario, { funcionalidad });
      return false;
    }
    
    const acceso = rolesPermitidos.includes(usuario.rol);
    
    if (!acceso) {
      logSeguridad('ACCESO_DENEGADO', usuario, { funcionalidad, rolRequerido: rolesPermitidos });
    }
    
    return acceso;
  };

  // Validar sesión de forma periódica
  const validarSesion = async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error || !user) {
        setUsuario(null);
        setError('Sesión expirada');
        logSeguridad('SESION_EXPIRADA', usuario);
        return false;
      }
      
      return true;
    } catch (error) {
      logSeguridad('ERROR_VALIDACION_SESION', usuario, { error: error.message });
      return false;
    }
  };

  // Logout seguro
  const logout = async () => {
    try {
      logSeguridad('LOGOUT_INICIADO', usuario);
      
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        logSeguridad('ERROR_LOGOUT', usuario, { error: error.message });
      } else {
        logSeguridad('LOGOUT_COMPLETADO', usuario);
      }
      
      setUsuario(null);
      setError(null);
      
    } catch (error) {
      logSeguridad('ERROR_LOGOUT_INESPERADO', usuario, { error: error.message });
    }
  };

  // Cambio de contraseña seguro
  const cambiarContrasena = async (contrasenaActual, contrasenaNueva) => {
    try {
      if (!usuario) {
        throw new Error('Usuario no autenticado');
      }

      // Verificar que la nueva contraseña cumple los requisitos
      if (contrasenaNueva.length < 6) {
        throw new Error('La nueva contraseña debe tener al menos 6 caracteres');
      }

      // Validar contraseña actual
      const { error: loginError } = await supabase.auth.signInWithPassword({
        email: usuario.email,
        password: contrasenaActual,
      });

      if (loginError) {
        logSeguridad('CAMBIO_CONTRASENA_FALLIDO', usuario, { motivo: 'contraseña_actual_incorrecta' });
        throw new Error('La contraseña actual no es correcta');
      }

      // Cambiar contraseña
      const { error: updateError } = await supabase.auth.updateUser({
        password: contrasenaNueva,
      });

      if (updateError) {
        logSeguridad('ERROR_CAMBIO_CONTRASENA', usuario, { error: updateError.message });
        throw updateError;
      }

      logSeguridad('CONTRASENA_CAMBIADA_CORRECTAMENTE', usuario);
      return { success: true, message: 'Contraseña cambiada correctamente' };

    } catch (error) {
      logSeguridad('ERROR_CAMBIO_CONTRASENA', usuario, { error: error.message });
      return { success: false, error: error.message };
    }
  };

  // Inicializar verificación de autenticación
  useEffect(() => {
    verificarAutenticacion();

    // Escuchar cambios en la autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_OUT' || !session) {
          setUsuario(null);
          setError(null);
        } else if (event === 'SIGNED_IN' && session) {
          await verificarAutenticacion();
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // Validar sesión cada 5 minutos
  useEffect(() => {
    if (usuario) {
      const interval = setInterval(validarSesion, 5 * 60 * 1000);
      return () => clearInterval(interval);
    }
  }, [usuario]);

  return {
    usuario,
    loading,
    error,
    tieneRol,
    esAdmin,
    puedeAcceder,
    verificarAutenticacion,
    validarSesion,
    logout,
    cambiarContrasena
  };
};