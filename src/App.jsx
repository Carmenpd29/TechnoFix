import styled from "styled-components";
import { GlobalStyles, MyRoutes, Sidebar } from './index';
import { Device } from './styles/breakpoints';
import { Login } from './pages/Login';
import { useUserStore } from './store/userStore';
import { MenuHambur } from "./components/organismos/sidebar/MenuHambur";

function App() {
  const user = useUserStore(state => state.user);
  const login = useUserStore(state => state.login);
  const logout = useUserStore(state => state.logout);

  console.log("user:", user); 

  if (!user) {
    return (
      <>
        <GlobalStyles />
        <Login onLogin={login} />
      </>
    );
  }

  return (
    <Container>
        <GlobalStyles/>
        <section className="contentSidebar">
          <Sidebar user={user} onLogout={logout} />
        </section>
        <section className="contentMenuHambur">
          <MenuHambur onLogout={logout} />
        </section>
        <section className="contentRouters">
          <MyRoutes user={user} />
        </section>
    </Container>
  );
}

const Container = styled.main`
  display: grid;
  height: 100vh;
  min-height: 100vh;
  grid-template-columns: 1fr;
  background-color: rgb(231, 247, 250);
  color: #003459;

  .contentSidebar,
  .contentMenuHambur,
  .contentRouters {
    height: 100vh;
    min-height: 100vh;
  }

  .contentSidebar {
    display: none;
    background-color: rgba(55, 130, 165, 0.5);
  }

  .contentMenuHambur {
    position: absolute;
    width: 100vw;
    background-color: rgba(136, 180, 197, 0.5);
    z-index: 10;
  }

  .contentRouters {
    background-color: rgb(231, 247, 250);
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
`
export default App;
