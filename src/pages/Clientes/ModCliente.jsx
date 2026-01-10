import { useState } from "react";
import { BotonVolver, BuscadorClientes, TituloPage, WrapperPage, IconBtn } from "../../index";
import { FiCheck } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

/**
 * ModCliente
 * Pantalla intermedia para seleccionar un cliente antes de modificarlo.
 */
export function ModCliente() {
  // Cliente seleccionado en el buscador
  const [seleccionado, setSeleccionado] = useState(null);

  // Navegación programática
  const navigate = useNavigate();

  /**
   * Navega a la pantalla final de edición
   */
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

      {/* Buscador de clientes */}
      <BuscadorClientes onSeleccionar={setSeleccionado} />

      {/* Botón aceptar */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
        <IconBtn disabled={!seleccionado} onClick={handleAceptar}>
          <FiCheck size={16} />
          <span>Aceptar</span>
        </IconBtn>
      </div>
    </WrapperPage>
  );
}
