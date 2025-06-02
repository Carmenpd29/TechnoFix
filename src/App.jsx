import styled, { createGlobalStyle } from "styled-components";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";

import { GlobalStyles, MyRoutes, Sidebar } from "./index";
import { Device } from "./styles/breakpoints";
import { Login } from "./pages/Login";
import { useUserStore } from "./store/userStore";
import { MenuHambur } from "./components/menu/MenuHambur";

function App() {
  const user = useUserStore((state) => state.user);
  const login = useUserStore((state) => state.login);
  const logout = useUserStore((state) => state.logout);
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <GlobalStyles />
      <Routes>
        <Route
          path="/login"
          element={
            user ? <Navigate to="/" replace /> : <Login onLogin={login} />
          }
        />
        <Route
          path="*"
          element={
            user ? (
              <Container $menuOpen={menuOpen}>
                {!menuOpen && (
                  <Header>
                    <HamburguesaButton onClick={() => setMenuOpen(true)}>
                      <FiMenu size={30} color="#003459" />
                    </HamburguesaButton>
                  </Header>
                )}
                <section className="contentSidebar">
                  <Sidebar user={user} onLogout={logout} />
                </section>
                <section className="contentMenuHambur">
                  <MenuHambur
                    user={user}
                    onLogout={logout}
                    open={menuOpen}
                    setOpen={setMenuOpen}
                  />
                </section>
                <section className="contentRouters">
                  <MyRoutes user={user} />
                </section>
              </Container>
            ) : (
              <Navigate to="/login" replace state={{ from: location }} />
            )
          }
        />
      </Routes>
    </>
  );
}

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 60px;
  background: linear-gradient(120deg, #a5c4ca 0%, #607074 100%);
  display: flex;
  align-items: center;
  z-index: 210; // Mayor que el Overlay (200)
  box-shadow: 0 2px 8px #404a4c22;

  // Oculta el header en tablet y escritorio
  @media ${Device.tablet} {
    display: none;
  }
`;

const HamburguesaButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 1.5rem;
  display: flex;
  align-items: center;
  z-index: 21;
`;

const Container = styled.main`
  display: grid;
  height: 100vh;
  min-height: 100vh;
  grid-template-columns: 1fr;
  color: #003459;

  .contentSidebar,
  .contentMenuHambur,
  .contentRouters {
    height: 100vh;
    min-height: 100vh;
    background: none; 
  }

  .contentSidebar {
    display: none;
  }

  .contentMenuHambur {
    position: absolute;
    width: 100vw;
    z-index: ${({ $menuOpen }) => ($menuOpen ? 10 : 0)};
  }

  .contentRouters {
    grid-column: 1;
    width: 100%;
    height: 100vh;
    min-height: 100vh;
    overflow-y: auto;
    margin-top: 60px; /* deja espacio para el header */
  }

  @media ${Device.tablet} {
    grid-template-columns: 180px auto;
    .contentSidebar {
      display: block;
      height: 100vh;
      min-height: 100vh;
    }
    .contentMenuHambur {
      display: none;
    }
    .contentRouters {
      grid-column: 2;
      height: 100vh;
      min-height: 100vh;
      margin-top: 0; 
    }
  }
`;

export default App;
