import React from "react";
import { FiSearch } from "react-icons/fi";
import { ZonaClienteStyled, Buscador } from "../../styles/ZonaClienteStyles";

/**
 * ZonaCliente
 * Buscador de clientes con autocompletado.
 */
export function ZonaCliente({
  busqueda,
  setBusqueda,
  clientes,
  cliente,
  setCliente,
  loadingClientes
}) {
  // Controla si el input está enfocado para mostrar el desplegable
  const [inputFocused, setInputFocused] = React.useState(false);  
  
  // Evita que el desplegable se cierre al interactuar con él
  const [dropdownHovered, setDropdownHovered] = React.useState(false);

  // Filtra los clientes según el texto de búsqueda introducido
  // Se comparan nombre, apellidos, teléfono y DNI/NIF (normalizados a minúsculas)
  const clientesFiltrados = busqueda && clientes && busqueda.trim().length > 0
    ? clientes.filter(c => {
        const nombre = c.nombre || "";
        const apellidos = c.apellidos || "";
        const telefono = c.telefono || "";
        const dni = c.dni || c.nif || "";
        const b = busqueda.toLowerCase();
        // Normalización de campos para evitar errores si vienen nulos desde la API
        return nombre.toLowerCase().includes(b) ||
          apellidos.toLowerCase().includes(b) ||
          telefono.toLowerCase().includes(b) ||
          dni.toLowerCase().includes(b);
      })
    : [];

  return (
    <ZonaClienteStyled>
      <Buscador style={{ position: 'relative' }}>
        {/* Input de búsqueda de clientes.
          * Al perder el foco se cierra el desplegable con un pequeño delay
          * para permitir el click en los resultados. */}
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
        {/* Desplegable de resultados filtrados. Solo se muestra si hay búsqueda activa y el input tiene foco. */}
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
                {/* Mensaje informativo cuando no hay coincidencias con la búsqueda */}
                No se encontraron clientes con "{busqueda}".
              </div>
            )}
          </div>
        )}
      </Buscador>
    </ZonaClienteStyled>
  );

}
