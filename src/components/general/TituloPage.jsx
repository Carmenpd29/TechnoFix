import { Titulo } from "../../styles/TituloPageStyles";

/**
 * TituloPage
 * Componente que aplica el estilo de título de página.
 */
export function TituloPage({ children, ...props }) {
  return <Titulo {...props}>{children}</Titulo>;
}