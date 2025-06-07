import { useState, useEffect } from "react";
import styled from "styled-components";
import { FiSearch } from "react-icons/fi";
import { supabase } from "../../index";

export function BuscadorClientes({
  onSeleccionar,
  placeholder = "Buscar por nombre o NIF...",
  renderAcciones,
  soloFiltrar = false,
  soloInput = false 
}) {
  const [busqueda, setBusqueda] = useState("");
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (soloFiltrar) {
      setLoading(true);
      supabase
        .from("clientes")
        .select("*")
        .order("nombre", { ascending: true })
        .then(({ data, error }) => {
          setLoading(false);
          if (error) setError("Error al buscar clientes");
          else setClientes(data || []);
        });
      return;
    }
    if (busqueda.trim().length === 0) {
      setClientes([]);
      return;
    }
    setLoading(true);
    setError("");
    supabase
      .from("clientes")
      .select("*")
      .or(`nombre.ilike.%${busqueda}%,nif.ilike.%${busqueda}%`)
      .order("nombre", { ascending: true })
      .then(({ data, error }) => {
        setLoading(false);
        if (error) setError("Error al buscar clientes");
        else setClientes(data || []);
      });
  }, [busqueda, soloFiltrar]);

  // Si soloFiltrar, filtra en frontend
  const clientesFiltrados = soloFiltrar
    ? clientes.filter(
        c =>
          c.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
          (c.nif && c.nif.toLowerCase().includes(busqueda.toLowerCase())) ||
          (c.correo && c.correo.toLowerCase().includes(busqueda.toLowerCase()))
      )
    : clientes;

  return (
    <>
      <Buscador>
        <FiSearch size={22} />
        <input
          type="text"
          placeholder={placeholder}
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
        />
      </Buscador>
      {error && <ErrorMsg>{error}</ErrorMsg>}
      {!soloInput && (
        <TablaScroll>
          <Tabla>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Teléfono</th>
                <th>NIF</th>
                <th>Dirección</th>
                <th>Correo</th>
                {renderAcciones && <th>Acciones</th>}
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={renderAcciones ? 6 : 5} style={{ textAlign: "center" }}>Buscando...</td>
                </tr>
              )}
              {!loading && clientesFiltrados.length === 0 && busqueda && (
                <tr>
                  <td colSpan={renderAcciones ? 6 : 5} style={{ textAlign: "center" }}>No hay resultados.</td>
                </tr>
              )}
              {clientesFiltrados.map(cliente => (
                <tr
                  key={cliente.id}
                  onClick={() => onSeleccionar && onSeleccionar(cliente)}
                  style={{ cursor: onSeleccionar ? "pointer" : "default" }}
                >
                  <td>{cliente.nombre}</td>
                  <td>{cliente.telefono}</td>
                  <td>{cliente.nif || "-"}</td>
                  <td>{cliente.direccion || "-"}</td>
                  <td>{cliente.correo || "-"}</td>
                  {renderAcciones && <td>{renderAcciones(cliente)}</td>}
                </tr>
              ))}
            </tbody>
          </Tabla>
        </TablaScroll>
      )}
    </>
  );
}


const Buscador = styled.div`
  display: flex;
  align-items: center;
  gap: 0.7rem;
  background: #fff;
  border: 1.5px solid #a5c4ca;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  margin-bottom: 1.2rem;
  width: 90%;
  max-width: 420px;
  @media (max-width: 700px) {
    max-width: 100%;
    padding: 0.5rem 0.5rem;
  }
  input {
    border: none;
    outline: none;
    font-size: 0.9rem;
    width: 100%;
    background: transparent;
    color: #232728;
  }
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
  th, td {
    padding: 0.7rem 0.5rem;
    text-align: left;
    border-bottom: 1px solid #e0e0e0;
    font-size: 0.9rem;
  }
  th {
    background: #e7f7fa;
    color: #003459;
    font-weight: 700;
  }
`;

const ErrorMsg = styled.div`
  color: #e74c3c;
  margin-bottom: 1rem;
  font-weight: 600;
`;