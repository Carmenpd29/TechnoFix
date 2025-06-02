import styled from "styled-components";
import { BotonVolver } from "../../index";

export function Productos() {
  return (
    <ProductosWrapper>
      <BotonVolver to="/tpv" />
      <h2>Productos</h2>
      <p>Aquí irá la gestión de productos.</p>
    </ProductosWrapper>
  );
}

const ProductosWrapper = styled.div`
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