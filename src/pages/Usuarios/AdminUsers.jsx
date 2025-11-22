import React, { useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import {
  BotonVolver,
  TituloPage,
  TablaAdmin,
  ConfirmOverlay,
  ConfirmBox,
  ConfirmText,
  ConfirmActions,
  ConfirmButton
} from "../../index";
import { useNavigate } from "react-router-dom";
import { useUsuarios } from "../../hooks/useUsuarios";
import {
  Wrapper,
  CancelButton,
  Mensaje,
} from "../../styles/AdminStyles";

export function AdminUsers() {
  const { usuarios, loading, mensaje, eliminarUsuario } = useUsuarios();
  const [showConfirm, setShowConfirm] = useState(false);
  const [usuarioAEliminar, setUsuarioAEliminar] = useState(null);
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
    if (usuario.rol === "admin") {
      alert("No se puede eliminar un usuario administrador.");
      return;
    }
    setUsuarioAEliminar(usuario);
    setShowConfirm(true);
  };

  const confirmarEliminar = async () => {
    if (usuarioAEliminar) {
      await eliminarUsuario(usuarioAEliminar.id);
      setShowConfirm(false);
      setUsuarioAEliminar(null);
    }
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
