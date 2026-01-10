import { Wrapper } from "../../styles/WrapperPageStyles";

/**
 * WrapperPage
 * Componente contenedor principal para páginas.
 * Limita el ancho máximo, centra el contenido y aplica estilos responsivos.
 */
export function WrapperPage({ children, maxWidth = 1600, ...props }) {
  return <Wrapper $maxWidth={maxWidth} {...props}>{children}</Wrapper>;
}