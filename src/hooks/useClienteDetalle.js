import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../index";

// Hook para obtener datos de un cliente específico y sus reparaciones
export const useClienteDetalle = () => {
  const { id } = useParams();
  const [cliente, setCliente] = useState(null);
  const [reparaciones, setReparaciones] = useState([]);
  const [ventas, setVentas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // Obtener datos del cliente
        const { data: clienteData, error: clienteError } = await supabase
          .from("clientes")
          .select("*")
          .eq("id", id)
          .single();

        if (clienteError) {
          console.error("Error al obtener cliente:", clienteError);
          return;
        }

        setCliente(clienteData);

        // Obtener reparaciones del cliente
        const { data: reparacionesData, error: reparacionesError } = await supabase
          .from("reparaciones")
          .select("*")
          .eq("idcliente", id);

        if (reparacionesError) {
          console.error("Error al obtener reparaciones:", reparacionesError);
        } else {
          setReparaciones(reparacionesData || []);
        }

        // Obtener ventas del cliente, incluyendo detalles y datos de producto
        // Selección simplificada: todos los campos de ventas y todos los detalles
        const { data: ventasData, error: ventasError } = await supabase
          .from("ventas")
          .select('*, detalles_venta(*)')
          .eq("cliente_id", id)
          .order("fecha_venta", { ascending: false });

        if (ventasError) {
          console.error("Error al obtener ventas:", ventasError);
        } else {
          // Log temporal para depuración
          try {
            console.log('useClienteDetalle: ventasData', ventasData);
            console.log('useClienteDetalle: ventasData length', ventasData?.length);
          } catch (e) {
            console.error('Error al loggear ventasData', e);
          }
          setVentas(ventasData || []);
        }

      } catch (error) {
        console.error("Error inesperado:", error);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchData();
    }
  }, [id]);

  return {
    cliente,
    reparaciones,
    ventas,
    loading,
    clienteId: id
  };
};