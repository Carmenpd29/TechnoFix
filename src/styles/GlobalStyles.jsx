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
rgb(217, 243, 248) 40%,
rgb(178, 197, 201) 100%
    );
    margin: 0;
    padding: 0;
  }
`;