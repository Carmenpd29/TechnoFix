import styled from "styled-components";

export function HomeTemplate() {
  return (
    <Fondo>
      <Card>
        <LogoFijo>
          <img
            src="/TechnoFix/assets/Logo.png"
            alt="TechnoFix logo"
            style={{
              width: 200,
              height: "auto",
            }}
          />
        </LogoFijo>
        <Titulo>¡Bienvenid@ a TechnoFix!</Titulo>
        <Texto>
          Selecciona una opción para comenzar.
          <br />
          <br />
          <OptionHome>
            <p>
              <span>- Usuario</span> gestiona tu usuario haciendo clic en tu nombre.
            </p>
            <p>
              <span>- Clientes</span> para gestión de clientes.
            </p>
            <p>
              <span>- Reparaciones</span> para gestión de reparaciones.
            </p>
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
  width: 80vw;
  max-width: 420px;
  min-width: 0;

  @media (max-width: 1120px) {
    padding: 1rem 0.5rem 1rem 0.5rem;
    width: 70vw;
    max-width: 98vw;
    font-size: 0.8rem;
  }
`;

const LogoFijo = styled.div``;

const Titulo = styled.h2`
  font-family: "Poppins", "Montserrat";
  color: #003459;
  margin-bottom: 1.5rem;
  font-weight: 700;
  letter-spacing: 1px;
  text-align: center;
  
@media (max-width: 1120px) {
    font-size: 1.2rem;
  }
`;

const Texto = styled.div`
  font-family: "Poppins", "Montserrat";
  color: #3782a5;
  font-size: 1.1rem;
  text-align: center;
  margin: 0 1.2rem 1.1rem 1.2rem;
  span {
    color: #27618a;
    font-weight: 600;
    font-size: 0.9rem;
  }
  @media (max-width: 1120px) {
    font-size: 0.8rem;
  }
`;

const OptionHome = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: left;
  p {
    margin: 0.05rem 0;
    font-size: 0.9rem;
  }
  span {
    font-size: 1rem;
  }
  @media (max-width: 1120px) {
    p {
      font-size: 0.8rem;
    }
    span {
      font-size: 0.8rem;
    }
  }
`;
