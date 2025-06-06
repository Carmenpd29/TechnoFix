import { useEffect, useState } from "react";
import styled from "styled-components";
import { BotonVolver, supabase, BuscadorClientes, TituloPage, WrapperPage } from "../../index";

export function VerClientes() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [clientesFiltrados, setClientesFiltrados] = useState(clientes);

  useEffect(() => {
    async function fetchClientes() {
      setLoading(true);
      const { data, error } = await supabase
        .from("clientes")
        .select("id, nombre, telefono, nif, direccion, correo")
        .order("nombre", { ascending: true });
      setClientes(data || []);
      setLoading(false);
    }
    fetchClientes();
  }, []);

  useEffect(() => {
    setClientesFiltrados(
      clientes.filter(
        (c) =>
          c.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
          (c.correo && c.correo.toLowerCase().includes(busqueda.toLowerCase()))
      )
    );
  }, [busqueda, clientes]);

  return (
    <WrapperPage style={{ position: "relative" }}>
      <BotonVolver to="/clientes" />
      <TituloPage>Listado de Clientes</TituloPage>
      {loading && <Cargando>Cargando...</Cargando>}
      <BuscadorClientes soloFiltrar />
    </WrapperPage>
  );
}


const Cargando = styled.div`
  margin-top: 1.5rem;
  text-align: center;
  color: #607074;
  font-size: 1.1rem;
`;