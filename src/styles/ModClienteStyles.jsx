import styled from "styled-components";

export const AceptarBtn = styled.button`
  margin-top: 1.5rem;
  background: linear-gradient(90deg, #607074 0%, #a5c4ca 100%);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.7rem 2.2rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 1px 4px #00345922;
  border: 1px solid #fff;
  transition: background 0.2s, box-shadow 0.2s, transform 0.1s;
  &:hover {
    background: linear-gradient(90deg, #a5c4ca 0%, #607074 100%);
    box-shadow: 0 2px 8px #00345944;
    transform: translateY(-2px) scale(1.04);
  }
  &:disabled {
    background: #b3c6d1;
    cursor: not-allowed;
    color: #fff;
    border: none;
    box-shadow: none;
  }
`;