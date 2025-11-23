import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../supabase/supabaseClient";

const ConfiguracionEmpresaContext = createContext();

export const useConfiguracionEmpresaContext = () => {
  const context = useContext(ConfiguracionEmpresaContext);
  if (!context) {
    throw new Error('useConfiguracionEmpresaContext debe usarse dentro de ConfiguracionEmpresaProvider');
  }
  return context;
};

export const ConfiguracionEmpresaProvider = ({ children }) => {
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
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
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

  const actualizarConfiguracion = (nuevaConfiguracion) => {
    setConfiguracion(prev => ({ ...prev, ...nuevaConfiguracion }));
  };

  useEffect(() => {
    cargarConfiguracion();
  }, []);

  const value = {
    configuracion,
    loading,
    cargarConfiguracion,
    actualizarConfiguracion
  };

  return (
    <ConfiguracionEmpresaContext.Provider value={value}>
      {children}
    </ConfiguracionEmpresaContext.Provider>
  );
};