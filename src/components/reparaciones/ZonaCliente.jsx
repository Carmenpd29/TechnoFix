
import React from "react";
import { FiSearch } from "react-icons/fi";
import { ZonaClienteStyled, Buscador } from "../../styles/ZonaClienteStyles";
import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.18);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.18);
  padding: 1.2rem 1.5rem;
  min-width: 320px;
  max-width: 90vw;
`;

const ModalHeader = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 0.7rem;
  color: #007bff;
`;


export function ZonaCliente({
  busqueda,
  setBusqueda,
  clientes,
  cliente,
  setCliente,
  loadingClientes
}) {
  const [inputFocused, setInputFocused] = React.useState(false);
  const [dropdownHovered, setDropdownHovered] = React.useState(false);
  const clientesFiltrados = busqueda && clientes && busqueda.trim().length > 0
    ? clientes.filter(c => {
        const nombre = c.nombre || "";
        const apellidos = c.apellidos || "";
        const telefono = c.telefono || "";
        const dni = c.dni || c.nif || "";
        const b = busqueda.toLowerCase();
        return nombre.toLowerCase().includes(b) ||
          apellidos.toLowerCase().includes(b) ||
          telefono.toLowerCase().includes(b) ||
          dni.toLowerCase().includes(b);
      })
    : [];


  return (
    <ZonaClienteStyled>
      <Buscador style={{ position: 'relative' }}>
        <input
          type="text"
          placeholder="Buscar cliente por DNI o nombre"
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
          onFocus={() => setInputFocused(true)}
          onBlur={() => setTimeout(() => {
            if (!dropdownHovered) setInputFocused(false);
          }, 120)}
          disabled={loadingClientes}
        />
        <span className="icono-lupa">
          <FiSearch size={22} color="#607074" />
        </span>
        {(busqueda && busqueda.length > 0 && inputFocused) && (
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "calc(100% + 8px)",
              transform: "translateX(-50%)",
              minWidth: "260px",
              maxWidth: "340px",
              width: "100%",
              maxHeight: "220px",
              overflowY: "auto",
              border: "1.5px solid #a5c4ca",
              borderRadius: "12px",
              background: "white",
              boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
              zIndex: 9999,
              padding: "0.3rem 0.2rem"
            }}
            onMouseEnter={() => setDropdownHovered(true)}
            onMouseLeave={() => setDropdownHovered(false)}
          >
            {clientesFiltrados.length > 0 ? clientesFiltrados.map((c) => (
              <div
                key={c.id}
                onClick={() => {
                  setCliente(c);
                  setBusqueda(c.nombre + (c.apellidos ? ' ' + c.apellidos : ''));
                  setInputFocused(false);
                }}
                style={{
                  padding: "0.7rem 0.5rem",
                  cursor: "pointer",
                  borderBottom: "1px solid #eee",
                  fontSize: "1rem",
                  fontWeight: "500"
                }}
                onMouseEnter={e => e.target.style.backgroundColor = "#f0f8ff"}
                onMouseLeave={e => e.target.style.backgroundColor = "white"}
              >
                <div style={{ fontWeight: "bold", color: "rgb(14, 41, 61)" }}>{c.nombre} {c.apellidos}</div>
                <div style={{ fontSize: "0.95em" }}>{c.nif || c.dni || 'Sin NIF'} • {c.telefono || 'Sin teléfono'}</div>
              </div>
            )) : (
              <div style={{
                padding: "1rem",
                color: "#856404",
                background: "#fff3cd",
                textAlign: "center",
                borderRadius: "8px",
                fontSize: "1em"
              }}>
                No se encontraron clientes con "{busqueda}".
              </div>
            )}
          </div>
        )}
      </Buscador>
    </ZonaClienteStyled>
  );


const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.18);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.18);
  padding: 1.2rem 1.5rem;
  min-width: 320px;
  max-width: 90vw;
`;

const ModalHeader = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 0.7rem;
  color: #007bff;
`;
}
