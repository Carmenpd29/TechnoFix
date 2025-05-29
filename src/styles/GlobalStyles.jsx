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
    background: #f8fafc;
    margin: 0;
    padding: 0;
  }
`;