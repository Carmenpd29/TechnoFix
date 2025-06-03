import styled from "styled-components";
import { FiUsers, FiUserPlus, FiEdit, FiUserX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

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
      label: "Insertar",
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
    <ClientesWrapper>
      <Titulo>Clientes</Titulo>
      <Opciones>
        {opciones
          .filter(op => op.visible)
          .map(op => (
            <Opcion key={op.label} onClick={op.onClick}>
              <IconWrapper>{op.icon}</IconWrapper>
              <span>{op.label}</span>
            </Opcion>
          ))}
      </Opciones>
      <Manual>
        <p>Selecciona una opción para gestionar los clientes.</p>
      </Manual>
    </ClientesWrapper>
  );
}

const ClientesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`;

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
`;

const Opciones = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const Opcion = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #a5c4ca;
  color: #232728;
  border: none;
  border-radius: 16px;
  font-size: 1.2rem !important; 
  font-family: "Poppins";
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 2px 8px #404a4c33;
  transition: background 0.2s, color 0.2s, box-shadow 0.2s;
  width: 170px !important;
  height: 170px !important;
  margin-bottom: 1rem;
  padding: 0;
  box-sizing: border-box;
  white-space: normal;
  text-align: center;
  word-break: break-word;
  overflow: hidden;

  &:hover {
    background: #607074;
    color: #caf0f8;
  }
  span {
    margin-top: 0.7rem;
    font-size: 1.1rem !important; 
    font-weight: 600;
    text-align: center;
    white-space: normal;
    word-break: break-word;
    width: 100%;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media (max-width: 700px) {
    width: 110px;
    height: 110px;
    font-size: 1rem;
    padding: 0;
  }
`;

const IconWrapper = styled.div`
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;

  & > svg {
    width: 36px !important;
    height: 36px !important;
    min-width: 36px !important;
    min-height: 36px !important;
    max-width: 36px !important;
    max-height: 36px !important;
    flex-shrink: 0;
  }
`;