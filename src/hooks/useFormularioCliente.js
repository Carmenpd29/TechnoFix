import { useState } from "react";
import { supabase } from "../supabase/supabaseClient";
import { withTimeout } from "../utils/supabaseUtils";
import { validarFormularioCliente, limpiarFormularioCliente } from "../utils/validaciones";

/**
 * useFormularioCliente
 * Hook personalizado para gestionar el formulario de clientes.
 * Permite crear y actualizar clientes, validando los datos, controlando estados del formulario y comunicándose con Supabase.
 */
export const useFormularioCliente = (clienteInicial = null) => {
  // Estado principal del formulario
  const [form, setForm] = useState(clienteInicial || limpiarFormularioCliente());

  // Campos que han sido tocados (blur)
  const [touched, setTouched] = useState({});

  // Indica si el formulario ha sido enviado
  const [submitted, setSubmitted] = useState(false);

  // Indica si se está realizando una operación asíncrona
  const [loading, setLoading] = useState(false);

  // Mensaje de feedback para la UI
  const [mensaje, setMensaje] = useState("");

  /**
   * Maneja los cambios en los inputs del formulario
   */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /**
   * Marca un campo como tocado al perder el foco
   */
  const handleBlur = (e) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  /**
   * Reinicia el formulario a su estado inicial
   */
  const resetForm = () => {
    setForm(limpiarFormularioCliente());
    setTouched({});
    setSubmitted(false);
    setMensaje("");
  };

  /**
   * Inserta un nuevo cliente en la base de datos
   * Valida los datos y comprueba la unicidad del teléfono
   */
  const insertarCliente = async () => {
    setSubmitted(true);
    setMensaje(null);
    setLoading(true);

    try {
      const validacion = validarFormularioCliente(form);
      if (!validacion.esValido) {
        setLoading(false);
        return { success: false, errores: validacion.errores };
      }

      const datosLimpios = validacion.datosSanitizados;

      // Comprobación de teléfono duplicado
      if (datosLimpios.telefono) {
        const res = await withTimeout(
          supabase
            .from('clientes')
            .select('id')
            .eq('telefono', datosLimpios.telefono)
            .maybeSingle(),
          10000
        );

        if (res.error) {
          setMensaje({ tipo: 'error', texto: 'Error comprobando teléfono existente.' });
          setLoading(false);
          return { success: false };
        }

        if (res.data?.id) {
          setMensaje({ tipo: 'error', texto: 'El teléfono ya está registrado.' });
          setLoading(false);
          return { success: false };
        }
      }

      // Inserción del cliente
      const { error } = await withTimeout(
        supabase.from("clientes").insert([{
          nombre: datosLimpios.nombre,
          apellidos: datosLimpios.apellidos || null,
          telefono: datosLimpios.telefono,
          nif: datosLimpios.nif || null,
          direccion: datosLimpios.direccion || null,
          correo: datosLimpios.correo || null,
        }]),
        10000
      );

      if (error) {
        setMensaje({ tipo: 'error', texto: 'Error al insertar el cliente.' });
        return { success: false };
      }

      setMensaje({ tipo: 'ok', texto: 'Cliente insertado correctamente.' });
      resetForm();
      return { success: true };

    } catch (error) {
      setMensaje({ tipo: 'error', texto: 'Error inesperado al guardar.' });
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Actualiza un cliente existente en la base de datos
   */
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

      const datosLimpios = validacion.datosSanitizados;

      // Comprobación de teléfono duplicado (excluyendo el propio cliente)
      if (datosLimpios.telefono) {
        const res = await withTimeout(
          supabase
            .from('clientes')
            .select('id')
            .eq('telefono', datosLimpios.telefono)
            .neq('id', id)
            .maybeSingle(),
          10000
        );

        if (res.data?.id) {
          setMensaje({ tipo: 'error', texto: 'El teléfono ya está registrado por otro cliente.' });
          setLoading(false);
          return { success: false };
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
        return { success: false };
      }

      setMensaje({ tipo: 'ok', texto: 'Cliente actualizado correctamente.' });
      return { success: true };

    } catch (error) {
      setMensaje("Error inesperado al actualizar.");
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  // Errores de validación visibles solo tras el envío
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
