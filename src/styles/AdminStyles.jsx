import styled from "styled-components";

export const Wrapper = styled.div`
  width: 95%;
  max-width: 900px;
  margin: 2.5rem auto;
  padding: 2rem 1.5rem;
  background: #f8fafb;
  border-radius: 22px;
  box-shadow: 0 2px 18px #404a4c22;
  min-height: 70vh;
  border: 2px solid #a5c4ca;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

export const CancelButton = styled.button`
  background: #607074;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.7rem 1.2rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.3s;
  &:hover {
    background: #003459;
  }
  &:disabled {
    background: #a5c4ca;
    cursor: not-allowed;
  }
`;

export const Mensaje = styled.div`
  margin-top: 0.9rem;
  text-align: center;
  color: ${({ error }) => (error ? "#d32f2f" : "#4caf50")};
  font-size: 1.1rem;
`;