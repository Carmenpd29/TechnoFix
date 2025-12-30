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
  position: relative;
`;

export const FormContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const Form = styled.form`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  font-weight: 600;
  margin-bottom: 0.4rem;
`;

export const Input = styled.input`
  padding: 0.8rem;
  font-size: 1rem;
  border: 2px solid #a5c4ca;
  border-radius: 10px;
  width: 100%;
  box-sizing: border-box;
  box-shadow: inset 0 2px 8px #404a4c10;
  &:disabled {
    background: #e9ecef;
  }
`;

export const PasswordWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const EyeButton = styled.button`
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  cursor: pointer;
  color: #607074;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 4px;
  transition: color 0.2s, background-color 0.2s;

  &:hover {
    color: #404a4c;
    background-color: rgba(165, 196, 202, 0.1);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

export const Mensaje = styled.p`
  margin-top: 1.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: ${({ $tipo }) => ($tipo === "success" ? "#2e7d32" : "#d9534f")};
  text-align: center;
`;
