import styled from "styled-components";
import { GlobalStyles, MyRoutes, Sidebar} from './index';
import { Device } from './styles/breakpoints'

function App() {
  return (
    <Container>
        <GlobalStyles/>
        <section className="contentSidebar">
          <Sidebar/>
        </section>
        <section className="contentMenuHambur">
          Menu
        </section>
        <section className="contentRouters">
          <MyRoutes/>
        </section>
    </Container>
  );
}

const Container = styled.main`
  display:grid;
  grid-template-columns: 1fr;
  background-color:rgb(231, 247, 250);
  color:#003459;

  .contentSidebar{
    display:none;
    background-color:rgba(136, 180, 197, 0.5);
  }
  .contentMenuHambur{
    position:absolute;
    background-color:rgba(55, 130, 165, 0.5);
  }
  .contentRouters{
    background-color:rgba(33, 100, 131, 0.5);
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
