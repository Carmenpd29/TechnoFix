import { useState } from "react";
import { supabase } from "../index";
import { validarFormularioCliente, limpiarFormularioCliente } from "../utils/validaciones";

// Hook para manejar formularios de cliente
export const useFormularioCliente = (clienteInicial = null) => {
  const [form, setForm] = useState(clienteInicial || limpiarFormularioCliente());
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBlur = (e) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  const resetForm = () => {
    setForm(limpiarFormularioCliente());
    setTouched({});
    setSubmitted(false);
    setMensaje("");
  };

  const insertarCliente = async () => {
    setSubmitted(true);
    setMensaje("");

    const validacion = validarFormularioCliente(form);
    if (!validacion.esValido) {
      return { success: false, errores: validacion.errores };
    }

    setLoading(true);
    
    try {
      // Usar datos sanitizados para la inserción
      const datosLimpios = validacion.datosSanitizados;
      
      const { error } = await supabase.from("clientes").insert([{
        nombre: datosLimpios.nombre,
        apellidos: datosLimpios.apellidos || null,
        telefono: datosLimpios.telefono,
        nif: datosLimpios.nif || null,
        direccion: datosLimpios.direccion || null,
        correo: datosLimpios.correo || null,
      }]);

      if (error) {
        setMensaje("Error al insertar el cliente.");
        return { success: false, error: error.message };
      } else {
        setMensaje("Cliente insertado correctamente.");
        resetForm();
        return { success: true };
      }
    } catch (error) {
      setMensaje("Error inesperado al guardar.");
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const actualizarCliente = async (id) => {
    setSubmitted(true);
    setMensaje("");

    const validacion = validarFormularioCliente(form);
    if (!validacion.esValido) {
      return { success: false, errores: validacion.errores };
    }

    setLoading(true);
    
    try {
      // Usar datos sanitizados para la actualización
      const datosLimpios = validacion.datosSanitizados;
      
      const { error } = await supabase
        .from("clientes")
        .update({
          nombre: datosLimpios.nombre,
          apellidos: datosLimpios.apellidos || null,
          telefono: datosLimpios.telefono,
          nif: datosLimpios.nif || null,
          direccion: datosLimpios.direccion || null,
          correo: datosLimpios.correo || null,
        })
        .eq("id", id);

      if (error) {
        setMensaje("Error al actualizar el cliente.");
        return { success: false, error: error.message };
      } else {
        setMensaje("Cliente actualizado correctamente.");
        return { success: true };
      }
    } catch (error) {
      setMensaje("Error inesperado al actualizar.");
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Calcular errores para mostrar en la vista
  const validacion = validarFormularioCliente(form);
  const errores = submitted ? validacion.errores : {};

  return {
    form,
    setForm,
    touched,
    loading,
    mensaje,
    errores,
    handleChange,
    handleBlur,
    resetForm,
    insertarCliente,
    actualizarCliente,
    submitted
  };
};