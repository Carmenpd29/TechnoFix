import { useState } from "react";
import { BotonVolver, BuscadorClientes, TituloPage, WrapperPage } from "../../index";
import { AceptarBtn } from "../../styles/ModClienteStyles";
import { useNavigate } from "react-router-dom";

export function ModCliente() {
  const [seleccionado, setSeleccionado] = useState(null);
  const navigate = useNavigate();

  const handleAceptar = () => {
    if (seleccionado) {
      navigate(`/clientes/modificar/${seleccionado.id}`, {
        state: { cliente: seleccionado },
      });
    }
  };

  return (
    <WrapperPage>
      <BotonVolver to="/clientes" />
      <TituloPage>Modificar Cliente</TituloPage>
      <BuscadorClientes onSeleccionar={setSeleccionado} />
      <AceptarBtn disabled={!seleccionado} onClick={handleAceptar}>
        Aceptar
      </AceptarBtn>
    </WrapperPage>
  );
}
