// Estilo específico para la columna de acciones en la tabla de usuarios
export const ColAcciones = styled.td`
  min-width: 90px !important;
  max-width: 120px !important;
  width: auto;
  text-align: center;
`
// Estilo para la columna de nombre más ancha
export const ColNombre = styled.td`
  min-width: 140px !important;
  max-width: 260px !important;
  width: auto;
  font-weight: 500;
`
// Estilo específico para la columna de rol en la tabla de usuarios
export const ColRol = styled.td`
  min-width: 60px !important;
  max-width: 80px !important;
  width: 1%;
  text-align: center;
  font-weight: 500;
  color: #3782a5;
`;

// Columna para mostrar estado de confirmación
export const ColEstado = styled.td`
  min-width: 120px !important;
  max-width: 160px !important;
  width: 140px;
  padding: 6px 8px;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
  font-weight: 700;
`;
import styled from "styled-components";

export const IconBtnTabla = styled.button.withConfig({ shouldForwardProp: (prop) => prop !== 'eliminar' && prop !== '$eliminar' })`
  background: none;
  border: none;
  color: ${(props) => ((props.$eliminar ?? props.eliminar) ? "#d32f2f" : "#607074")};
  font-size: 1.2rem;
  cursor: pointer;
  margin-right: 0.7rem;
  transition: color 0.2s;
  &:not(:disabled):hover {
    color: ${(props) => ((props.$eliminar ?? props.eliminar) ? "#a31515" : "#003459")};
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    color: #9e9e9e;
  }
`;