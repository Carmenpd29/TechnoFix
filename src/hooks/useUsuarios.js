import { useState, useEffect } from "react";
import { supabase } from "../index";

// Hook para manejar usuarios y operaciones de admin
export const useUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState("");

  const fetchUsuarios = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from("usuarios").select("*");
      if (error) {
        setMensaje("Error al cargar usuarios");
        console.error(error);
      } else {
        setUsuarios(data || []);
      }
    } catch (error) {
      setMensaje("Error inesperado al cargar usuarios");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const eliminarUsuario = async (usuarioId) => {
    try {
      const { error } = await supabase
        .from("usuarios")
        .delete()
        .eq("id", usuarioId);

      if (error) {
        setMensaje("Error al eliminar usuario");
        return { success: false, error: error.message };
      } else {
        setMensaje("Usuario eliminado correctamente");
        // Recargar lista
        await fetchUsuarios();
        return { success: true };
      }
    } catch (error) {
      setMensaje("Error inesperado al eliminar usuario");
      return { success: false, error: error.message };
    }
  };

  const crearUsuario = async (datosUsuario) => {
    try {
      // Crear usuario en auth
      const { data, error: authError } = await supabase.auth.admin.createUser({
        email: datosUsuario.email,
        password: datosUsuario.password,
        email_confirm: true
      });

      if (authError) {
        return { success: false, error: authError.message };
      }

      // Crear registro en tabla usuarios
      const { error } = await supabase.from("usuarios").insert([{
        nombre: datosUsuario.nombre,
        correo: datosUsuario.email,
        rol: datosUsuario.rol,
        auth_id: data.user.id
      }]);

      if (error) {
        return { success: false, error: error.message };
      }

      await fetchUsuarios();
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const actualizarUsuario = async (usuarioId, datosUsuario) => {
    try {
      const { error } = await supabase
        .from("usuarios")
        .update(datosUsuario)
        .eq("id", usuarioId);

      if (error) {
        return { success: false, error: error.message };
      }

      await fetchUsuarios();
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  return {
    usuarios,
    loading,
    mensaje,
    fetchUsuarios,
    eliminarUsuario,
    crearUsuario,
    actualizarUsuario
  };
};