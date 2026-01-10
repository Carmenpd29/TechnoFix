import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  max-width: min(${props => props.$maxWidth || 1600}px, calc(100vw - 7rem));
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
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #a5c4ca #f8fafb;
  
  @media (max-width: 1400px) and (min-width: 1201px) {
      max-width: min(800px, calc(100vw - 5rem));
    max-width: calc(100vw - 5rem);
    margin: 2rem auto;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
  
  @media (max-width: 1200px) and (min-width: 901px) {
      max-width: min(700px, calc(100vw - 3.5rem));
    max-width: calc(100vw - 3.5rem);
    margin: 1.5rem auto;
    padding-left: 1rem;
    padding-right: 1rem;
  }
  
  @media (max-width: 900px) and (min-width: 701px) {
      max-width: min(600px, calc(100vw - 2.2rem));
    max-width: calc(100vw - 2.2rem);
    margin: 1rem auto;
    padding-left: 0.7rem;
    padding-right: 0.7rem;
  }
  
  @media (max-width: 700px) {
      max-width: min(98vw, calc(100vw - 1.5rem));
    max-width: calc(100vw - 1.5rem);
    margin: 0.5rem auto;
    padding-top: 4.5rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
`;
