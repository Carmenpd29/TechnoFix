import { useState } from "react";
import { BotonVolver, BuscadorClientes, TituloPage, WrapperPage, IconBtn } from "../../index";
import { FiCheck } from "react-icons/fi";
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
      <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
        <IconBtn disabled={!seleccionado} onClick={handleAceptar}>
          <FiCheck size={16} />
          <span>Aceptar</span>
        </IconBtn>
      </div>
    </WrapperPage>
  );
}
