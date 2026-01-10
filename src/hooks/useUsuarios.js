import { useState, useEffect } from "react";
import { supabase } from "../supabase/supabaseClient";
import { withTimeout } from "../utils/supabaseUtils";

/**
 * Hook de administración de usuarios.
 * Permite listar, crear, actualizar y eliminar usuarios.
 */
export const useUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState("");

  const fetchUsuarios = async () => {
    setLoading(true);
    try {
      const { data, error } = await withTimeout(
        supabase.from("usuarios").select("*").order("nombre"),
        15000
      );
      if (!error) setUsuarios(data || []);
      else console.error('Error fetching usuarios:', error);
    } catch (err) {
      console.error('Error fetching usuarios (timeout or network):', err);
    } finally {
      setLoading(false);
    }
  };

  const eliminarUsuario = async (id) => {
    try {
      await withTimeout(supabase.from("usuarios").delete().eq("id", id), 10000);
      await fetchUsuarios();
    } catch (err) {
      console.error('Error eliminando usuario:', err);
    }
  };

  const crearUsuario = async (datos) => {
    try {
      const { data } = await withTimeout(
        supabase.auth.admin.createUser({
          email: datos.email,
          password: datos.password,
          email_confirm: true
        }),
        15000
      );

      await withTimeout(
        supabase.from("usuarios").insert([{
          nombre: datos.nombre,
          email: datos.email,
          rol: datos.rol,
          uid: data.user.id
        }]),
        15000
      );

      await fetchUsuarios();
    } catch (err) {
      console.error('Error creando usuario:', err);
    }
  };

  const actualizarUsuario = async (id, datos) => {
    try {
      await withTimeout(supabase.from("usuarios").update(datos).eq("id", id), 10000);
      await fetchUsuarios();
    } catch (err) {
      console.error('Error actualizando usuario:', err);
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
