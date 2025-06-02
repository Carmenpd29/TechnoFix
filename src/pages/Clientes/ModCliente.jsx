import styled from "styled-components";
import { useState, useEffect } from "react";
import { BotonVolver, supabase } from "../../index";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export function ModCliente() {
  const [busqueda, setBusqueda] = useState("");
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [seleccionado, setSeleccionado] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
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
  }, [busqueda]);

  const handleSeleccionar = (cliente) => {
    setSeleccionado(cliente);
  };

  const handleAceptar = () => {
    if (seleccionado) {
      navigate(`/clientes/modificar/${seleccionado.id}`, { state: { cliente: seleccionado } });
    }
  };

  return (
    <Wrapper>
      <BotonVolver to="/clientes" />
      <Titulo>Modificar Cliente</Titulo>
      <Buscador>
        <FiSearch size={22} />
        <input
          type="text"
          placeholder="Buscar por nombre o NIF..."
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
        />
      </Buscador>
      {error && <ErrorMsg>{error}</ErrorMsg>}
      <TablaScroll>
        <Tabla>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Teléfono</th>
              <th>NIF</th>
              <th>Dirección</th>
              <th>Correo</th>
              <th>Seleccionar</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={6} style={{ textAlign: "center" }}>Buscando...</td>
              </tr>
            )}
            {!loading && clientes.length === 0 && busqueda && (
              <tr>
                <td colSpan={6} style={{ textAlign: "center" }}>No hay resultados.</td>
              </tr>
            )}
            {clientes.map(cliente => (
              <Fila
                key={cliente.id}
                $seleccionado={seleccionado?.id === cliente.id}
                onClick={() => handleSeleccionar(cliente)}
              >
                <td>{cliente.nombre}</td>
                <td>{cliente.telefono}</td>
                <td>{cliente.nif || "-"}</td>
                <td>{cliente.direccion || "-"}</td>
                <td>{cliente.correo || "-"}</td>
                <td>
                  <SeleccionarBtn
                    type="button"
                    $activo={seleccionado?.id === cliente.id}
                    onClick={e => {
                      e.stopPropagation();
                      handleSeleccionar(cliente);
                    }}
                  >
                    Seleccionar
                  </SeleccionarBtn>
                </td>
              </Fila>
            ))}
          </tbody>
        </Tabla>
      </TablaScroll>
      <AceptarBtn
        disabled={!seleccionado}
        onClick={handleAceptar}
      >
        Aceptar
      </AceptarBtn>
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
    font-size: 1rem;
  }
  th {
    background: #e7f7fa;
    color: #003459;
    font-weight: 700;
  }
`;

const Fila = styled.tr`
  background: ${({ $seleccionado }) => ($seleccionado ? "#b3c6d1" : "transparent")};
  cursor: pointer;
  &:hover {
    background: #e7f7fa;
  }
`;

const SeleccionarBtn = styled.button`
  background: ${({ $activo }) => ($activo ? "#607074" : "#a5c4ca")};
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 0.4rem 0.9rem;
  font-size: 1rem;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.2s;
  &:hover {
    background: #607074;
  }
`;

const AceptarBtn = styled.button`
  margin-top: 1.5rem;
  background: #1976d2;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.7rem 2.2rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  &:disabled {
    background: #b3c6d1;
    cursor: not-allowed;
  }
`;

const ErrorMsg = styled.div`
  color: #e74c3c;
  margin-bottom: 1rem;
  font-weight: 600;
`;