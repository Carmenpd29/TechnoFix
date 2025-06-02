import { useEffect, useState } from "react";
import styled from "styled-components";
import { supabase } from "../../supabase/supabaseClient";
import { useMediaQuery } from "react-responsive"; 
import { BotonVolver } from "../../components/BotonVolver";

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

  const isMobile = window.innerWidth < 700; // O usa useMediaQuery si prefieres

  return (
    <Wrapper style={{ position: "relative" }}>
      <BotonVolver to="/clientes" />
      <Titulo>Listado de Clientes</Titulo>
      {isMobile ? (
        <ListaClientes>
          {clientes.length === 0 && !loading && (
            <SinClientes>No hay clientes registrados.</SinClientes>
          )}
          {clientes.map((c) => (
            <CardCliente key={c.id}>
              <Dato><b>Nombre:</b> {c.nombre}</Dato>
              <Dato><b>Teléfono:</b> {c.telefono}</Dato>
              <Dato><b>NIF:</b> {c.nif || "-"}</Dato>
              <Dato><b>Dirección:</b> {c.direccion || "-"}</Dato>
              <Dato><b>Correo:</b> {c.correo || "-"}</Dato>
            </CardCliente>
          ))}
        </ListaClientes>
      ) : (
        <TablaContainer>
          <TablaScroll>
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
          </TablaScroll>
        </TablaContainer>
      )}
      {loading && <Cargando>Cargando...</Cargando>}
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
  margin-bottom: 1.5rem;
  color: #232728;
  text-align: center;
`;

const TablaContainer = styled.div`
  width: 100%;
`;

const TablaScroll = styled.div`
  width: 100%;
  overflow-x: auto;
  margin-top: 1.2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px #404a4c22;
  background: #fff;
`;

const Tabla = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  th,
  td {
    padding: 0.7rem 0.5rem;
    border-bottom: 1px solid #e0e6ea;
    text-align: left;
  }
  th {
    background: #a5c4ca;
    color: #232728;
    font-weight: 600;
    font-size: 1.2rem;
  }
  tr:last-child td {
    border-bottom: none;
  }
  td {
    font-size: 0.9rem;
    color: #404a4c;
  }
`;

const Cargando = styled.div`
  margin-top: 1.5rem;
  text-align: center;
  color: #607074;
  font-size: 1.1rem;
`;

const ListaClientes = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
`;

const CardCliente = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px #404a4c22;
  padding: 1.1rem 1rem;
  border: 1.5px solid #a5c4ca;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const Dato = styled.div`
  font-size: 1.05rem;
  color: #404a4c;
`;

const SinClientes = styled.div`
  text-align: center;
  color: #607074;
  font-size: 1.1rem;
`;