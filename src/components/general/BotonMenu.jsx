import { StyledBoton, IconWrapper } from "../../styles/BotonMenuStyles";

/**
 * BotonMenu
 * Componente de botón con icono usado en menús/sidebars.
 */
export function BotonMenu({ icon, children, ...props }) {
  return (
    <StyledBoton {...props}>
      <IconWrapper>{icon}</IconWrapper>
      <span>{children}</span>
    </StyledBoton>
  );
}
