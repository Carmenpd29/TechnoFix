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
      <Manual>
        <p>
          - Pulsa <b>Caja</b> para cobrar.<br />
          - Pulsa <b>Productos</b> para ver productos.
        </p>
      </Manual>
    </TPVWrapper>
  );
}

const TPVWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  max-width: 600px;   
  margin: 0 auto;     
`;

const Titulo = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Manual = styled.div`
  color: #607074;
  font-size: 1.05rem;
  margin-bottom: 2rem;
  text-align: left; 
  max-width: 370px;   
  width: 100%;
`;

const Opciones = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;

  @media (max-width: 600px) {
    gap: 0.5rem;
    width: 80%;         
    align-items: stretch; 
  }
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
  padding: 2rem 2rem;
  font-size: 1.2rem;
  font-family: 'Poppins';
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 2px 8px #404a4c22;
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

  /* SOLO EN MÓVIL: estilo lista compacta y MISMO ANCHO */
  @media (max-width: 600px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    text-align: center;
    padding: 0.7rem 1rem;
    width: 35%;           
    min-width: 0;
    min-height: 0;
    max-width: 90%;       
    max-height: none;
    border-radius: 8px;
    box-shadow: 0 2px 8px #404a4c22; 
    background: #a5c4ca;
    color: #232728;           
    font-size: 1rem;
    margin-bottom: 0.5rem;
    aspect-ratio: unset;
    border: 1px solid #a5c4ca;   
    span {
      margin-top: 0;
      font-size: 1rem;
    }
    svg {
      font-size: 0.9rem !important; 
      min-width: 0.9rem;
      min-height: 0.9rem;
    }
  }
`;