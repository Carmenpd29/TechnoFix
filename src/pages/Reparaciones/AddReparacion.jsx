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
    nif: "",
    direccion: "",
    correo: "",
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

  // Búsqueda automática de clientes por nombre, apellidos o nif
  useEffect(() => {
    if (!debouncedBusqueda) {
      setClientes([]);
      setCliente({
        id: "",
        nombre: "",
        apellidos: "",
        telefono: "",
        nif: "",
        direccion: "",
        correo: "",
      });
      return;
    }
    setLoadingClientes(true);

    // Si la búsqueda es numérica, busca por id exacto
    if (/^\d+$/.test(debouncedBusqueda)) {
      supabase
        .from("clientes")
        .select("*")
        .eq("id", debouncedBusqueda)
        .then(({ data, error }) => {
          setLoadingClientes(false);
          if (error || !data || data.length === 0) {
            setClientes([]);
            setCliente({
              id: "",
              nombre: "",
              apellidos: "",
              telefono: "",
              nif: "",
              direccion: "",
              correo: "",
            });
            return;
          }
          setClientes(data);
          setCliente(data[0]);
        });
    } else {
      // Busca por nombre, apellidos o nif
      supabase
        .from("clientes")
        .select("*")
        .or(
          `nombre.ilike.%${debouncedBusqueda}%,apellidos.ilike.%${debouncedBusqueda}%,nif.ilike.%${debouncedBusqueda}%`
        )
        .order("nombre", { ascending: true })
        .then(({ data, error }) => {
          setLoadingClientes(false);
          if (error || !data || data.length === 0) {
            setClientes([]);
            setCliente({
              id: "",
              nombre: "",
              apellidos: "",
              telefono: "",
              nif: "",
              direccion: "",
              correo: "",
            });
            return;
          }
          setClientes(data);
          if (data.length === 1) setCliente(data[0]);
        });
    }
  }, [debouncedBusqueda]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación de campos obligatorios y FK
    if (
      !cliente.id ||
      !tecnico ||
      !fecha ||
      !articulo.trim() ||
      !descripcion.trim() ||
      precio === "" ||
      isNaN(Number(precio))
    ) {
      setMensaje({
        texto: "Rellena todos los campos obligatorios",
        tipo: "error",
      });
      return;
    }

    const { data: clienteExiste } = await supabase
      .from("clientes")
      .select("id")
      .eq("id", cliente.id)
      .single();

    const { data: tecnicoExiste } = await supabase
      .from("usuarios")
      .select("id")
      .eq("id", tecnico)
      .single();

    if (!clienteExiste) {
      setMensaje({ texto: "El cliente seleccionado no existe.", tipo: "error" });
      return;
    }
    if (!tecnicoExiste) {
      setMensaje({ texto: "El técnico seleccionado no existe.", tipo: "error" });
      return;
    }

    const datos = {
      idcliente: Number(cliente.id),
      idtecnico: Number(tecnico),
      fecha,
      fechaentrega: fechaEntrega || null,
      articulo: articulo.trim(),
      descripcion: descripcion.trim(),
      observaciones: observaciones || "",
      precio: parseFloat(precio),
    };

    const { error } = await supabase.from("reparaciones").insert([datos]);
    if (error) {
      setMensaje({ texto: `Error al guardar la reparación: ${error.message}`, tipo: "error" });
    } else {
      setMensaje({ texto: "Reparación guardada correctamente", tipo: "ok" });
      setCliente({
        id: "",
        nombre: "",
        apellidos: "",
        telefono: "",
        nif: "",
        direccion: "",
        correo: "",
      });
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

