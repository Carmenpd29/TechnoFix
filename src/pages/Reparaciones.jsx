import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FiPlusCircle, FiList } from "react-icons/fi";
import { Opciones, WrapperPage, BotonMenu, ManualPage } from "../index";

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
      <Titulo>Reparaciones</Titulo>
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

const Titulo = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

