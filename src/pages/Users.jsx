import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FiUsers, FiUserPlus } from "react-icons/fi";

export function Users() {
  const navigate = useNavigate();

  const opciones = [
    {
      label: "Usuarios",
      icon: <FiUsers size={36} />,
      onClick: () => navigate("/usuarios/lista"),
    },
    {
      label: "Añadir",
      icon: <FiUserPlus size={36} />,
      onClick: () => navigate("/usuarios/nuevo"),
    },
  ];

  return (
    <Wrapper>
      <Titulo>Gestión de Usuarios</Titulo>
      <Opciones>
        {opciones.map((op) => (
          <Opcion key={op.label} onClick={op.onClick}>
            <IconWrapper>{op.icon}</IconWrapper>
            <span>{op.label}</span>
          </Opcion>
        ))}
      </Opciones>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2.5rem;
`;

const Titulo = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
`;

const Opciones = styled.div`
  display: flex;
  gap: 2rem;
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
  font-size: 1.2rem;
  font-family: "Poppins";
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 2px 8px #404a4c33;
  transition: background 0.2s, color 0.2s, box-shadow 0.2s;
  width: 150px;
  height: 150px;
  margin-bottom: 1rem;
  padding: 0;
  box-sizing: border-box;
  text-align: center;
  overflow: hidden;

  &:hover {
    background: #607074;
    color: #caf0f8;
  }
  span {
    margin-top: 0.7rem;
    font-size: 1.1rem;
    font-weight: 600;
    text-align: center;
    width: 100%;
    display: block;
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