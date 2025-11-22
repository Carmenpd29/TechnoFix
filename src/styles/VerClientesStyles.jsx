import styled from "styled-components";

export const BotonesContainer = styled.div`
  margin: 1.5rem auto 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.2rem;
  background: transparent;
  border-radius: 12px;
  font-size: 0.9rem;
  color: #003459;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    gap: 0.8rem;
    margin: 1rem auto 0 auto;
  }
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.6rem;
    width: 100%;
    max-width: 300px;
  }
`;