import styled from "styled-components";
import { useEffect, useState } from "react";
import { BotonVolver, supabase, TituloPage, WrapperPage, ManualPage, useUserStore } from "../../index";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export function VerReparaciones() {
  const [reparaciones, setReparaciones] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [eliminando, setEliminando] = useState(false);
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    async function fetchReparaciones() {
      setLoading(true);
      const { data } = await supabase
        .from("reparaciones")
        .select(
          `
          idreparacion,
          articulo,
          fecha,
          precio,
          clientes:clientes (
            id,
            nombre,
            apellidos
          ),
          tecnico:usuarios (
            id,
            nombre
          )
        `
        )
        .order("fecha", { ascending: false });
      setReparaciones(data || []);
      setLoading(false);
    }
    fetchReparaciones();
  }, []);

  // Filtrado por nombre de cliente
  const reparacionesFiltradas = reparaciones.filter((r) =>
    (r.clientes?.nombre || "").toLowerCase().includes(busqueda.toLowerCase())
  );

  const handleEliminar = async () => {
    if (!selected) return;
    setEliminando(true);
    await supabase.from("reparaciones").delete().eq("idreparacion", selected.idreparacion);
    setReparaciones(reparaciones.filter((r) => r.idreparacion !== selected.idreparacion));
    setSelected(null);
    setEliminando(false);
  };

  return (
    <WrapperPage>
      <BotonVolver to="/reparaciones" />
      <TituloPage>Listado de Reparaciones</TituloPage>
      <BusquedaContainer>
        <input
          type="text"
          placeholder="Buscar por nombre de cliente"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </BusquedaContainer>
      <ManualPage style={{ marginBottom: 0 , textAlign: "center" }}>
              <p>
                Selecciona una reparación para Editar o Modificar.
              </p>
            </ManualPage>
      <TablaContainer>
        <Tabla>
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Artículo</th>
              <th>Precio</th>
              <th>Técnico</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={5} style={{ textAlign: "center" }}>
                  Cargando...
                </td>
              </tr>
            )}
            {!loading && reparacionesFiltradas.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  style={{ textAlign: "center", color: "#607074" }}
                >
                  No hay reparaciones registradas.
                </td>
              </tr>
            )}
            {reparacionesFiltradas.map((r) => (
              <tr
                key={r.idreparacion}
                style={{
                  cursor: "pointer",
                  background:
                    selected?.idreparacion === r.idreparacion
                      ? "#e6f0f3"
                      : "white",
                }}
                onClick={() => setSelected(r)}
              >
                <td>
                  {r.clientes
                    ? `${r.clientes.nombre} ${r.clientes.apellidos || ""}`
                    : "-"}
                </td>
                <td>{r.articulo}</td>
                <td>{r.precio ? `${r.precio} €` : "-"}</td>
                <td>{r.tecnico ? r.tecnico.nombre : "-"}</td>
                <td>
                  {r.fecha ? new Date(r.fecha).toLocaleDateString() : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </Tabla>
      </TablaContainer>
      {selected && (
        <EditarContainer>
          {(user?.rol === "admin" || user?.rol === "encargado") && (
            <IconBtn
              title="Editar"
              onClick={() =>
                navigate(`/reparaciones/mod/${selected.idreparacion}`)
              }
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
        </EditarContainer>
      )}
    </WrapperPage>
  );
}

const TablaContainer = styled.div`
  width: 100%;
  overflow-x: auto;
`;

const Tabla = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  th,
  td {
    padding: 0.8rem 0.5rem;
    border-bottom: 1px solid #e0e6ea;
    text-align: center;
    font-size: 0.98rem;
  }
  th {
    background: #a5c4ca;
    color: #232728;
    font-weight: 600;
    font-size: 1rem;
  }
  tr:last-child td {
    border-bottom: none;
  }
  @media (max-width: 900px) {
    td {
      font-size: 0.9rem;
    }
  }
`;

const BusquedaContainer = styled.div`
  width: 95%;
  max-width: 800px; 
  margin: 0 auto 0.5rem 0;
  padding: 0 1rem;
  box-sizing: border-box;
  input {
    width: 100%;
    padding: 0.7rem;
    border: 1.5px solid #a5c4ca;
    border-radius: 12px;
    font-size: 1rem;
    color: #404a4c;
    box-shadow: 0 2px 8px #404a4c22;
    &:focus {
      outline: none;
      border-color: #607074;
    }
  }
  @media (max-width: 900px) {
    max-width: 100%;
    padding: 0 0.5rem;
    input {
      font-size: 0.9rem;
    }
  }
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

const EditarContainer = styled.div`
  margin: 1.5rem auto 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.7rem;
  background: #f8fafc;
  border-radius: 12px;
  box-shadow: 0 2px 8px #404a4c22;
  font-size: 0.9rem;
  color: #003459;
  span {
    margin-left: 0.5rem;
    font-size: 0.9rem;
  }
`;
