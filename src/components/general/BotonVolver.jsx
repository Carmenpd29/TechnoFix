import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Volver } from "../../styles/BotonVolverStyles";

export function BotonVolver({ to = "/", children }) {
  const navigate = useNavigate();
  return (
    <Volver onClick={() => navigate(to)}>
      <FiArrowLeft size={22} />
      {children || "Volver"}
    </Volver>
  );
}