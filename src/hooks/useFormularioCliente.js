import { useState } from "react";
import { supabase } from "../index";
import { withTimeout } from "../utils/supabaseUtils";
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
    setMensaje(null);

    setLoading(true);
    console.debug('[useFormularioCliente] iniciar insertarCliente', { form });
    try {
      const validacion = validarFormularioCliente(form);
      console.debug('[useFormularioCliente] validacion', validacion);
      if (!validacion.esValido) {
        console.debug('[useFormularioCliente] validacion fallida, saliendo');
        setLoading(false);
        return { success: false, errores: validacion.errores };
      }

      // Usar datos sanitizados para la inserción
      const datosLimpios = validacion.datosSanitizados;
      // Comprobar unicidad del teléfono
      if (datosLimpios.telefono) {
        let existeTel, errTel;
        try {
          const res = await withTimeout(supabase
            .from('clientes')
            .select('id')
            .eq('telefono', datosLimpios.telefono)
            .maybeSingle(), 10000);
          existeTel = res.data;
          errTel = res.error;
        } catch (e) {
          console.error('[useFormularioCliente] timeout/comms error checking telefono', e);
          setMensaje({ tipo: 'error', texto: 'Timeout comprobando teléfono (comprueba conexión).' });
          setLoading(false);
          return { success: false, error: e.message };
        }
        if (errTel) {
          setMensaje({ tipo: 'error', texto: 'Error comprobando teléfono existente.' });
          setLoading(false);
          return { success: false, error: errTel.message };
        }
        if (existeTel && existeTel.id) {
          setMensaje({ tipo: 'error', texto: 'El teléfono ya está registrado.' });
          setLoading(false);
          return { success: false, error: 'telefono_duplicado' };
        }
      }
      console.debug('[useFormularioCliente] insertando en supabase', datosLimpios);
      let insertRes;
      try {
        insertRes = await withTimeout(supabase.from("clientes").insert([{
        nombre: datosLimpios.nombre,
        apellidos: datosLimpios.apellidos || null,
        telefono: datosLimpios.telefono,
        nif: datosLimpios.nif || null,
        direccion: datosLimpios.direccion || null,
        correo: datosLimpios.correo || null,
      }]), 10000);
      } catch (e) {
        console.error('[useFormularioCliente] timeout/comms error inserting cliente', e);
        setMensaje({ tipo: 'error', texto: 'Timeout al insertar (comprueba conexión).' });
        return { success: false, error: e.message };
      }

      const { error } = insertRes;

      console.debug('[useFormularioCliente] resultado insert', { error });

      if (error) {
        setMensaje({ tipo: 'error', texto: 'Error al insertar el cliente.' });
        return { success: false, error: error.message };
      } else {
        setMensaje({ tipo: 'ok', texto: 'Cliente insertado correctamente.' });
        resetForm();
        return { success: true };
      }
    } catch (error) {
      console.error('[useFormularioCliente] excepción en insertarCliente', error);
      setMensaje({ tipo: 'error', texto: 'Error inesperado al guardar.' });
      return { success: false, error: error.message };
    } finally {
      console.debug('[useFormularioCliente] finalizar insertarCliente, limpiando loading');
      setLoading(false);
    }
  };

  const actualizarCliente = async (id) => {
    setSubmitted(true);
    setMensaje("");

    setLoading(true);
    try {
      const validacion = validarFormularioCliente(form);
      if (!validacion.esValido) {
        setLoading(false);
        return { success: false, errores: validacion.errores };
      }

      // Usar datos sanitizados para la actualización
      const datosLimpios = validacion.datosSanitizados;
      // Comprobar unicidad del teléfono (ignorando el propio registro)
      if (datosLimpios.telefono) {
        let existeTel, errTel;
        try {
          const res = await withTimeout(supabase
            .from('clientes')
            .select('id')
            .eq('telefono', datosLimpios.telefono)
            .neq('id', id)
            .maybeSingle(), 10000);
          existeTel = res.data;
          errTel = res.error;
        } catch (e) {
          console.error('[useFormularioCliente] timeout/comms error checking telefono (update)', e);
          setMensaje({ tipo: 'error', texto: 'Timeout comprobando teléfono (comprueba conexión).' });
          setLoading(false);
          return { success: false, error: e.message };
        }
        if (errTel) {
          setMensaje({ tipo: 'error', texto: 'Error comprobando teléfono existente.' });
          setLoading(false);
          return { success: false, error: errTel.message };
        }
        if (existeTel && existeTel.id) {
          setMensaje({ tipo: 'error', texto: 'El teléfono ya está registrado por otro cliente.' });
          setLoading(false);
          return { success: false, error: 'telefono_duplicado' };
        }
      }
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
        setMensaje({ tipo: 'error', texto: 'Error al actualizar el cliente.' });
        return { success: false, error: error.message };
      } else {
        setMensaje({ tipo: 'ok', texto: 'Cliente actualizado correctamente.' });
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