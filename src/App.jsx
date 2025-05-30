import styled from "styled-components";
import { GlobalStyles, MyRoutes, Sidebar } from "./index";
import { Device } from "./styles/breakpoints";
import { Login } from "./pages/Login";
import { useUserStore } from "./store/userStore";
import { MenuHambur } from "./components/menu/MenuHambur";
import { Routes, Route, useNavigate, useLocation, Navigate } from "react-router-dom";

function App() {
  const user = useUserStore((state) => state.user);
  const login = useUserStore((state) => state.login);
  const logout = useUserStore((state) => state.logout);
  const location = useLocation();

  return (
    <>
      <GlobalStyles />
      <Routes>
        <Route
          path="/TechnoFix/login"
          element={
            user ? <Navigate to="/TechnoFix/" replace /> : <Login onLogin={login} />
          }
        />
        <Route
          path="*"
          element={
            user ? (
              <Container>
                <section className="contentSidebar">
                  <Sidebar user={user} onLogout={logout} />
                </section>
                <section className="contentMenuHambur">
                  <MenuHambur user={user} onLogout={logout} />
                </section>
                <section className="contentRouters">
                  <MyRoutes user={user} />
                </section>
              </Container>
            ) : (
              <Navigate to="/TechnoFix/login" replace state={{ from: location }} />
            )
          }
        />
      </Routes>
    </>
  );
}

const Container = styled.main`
  display: grid;
  height: 100vh;
  min-height: 100vh;
  grid-template-columns: 1fr;
  background: linear-gradient(
    120deg,
    #ffffff 0%,
    rgb(221, 244, 248) 40%,
    rgb(178, 198, 202) 100%
  );
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
    z-index: 10;
  }

  .contentRouters {
    grid-column: 1;
    width: 100%;
    height: 100vh;
    min-height: 100vh;
    overflow-y: auto;
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
    }
  }
`;

export default App;
