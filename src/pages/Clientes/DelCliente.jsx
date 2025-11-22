import { useState } from "react";
import { BotonVolver, supabase, BuscadorClientes, TituloPage, WrapperPage, ConfirmOverlay, ConfirmBox, ConfirmText, ConfirmActions, ConfirmButton } from "../../index";
import { ErrorMsg, Mensaje, CancelButton } from "../../styles/DelClienteStyles";

export function DelCliente() {
  const [seleccionado, setSeleccionado] = useState(null);
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

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
      <BuscadorClientes onSeleccionar={cliente => {
        setSeleccionado(cliente);
        setShowConfirm(true);
        setMensaje("");
        setError("");
      }} />
      {error && <ErrorMsg>{error}</ErrorMsg>}
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
    </WrapperPage>
  );
}
