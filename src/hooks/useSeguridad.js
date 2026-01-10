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
    setLoading(true);
    setError(null);
    try {
      const resp = await supabase.auth.getUser();
      const user = resp?.data?.user;
      if (!user) {
        setUsuario(null);
        return false;
      }

      const { data, error: dbError } = await supabase
        .from("usuarios")
        .select("*")
        .eq("uid", user.id)
        .single();

      if (dbError || !data) {
        setUsuario(null);
        setError(dbError?.message || "Usuario no encontrado");
        logSeguridad("ERROR_AUTH", null, { error: dbError?.message });
        return false;
      }

      setUsuario(data);
      logSeguridad("USUARIO_AUTENTICADO", data);
      return true;

    } catch (err) {
      setUsuario(null);
      setError(err?.message || String(err));
      logSeguridad("ERROR_AUTH", null, { error: err?.message || String(err) });
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

    let subscription;
    try {
      const res = supabase.auth.onAuthStateChange((event, session) => {
        verificarAutenticacion();
      });
      subscription = res?.data?.subscription;
    } catch (e) {
      console.warn("onAuthStateChange error:", e);
    }

    return () => {
      try {
        if (subscription && typeof subscription.unsubscribe === "function") {
          subscription.unsubscribe();
        } else if (typeof subscription === "function") {
          subscription();
        }
      } catch (e) {
        // ignore
      }
    };
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
