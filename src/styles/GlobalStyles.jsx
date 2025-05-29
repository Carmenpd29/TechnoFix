import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  html, body, #root {
    height: 100%;
    margin: 0;
    padding: 0;
  }  

  body {
    margin: 0;
    padding: 0;
    background-color:rgb(231, 247, 250);
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
    color:#003459;
  }
`;