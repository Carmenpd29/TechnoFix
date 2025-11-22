import styled from "styled-components";

export const Form = styled.form`
  width: 100%;
  max-width: 420px;
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
  margin-bottom: 0.3rem;
  color: #003459;
  span {
    color: #e74c3c;
    font-size: 1.1em;
    margin-left: 2px;
  }
`;

export const Input = styled.input`
  padding: 0.6rem 0.8rem;
  border: 1.5px solid #a5c4ca;
  border-radius: 8px;
  font-size: 0.9rem;
  outline: none;
  transition: border 0.2s;
  &::placeholder {
    font-size: 0.9rem;
    color: #b0b8ba;
    opacity: 1;
  }
  &:focus {
    border-color: #607074;
  }
`;

export const Boton = styled.button`
  width: 40%;
  margin: 1.2rem auto 0 auto; 
  display: block;             
  padding: 0.7rem 0;
  background: linear-gradient(90deg, #607074 0%, #a5c4ca 100%);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: linear-gradient(90deg, #a5c4ca 0%, #607074 100%);
  }
`;

export const Mensaje = styled.div`
  margin-top: 0.9rem;
  color: #2e7d32;
  font-weight: 600;
  text-align: center;
`;

export const ErrorMsg = styled.div`
  color: #e74c3c;
  margin-top: 1rem;
  font-weight: 600;
  text-align: center;
`;

export const ObligatorioMsg = styled.div`
  margin-top: 0.5rem;
  color: #607074;
  font-size: 0.9rem;
  text-align: left;
  span {
    color: #e74c3c;
    font-size: 1.1em;
    margin-right: 4px;
    font-weight: bold;
  }
`;