import { useEffect, useState } from "react";
import styled from "styled-components";
import { BotonVolver, supabase, BuscadorClientes  } from "../../index";

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
        .order("id", { ascending: true });
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
    <Wrapper style={{ position: "relative" }}>
      <BotonVolver to="/clientes" />
      <Titulo>Listado de Clientes</Titulo>      
      {loading && <Cargando>Cargando...</Cargando>}
      <BuscadorClientes soloFiltrar />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 90%;
  margin: 2.5rem auto;
  padding: 1.5rem 1rem 1.5rem 1rem;
  background: #f8fafb;
  border-radius: 22px;
  box-shadow: 0 2px 18px #404a4c22;
  min-height: 70vh;
  border: 2px solid #a5c4ca;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  position: relative;
  padding-top: 2.5rem;

  @media (max-width: 700px) {
    padding-top: 4.5rem;
  }
`;

const Titulo = styled.h2`
  font-size: 1.7rem;
  margin: 2rem 0 1.5rem 0;
  color: #232728;
  text-align: center;
`;


const Cargando = styled.div`
  margin-top: 1.5rem;
  text-align: center;
  color: #607074;
  font-size: 1.1rem;
`;