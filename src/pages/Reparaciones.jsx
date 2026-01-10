import { useNavigate } from "react-router-dom";
import { FiPlusCircle, FiList, FiTool } from "react-icons/fi";
import { WrapperPage, InfoCard, TituloPage, IconBtn } from "../index";

/**
 * Reparaciones
 * Página con accesos para ver y añadir reparaciones.
 */
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
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "1rem",
        margin: "1rem 0",
        padding: "0 1rem",
        maxWidth: "600px",
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
            {op.label === "Ver" ? <FiList size={20} /> : <FiPlusCircle size={20} />}
            <span>{op.label}</span>
          </IconBtn>
        ))}
      </div>
      <InfoCard title="Gestión de Reparaciones" icon={<FiTool size={18} />}>
        <p>
          Selecciona una opción para gestionar las reparaciones.
          <br />- <b>Ver</b>: Para ver, editar y eliminar reparaciones existentes.
          <br />- <b>Añadir</b>: Para añadir una nueva reparación.
        </p>
      </InfoCard>
    </WrapperPage>
  );
}
