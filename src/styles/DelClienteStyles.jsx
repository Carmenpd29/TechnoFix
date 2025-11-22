import styled from "styled-components";

export const ErrorMsg = styled.div`
  color: #e74c3c;
  margin-bottom: 1rem;
  font-weight: 600;
`;

export const Mensaje = styled.div`
  margin-top: 1rem;
  color: #2e7d32;
  font-weight: 600;
  text-align: center;
`;

export const CancelButton = styled.button`
  background: #a5c4ca;
  color: #232728;
  border: none;
  border-radius: 8px;
  padding: 0.6rem 1.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  &:hover { background: #607074; color: #fff; }
`;