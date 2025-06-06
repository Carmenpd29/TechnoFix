import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FiPlusCircle, FiList } from "react-icons/fi";
import { Opciones, WrapperPage, BotonMenu, ManualPage, TituloPage } from "../index";

export function Reparaciones() {
  const navigate = useNavigate();

  const opciones = [
    {
      label: "Ver",
      icon: <FiList size={36} />,
      onClick: () => navigate("/reparaciones/ver"),
    },
    {
      label: "Añadir",
      icon: <FiPlusCircle size={36} />,
      onClick: () => navigate("/reparaciones/add"),
    },
  ];

  return (
    <WrapperPage>
      <TituloPage>Reparaciones</TituloPage>
      <Opciones>
        {opciones.map((op) => (
          <BotonMenu key={op.label} icon={op.icon} onClick={op.onClick}>
            {op.label}
          </BotonMenu>
        ))}
      </Opciones>
      <ManualPage>
        <p>Selecciona una opción para gestionar las reparaciones.</p>
      </ManualPage>
    </WrapperPage>
  );
}

