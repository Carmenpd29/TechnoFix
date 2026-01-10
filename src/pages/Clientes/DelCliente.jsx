import { useState } from "react";
import {
  BotonVolver,
  supabase,
  BuscadorClientes,
  TituloPage,
  WrapperPage,
  ConfirmOverlay,
  ConfirmBox,
  ConfirmText,
  ConfirmActions,
  ConfirmButton
} from "../../index";

import {
  ErrorMsg,
  Mensaje,
  CancelButton
} from "../../styles/DelClienteStyles";

/**
 * DelCliente
 * Permite buscar un cliente y eliminarlo previa confirmación.
 */
export function DelCliente() {
  // Cliente seleccionado para eliminar
  const [seleccionado, setSeleccionado] = useState(null);

  // Mensajes de error y éxito
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");

  // Control del modal de confirmación
  const [showConfirm, setShowConfirm] = useState(false);

  // Estado de carga durante el borrado
  const [loading, setLoading] = useState(false);

  /**
   * Elimina el cliente seleccionado de la base de datos
   */
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
      setSeleccionado(null);
    }
  };

  return (
    <WrapperPage>
      <BotonVolver to="/clientes" />
      <TituloPage>Eliminar Cliente</TituloPage>

      {/* Buscador de clientes */}
      <BuscadorClientes
        onSeleccionar={(cliente) => {
          setSeleccionado(cliente);
          setShowConfirm(true);
          setMensaje("");
          setError("");
        }}
      />

      {/* Mensaje de error */}
      {error && <ErrorMsg>{error}</ErrorMsg>}

      {/* Confirmación de borrado */}
      {showConfirm && (
        <ConfirmOverlay>
          <ConfirmBox>
            <ConfirmText>
              ¿Seguro que quieres eliminar al cliente{" "}
              <b>{seleccionado?.nombre}</b>?<br />
              Esta acción no se puede deshacer.
            </ConfirmText>
            <ConfirmActions>
              <ConfirmButton onClick={handleEliminar} disabled={loading}>
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

      {/* Mensaje de éxito */}
      {mensaje && <Mensaje>{mensaje}</Mensaje>}
    </WrapperPage>
  );
}
