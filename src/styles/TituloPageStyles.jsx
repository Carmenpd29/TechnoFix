import styled from "styled-components";

export const Titulo = styled.h2`
  width: 100%;
  font-size: 1.7rem;
  margin: 2rem 0 1.5rem 0;
  color: #232728;
  text-align: center;
  word-break: break-word;

  @media (max-width: 600px) {
    margin-top: 2.5rem;
    font-size: 1.5rem;
    padding: 0 0.5rem;
    letter-spacing: 0.01em;
  }
`;