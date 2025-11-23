import styled from "styled-components";

export const Form = styled.form`
  width: 100%;
  max-width: 380px;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  font-weight: 600;
  margin-bottom: 0.2rem;
  color: #003459;
  font-size: 0.9rem;
  span {
    color: #e74c3c;
    font-size: 0.9rem;
    margin-left: 2px;
  }
  @media (max-width: 1120px) {
    font-size: 0.8rem;
  }
`;

export const Input = styled.input`
  padding: 0.4rem 0.6rem;
  border: 1.5px solid ${({ $error }) => ($error ? "#e74c3c" : "#a5c4ca")};
  border-radius: 6px;
  font-size: 0.9rem;
  outline: none;
  transition: border 0.2s;
  &:focus {
    border-color: #607074;
  }
  @media (max-width: 1120px) {
    font-size: 0.8rem;
  }
`;

export const Error = styled.span`
  color: #e74c3c;
  font-size: 0.95rem;
  margin-top: 0.2rem;
`;

export const Boton = styled.button`
  width: 50%;
  text-align: center;
  margin-top: 0.8rem;
  margin-left: auto;
  margin-right: auto;
  padding: 0.7rem 0;
  background: linear-gradient(90deg, #607074 0%, #a5c4ca 100%);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: linear-gradient(90deg, #a5c4ca 0%, #607074 100%);
  }
  @media (max-width: 1120px) {
    font-size: 0.8rem;
    width: 30%;
  }
`;

export const Nota = styled.div`
  margin-top: 1rem;
  color: #607074;
  font-size: 0.9rem;
  text-align: center;
  span {
    color: #e74c3c;
    font-weight: bold;
  }
  @media (max-width: 1120px) {
    font-size: 0.8rem;
  }
`;

export const Mensaje = styled.div`
  margin-top: 1rem;
  color: #2e7d32;
  font-weight: 600;
  text-align: center;
`;