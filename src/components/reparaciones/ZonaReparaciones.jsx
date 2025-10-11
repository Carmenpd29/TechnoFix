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
    gap: 1.2rem;
    align-items: flex-end;
    width: 100%;
    max-width: 340px;
    margin: 0 auto;
  }
  select {
    font-family: inherit;
    flex: 1 1 180px;
    min-width: 120px;
    max-width: 220px;
    height: 40px;
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
  @media (max-width: 1120px) {
  label{
  font-size: 0.8rem;
  }
  
    .fila-tecnico-precio {
      flex-direction: row;
      gap: 1rem;
      width: 100%;
      max-width: 340px;
    }
    select {
      min-width: 0;
      max-width: 100%;
    }
    .precio {
      margin-left: 0;
      height: 43px;
    }
  }
`;