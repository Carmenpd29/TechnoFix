import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { MdPointOfSale } from "react-icons/md";

export function TPV() {
  const navigate = useNavigate();

  return (
    <TPVWrapper>
      <Titulo>TPV</Titulo>
      <Opciones>
        <Opcion onClick={() => navigate("/caja")}>
          <MdPointOfSale size={48} />
          <span>Caja</span>
        </Opcion>
        <Opcion onClick={() => navigate("/productos")}>
          <FiShoppingCart size={48} />
          <span>Productos</span>
        </Opcion>
      </Opciones>
    </TPVWrapper>
  );
}

const TPVWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const Titulo = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
`;

const Opciones = styled.div`
  display: flex;
  gap: 2rem;
`;

const Opcion = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #a5c4ca;
  color: #232728;
  border: none;
  border-radius: 16px;
  padding: 2rem 2.5rem;
  font-size: 1.2rem;
  font-family: 'Poppins';
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 2px 8px #404a4c33;
  transition: background 0.2s, color 0.2s, box-shadow 0.2s;
  min-width: 170px;
  min-height: 170px;
  max-width: 200px;
  max-height: 200px;
  aspect-ratio: 1 / 1;
  &:hover {
    background: #607074;
    color: #caf0f8;
  }
  span {
    margin-top: 1rem;
    font-size: 1.1rem;
  }
`;