import { FiSearch } from "react-icons/fi";
import { ZonaClienteStyled, Buscador } from "../../styles/ZonaClienteStyles";


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
