import { useEffect, useState } from "react";
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
  BotonesContainer,
} from "../../index";

import { FiEdit, FiTrash2, FiEye } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

/**
 * VerClientes
 * Listado general de clientes con acciones
 */
export function VerClientes() {
  const [clientes, setClientes] = useState([]);
  const [clientesFiltrados, setClientesFiltrados] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [eliminando, setEliminando] = useState(false);

  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();

  /**
   * Carga clientes desde Supabase
   */
  useEffect(() => {
    async function fetchClientes() {
      setLoading(true);
      const { data } = await supabase
        .from("clientes")
        .select("id, nombre, apellidos, telefono, nif, direccion, correo")
        .order("nombre");

      setClientes(data || []);
      setClientesFiltrados(data || []);
      setLoading(false);
    }

    fetchClientes();
  }, []);

  /**
   * Filtrado por texto
   */
  useEffect(() => {
    const q = busqueda.toLowerCase();

    setClientesFiltrados(
      clientes.filter((c) =>
        [c.nombre, c.apellidos, c.telefono, c.nif, c.correo]
          .join(" ")
          .toLowerCase()
          .includes(q)
      )
    );
  }, [busqueda, clientes]);

  /**
   * Elimina el cliente seleccionado
   */
  const handleEliminar = async () => {
    if (!selected) return;

    setEliminando(true);
    await supabase.from("clientes").delete().eq("id", selected.id);
    setClientes(clientes.filter((c) => c.id !== selected.id));
    setSelected(null);
    setEliminando(false);
  };

  return (
    <WrapperPage>
      <BotonVolver to="/clientes" />
      <TituloPage>Listado de Clientes</TituloPage>

      {loading && <Cargando />}

      <BuscadorClientes
        soloFiltrar
        soloInput
        busqueda={busqueda}
        setBusqueda={setBusqueda}
      />

      <ManualPage>
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
                onClick={() => setSelected(c)}
                style={{
                  cursor: "pointer",
                  background: selected?.id === c.id ? "#e6f0f3" : "white",
                }}
              >
                <td>{`${c.nombre} ${c.apellidos || ""}`}</td>
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
          <IconBtn onClick={() => navigate(`/clientes/ver/${selected.id}`)}>
            <FiEye />
          </IconBtn>

          {(user?.rol === "admin" || user?.rol === "encargado") && (
            <IconBtn onClick={() => navigate(`/clientes/modificar/${selected.id}`)}>
              <FiEdit />
            </IconBtn>
          )}

          {user?.rol === "admin" && (
            <IconBtn eliminar disabled={eliminando} onClick={handleEliminar}>
              <FiTrash2 />
            </IconBtn>
          )}
        </BotonesContainer>
      )}
    </WrapperPage>
  );
}
