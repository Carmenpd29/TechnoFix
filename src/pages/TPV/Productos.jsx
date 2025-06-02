import styled from "styled-components";

export function Productos() {
  return (
    <ProductosWrapper>
      <h2>Productos</h2>
      <p>Aquí irá la gestión de productos.</p>
    </ProductosWrapper>
  );
}

const ProductosWrapper = styled.div`
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