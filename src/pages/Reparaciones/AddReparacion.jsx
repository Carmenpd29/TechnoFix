import styled from "styled-components";
import { BotonVolver, supabase, TituloPage, WrapperPage, ZonaCliente } from "../../index";
import { FormReparacionesBootstrap } from "../../components/reparaciones/FormReparacionesBootstrap.jsx";
import { useEffect, useState } from "react";
import { ModalOverlay, ModalContent, ModalHeader, ModalMessage, ModalButton } from "../../styles/CajaStyles";

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
  const [mostrarModalExito, setMostrarModalExito] = useState(false);
  const [mostrarModalError, setMostrarModalError] = useState(false);
  const [mensajeModal, setMensajeModal] = useState('');

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
      // No limpiar el cliente seleccionado si ya hay uno
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
            return;
          }
          setClientes(data);
          // Solo actualizar cliente si no hay uno seleccionado o si el id es diferente
          if (!cliente.id || cliente.id !== data[0].id) {
            setCliente(data[0]);
          }
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
            return;
          }
          setClientes(data);
          // Solo actualizar cliente si no hay uno seleccionado o si la búsqueda es exactamente igual al nombre completo
          if (!cliente.id && data.length === 1) {
            setCliente(data[0]);
          }
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
      setMensajeModal('Rellena todos los campos obligatorios');
      setMostrarModalError(true);
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
      setMensajeModal('El cliente seleccionado no existe.');
      setMostrarModalError(true);
      return;
    }
    if (!tecnicoExiste) {
      setMensajeModal('El técnico seleccionado no existe.');
      setMostrarModalError(true);
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
      setMensajeModal(`Error al guardar la reparación: ${error.message}`);
      setMostrarModalError(true);
    } else {
      setMensajeModal('Reparación guardada correctamente');
      setMostrarModalExito(true);
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
      <FormReparacionesBootstrap
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
        mensaje={null}
        onSubmit={handleSubmit}
        loading={loadingClientes}
        modoEdicion={false}
      />
      {/* Modal Éxito */}
      {mostrarModalExito && (
        <ModalOverlay onClick={() => setMostrarModalExito(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader className="success">✅</ModalHeader>
            <ModalMessage>{mensajeModal}</ModalMessage>
            <ModalButton onClick={() => setMostrarModalExito(false)}>Aceptar</ModalButton>
          </ModalContent>
        </ModalOverlay>
      )}
      {/* Modal Error */}
      {mostrarModalError && (
        <ModalOverlay onClick={() => setMostrarModalError(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader className="error">❌</ModalHeader>
            <ModalMessage>{mensajeModal}</ModalMessage>
            <ModalButton error onClick={() => setMostrarModalError(false)}>Cerrar</ModalButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </WrapperPage>
  );
}

