import styled from "styled-components";

export const Opciones = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem; 
  width: 100%;
  margin: 2rem 0;
  flex-wrap: wrap;
  padding: 0 1rem;
  
  @media (max-width: 768px) {
    gap: 1.5rem;
    margin: 1.5rem 0;
  }
  
  @media (max-width: 600px) {
    flex-direction: column;
    gap: 1rem;
    margin: 1rem 0;
    padding: 0 0.5rem;
  }
  
  @media (max-width: 480px) {
    gap: 0.8rem;
    padding: 0 0.25rem;
  }
`;