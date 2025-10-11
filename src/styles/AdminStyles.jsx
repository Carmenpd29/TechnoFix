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

export const ConfirmOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #23272855;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ConfirmBox = styled.div`
  background: #f8fafb;
  border-radius: 22px;
  box-shadow: 0 2px 18px #404a4c22;
  border: 2px solid #a5c4ca;
  padding: 2.2rem 2rem 1.5rem 2rem;
  min-width: 320px;
  max-width: 90vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ConfirmText = styled.p`
  color: #232728;
  font-size: 0.9rem;
  text-align: center;
  margin-bottom: 1.5rem;
`;

export const ConfirmActions = styled.div`
  display: flex;
  gap: 1.2rem;
  justify-content: center;
  width: 100%;
  margin-top: 0.5rem;
`;

export const ConfirmButton = styled.button`
  background: rgb(184, 64, 64);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.7rem 2.2rem;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    background: rgb(119, 26, 26);
  }
  &:disabled {
    background: #b3c6d1;
    cursor: not-allowed;
  }
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