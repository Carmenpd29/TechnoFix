import styled from "styled-components";

export function TituloPage({ children, ...props }) {
  return <Titulo {...props}>{children}</Titulo>;
}

const Titulo = styled.h2`
  font-size: 1.7rem;
  margin: 3rem 0 1.5rem 0;
  color: #232728;
  text-align: center;
`;