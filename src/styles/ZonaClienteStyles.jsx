import styled from "styled-components";

export const ZonaClienteStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

export const Buscador = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 340px;
  margin: 0 auto 0.5rem auto;
  position: relative;
  input {
    flex: 1;
    padding: 0.6rem 2.2rem 0.6rem 0.8rem;
    border-radius: 6px;
    border: 1.5px solid #a5c4ca;
    font-size: 0.9rem;
  }
  .icono-lupa {
    position: absolute;
    right: 0.7rem;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
  }
`;