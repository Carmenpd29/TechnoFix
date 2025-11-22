import { Titulo } from "../../styles/TituloPageStyles";

export function TituloPage({ children, ...props }) {
  return <Titulo {...props}>{children}</Titulo>;
}