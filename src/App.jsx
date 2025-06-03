import styled, { createGlobalStyle } from "styled-components";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import {
  GlobalStyles,
  MyRoutes,
  Sidebar,
  Login,
  useUserStore,
  MenuHambur,
  Footer,
  ModMyUser
} from "./index";

function App() {
  const user = useUserStore((state) => state.user);
  const login = useUserStore((state) => state.login);
  const logout = useUserStore((state) => state.logout);
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <AppWrapper>
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
              <Container>
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
                <Footer /> 
              </Container>
            ) : (
              <Navigate to="/login" replace state={{ from: location }} />
            )
          }
        />
      </Routes>
    </AppWrapper>
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
  z-index: 210; 
  box-shadow: 0 2px 8px #404a4c22;

  @media (min-width: 900px) {
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
  min-height: 100vh;
  grid-template-columns: 180px 1fr;
  grid-template-rows: 1fr auto;
  color: #003459;

  .contentSidebar {
    grid-column: 1 / 2;
    grid-row: 1 / 3; 
    display: block;
    height: 100%;
  }
  .contentMenuHambur {
    display: none;
  }
  .contentRouters {
    grid-column: 2 / 3;
    grid-row: 1 / 2;
    width: 100%;
    overflow-y: auto;
    margin-top: 0;
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
    }
    footer {
      grid-column: 1;
    }
  }
`;

const AppWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export default App;
