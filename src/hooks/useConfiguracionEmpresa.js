import { useState, useEffect } from "react";
import { supabase } from "../supabase/supabaseClient";

export const useConfiguracionEmpresa = () => {
  const [configuracion, setConfiguracion] = useState({
    nombre_empresa: '',
    logo_url: '',
    mensaje_footer: 'TechnoFix - Sistema de Gestión'
  });
  const [loading, setLoading] = useState(true);

  const cargarConfiguracion = async () => {
    try {
      const { data, error } = await supabase
        .from('configuracion_empresa')
        .select('*')
        .single();

      if (error && error.code !== 'PGRST116') { 
        throw error;
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

  useEffect(() => {
    cargarConfiguracion();
  }, []);

  return {
    configuracion,
    loading,
    recargarConfiguracion: cargarConfiguracion
  };
};