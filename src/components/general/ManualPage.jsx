import { Manual } from "../../styles/ManualPageStyles";

/**
 * ManualPage
 * Componente envoltorio para secciones de manual/ayuda. 
 * Passthrough: permite pasar `props` al contenedor de estilos.
 */
export function ManualPage({ children, ...props }) {
  return <Manual {...props}>{children}</Manual>;
}