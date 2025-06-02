import { useEffect, useState } from "react";
import styled from "styled-components";
import { supabase } from "../../supabase/supabaseClient";

export function VerClientes() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <Wrapper>
      <Titulo>Listado de Clientes</Titulo>
      <Tabla>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Teléfono</th>
            <th>NIF</th>
            <th>Dirección</th>
            <th>Correo</th>
          </tr>
        </thead>
        <tbody>
          {clientes.length === 0 && !loading && (
            <tr>
              <td colSpan={6} style={{ textAlign: "center", color: "#607074" }}>
                No hay clientes registrados.
              </td>
            </tr>
          )}
          {clientes.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.nombre}</td>
              <td>{c.telefono}</td>
              <td>{c.nif || "-"}</td>
              <td>{c.direccion || "-"}</td>
              <td>{c.correo || "-"}</td>
            </tr>
          ))}
        </tbody>
      </Tabla>
      {loading && <Cargando>Cargando...</Cargando>}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  max-width: 900px;
  margin: 2rem auto;
  padding: 2rem 1rem;
  background: #f8fafb;
  border-radius: 18px;
  box-shadow: 0 2px 12px #404a4c22;
`;

const Titulo = styled.h2`
  font-size: 1.7rem;
  margin-bottom: 1.5rem;
  color: #232728;
  text-align: center;
`;

const Tabla = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  th, td {
    padding: 0.7rem 0.5rem;
    border-bottom: 1px solid #e0e6ea;
    text-align: left;
  }
  th {
    background: #a5c4ca;
    color: #232728;
    font-weight: 600;
    font-size: 1.05rem;
  }
  tr:last-child td {
    border-bottom: none;
  }
  td {
    font-size: 1rem;
    color: #404a4c;
  }
`;

const Cargando = styled.div`
  margin-top: 1.5rem;
  text-align: center;
  color: #607074;
  font-size: 1.1rem;
`;