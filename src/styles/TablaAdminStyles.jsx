// Estilo específico para la columna de acciones en la tabla de usuarios
export const ColAcciones = styled.td`
  min-width: 48px !important;
  max-width: 60px !important;
  width: 1%;
  text-align: center;
`
// Estilo para la columna de nombre más ancha
export const ColNombre = styled.td`
  min-width: 220px !important;
  max-width: 400px !important;
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
import styled from "styled-components";

export const IconBtnTabla = styled.button`
  background: none;
  border: none;
  color: ${({ eliminar }) => (eliminar ? "#d32f2f" : "#607074")};
  font-size: 1.2rem;
  cursor: pointer;
  margin-right: 0.7rem;
  transition: color 0.2s;
  &:hover {
    color: ${({ eliminar }) => (eliminar ? "#a31515" : "#003459")};
  }
`;