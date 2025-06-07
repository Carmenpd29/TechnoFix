import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  BotonVolver,
  supabase,
  BuscadorClientes,
  TituloPage,
  WrapperPage,
  useUserStore,
  ManualPage,
} from "../../index";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export function VerClientes() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [clientesFiltrados, setClientesFiltrados] = useState(clientes);
  const [selected, setSelected] = useState(null);
  const [eliminando, setEliminando] = useState(false);
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchClientes() {
      setLoading(true);
      const { data } = await supabase
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

  const handleEliminar = async () => {
    if (!selected) return;
    setEliminando(true);
    await supabase.from("clientes").delete().eq("id", selected.id);
    setClientes(clientes.filter((c) => c.id !== selected.id));
    setSelected(null);
    setEliminando(false);
  };

  return (
    <WrapperPage style={{ position: "relative" }}>
      <BotonVolver to="/clientes" />
      <TituloPage>Listado de Clientes</TituloPage>
      {loading && <Cargando>Cargando...</Cargando>}
      <BuscadorClientes
        soloFiltrar
        soloInput
        busqueda={busqueda}
        setBusqueda={setBusqueda}
      />
      <ManualPage style={{ marginBottom: 0 , textAlign: "center" }}>
        <p>
          Selecciona un cliente para Editar o Modificar.
        </p>
      </ManualPage>
      <TablaContainer>
        <Tabla>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Teléfono</th>
              <th>NIF</th>
              <th>Dirección</th>
              <th>Correo</th>
            </tr>
          </thead>
          <tbody>
            {clientesFiltrados.map((c) => (
              <tr
                key={c.id}
                style={{
                  cursor: "pointer",
                  background: selected?.id === c.id ? "#e6f0f3" : "white",
                }}
                onClick={() => setSelected(c)}
              >
                <td>{c.nombre}</td>
                <td>{c.telefono}</td>
                <td>{c.nif}</td>
                <td>{c.direccion}</td>
                <td>{c.correo}</td>
              </tr>
            ))}
          </tbody>
        </Tabla>
      </TablaContainer>
      {selected && (
        <BotonesContainer>
          {(user?.rol === "admin" || user?.rol === "encargado") && (
            <IconBtn
              title="Editar"
              onClick={() => navigate(`/clientes/modificar/${selected.id}`)}
            >
              <FiEdit />
              <span>Editar</span>
            </IconBtn>
          )}
          {user?.rol === "admin" && (
            <IconBtn
              title="Eliminar"
              eliminar="true"
              disabled={eliminando}
              onClick={handleEliminar}
            >
              <FiTrash2 />
              <span>{eliminando ? "Eliminando..." : "Eliminar"}</span>
            </IconBtn>
          )}
        </BotonesContainer>
      )}
    </WrapperPage>
  );
}

const Cargando = styled.div`
  margin-top: 1.5rem;
  text-align: center;
  color: #607074;
  font-size: 1.1rem;
`;

const TablaContainer = styled.div`
  width: 100%;
  overflow-x: auto;
`;

const Tabla = styled.table`
  width: 100%;
  border-collapse: collapse;
  th,
  td {
    padding: 0.7rem 0.5rem;
    text-align: left;
    border-bottom: 1px solid #e0e0e0;
    font-size: 0.9rem;
  }
  th {
    background: rgb(207, 233, 238);
    color: #003459;
    font-weight: 700;
  }
`;

const BotonesContainer = styled.div`
  margin: 1.5rem auto 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.2rem;
  background: transparent;
  border-radius: 12px;
  font-size: 0.9rem;
  color: #003459;
`;

const IconBtn = styled.button`
  background: ${({ eliminar }) =>
    eliminar
      ? "linear-gradient(90deg, #b91c1c 0%, #f87171 100%)"
      : "linear-gradient(90deg, #607074 0%, #a5c4ca 100%)"};
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  padding: 0.7rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  box-shadow: 0 2px 8px #404a4c22;
  transition: background 0.2s, color 0.2s;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
  &:hover {
    background: ${({ eliminar }) =>
      eliminar
        ? "linear-gradient(90deg, #f87171 0%, #b91c1c 100%)"
        : "linear-gradient(90deg, #a5c4ca 0%, #607074 100%)"};
    color: #fff;
  }
  span {
    margin-left: 0.5rem;
    font-size: 0.9rem;
  }
`;
