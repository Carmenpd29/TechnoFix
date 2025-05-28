import styled from "styled-components";
import { GlobalStyles, MyRoutes, Lateral} from './index';
import { Device } from './styles/breakpoints'

function App() {
  return (
    <Container>
        <GlobalStyles/>
        <section className="contentSidebar">
          
        </section>
        <section className="contentMenuHambur">
          Menu Hamburguesa
        </section>
        <section className="contentRouters">
          <MyRoutes/>Rutas
        </section>
    </Container>
  );
}

const Container = styled.main`
  display:grid;
  grid-template-columns: 1fr;
  background-color:rgb(228, 251, 255);
  color:#003459;

  .contentSidebar{
    display:none;
    background-color:rgba(132, 148, 168, 0.5);
  }
  .contentMenuHambur{
    position:absolute;
    background-color:rgba(75, 97, 126, 0.5);
  }
  .contentRouters{
    background-color:rgba(44, 64, 90, 0.5);
    grid-column: 1;
    width:100%;
  }

  @media ${Device.tablet}{
    grid-template-columns: 88px auto;
    .contentSidebar{
      display:initial;
    }
    .contentMenuHambur{
      display:none;
    }
    .contentRouters{
      grid-column: 2;
    } 
  }
`
export default App;
