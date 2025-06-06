import styled from "styled-components";
import { BotonVolver, TituloPage } from "../../index";

export function Caja() {
  return (
    <CajaWrapper>
      <BotonVolver to="/tpv" />
      <TituloPage>Caja</TituloPage>
      <p>Aquí irá la gestión de la caja.</p>
    </CajaWrapper>
  );
}

const CajaWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding-top: 2.5rem;

  @media (max-width: 700px) {
    padding-top: 4.5rem;
  }
  h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  p {
    color: #607074;
    font-size: 1.1rem;
  }
`;