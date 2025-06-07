import styled from "styled-components";

export const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 60px;
  background: linear-gradient(120deg, #a5c4ca 0%, #607074 100%);
  display: flex;
  align-items: center;
  z-index: 210; 
  box-shadow: 0 2px 8px #404a4c22;

  @media (min-width: 900px) {
    display: none;
  }
`;

export const HamburguesaButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 1.5rem;
  display: flex;
  align-items: center;
  z-index: 21;
`;

export const AppWrapper = styled.div`
  min-height: 100dvh;
  background: #f8fafc;
  display: flex;
  flex-direction: column;
`;

export const Container = styled.main`
  display: grid;
  min-height: 100vh;
  height: 100%;
  background: #f8fafc;
  grid-template-columns: 260px 1fr;
  grid-template-rows: 1fr auto;
  color: #003459;

  .contentSidebar {
    grid-column: 1 / 2;
    grid-row: 1 / 3;
    display: block;
    min-width: 200px;
    background: #f8fafc;
    border-right: 2px solid #a5c4ca44;
    /* Quita height: 100vh y overflow-y: auto */
    height: 100%;
  }
  .contentMenuHambur {
    display: none;
  }
  .contentRouters {
    grid-column: 2 / 3;
    grid-row: 1 / 2;
    width: 100%;
    height: 100%;
    min-width: 0;
    overflow-y: auto;
    margin-top: 0;
    box-sizing: border-box;
    background: linear-gradient(120deg,rgb(204, 228, 233) 0%,rgb(186, 203, 207) 100%);
  }
  footer {
    grid-column: 2 / 3;
    grid-row: 2 / 3;
  }

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    .contentSidebar {
      display: none;
    }
    .contentMenuHambur {
      display: block;
    }
    .contentRouters {
      grid-column: 1;
      margin-top: 60px;
      padding: 0 0.2rem;
    }
    footer {
      grid-column: 1;
    }
  }
`;