import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../../supabase/supabaseClient";
import { ClienteCard, WrapperPage, Cargando, BotonVolver } from "../../index";

export function ClienteCardPage() {
  const { id } = useParams();
  const [cliente, setCliente] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCliente() {
      setLoading(true);
      const { data } = await supabase
        .from("clientes")
        .select("*")
        .eq("id", id)
        .single();
      setCliente(data);
      setLoading(false);
    }
    fetchCliente();
  }, [id]);

  if (loading) return <Cargando />;

  return (
    <WrapperPage>
      <BotonVolver />
      <ClienteCard cliente={cliente} />
    </WrapperPage>
  );
}
