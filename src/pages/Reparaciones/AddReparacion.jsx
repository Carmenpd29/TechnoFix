import styled from "styled-components";
import { BotonVolver, supabase, TituloPage, WrapperPage, FormReparaciones, ZonaCliente } from "../../index";
import { useEffect, useState } from "react";

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
  const [mensaje, setMensaje] = useState({ texto: "", tipo: "" }); 

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

    const datos = {
      idcliente: Number(cliente.id),
      idtecnico: Number(tecnico),
      fecha,
      fechaentrega: fechaEntrega || null,
      articulo: articulo.trim(),
      descripcion: descripcion.trim(),
      observaciones: observaciones || "",
      precio: precio === "" ? null : parseFloat(precio),
    };

    if (
      !datos.idcliente ||
      !datos.idtecnico ||
      !datos.fecha ||
      !datos.articulo ||
      !datos.descripcion ||
      datos.precio === null ||
      isNaN(datos.precio)
    ) {
      setMensaje({
        texto: "Rellena todos los campos obligatorios",
        tipo: "error",
      });
      return;
    }

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
      <BotonVolver to="/reparaciones" />
      <TituloPage>Reparaciones</TituloPage>
      <ZonaCliente
        busqueda={busqueda}
        setBusqueda={setBusqueda}
        clientes={clientes}
        cliente={cliente}
        setCliente={setCliente}
        loadingClientes={loadingClientes}
      />
      <FormReparaciones
        cliente={cliente}
        tecnicos={tecnicos}
        tecnico={tecnico}
        setTecnico={setTecnico}
        precio={precio}
        setPrecio={setPrecio}
        fecha={fecha}
        setFecha={setFecha}
        fechaEntrega={fechaEntrega}
        setFechaEntrega={setFechaEntrega}
        articulo={articulo}
        setArticulo={setArticulo}
        descripcion={descripcion}
        setDescripcion={setDescripcion}
        observaciones={observaciones}
        setObservaciones={setObservaciones}
        mensaje={mensaje}
        onSubmit={handleSubmit}
        loading={loadingClientes}
        modoEdicion={false}
      />
    </WrapperPage>
  );
}

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
