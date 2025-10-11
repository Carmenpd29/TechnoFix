import { StyledBoton, IconWrapper } from "../../styles/BotonMenuStyles";

export function BotonMenu({ icon, children, ...props }) {
  return (
    <StyledBoton {...props}>
      <IconWrapper>{icon}</IconWrapper>
      <span>{children}</span>
    </StyledBoton>
  );
}
