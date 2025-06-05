import styled from "styled-components";
import { BotonVolver, supabase } from "../index";
import { useEffect, useState } from "react";

export function Reparaciones() {
  const [busqueda, setBusqueda] = useState("");
  const [cliente, setCliente] = useState({
    nombre: "",
    apellidos: "",
    telefono: "",
  });
  const [fecha, setFecha] = useState(() =>
    new Date().toISOString().slice(0, 10)
  );
  const [fechaEntrega, setFechaEntrega] = useState("");
  const [tecnico, setTecnico] = useState("");
  const [articulo, setArticulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [precio, setPrecio] = useState("");
  const [clientes, setClientes] = useState([]);
  const [loadingClientes, setLoadingClientes] = useState(false);
  const [tecnicos, setTecnicos] = useState([]);

  useEffect(() => {
    // Carga los técnicos desde la tabla usuarios
    supabase
      .from("usuarios")
      .select("id, nombre")
      .order("nombre", { ascending: true })
      .then(({ data }) => setTecnicos(data || []));
  }, []);

  const handleBuscar = async () => {
    setLoadingClientes(true);
    const { data, error } = await supabase
      .from("clientes")
      .select("*")
      .or(`dni.ilike.%${busqueda}%,nombre.ilike.%${busqueda}%`)
      .order("nombre", { ascending: true });
    setLoadingClientes(false);

    if (error) {
      setClientes([]);
      setCliente({ nombre: "", apellidos: "", telefono: "" });
      return;
    }
    if (data && data.length > 0) {
      setClientes(data);
      setCliente(data[0]);
    } else {
      setClientes([]);
      setCliente({ nombre: "", apellidos: "", telefono: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cliente.id || !tecnico || !articulo || !descripcion || !precio) {
      alert("Rellena todos los campos obligatorios");
      return;
    }
    const { error } = await supabase.from("reparaciones").insert([
      {
        idcliente: cliente.id,
        idusuario: tecnico,
        fecha,
        fechaentrega: fechaEntrega || null,
        articulo,
        descripcion,
        observaciones,
        precio: parseFloat(precio),
      },
    ]);
    if (error) {
      alert("Error al guardar la reparación");
    } else {
      alert("Reparación guardada correctamente");
      setCliente({ nombre: "", apellidos: "", telefono: "" });
      setBusqueda("");
      setClientes([]);
      setFecha(new Date().toISOString().slice(0, 10));
      setFechaEntrega("");
      setTecnico("");
      setArticulo("");
      setDescripcion("");
      setObservaciones("");
      setPrecio("");
    }
  };

  return (
    <CajaWrapper>
      <BotonVolver to="/tpv" />
      <h2>Reparaciones</h2>
      <FormReparacion onSubmit={handleSubmit}>
        <ZonaCliente>
          <Buscador>
            <input
              type="text"
              placeholder="Buscar cliente por DNI o nombre"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              style={{ marginRight: 8 }}
            />
            <button
              type="button"
              onClick={handleBuscar}
              disabled={loadingClientes}
            >
              {loadingClientes ? "Buscando..." : "Buscar"}
            </button>
          </Buscador>

          {/* Si hay más de un cliente, muestra el select */}
          {clientes.length > 1 && (
            <div style={{ margin: "0.5rem 0" }}>
              <label style={{ color: "#607074", fontSize: "0.95rem" }}>
                Selecciona cliente:
              </label>
              <select
                value={cliente.id || ""}
                onChange={(e) => {
                  const seleccionado = clientes.find(
                    (c) => String(c.id) === e.target.value
                  );
                  setCliente(
                    seleccionado || { nombre: "", apellidos: "", telefono: "" }
                  );
                }}
                style={{
                  marginLeft: 8,
                  padding: "0.5rem",
                  borderRadius: 6,
                  border: "1.5px solid #a5c4ca",
                  fontSize: "1rem",
                }}
              >
                <option value="">-- Selecciona --</option>
                {clientes.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nombre} {c.apellidos} ({c.dni})
                  </option>
                ))}
              </select>
            </div>
          )}

          <CamposCliente>
            <div className="nombre-apellidos">
              <input
                type="text"
                placeholder="Nombre"
                value={cliente.nombre}
                readOnly
              />
              <input
                type="text"
                placeholder="Apellidos"
                value={cliente.apellidos}
                readOnly
              />
            </div>
            <input
              type="text"
              className="telefono"
              placeholder="Teléfono"
              value={cliente.telefono}
              readOnly
            />
          </CamposCliente>
        </ZonaCliente>
        <BarraSeparadora />
        <ZonaReparacion>
          <div className="fila-tecnico-precio">
            <select
              className="tecnico"
              value={tecnico}
              onChange={(e) => setTecnico(e.target.value)}
              required
            >
              <option value="">Selecciona técnico</option>
              {tecnicos.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.nombre}
                </option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Precio (€)"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              min="0"
              step="0.01"
              required
              className="precio"
            />
          </div>
          <Fechas>
            <div>
              <label>Fecha:</label>
              <input
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
              />
            </div>
            <div>
              <label>Fecha entrega:</label>
              <input
                type="date"
                value={fechaEntrega}
                onChange={(e) => setFechaEntrega(e.target.value)}
              />
            </div>
          </Fechas>
          <Datos>
            <input
              type="text"
              placeholder="Artículo"
              value={articulo}
              onChange={(e) => setArticulo(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Descripción"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
            />
            <textarea
              placeholder="Observaciones"
              value={observaciones}
              onChange={(e) => setObservaciones(e.target.value)}
              rows={3}
            />
          </Datos>
        </ZonaReparacion>
        <GuardarButton type="submit">Guardar</GuardarButton>
      </FormReparacion>
    </CajaWrapper>
  );
}

// --- ESTILOS ---

const CajaWrapper = styled.div`
  width: 100%;
  max-width: 540px;
  margin: 1.5rem auto;
  padding: 2.5rem 1.5rem 2rem 1.5rem;
  background: #f8fafc;
  border-radius: 22px;
  box-shadow: 0 2px 18px #404a4c22;
  min-height: 70vh;
  border: 2px solid #a5c4ca;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  position: relative;

  @media (max-width: 700px) {
    padding-top: 4.5rem;
    max-width: 98vw;
    margin: 1.2rem auto;
  }
`;

const FormReparacion = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const ZonaCliente = styled.div`
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
  input {
    flex: 1;
    padding: 0.6rem;
    border-radius: 6px;
    border: 1.5px solid #a5c4ca;
    font-size: 0.9rem;
    margin-right: 0.5rem;
  }
  button {
    padding: 0.6rem 1.1rem;
    border-radius: 6px;
    border: none;
    background: #607074;
    color: #caf0f8;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.18s;
    &:hover {
      background: #404a4c;
    }
  }
`;

const CamposCliente = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  width: 100%;
  

  .nombre-apellidos {
    display: flex;
    gap: 1.2rem;
    width: 100%;
    max-width: 340px;
  }

  .nombre-apellidos input {
    flex: 1 1 0;
    padding: 0.6rem;
    border-radius: 6px;
    border: 1.5px solid #a5c4ca;
    font-size: 0.9rem;
    background: #e9ecef;
    color: #232728;
    min-width: 0;
    font-family: inherit;
    height: 20px;
  }

  .telefono {
    width: 100%;
    max-width: 320px;
    padding: 0.6rem;
    border-radius: 6px;
    border: 1.5px solid #a5c4ca;
    font-size: 0.9rem;
    background: #e9ecef;
    color: #232728;
    margin-top: 0.3rem;
    align-self: center;
    font-family: inherit;
    height: 20px;
  }

  @media (max-width: 700px) {
    .nombre-apellidos {
      flex-direction: column;
      gap: 0.5rem;
      max-width: 340px;
    }
    .nombre-apellidos input {
      width: 94%;
    }
    .telefono {
      width: 100%;
    }
  }
`;

const ZonaReparacion = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;

  .tecnico {
    flex: 1;
    padding: 0.6rem;
    border-radius: 6px;
    border: 1.5px solid #a5c4ca;
    font-size: 0.9rem;
    margin-right: 0.5rem;
  }

  .fila-tecnico-precio {
    display: flex;
    gap: 1.2rem;
    align-items: flex-end;
    width: 100%;
    max-width: 340px;
    margin: 0 auto;
  }

  select {
    flex: 1 1 180px;
    min-width: 120px;
    max-width: 220px;
  }

  .precio {
    flex: 0 1 110px;
    max-width: 110px;
    min-width: 80px;
    border-radius: 6px;
    border: 1.5px solid #a5c4ca;
    font-size: 0.9rem;
    background: #fff;
    color: #232728;
    height: 35px;
  }

  @media (max-width: 700px) {
    .fila-tecnico-precio {
      flex-direction: row;
      gap: 1rem;
      width: 100%;
      max-width: 340px;
    }
    select {
      min-width: 0;
      max-width: 100%;
    }
    .precio {
      margin-left: 0;
      width: 100px;
      max-width: 110px;
      height: 38px;
    }
  }
`;

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
      font-size: 0.90rem;
      color: #607074;
      margin-bottom: 0.2rem;
    }
    input[type="date"] {
      padding: 0.5rem;
      border-radius: 6px;
      border: 1.5px solid #a5c4ca;
      font-size: 0.9rem;
      width: 89%;
      min-width: 0;
      max-width: 100%;
    }
  }

  @media (max-width: 700px) {
    gap: 0.7rem;
    max-width: 340px;
    div {
      width: 100%;
      min-width: 0;
      max-width: 100%;
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
    font-size: 0.9rem;
    background: #fff;
    color: #232728;
    resize: vertical;
  }
  textarea {
    min-height: 60px;
    max-height: 180px;
  }
`;

const BarraSeparadora = styled.hr`
  border: none;
  border-top: 2px solid #a5c4ca44;
  margin: 1.2rem 0;
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
`;
