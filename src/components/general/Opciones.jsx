import styled from "styled-components";

export function Opciones({ children }) {
  return <OpcionesWrapper>{children}</OpcionesWrapper>;
}

const OpcionesWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-bottom: 2.5rem;
  justify-items: center;

  @media (max-width: 700px) {
    grid-template-columns: 1fr 1fr;
    gap: 1rem;

    > * {
      width: 95%;
      max-width: 180px;
      min-width: 0;
      margin: 0 auto;
    }
  }
`;