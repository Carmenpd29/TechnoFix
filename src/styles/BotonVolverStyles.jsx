import styled from "styled-components";

export const Volver = styled.button`
  position: absolute;
  top: 1.5rem;
  left: 2rem;
  background: #a5c4ca;
  color: #232728;
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1.1rem;
  font-size: 0.9rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  box-shadow: 0 2px 8px #404a4c22;
  transition: background 0.2s;
  z-index: 10;
  &:hover {
    background: #607074;
    color: #fff;
  }

  @media (max-width: 1120px) {
    padding: 0.3rem 0.8rem;
    font-size: 0.8rem;
  }
`;