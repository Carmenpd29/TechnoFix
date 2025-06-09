import { ZonaReparaciones } from "./ZonaReparaciones";
import styled from "styled-components";

export function FormReparaciones({
  cliente,
  tecnicos,
  tecnico,
  setTecnico,
  precio,
  setPrecio,
  fecha,
  setFecha,
  fechaEntrega,
  setFechaEntrega,
  articulo,
  setArticulo,
  descripcion,
  setDescripcion,
  observaciones,
  setObservaciones,
  mensaje,
  onSubmit,
  loading,
  modoEdicion = false, // true para editar, false para alta
}) {
  return (
    <form
      onSubmit={onSubmit}
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <Datos>
        <input
          type="text"
          placeholder="Nombre"
          value={cliente.nombre || ""}
          readOnly
        />
        <input
          type="text"
          placeholder="Apellidos"
          value={cliente.apellidos || ""}
          readOnly
        />
        <input
          type="text"
          placeholder="Teléfono"
          value={cliente.telefono || ""}
          readOnly
        />
      </Datos>
      <ZonaReparaciones>
        <div className="fila-tecnico-precio">
          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <label
              style={{
                color: "#607074",
                fontSize: "0.9rem",
                marginBottom: "0.2rem",
              }}
            >
              Técnico:
            </label>
            <select
              className="tecnico"
              value={tecnico}
              onChange={(e) => setTecnico(e.target.value)}
              required
              disabled={loading}
            >
              <option value="">Selecciona técnico</option>
              {tecnicos.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.nombre}
                </option>
              ))}
            </select>
          </div>
          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <label
              style={{
                color: "#607074",
                fontSize: "0.9rem",
                marginBottom: "0.2rem",
              }}
            >
              Precio:
            </label>
            <input
              type="number"
              placeholder="Precio (€)"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              min="0"
              step="0.01"
              required
              className="precio"
              disabled={loading}
            />
          </div>
        </div>
        <Fechas>
          <div>
            <label>Fecha:</label>
            <input
              className="datos"
              required
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              disabled={loading}
            />
          </div>
          <div>
            <label>Fecha entrega:</label>
            <input
              className="datos"
              type="date"
              value={fechaEntrega}
              onChange={(e) => setFechaEntrega(e.target.value)}
              disabled={loading}
            />
          </div>
        </Fechas>
        <Datos>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.2rem",
            }}
          >
            <label
              style={{
                color: "#607074",
                fontSize: "0.9rem",
                marginBottom: "0.2rem",
              }}
            >
              Artículo:
            </label>
            <input
              className="datos"
              type="text"
              placeholder="Artículo"
              value={articulo}
              onChange={(e) => setArticulo(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.2rem",
            }}
          >
            <label
              style={{
                color: "#607074",
                fontSize: "0.9rem",
                marginBottom: "0.2rem",
              }}
            >
              Descripción:
            </label>
            <input
              className="datos"
              type="text"
              placeholder="Descripción"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.2rem",
            }}
          >
            <label
              style={{
                color: "#607074",
                fontSize: "0.9rem",
                marginBottom: "0.2rem",
              }}
            >
              Observaciones:
            </label>
            <textarea
              placeholder="Observaciones"
              value={observaciones}
              onChange={(e) => setObservaciones(e.target.value)}
              rows={3}
              disabled={loading}
            />
          </div>
          {mensaje && (
            <div
              style={{
                color: mensaje.tipo === "ok" ? "green" : "red",
                marginTop: "0.4rem",
                fontWeight: 500,
                fontSize: "0.98rem",
              }}
            >
              {typeof mensaje === "object" ? mensaje.texto : mensaje}
            </div>
          )}
        </Datos>
      </ZonaReparaciones>
      <GuardarButton type="submit" disabled={loading}>
        {modoEdicion ? "Guardar cambios" : "Guardar"}
      </GuardarButton>
    </form>
  );
}

const Fechas = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
  width: 100%;
  max-width: 340px;
  margin: 0 auto;
  flex-wrap: nowrap;

  div {
    display: flex;
    flex-direction: column;
    flex: 1 1 100px;
    min-width: 120px;
    max-width: 160px;
    label {
      font-size: 0.9rem;
      color: #607074;
      margin-bottom: 0.2rem;
    }
    input[type="date"] {
      padding: 0.6rem;
      border-radius: 6px;
      border: 1.5px solid #a5c4ca;
      font-size: 0.9rem;
      width: 100%;
      min-width: 0;
      max-width: 100%;
      height: 43px;
      box-sizing: border-box;
      background: #fff;
      color: #232728;
    }
  }

  @media (max-width: 1120px) {
    input[type="date"] {
      font-size: 0.8rem;
    }
    input[type="date"]::placeholder {
      font-size: 0.8rem;
    }
  }
`;

const Datos = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  width: 100%;
  max-width: 340px;
  margin: 0 auto;
  input,
  textarea {
    padding: 0.6rem;
    border-radius: 6px;
    border: 1.5px solid #a5c4ca;
    font-size: 1rem;
    background: #fff;
    color: #232728;
    resize: vertical;
  }
  input[readonly] {
    background: #e9ecef;
    color: #607074;
    cursor: not-allowed;
  }
  textarea {
    min-height: 60px;
    max-height: 180px;
  }

  @media (max-width: 1120px) {
    input::placeholder,
    textarea::placeholder {
      font-size: 0.8rem;
    }
  }
`;

const GuardarButton = styled.button`
  margin-top: 1.2rem;
  padding: 0.85rem;
  background: linear-gradient(90deg, #607074 60%, #404a4c 100%);
  color: #caf0f8;
  border: none;
  font-size: 0.9rem;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 2px 8px #404a4c33;
  letter-spacing: 0.5px;
  border-radius: 8px;
  transition: background 0.2s, box-shadow 0.2s;
  &:hover {
    background: linear-gradient(90deg, #404a4c 60%, #232728 100%);
    box-shadow: 0 4px 16px #404a4c55;
  }
  &:disabled {
    background: #b3c6d1;
    cursor: not-allowed;
    color: #fff;
    border: none;
    box-shadow: none;
  }

  @media (max-width: 1120px) {
    font-size: 0.8rem;
  }
`;
