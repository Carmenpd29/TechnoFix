import { useState, useEffect } from "react";
import { supabase } from "../supabase/supabaseClient";

/**
 * useConfiguracionEmpresa
 * Hook personalizado para obtener la configuración general de la empresa desde la base de datos (Supabase).
 * Gestiona datos como nombre de la empresa, logo y mensaje del footer.
 */
export const useConfiguracionEmpresa = () => {
  // Estado que almacena la configuración de la empresa
  const [configuracion, setConfiguracion] = useState({
    nombre_empresa: '',
    logo_url: '',
    mensaje_footer: 'TechnoFix - Sistema de Gestión'
  });

  // Indica si la configuración está siendo cargada
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
        .single();

      // PGRST116 indica que no existe ningún registro (no se considera error crítico)
      if (error && error.code !== 'PGRST116') { 
        throw error;
      }

      if (data) {
        setConfiguracion(data);
      }
    } catch (error) {
      console.error('Error cargando configuración:', error);
    } finally {
      // Finaliza el estado de carga tanto si hay éxito como error
      setLoading(false);
    }
  };

  // Carga la configuración al montar el componente que use este hook
  useEffect(() => {
    cargarConfiguracion();
  }, []);

  return {
    configuracion,
    loading,
    recargarConfiguracion: cargarConfiguracion
  };
};
