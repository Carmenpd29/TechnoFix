import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  html, body, #root {
    height: 100%;
    margin: 0;
    padding: 0;
  }  

  body {
    font-family: 'Poppins';
    color: #003459;
    background: linear-gradient(
      120deg,
      #ffffff 0%,
      #caf0f8 40%,
      #a5c4ca 100%
    );
    margin: 0;
    padding: 0;
  }
`;