import styled from "styled-components";
import { FiUsers, FiUserPlus, FiEdit, FiUserX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Opciones, WrapperPage, BotonMenu } from "../index";

export function Clientes({ user }) {
  const navigate = useNavigate();
  const rol = user?.rol || "empleado"; 

  // Opciones con permisos por rol
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
    {
      label: "Modificar",
      icon: <FiEdit size={36} />,
      onClick: () => navigate("/clientes/modificar"),
      visible: rol === "admin" || rol === "encargado",
    },
    {
      label: "Eliminar",
      icon: <FiUserX size={36} />,
      onClick: () => navigate("/clientes/eliminar"),
      visible: rol === "admin",
    },
  ];

  return (
    <WrapperPage>
      <Titulo>Clientes</Titulo>
      <Opciones>
        {opciones
          .filter(op => op.visible)
          .map(op => (
            <BotonMenu key={op.label} icon={op.icon} onClick={op.onClick}>
              {op.label}
            </BotonMenu>
          ))}
      </Opciones>
      <Manual>
        <p>Selecciona una opción para gestionar los clientes.</p>
      </Manual>
    </WrapperPage>
  );
}

const Titulo = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Manual = styled.div`
  color: #607074;
  font-size: 1.05rem;
  margin-bottom: 2rem;
  text-align: center;
  max-width: 600px;
  width: 100%;

  @media (max-width: 700px) {
    
  }
`;
