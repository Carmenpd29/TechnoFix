import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FiUsers, FiUserPlus } from "react-icons/fi";
import { Opciones, WrapperPage, BotonMenu } from "../index";

export function Users() {
  const navigate = useNavigate();

  const opciones = [
    {
      label: "Ver",
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
    <WrapperPage>
      <Titulo>Gestión de Usuarios</Titulo>
      <Opciones>
        {opciones.map((op) => (
          <BotonMenu key={op.label} icon={op.icon} onClick={op.onClick}>
            {op.label}
          </BotonMenu>
        ))}
      </Opciones>
      <Manual>
        Aquí puedes gestionar los usuarios de la aplicación.
        <p>
          - <b>Usuarios</b> para ver y editar usuarios.
          <br />
          - <b>Añadir</b> para crear un nuevo usuario.
        </p>
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
  text-align: left;
  max-width: 350px;
  width: 100%;
`;