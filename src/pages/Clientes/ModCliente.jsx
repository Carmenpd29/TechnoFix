import styled from "styled-components";
import { useState } from "react";
import { BotonVolver, BuscadorClientes } from "../../index";
import { useNavigate } from "react-router-dom";

export function ModCliente() {
  const [seleccionado, setSeleccionado] = useState(null);
  const navigate = useNavigate();

  const handleAceptar = () => {
    if (seleccionado) {
      navigate(`/clientes/modificar/${seleccionado.id}`, {
        state: { cliente: seleccionado },
      });
    }
  };

  return (
    <Wrapper>
      <BotonVolver to="/clientes" />
      <Titulo>Modificar Cliente</Titulo>
      <BuscadorClientes onSeleccionar={setSeleccionado} />
      <AceptarBtn disabled={!seleccionado} onClick={handleAceptar}>
        Aceptar
      </AceptarBtn>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 90%;
  margin: 2.5rem auto;
  padding: 1.5rem 1rem 1.5rem 1rem;
  background: #f8fafb;
  border-radius: 22px;
  box-shadow: 0 2px 18px #404a4c22;
  min-height: 70vh;
  border: 2px solid #a5c4ca;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  position: relative;
  padding-top: 2.5rem;
  @media (max-width: 700px) {
    padding-top: 4.5rem;
  }
`;

const Titulo = styled.h2`
  font-size: 1.7rem;
  margin-bottom: 1.5rem;
  color: #232728;
  text-align: center;
`;

const AceptarBtn = styled.button`
  margin-top: 1.5rem;
  background: linear-gradient(90deg, #607074 0%, #a5c4ca 100%);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.7rem 2.2rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 1px 4px #00345922;
  border: 1px solid #fff;
  transition: background 0.2s, box-shadow 0.2s, transform 0.1s;
  &:hover {
    background: linear-gradient(90deg, #a5c4ca 0%, #607074 100%);
    box-shadow: 0 2px 8px #00345944;
    transform: translateY(-2px) scale(1.04);
  }
  &:disabled {
    background: #b3c6d1;
    cursor: not-allowed;
    color: #fff;
    border: none;
    box-shadow: none;
  }
`;
