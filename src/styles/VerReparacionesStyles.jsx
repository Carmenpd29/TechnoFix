import styled from "styled-components";

export const BusquedaContainer = styled.div`
  width: 95%;
  max-width: 800px;
  margin: 0 auto 0.5rem 0;
  padding: 0 1rem;
  box-sizing: border-box;
  position: relative;
  .icono-lupa {
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    color: #607074;
    font-size: 1.2rem;
  }
  input {
    width: 95%;
    padding: 0.7rem 0.7rem 0.7rem 2.5rem;
    border: 1.5px solid #a5c4ca;
    border-radius: 12px;
    font-size: 1rem;
    color: #404a4c;
    box-shadow: 0 2px 8px #404a4c22;
    &:focus {
      outline: none;
      border-color: #607074;
    }
  }
  @media (max-width: 900px) {
    max-width: 100%;
    padding: 0 0.5rem;
    input {
      font-size: 0.9rem;
    }
  }
`;

export const EditarContainer = styled.div`
  margin: 1.5rem auto 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.7rem;
  background: #f8fafc;
  border-radius: 12px;
  box-shadow: 0 2px 8px #404a4c22;
  font-size: 0.9rem;
  color: #003459;
  span {
    margin-left: 0.5rem;
    font-size: 0.9rem;
  }
`;