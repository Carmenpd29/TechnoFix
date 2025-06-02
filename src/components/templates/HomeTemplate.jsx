import styled from "styled-components";

export function HomeTemplate() {
  return (
    <Fondo>
      <Card>
        <LogoFijo>
          <img src="/TechnoFix/assets/Logo.png" alt="TechnoFix logo" style={{ 
            width: 200, 
            height: "auto" 
          }} />
        </LogoFijo>
        <Titulo>¡Bienvenid@ a TechnoFix!</Titulo>
        <Texto>
          Selecciona una opción para comenzar.
          <br /><br />
          <OptionHome>
            <p><span>- TPV</span> para ventas y gestión de productos.</p>
            <p><span>- Clientes</span> para gestión de clientes.</p>
          </OptionHome>
        </Texto>
      </Card>
    </Fondo>
  );
}

const Fondo = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #e7f7fa 0%, #b3c6d1 100%);
`;

const Card = styled.div`
  background: #fff;
  padding: 2rem 2rem 2rem 2rem;
  border-radius: 18px;
  box-shadow: 0 8px 32px rgba(55, 130, 165, 0.18),
    0 1.5px 8px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90vw;
  max-width: 420px;
  min-width: 0;

  @media (max-width: 480px) {
    padding: 1rem 0.5rem 1rem 0.5rem;
    width: 94vw;
    max-width: 98vw;
  }
`;

const LogoFijo = styled.div`
`;

const Titulo = styled.h2`
  font-family: "Poppins", "Montserrat";
  color: #003459;
  margin-bottom: 1.5rem;
  font-weight: 700;
  letter-spacing: 1px;
  text-align: center;
`;

const Texto = styled.p`
  font-family: "Poppins", "Montserrat";
  color: #3782a5;
  font-size: 1.1rem;
  text-align: center;
  margin: 0 1.2rem 1.1rem 1.2rem;
  span {
    color: #27618a;
    font-weight: 600;
    font-size: 1.25rem;
  }
`;

const OptionHome = styled.div`
  height: 100%;
  width: 90%;
  display: flex;
  flex-direction: column;
  text-align: left;
  p {
    margin: 0.15rem 0; 
  }
`;
