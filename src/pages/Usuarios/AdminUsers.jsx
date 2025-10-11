import { useEffect, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import {
  BotonVolver,
  supabase,
  TituloPage,
  TablaAdmin
} from "../../index";
import { useNavigate } from "react-router-dom";
import {
  Wrapper,
  ConfirmOverlay,
  ConfirmBox,
  ConfirmText,
  ConfirmActions,
  ConfirmButton,
  CancelButton,
  Mensaje,
} from "../../styles/AdminStyles";

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

    setLoading(false);

    if (error) {
      setMensaje(`Error al eliminar el usuario: ${error.message}`);
    } else {
      setMensaje("Usuario eliminado correctamente.");
      setUsuarios(usuarios.filter((u) => u.id !== usuarioAEliminar.id));
    }
    setUsuarioAEliminar(null);
  };

  const columns = [
    { key: "nombre", label: "Nombre" },
    { key: "rol", label: "Rol" },
  ];

  return (
    <Wrapper style={{ position: "relative" }}>
      <BotonVolver to="/usuarios" />
      <TituloPage>Usuarios</TituloPage>
      <TablaAdmin
        columns={columns}
        data={usuarios}
        loading={loading}
        onEdit={handleEditar}
        onDelete={handleEliminar}
        iconEdit={FiEdit}
        iconDelete={FiTrash2}
      />

      {showConfirm && (
        <ConfirmOverlay>
          <ConfirmBox>
            <ConfirmText>
              ¿Seguro que quieres eliminar al usuario{" "}
              <b>{usuarioAEliminar?.nombre}</b>?<br />
              Esta acción no se puede deshacer.
            </ConfirmText>
            <ConfirmActions>
              <ConfirmButton onClick={confirmarEliminar} disabled={loading}>
                Sí, eliminar
              </ConfirmButton>
              <CancelButton
                onClick={() => setShowConfirm(false)}
                disabled={loading}
              >
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
