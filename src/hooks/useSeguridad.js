import { useState, useEffect } from "react";
import { supabase } from "../supabase/supabaseClient";
import { logSeguridad } from "../utils/seguridad";

/**
 * Hook de seguridad para autenticación, roles y control de acceso.
 * Centraliza validación de sesión, permisos, roles y logout seguro.
 */
export const useSeguridad = () => {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const verificarAutenticacion = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No autenticado");

      const { data } = await supabase
        .from("usuarios")
        .select("*")
        .eq("uid", user.id)
        .single();

      if (!data) throw new Error("Usuario no encontrado");

      setUsuario(data);
      logSeguridad("USUARIO_AUTENTICADO", data);
      return true;

    } catch (err) {
      setUsuario(null);
      setError(err.message);
      logSeguridad("ERROR_AUTH", null, { error: err.message });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const tieneRol = (roles) =>
    usuario && (Array.isArray(roles) ? roles.includes(usuario.rol) : usuario.rol === roles);

  const esAdmin = () => tieneRol("admin");

  const logout = async () => {
    logSeguridad("LOGOUT", usuario);
    await supabase.auth.signOut();
    setUsuario(null);
  };

  useEffect(() => {
    verificarAutenticacion();
    const { data: { subscription } } = supabase.auth.onAuthStateChange(verificarAutenticacion);
    return () => subscription.unsubscribe();
  }, []);

  return {
    usuario,
    loading,
    error,
    tieneRol,
    esAdmin,
    verificarAutenticacion,
    logout
  };
};
