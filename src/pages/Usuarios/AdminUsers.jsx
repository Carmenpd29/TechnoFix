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

  const handleEditar = (usuario) => {
    navigate(`/usuarios/editar`, { state: { usuario } });
  };

  const handleEliminar = (usuario) => {
    if (usuario.rol === "admin") {
      // No permitir eliminar administradores
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

  if (loading) {
    return (
      <Wrapper>
        <BotonVolver to="/usuarios" />
        <TituloPage>Usuarios</TituloPage>
        <div style={{ textAlign: "center", padding: "2rem" }}>
          Cargando usuarios...
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper style={{ position: "relative" }}>
      <BotonVolver to="/usuarios" />
      <TituloPage>Usuarios</TituloPage>
      
      {usuarios.length === 0 ? (
        <div style={{ textAlign: "center", padding: "2rem", color: "#607074" }}>
          No hay usuarios registrados.
        </div>
      ) : (
        <TablaAdmin
          columns={columns}
          data={usuarios}
          loading={loading}
          onEdit={handleEditar}
          onDelete={handleEliminar}
          iconEdit={FiEdit}
          iconDelete={FiTrash2}
        />
      )}

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
