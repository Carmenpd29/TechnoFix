import styled from "styled-components";
import { useEffect, useState } from "react";
import { BotonVolver, supabase, TituloPage, WrapperPage } from "../../index";
import { FiEdit } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export function VerReparaciones() {
  const [reparaciones, setReparaciones] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
      <TablaContainer>
        <Tabla>
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Artículo</th>
              <th>Precio</th>
              <th>Técnico</th>
              <th>Fecha</th>
              <th>Editar</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  Cargando...
                </td>
              </tr>
            )}
            {!loading && reparacionesFiltradas.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  style={{ textAlign: "center", color: "#607074" }}
                >
                  No hay reparaciones registradas.
                </td>
              </tr>
            )}
            {reparacionesFiltradas.map((r) => (
              <tr key={r.id}>
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
                <td>
                  <IconBtn
                    title="Ver/Editar"
                    onClick={() =>
                      navigate(`/reparaciones/mod/${r.idreparacion}`)
                    }
                  >
                    <FiEdit />
                  </IconBtn>
                </td>
              </tr>
            ))}
          </tbody>
        </Tabla>
      </TablaContainer>
    </WrapperPage>
  );
}

const TablaContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  margin-top: 1.5rem;
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
  margin: 0 auto 1.5rem 0;
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
  background: none;
  border: none;
  color: #003459;
  cursor: pointer;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  transition: color 0.2s;
  &:hover {
    color: #a5c4ca;
  }
`;
