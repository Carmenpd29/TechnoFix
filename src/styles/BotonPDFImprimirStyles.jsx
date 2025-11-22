import styled from "styled-components";

export const StyledButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(90deg, #607074 0%, #a5c4ca 100%);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1.2rem;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: 0 2px 8px #0001;
  transition: background 0.3s;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
  &:hover {
    background: linear-gradient(90deg, #4d5a5d 0%, #8bb3bb 100%);
  }
`;