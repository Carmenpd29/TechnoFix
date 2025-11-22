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