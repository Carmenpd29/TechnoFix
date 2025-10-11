import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FiUsers, FiUserPlus } from "react-icons/fi";
import { Opciones, WrapperPage, BotonMenu, ManualPage, TituloPage } from "../index";

export function Users() {
  const navigate = useNavigate();

  const opciones = [
    {
      label: "Ver",
      icon: <FiUsers size={36} />,
      onClick: () => navigate("/usuarios/lista"),
    }
  ];

  // Opción "Añadir":
  // {
  //   label: "Añadir",
  //   icon: <FiUserPlus size={36} />,
  //   onClick: () => navigate("/usuarios/nuevo"),
  // },

  return (
    <WrapperPage>
      <TituloPage>Gestión de Usuarios</TituloPage>
      <Opciones>
        {opciones.map((op) => (
          <BotonMenu key={op.label} icon={op.icon} onClick={op.onClick}>
            {op.label}
          </BotonMenu>
        ))}
      </Opciones>
      <ManualPage>
        Aquí puedes gestionar los usuarios de la aplicación.
        <p>
          - <b>Ver</b> para ver y editar usuarios.
          <br />
          {/*- <b>Añadir</b> para crear un nuevo usuario. */}
        </p>
      </ManualPage>
    </WrapperPage>
  );
}
