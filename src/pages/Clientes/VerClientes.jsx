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
  Tabla,
  TablaContainer,
  IconBtn,
  Cargando,
} from "../../index";
import { FiEdit, FiTrash2, FiEye } from "react-icons/fi";
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
      <ManualPage style={{ marginBottom: 0, textAlign: "center" }}>
        <p>Selecciona un cliente para Ver, Editar o Eliminar.</p>
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
          <IconBtn
            title="Ver"
            onClick={() => navigate(`/clientes/ver/${selected.id}`)}
          >
            <FiEye />
            <span>Ver</span>
          </IconBtn>
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

