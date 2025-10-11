import styled from "styled-components";
import { FiSearch } from "react-icons/fi";


export function ZonaCliente({
  busqueda,
  setBusqueda,
  clientes,
  cliente,
  setCliente,
  loadingClientes
}) {
  return (
    <ZonaClienteStyled>
      <Buscador>
        <input
          type="text"
          placeholder="Buscar cliente por DNI o nombre"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          disabled={loadingClientes}
        />
        <span className="icono-lupa">
          <FiSearch size={22} color="#607074" />
        </span>
      </Buscador>
      {clientes.length > 0 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            maxWidth: 340,
            margin: "0.5rem auto",
          }}
        >
          <label
            style={{
              color: "#607074",
              fontSize: "0.95rem",
              marginBottom: "0.4rem",
              alignSelf: "flex-start",
            }}
          >
            Selecciona cliente:
          </label>
          <select
            value={cliente.id || ""}
            onChange={(e) => {
              const seleccionado = clientes.find(
                (c) => String(c.id) === e.target.value
              );
              setCliente(
                seleccionado || {
                  id: "",
                  nombre: "",
                  apellidos: "",
                  telefono: "",
                }
              );
            }}
            style={{
              width: "100%",
              padding: "0.5rem",
              borderRadius: 6,
              border: "1.5px solid #a5c4ca",
              fontSize: "1rem",
            }}
            disabled={loadingClientes}
          >
            <option value="">-- Selecciona --</option>
            {clientes.map((c) => (
              <option key={c.id} value={c.id}>
                {c.id}.{c.nombre} {c.apellidos}
              </option>
            ))}
          </select>
        </div>
      )}
    </ZonaClienteStyled>
  );
}

const ZonaClienteStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

const Buscador = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 340px;
  margin: 0 auto 0.5rem auto;
  position: relative;
  input {
    flex: 1;
    padding: 0.6rem 2.2rem 0.6rem 0.8rem;
    border-radius: 6px;
    border: 1.5px solid #a5c4ca;
    font-size: 0.9rem;
  }
  .icono-lupa {
    position: absolute;
    right: 0.7rem;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
  }
`;
