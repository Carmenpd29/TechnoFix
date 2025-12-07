import { useEffect, useState } from "react";
import {
  BotonVolver,
  supabase,
  TituloPage,
  WrapperPage,
  ManualPage,
  useUserStore,
  Tabla,
  TablaContainer,
  IconBtn,
  BuscadorClientes
} from "../../index";
import { BusquedaContainer, EditarContainer } from "../../styles/VerReparacionesStyles";
import { FiEdit, FiTrash2, FiSearch } from "react-icons/fi";
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
    await supabase
      .from("reparaciones")
      .delete()
      .eq("idreparacion", selected.idreparacion);
    setReparaciones(
      reparaciones.filter((r) => r.idreparacion !== selected.idreparacion)
    );
    setSelected(null);
    setEliminando(false);
  };

  return (
    <WrapperPage>
      <BotonVolver to="/reparaciones" />
      <TituloPage>Listado de Reparaciones</TituloPage>
      <BuscadorClientes
              soloFiltrar
              soloInput
              busqueda={busqueda}
              setBusqueda={setBusqueda}
            />
      <ManualPage style={{ marginBottom: 0, textAlign: "center" }}>
        <p>Selecciona una reparación para Editar o Eliminar.</p>
      </ManualPage>
      <TablaContainer>
        <div style={{overflowY: 'auto', maxHeight: '420px', width: '100%'}}>
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
                <td style={{ textAlign: 'right' }}>{r.precio ? `${r.precio} €` : "-"}</td>
                <td style={{ textAlign: 'center' }}>{r.tecnico ? r.tecnico.nombre : "-"}</td>
                <td>
                  {r.fecha ? new Date(r.fecha).toLocaleDateString() : "-"}
                </td>
              </tr>
            ))}
          </tbody>
          </Tabla>
        </div>
      </TablaContainer>
      {selected && (
        <EditarContainer>
          {(user?.rol === "admin" || user?.rol === "encargado") && (
            <IconBtn
              title="Editar"
              onClick={() =>
                navigate(`/reparaciones/mod/${selected.idreparacion}`)
              }
              style={{ position: 'relative' }}
            >
              <FiEdit />
            </IconBtn>
          )}
          {user?.rol === "admin" && (
            <IconBtn
              title="Eliminar"
              eliminar="true"
              disabled={eliminando}
              onClick={handleEliminar}
              style={{ position: 'relative' }}
            >
              <FiTrash2 />
            </IconBtn>
          )}
        </EditarContainer>
      )}
    </WrapperPage>
  );
}
