import styled from "styled-components";

export const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.05rem;
  margin: 0.5rem 0;
`;

export const UserRole = styled.span`
  font-size: 0.8rem;
  color: rgb(180, 190, 200);
  font-weight: 500;
  text-align: center;
  letter-spacing: 0.3px;
  opacity: 0.85;
  
  @media (max-width: 1120px) {
    font-size: 0.75rem;
  }
`;
