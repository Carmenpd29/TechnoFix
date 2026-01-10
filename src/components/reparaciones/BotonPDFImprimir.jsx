import { FiPrinter } from "react-icons/fi";
import { StyledButton } from "../../styles/BotonPDFImprimirStyles";

/**
 * BotonPDFImprimir
 * Botón estilizado para imprimir o generar PDF. 
 */
export function BotonPDFImprimir({ onClick, children, disabled }) {
  return (
    <StyledButton onClick={onClick} disabled={disabled}>
      <FiPrinter />
      <span>{children || "Imprimir / PDF"}</span>
    </StyledButton>
  );
}