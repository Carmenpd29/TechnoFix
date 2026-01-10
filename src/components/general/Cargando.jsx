import styled from "styled-components";

/**
 * Cargando
 * Componente estilizado para indicar un estado de carga en listas o vistas.
 * Uso: renderizar `<Cargando>...texto o spinner...</Cargando>` mientras se esperan datos.
 */
export const Cargando = styled.div`
  margin-top: 1.5rem;
  text-align: center;
  color: #607074;
  font-size: 1.1rem;
`;