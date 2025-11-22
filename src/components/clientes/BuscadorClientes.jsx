import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { supabase } from "../../index";
import { BusquedaContainer } from "../../styles/BuscadorClientesStyles";

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
