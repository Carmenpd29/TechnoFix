import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../../supabase/supabaseClient";
import { ClienteCard, WrapperPage, Cargando, BotonVolver } from "../../index";

/**
 * ClienteCardPage
 * Página que muestra la ficha detallada de un cliente concreto.
 * El ID del cliente se obtiene desde la URL.
 */
export function ClienteCardPage() {
  // ID del cliente desde la ruta
  const { id } = useParams();

  // Estado del cliente
  const [cliente, setCliente] = useState(null);

  // Estado de carga
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    /**
     * Obtiene los datos del cliente desde Supabase
     */
    async function fetchCliente() {
      setLoading(true);

      const { data, error } = await supabase
        .from("clientes")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error al cargar el cliente:", error);
      } else {
        setCliente(data);
      }

      setLoading(false);
    }

    if (id) {
      fetchCliente();
    }
  }, [id]);

  // Mientras carga, se muestra un spinner
  if (loading) return <Cargando />;

  return (
    <WrapperPage>
      <BotonVolver />
      <ClienteCard cliente={cliente} />
    </WrapperPage>
  );
}
