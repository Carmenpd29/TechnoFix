import styled from "styled-components";

export const ZonaReparaciones = styled.div`
  display: flex;
  font-family: inherit;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  .tecnico {
    font-family: inherit;
    flex: 1;
    padding: 0.6rem;
    border-radius: 6px;
    border: 1.5px solid #a5c4ca;
    font-size: 0.9rem;
    margin-right: 0.5rem;
  }
  .fila-tecnico-precio {
    font-family: inherit;
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
    align-items: stretch;
    width: 100%;
    max-width: 100%;
    margin: 0 auto;
  }
  @media (max-width: 700px) {
    .fila-tecnico-precio {
      flex-direction: column;
      gap: 0.7rem;
      max-width: 100%;
    }
    select, .precio {
      width: 100%;
      min-width: 0;
      max-width: 100%;
    }
  }
  select {
    font-family: inherit;
    flex: 1 1 180px;
    min-width: 0;
    max-width: 100%;
    width: 100%;
    height: 40px;
    box-sizing: border-box;
  }
  .datos {
    font-family: inherit;
  }
  textarea {
    font-family: inherit;
  }
  .precio {
    text-align: right;
    padding: 0.6rem;
    border-radius: 6px;
    border: 1.5px solid #a5c4ca;
    font-size: 0.9rem;
    width: 100%;
    min-width: 0;
    max-width: 100%;
    height: 43px;
    box-sizing: border-box;
    background: #fff;
    color: #232728;
    font-family: inherit;
  }
  @media (max-width: 900px) {
    .fila-tecnico-precio {
      flex-direction: column;
      gap: 0.7rem;
      max-width: 100%;
    }
    select, .precio {
      width: 100%;
      min-width: 0;
      max-width: 100%;
    }
  }
`;