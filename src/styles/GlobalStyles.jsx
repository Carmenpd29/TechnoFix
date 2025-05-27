import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700;800;900&display=swap");

  body {
    margin: 0;
    padding: 0;
    background-color: red;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
  }
`;