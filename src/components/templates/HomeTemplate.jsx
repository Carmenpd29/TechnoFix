import styled from "styled-components";
import { HiHome } from "react-icons/hi";

export function HomeTemplate() {
  return (
    <Fondo>
      <Card>
        <Icono>
          <HiHome size={48} />
        </Icono>
        <Titulo>¡Bienvenido/a a TechnoFix!</Titulo>
        <Texto>
          Selecciona una opción en el menú lateral para comenzar.<br />
          <span>TPV</span> para ventas, <span>Clientes</span> para gestión de clientes.
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
  padding: 2.5rem 2.5rem 2rem 2.5rem;
  border-radius: 18px;
  box-shadow: 0 8px 32px rgba(55,130,165,0.18), 0 1.5px 8px rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 320px;
  max-width: 90vw;
`;

const Icono = styled.div`
  color: #3782a5;
  margin-bottom: 1.2rem;
`;

const Titulo = styled.h2`
  color: #003459;
  margin-bottom: 1rem;
  font-weight: 700;
  letter-spacing: 1px;
  text-align: center;
`;

const Texto = styled.p`
  color: #3782a5;
  font-size: 1.1rem;
  text-align: center;
  margin: 0;
  span {
    color: #27618a;
    font-weight: 600;
  }
`;