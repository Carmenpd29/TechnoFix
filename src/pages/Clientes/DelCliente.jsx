import styled from "styled-components";
import { useState } from "react";
import { BotonVolver, supabase, BuscadorClientes, TituloPage, WrapperPage } from "../../index";

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
