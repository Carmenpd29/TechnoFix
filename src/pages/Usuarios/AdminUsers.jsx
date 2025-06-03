import { useEffect, useState } from "react";
import styled from "styled-components";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { BotonVolver, supabase } from "../../index";
import { useNavigate } from "react-router-dom";

export function AdminUsers() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [usuarioAEliminar, setUsuarioAEliminar] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUsuarios() {
      setLoading(true);
      const { data } = await supabase
        .from("usuarios")
        .select("id, nombre, rol")
        .order("nombre", { ascending: true });
      setUsuarios(data || []);
      setLoading(false);
    }
    fetchUsuarios();
  }, []);

  const handleEditar = (usuario) => {
    navigate(`/usuarios/editar`, { state: { usuario } });
  };

  const handleEliminar = (usuario) => {
    setUsuarioAEliminar(usuario);
    setShowConfirm(true);
    setMensaje("");
  };

  const confirmarEliminar = async () => {
    setShowConfirm(false);
    if (!usuarioAEliminar) return;
    setLoading(true);
    setMensaje("");

    const { error } = await supabase
      .from("usuarios")
      .delete()
      .eq("id", usuarioAEliminar.id); 

    console.log("Error al eliminar:", error); 

    setLoading(false);

    if (error) {
      setMensaje(`Error al eliminar el usuario: ${error.message}`);
    } else {
      setMensaje("Usuario eliminado correctamente.");
      setUsuarios(usuarios.filter(u => u.id !== usuarioAEliminar.id));
    }
    setUsuarioAEliminar(null);
  };

  return (
    <Wrapper style={{ position: "relative" }}>
      <BotonVolver to="/usuarios" />
      <Titulo>Usuarios</Titulo>
      <TablaContainer>
        <Tabla>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.id}>
                <td>{u.nombre}</td>
                <td>{u.rol}</td>
                <td>
                  <IconBtn title="Editar" onClick={() => handleEditar(u)}>
                    <FiEdit />
                  </IconBtn>
                  {u.rol !== "admin" && (
                    <IconBtn
                      title="Eliminar"
                      eliminar
                      onClick={() => handleEliminar(u)}
                    >
                      <FiTrash2 />
                    </IconBtn>
                  )}
                </td>
              </tr>
            ))}
            {usuarios.length === 0 && !loading && (
              <tr>
                <td colSpan={3} style={{ textAlign: "center", color: "#607074" }}>
                  No hay usuarios registrados.
                </td>
              </tr>
            )}
          </tbody>
        </Tabla>
      </TablaContainer>

      {showConfirm && (
        <ConfirmOverlay>
          <ConfirmBox>
            <ConfirmText>
              ¿Seguro que quieres eliminar al usuario <b>{usuarioAEliminar?.nombre}</b>?<br />
              Esta acción no se puede deshacer.
            </ConfirmText>
            <ConfirmActions>
              <ConfirmButton onClick={confirmarEliminar} disabled={loading}>
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
      {loading && <Cargando>Cargando...</Cargando>}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 95%;
  max-width: 900px;
  margin: 2.5rem auto;
  padding: 2rem 1.5rem;
  background: #f8fafb;
  border-radius: 22px;
  box-shadow: 0 2px 18px #404a4c22;
  min-height: 70vh;
  border: 2px solid #a5c4ca;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

const Titulo = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #232728;
  text-align: center;
`;

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
    text-align: left;
  }
  th {
    background: #a5c4ca;
    color: #232728;
    font-weight: 600;
    font-size: 1.1rem;
  }
  td {
    font-size: 1rem;
    color: #404a4c;
    vertical-align: middle;
  }
  tr:last-child td {
    border-bottom: none;
  }
`;

const IconBtn = styled.button`
  background: none;
  border: none;
  color: ${({ eliminar }) => (eliminar ? "#d32f2f" : "#607074")};
  font-size: 1.2rem;
  cursor: pointer;
  margin-right: 0.7rem;
  transition: color 0.2s;
  &:hover {
    color: ${({ eliminar }) => (eliminar ? "#a31515" : "#003459")};
  }
`;

const Cargando = styled.div`
  margin-top: 1.5rem;
  text-align: center;
  color: #607074;
  font-size: 1.1rem;
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
  background: #607074;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.7rem 1.2rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.3s;
  &:hover {
    background: #003459;
  }
  &:disabled {
    background: #a5c4ca;
    cursor: not-allowed;
  }
`;

const Mensaje = styled.div`
  margin-top: 1rem;
  text-align: center;
  color: ${({ error }) => (error ? "#d32f2f" : "#4caf50")};
  font-size: 1.1rem;
`;

// Registro con email y contraseña
const handleRegister = async (e) => {
  e.preventDefault();
  setRegMensaje("");
  if (!regEmail.trim() || !regPassword.trim() || !regNombre.trim()) {
    setRegMensaje("Rellena todos los campos.");
    return;
  }

  // Registro en Supabase Auth
  const { data, error } = await supabase.auth.signUp({
    email: regEmail,
    password: regPassword,
  });

  if (error) {
    setRegMensaje("Error al registrar: " + error.message);
    return;
  }

  // Guarda el usuario en la tabla
  if (data?.user) {
    const { error: insertError } = await supabase
      .from("usuarios")
      .insert([{
        nombre: regNombre,
        email: regEmail,
        rol: null,
        uid: data.user.id,
      }]);
    if (insertError) {
      setRegMensaje("Error al guardar usuario: " + insertError.message);
    } else {
      setRegMensaje("¡Registro enviado! Espera a que el admin te valide.");
      setRegNombre("");
      setRegEmail("");
      setRegPassword("");
    }
  }
};

// Login con email y contraseña
const handleLogin = async (e) => {
  e.preventDefault();
  setError("");
  const { data, error } = await supabase.auth.signInWithPassword({
    email: loginEmail,
    password: loginPassword,
  });

  if (error) {
    setError("Usuario o contraseña incorrectos.");
    return;
  }

  // Obtén el usuario de tu tabla por UID
  const { data: usuarioDB, error: dbError } = await supabase
    .from("usuarios")
    .select("*")
    .eq("uid", data.user.id)
    .single();

  if (dbError || !usuarioDB) {
    setError("No tienes permiso para acceder.");
    return;
  }
  if (!usuarioDB.rol) {
    setError("Tu cuenta aún no ha sido validada por un administrador.");
    return;
  }
  onLogin(usuarioDB);
};