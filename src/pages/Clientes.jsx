import styled from "styled-components";
import { FiUsers, FiUserPlus, } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Opciones, WrapperPage, BotonMenu, ManualPage, TituloPage } from "../index";

export function Clientes({ user }) {
  const navigate = useNavigate();

  const opciones = [
    {
      label: "Ver",
      icon: <FiUsers size={36} />,
      onClick: () => navigate("/clientes/ver"),
      visible: true,
    },
    {
      label: "Añadir",
      icon: <FiUserPlus size={36} />,
      onClick: () => navigate("/clientes/insertar"),
      visible: true,
    },
  ];

  return (
    <WrapperPage>
      <TituloPage>Clientes</TituloPage>
      <Opciones>
        {opciones
          .filter(op => op.visible)
          .map(op => (
            <BotonMenu key={op.label} icon={op.icon} onClick={op.onClick}>
              {op.label}
            </BotonMenu>
          ))}
      </Opciones>
      <ManualPage>
        <p>
          Selecciona una opción para gestionar los clientes.
          <br />- <b>Ver</b>: Para ver, editar y eliminar clientes.
          <br />- <b>Añadir</b>: Para añadir un nuevo cliente.
        </p>
      </ManualPage>
    </WrapperPage>
  );
}

