import { useState, useEffect } from "react";
import styled from "styled-components";
import { FiSearch } from "react-icons/fi";
import { supabase } from "../../index";

export function BuscadorClientes({
  busqueda,
  setBusqueda,
  placeholder = "Buscar por nombre o NIF...",
  soloInput = false,
}) {
  return (
    <BusquedaContainer>
      <FiSearch className="icono-lupa" />
      <input
        type="text"
        placeholder={placeholder}
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
    </BusquedaContainer>
  );
}

const BusquedaContainer = styled.div`
  width: 100%;
  max-width: 700px;
  margin: 0 auto 1.2rem auto;
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 12px;
  border: 1.5px solid #a5c4ca;
  box-shadow: 0 2px 8px #404a4c22;
  .icono-lupa {
    font-size: 1.3rem;
    color: #607074;
    margin-left: 0.7rem;
    margin-right: 0.7rem;
  }
  input {
    width: 100%;
    padding: 0.7rem 0.7rem 0.7rem 0;
    border: none;
    border-radius: 12px;
    font-size: 1rem;
    color: #404a4c;
    background: transparent;
    &:focus {
      outline: none;
    }
  }
  @media (max-width: 1120px) {
    input {
      font-size: 0.8rem;
    }
  }
`;
