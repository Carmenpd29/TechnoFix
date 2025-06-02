import styled from "styled-components";

export function Caja() {
  return (
    <CajaWrapper>
      <h2>Caja</h2>
      <p>Aquí irá la gestión de la caja.</p>
    </CajaWrapper>
  );
}

const CajaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  p {
    color: #607074;
    font-size: 1.1rem;
  }
`;