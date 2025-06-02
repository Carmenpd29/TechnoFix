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
      icon: <FiUsers size={42} />,
      onClick: () => navigate("/clientes/ver"),
      visible: true,
    },
    {
      label: "Insertar",
      icon: <FiUserPlus size={42} />,
      onClick: () => navigate("/clientes/insertar"),
      visible: true,
    },
    {
      label: "Modificar",
      icon: <FiEdit size={42} />,
      onClick: () => navigate("/clientes/modificar"),
      visible: rol === "admin" || rol === "encargado",
    },
    {
      label: "Eliminar",
      icon: <FiUserX size={42} />,
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
              {op.icon}
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
  padding: 2rem 2.5rem;
  font-size: 1.2rem;
  font-family: "Poppins";
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 2px 8px #404a4c33;
  transition: background 0.2s, color 0.2s, box-shadow 0.2s;
  min-width: 150px;
  min-height: 150px;
  max-width: 180px;
  max-height: 180px;
  aspect-ratio: 1 / 1;
  margin-bottom: 1rem;
  &:hover {
    background: #607074;
    color: #caf0f8;
  }
  span {
    margin-top: 1rem;
    font-size: 1.1rem;
  }
`;