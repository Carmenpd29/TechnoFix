import styled from "styled-components";

export function WrapperPage({ children, maxWidth = 900, ...props }) {
  return <Wrapper $maxWidth={maxWidth} {...props}>{children}</Wrapper>;
}

const Wrapper = styled.div`
  width: 90%;
  max-width: ${({ $maxWidth }) => $maxWidth}px;
  margin: 2.5rem auto;
  padding: 2rem 1.5rem;
  background: #f8fafb;
  border-radius: 22px;
  box-shadow: 0 2px 18px #404a4c22;
  min-height: unset;
  height: auto;
  border: 2px solid #a5c4ca;
  display: flex;
  flex-direction: column;
  align-items: center; 
  box-sizing: border-box;
  position: relative;
  padding-top: 2.5rem;
  
  @media (max-width: 1400px) and (min-width: 1201px) {
    width: 85%;
  }
  
  @media (max-width: 1200px) and (min-width: 901px) {
    width: 80%;
    margin: 2rem auto;
  }
  
  @media (max-width: 900px) and (min-width: 701px) {
    width: 75%;
    margin: 2rem auto;
  }
  
  @media (max-width: 700px) {
    padding-top: 4.5rem;
    width: 95%;
  }
`;