import styled from "styled-components";
import { useState, useEffect } from "react";
import { BotonVolver, supabase  } from "../../index";
import { FiSearch} from "react-icons/fi";

export function DelCliente() {
  const [busqueda, setBusqueda] = useState("");
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [seleccionado, setSeleccionado] = useState(null);
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

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
    setMensaje("");
    setError("");
  };

  const handleEliminar = async () => {
    setShowConfirm(false);
    if (!seleccionado) return;
    setLoading(true);
    setMensaje("");
    setError("");
    const { error } = await supabase
      .from("clientes")
      .delete()
      .eq("id", seleccionado.id);
    setLoading(false);
    if (error) {
      setError("Error al eliminar el cliente.");
    } else {
      setMensaje("Cliente eliminado correctamente.");
      setClientes(clientes.filter(c => c.id !== seleccionado.id));
      setSeleccionado(null);
    }
  };

  return (
    <Wrapper>
      <BotonVolver to="/clientes" />
      <Titulo>Eliminar Cliente</Titulo>
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
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={5} style={{ textAlign: "center" }}>Buscando...</td>
              </tr>
            )}
            {!loading && clientes.length === 0 && busqueda && (
              <tr>
                <td colSpan={5} style={{ textAlign: "center" }}>No hay resultados.</td>
              </tr>
            )}
            {clientes.map(cliente => (
              <Fila
                key={cliente.id}
                onClick={() => {
                  setSeleccionado(cliente);
                  setShowConfirm(true);
                }}
              >
                <td>{cliente.nombre}</td>
                <td>{cliente.telefono}</td>
                <td>{cliente.nif || "-"}</td>
                <td>{cliente.direccion || "-"}</td>
                <td>{cliente.correo || "-"}</td>
              </Fila>
            ))}
          </tbody>
        </Tabla>
      </TablaScroll>
      {showConfirm && (
        <ConfirmOverlay>
          <ConfirmBox>
            <ConfirmText>
              ¿Seguro que quieres eliminar al cliente <b>{seleccionado?.nombre}</b>?<br />
              Esta acción no se puede deshacer.
            </ConfirmText>
            <ConfirmActions>
              <ConfirmButton onClick={handleEliminar} disabled={loading}>
                Sí, eliminar
              </ConfirmButton>
              <CancelButton onClick={() => setShowConfirm(false)} disabled={loading}>
                Cancelar
              </CancelButton>
            </ConfirmActions>
          </ConfirmBox>
        </ConfirmOverlay>
      )}
      {mensaje && <Mensaje>{mensaje}</Mensaje>}
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
    font-size: 0.9rem;
  }
  th {
    background: #e7f7fa;
    color: #003459;
    font-weight: 700;
  }
`;

const Fila = styled.tr`
  background: ${({ $seleccionado }) => ($seleccionado ? "#ffd6d6" : "transparent")};
  cursor: pointer;
  &:hover {
    background:rgb(243, 171, 171);
  }
`;

const ErrorMsg = styled.div`
  color: #e74c3c;
  margin-bottom: 1rem;
  font-weight: 600;
`;

const Mensaje = styled.div`
  margin-top: 1rem;
  color: #2e7d32;
  font-weight: 600;
  text-align: center;
`;

const ConfirmOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: #23272855;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ConfirmBox = styled.div`
  background: #f8fafb;
  border-radius: 22px;
  box-shadow: 0 2px 18px #404a4c22;
  border: 2px solid #a5c4ca;
  padding: 2.2rem 2rem 1.5rem 2rem;
  min-width: 320px;
  max-width: 90vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ConfirmText = styled.p`
  color: #232728;
  font-size: 0.9rem;
  text-align: center;
  margin-bottom: 1.5rem;
`;

const ConfirmActions = styled.div`
  display: flex;
  gap: 1.2rem;
  justify-content: center;
  width: 100%;
  margin-top: 0.5rem;
`;

const ConfirmButton = styled.button`
  background:rgb(184, 64, 64);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.7rem 2.2rem;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  &:hover { background:rgb(119, 26, 26); }
  &:disabled { background: #b3c6d1; cursor: not-allowed; }
`;

const CancelButton = styled.button`
  background: #a5c4ca;
  color: #232728;
  border: none;
  border-radius: 8px;
  padding: 0.6rem 1.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  &:hover { background: #607074; color: #fff; }
`;
