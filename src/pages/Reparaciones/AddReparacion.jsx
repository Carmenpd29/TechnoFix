import styled from "styled-components";
import { BotonVolver, supabase, TituloPage, WrapperPage } from "../../index";
import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";

// Hook para debounce
function useDebounce(value, delay = 400) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debounced;
}

export function AddReparacion() {
  const [busqueda, setBusqueda] = useState("");
  const [cliente, setCliente] = useState({
    id: "",
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
  const [mensaje, setMensaje] = useState({ texto: "", tipo: "" }); // tipo: "ok" o "error"

  // Debounce para la búsqueda
  const debouncedBusqueda = useDebounce(busqueda);

  // Carga los técnicos desde la tabla usuarios
  useEffect(() => {
    supabase
      .from("usuarios")
      .select("id, nombre")
      .order("nombre", { ascending: true })
      .then(({ data }) => setTecnicos(data || []));
  }, []);

  // Búsqueda automática de clientes por nombre, apellidos o dni
  useEffect(() => {
    if (!debouncedBusqueda) {
      setClientes([]);
      setCliente({ id: "", nombre: "", apellidos: "", telefono: "" });
      return;
    }
    setLoadingClientes(true);

    // Si la búsqueda es numérica, busca por id exacto
    if (/^\d+$/.test(debouncedBusqueda)) {
      supabase
        .from("clientes")
        .select("*")
        .eq("id", debouncedBusqueda)
        .order("nombre", { ascending: true })
        .then(({ data, error }) => {
          setLoadingClientes(false);
          if (error || !data) {
            setClientes([]);
            setCliente({ id: "", nombre: "", apellidos: "", telefono: "" });
            return;
          }
          setClientes(data);
          if (data.length === 1) setCliente(data[0]);
        });
    } else {
      // Solo busca por nombre
      supabase
        .from("clientes")
        .select("*")
        .ilike("nombre", `%${debouncedBusqueda}%`)
        .order("nombre", { ascending: true })
        .then(({ data, error }) => {
          setLoadingClientes(false);
          if (error || !data) {
            setClientes([]);
            setCliente({ id: "", nombre: "", apellidos: "", telefono: "" });
            return;
          }
          setClientes(data);
          if (data.length === 1) setCliente(data[0]);
        });
    }
  }, [debouncedBusqueda]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !cliente.id ||
      !tecnico ||
      !articulo ||
      !descripcion ||
      precio === "" ||
      isNaN(parseFloat(precio))
    ) {
      setMensaje({ texto: "Rellena todos los campos obligatorios", tipo: "error" });
      return;
    }

    const datos = {
      idcliente: Number(cliente.id),
      idusuario: Number(tecnico),
      fecha,
      fechaentrega: fechaEntrega || null,
      articulo,
      descripcion,
      observaciones: observaciones || "",
      precio: parseFloat(precio),
    };
    // Puedes dejar este log para depuración
    // console.log("Insertando reparación:", datos);

    const { error } = await supabase.from("reparaciones").insert([datos]);
    if (error) {
      setMensaje({ texto: "Error al guardar la reparación", tipo: "error" });
    } else {
      setMensaje({ texto: "Reparación guardada correctamente", tipo: "ok" });
      setCliente({ id: "", nombre: "", apellidos: "", telefono: "" });
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
    <WrapperPage>
      <BotonVolver to="/home" />
      <TituloPage>Reparaciones</TituloPage>
      <FormReparacion onSubmit={handleSubmit}>
        <ZonaCliente>
          <Buscador>
            <input
              type="text"
              placeholder="Buscar cliente por DNI o nombre"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
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
                margin: "0.5rem auto"
              }}
            >
              <label
                style={{
                  color: "#607074",
                  fontSize: "0.95rem",
                  marginBottom: "0.4rem",
                  alignSelf: "flex-start"
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
                    seleccionado || { id: "", nombre: "", apellidos: "", telefono: "" }
                  );
                }}
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  borderRadius: 6,
                  border: "1.5px solid #a5c4ca",
                  fontSize: "1rem",
                }}
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
              <input className="datos" required
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
              />
            </div>
            <div>
              <label>Fecha entrega:</label>
              <input className="datos" 
                type="date"
                value={fechaEntrega}
                onChange={(e) => setFechaEntrega(e.target.value)}
              />
            </div>
          </Fechas>
          <Datos>
            <input
              className="datos"
              type="text"
              placeholder="Artículo"
              value={articulo}
              onChange={(e) => setArticulo(e.target.value)}
              required
            />
            <input
              className="datos"
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
            {mensaje.texto && (
              <div style={{
                color: mensaje.tipo === "ok" ? "green" : "red",
                marginTop: "0.4rem",
                fontWeight: 500,
                fontSize: "0.98rem"
              }}>
                {mensaje.texto}
              </div>
            )}
          </Datos>
        </ZonaReparacion>
        <GuardarButton type="submit">Guardar</GuardarButton>
      </FormReparacion>
    </WrapperPage>
  );
}

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
  font-family: inherit;
  flex-direction: column;
  gap: 1rem;
  width: 100%;

  .tecnico {
    font-family: inherit;
    flex: 1;
    padding: 0.6rem;
    border-radius: 6px;
    border: 1.5px solid #a5c4ca;
    font-size: 0.9rem;
    margin-right: 0.5rem;
  }

  .fila-tecnico-precio {
    font-family: inherit;
    display: flex;
    gap: 1.2rem;
    align-items: flex-end;
    width: 100%;
    max-width: 340px;
    margin: 0 auto;
  }

  select {
    font-family: inherit;
    flex: 1 1 180px;
    min-width: 120px;
    max-width: 220px;
    height: 40px;
  }

  .datos{
    font-family: inherit;
  }

  .precio {
    font-family: inherit;
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

  textarea {
    font-family: inherit;
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
      font-size: 0.9rem;
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
