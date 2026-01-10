import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../supabase/supabaseClient";

/**
 * ConfiguracionEmpresaContext
 * Contexto global para gestionar la configuración de la empresa.
 * Centraliza datos como nombre, logo y mensaje del footer,
 * obtenidos desde la base de datos (Supabase).
 */

// Contexto de React para compartir la configuración de la empresa en toda la aplicación
const ConfiguracionEmpresaContext = createContext();

/**
 * Hook personalizado para acceder al contexto de configuración de la empresa.
 * Garantiza que se use dentro de su Provider correspondiente.
 */
export const useConfiguracionEmpresaContext = () => {
  const context = useContext(ConfiguracionEmpresaContext);
  if (!context) {
    throw new Error('useConfiguracionEmpresaContext debe usarse dentro de ConfiguracionEmpresaProvider');
  }
  return context;
};

/**
 * ConfiguracionEmpresaProvider
 * Proveedor del contexto que carga y mantiene la configuración de la empresa.
 * Envuelve la aplicación para que los datos estén disponibles globalmente.
 */
export const ConfiguracionEmpresaProvider = ({ children }) => {
  // Estado con la configuración de la empresa (valores por defecto incluidos)
  const [configuracion, setConfiguracion] = useState({
    nombre_empresa: '',
    logo_url: '',
    mensaje_footer: 'TechnoFix - Sistema de Gestión'
  });

  // Indica si la configuración está siendo cargada desde la base de datos
  const [loading, setLoading] = useState(true);

  /**
    * Carga la configuración de la empresa desde Supabase.
    * Se espera una única fila en la tabla `configuracion_empresa`.
  */
  const cargarConfiguracion = async () => {
    try {
      const { data, error } = await supabase
        .from('configuracion_empresa')
        .select('*')
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        // PGRST116 indica que no hay registros; no se considera un error crítico
        console.error('Error cargando configuración:', error);
        return;
      }

      if (data) {
        setConfiguracion(data);
      }
    } catch (error) {
      console.error('Error cargando configuración:', error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Actualiza parcialmente la configuración en el estado local.
   * No persiste los cambios en base de datos.
  */
  const actualizarConfiguracion = (nuevaConfiguracion) => {
    setConfiguracion(prev => ({ ...prev, ...nuevaConfiguracion }));
  };

  /**
   * Guarda o actualiza la configuración en la base de datos y sincroniza el estado local.
   */
  const guardarConfiguracion = async (nuevaConfig) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('configuracion_empresa')
        .upsert(nuevaConfig, { returning: 'representation' })
        .maybeSingle();

      if (error) throw error;
      if (data) setConfiguracion(data);
      return { ok: true, data };
    } catch (err) {
      console.error('Error guardando configuración:', err);
      return { ok: false, error: err };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarConfiguracion();
  }, []);

  const value = {
    configuracion,
    loading,
    cargarConfiguracion,
    actualizarConfiguracion,
    guardarConfiguracion
  };

  return (
    <ConfiguracionEmpresaContext.Provider value={value}>
      {children}
    </ConfiguracionEmpresaContext.Provider>
  );
};