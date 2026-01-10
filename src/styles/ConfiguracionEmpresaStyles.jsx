import styled from "styled-components";

export const ConfigContainer = styled.div`
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin: 1rem 0;
`;

export const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: #333;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #a5c4ca;
  }
`;

export const FileInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: white;
  
  &:focus {
    outline: none;
    border-color: #a5c4ca;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

export const PreviewImage = styled.img`
  max-width: 200px;
  max-height: 100px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-top: 0.5rem;
`;

export const Mensaje = styled.div`
  padding: 1rem;
  border-radius: 6px;
  margin: 1rem 0;
  background: ${props => {
    if (props.tipo === 'error') return '#f8d7da';
    if (props.tipo === 'info') return '#d1ecf1';
    return '#d4edda';
  }};
  color: ${props => {
    if (props.tipo === 'error') return '#721c24';
    if (props.tipo === 'info') return '#0c5460';
    return '#155724';
  }};
  border: 1px solid ${props => {
    if (props.tipo === 'error') return '#f5c6cb';
    if (props.tipo === 'info') return '#bee5eb';
    return '#c3e6cb';
  }};
`;
