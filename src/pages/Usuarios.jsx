import { useNavigate } from "react-router-dom";
import { FiUsers, FiUserCheck } from "react-icons/fi";
import { WrapperPage, InfoCard, TituloPage, IconBtn } from "../index";

/**
 * Usuarios
 * Página de gestión de usuarios; muestra accesos para ver la lista y gestionar permisos/roles.
 */
export function Usuarios() {
  const navigate = useNavigate();

  const opciones = [
    {
      label: "Ver",
      icon: <FiUsers size={20} />,
      onClick: () => navigate("/usuarios/lista"),
    }
  ];

  return (
    <WrapperPage>
      <TituloPage>Gestión de Usuarios</TituloPage>
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: "1rem",
        margin: "1rem 0",
        padding: "0 1rem",
        maxWidth: "400px",
        marginLeft: "auto",
        marginRight: "auto"
      }}>
        {opciones.map((op) => (
          <IconBtn
            key={op.label}
            onClick={op.onClick}
            style={{
              minHeight: "50px",
              justifyContent: "flex-start"
            }}
          >
            <FiUsers size={20} />
            <span>{op.label}</span>
          </IconBtn>
        ))}
      </div>
      <InfoCard title="Gestión de Usuarios" icon={<FiUserCheck size={18} />}>
        <p>
          Aquí puedes gestionar los usuarios de la aplicación.
        </p>
        <p>
          - <b>Ver</b>: Para ver y editar usuarios del sistema.
          {/*<br />- <b>Añadir</b>: Para crear un nuevo usuario. */}
        </p>
      </InfoCard>
    </WrapperPage>
  );
}
