import styled from "styled-components";

/**
 * IconBtn
 * Botón estilizado que muestra un icono y texto.
 */
export const IconBtn = styled.button`
  background: ${({ eliminar }) =>
    eliminar
      ? "linear-gradient(90deg, #b91c1c 0%, #f87171 100%)"
      : "linear-gradient(90deg, #607074 0%, #a5c4ca 100%)"};
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  padding: 0.7rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  box-shadow: 0 2px 8px #404a4c22;
  transition: background 0.2s, color 0.2s;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
  &:hover {
    background: ${({ eliminar }) =>
      eliminar
        ? "linear-gradient(90deg, #f87171 0%, #b91c1c 100%)"
        : "linear-gradient(90deg, #a5c4ca 0%, #607074 100%)"};
    color: #fff;
  }
  span {
    margin-left: 0.5rem;
    font-size: 0.9rem;
  }
`;