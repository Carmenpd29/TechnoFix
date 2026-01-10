import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../supabase/supabaseClient";
import { withTimeout } from "../utils/supabaseUtils";

/**
 * useClienteDetalle
 * Hook personalizado que obtiene la información detallada de un cliente,
 * incluyendo sus reparaciones y ventas asociadas.
 * El identificador del cliente se obtiene desde la URL.
 */
export const useClienteDetalle = () => {
  const { id } = useParams();

  // Datos del cliente seleccionado
  const [cliente, setCliente] = useState(null);

  // Listado de reparaciones asociadas al cliente
  const [reparaciones, setReparaciones] = useState([]);

  // Listado de ventas del cliente con sus detalles
  const [ventas, setVentas] = useState([]);

  // Indica si los datos están siendo cargados
  const [loading, setLoading] = useState(true);

  // Carga los datos del cliente y sus relaciones al cambiar el id de la URL
  useEffect(() => {
    // Función asíncrona que obtiene cliente, reparaciones y ventas desde Supabase
    async function fetchData() {
      try {
        // Obtener datos básicos del cliente
        try {
          const { data: clienteData, error: clienteError } = await withTimeout(
            supabase.from("clientes").select("*").eq("id", id).single(),
            15000
          );

          if (clienteError) {
            console.error("Error al obtener cliente:", clienteError);
          } else {
            setCliente(clienteData);
          }

          // Obtener reparaciones asociadas al cliente
          const { data: reparacionesData, error: reparacionesError } = await withTimeout(
            supabase.from("reparaciones").select("*").eq("idcliente", id),
            15000
          );

          if (reparacionesError) {
            console.error("Error al obtener reparaciones:", reparacionesError);
          } else {
            setReparaciones(reparacionesData || []);
          }

          // Obtener ventas del cliente junto con sus detalles de venta
          const { data: ventasData, error: ventasError } = await withTimeout(
            supabase.from("ventas").select("*, detalles_venta(*)").eq("cliente_id", id).order("fecha_venta", { ascending: false }),
            15000
          );

          if (ventasError) {
            console.error("Error al obtener ventas:", ventasError);
          } else {
            setVentas(ventasData || []);
          }
        } catch (err) {
          console.error('Error fetching cliente detalle (timeout or network):', err);
        }

      } catch (error) {
        console.error("Error inesperado:", error);
      } finally {
        // Finaliza el estado de carga independientemente del resultado
        setLoading(false);
      }
    }

    // Solo se ejecuta la carga si existe un id válido en la URL
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
