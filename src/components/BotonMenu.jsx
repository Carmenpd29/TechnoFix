import styled from "styled-components";

export function BotonMenu({ icon, children, ...props }) {
  return (
    <StyledBoton {...props}>
      <IconWrapper>{icon}</IconWrapper>
      <span>{children}</span>
    </StyledBoton>
  );
}

const StyledBoton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #a5c4ca;
  color: #232728;
  border: none;
  border-radius: 16px;
  padding: 2rem 2.5rem;
  font-size: 1rem;
  font-family: 'Poppins';
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 2px 8px #404a4c22;
  transition: background 0.2s, color 0.2s, box-shadow 0.2s;
  min-width: 120px;
  min-height: 120px;
  max-width: 120px;
  max-height: 120px;
  aspect-ratio: 1 / 1;
  &:hover {
    background: #607074;
    color: #caf0f8;
  }
  span {
    margin-top: 1rem;
    font-size: 1.1rem;
  }

  @media (max-width: 600px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    text-align: center;
    padding: 1rem 1.5rem;
    width: 100%;
    max-width: 180px;
    min-width: 0;
    min-height: 0;
    max-height: none;
    border-radius: 8px;
    box-shadow: 0 2px 8px #404a4c22; 
    background: #a5c4ca;
    color: #232728;           
    font-size: 1rem;
    margin-bottom: 0.5rem;
    aspect-ratio: unset;
    border: 1px solid #a5c4ca;   
    span {
      margin-top: 0;
      font-size: 0.9rem;
    }
    svg {
      font-size: 0.9rem !important; 
      min-width: 0.9rem;
      min-height: 0.9rem;
    }
  }
`;

const IconWrapper = styled.div`
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;

  & > svg {
    width: 36px !important;
    height: 36px !important;
    min-width: 36px !important;
    min-height: 36px !important;
    max-width: 36px !important;
    max-height: 36px !important;
    flex-shrink: 0;
  }
`;