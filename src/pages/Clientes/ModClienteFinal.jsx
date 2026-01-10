import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BotonVolver, supabase, TituloPage, WrapperPage } from "../../index";
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalMessage,
  ModalButton
} from "../../styles/CajaStyles";
import { FormularioBootstrap } from "../../components/general/FormularioBootstrap";

/**
 * Estado inicial del formulario
 */
const initialState = {
  nombre: "",
  apellidos: "",
  telefono: "",
  nif: "",
  direccion: "",
  correo: "",
};

/**
 * ModClienteFinal
 * Formulario para editar un cliente existente
 */
export function ModClienteFinal() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);

  // Estados para modales
  const [mostrarModalExito, setMostrarModalExito] = useState(false);
  const [mostrarModalError, setMostrarModalError] = useState(false);
  const [mensajeModal, setMensajeModal] = useState("");

  /**
   * Carga los datos del cliente (desde state o Supabase)
   */
  useEffect(() => {
    async function fetchCliente() {
      setLoading(true);

      let clienteData = location.state?.cliente;

      if (!clienteData) {
        const { data, error } = await supabase
          .from("clientes")
          .select("*")
          .eq("id", id)
          .single();

        if (error || !data) {
          setMensajeModal("No se pudo cargar el cliente.");
          setMostrarModalError(true);
          setLoading(false);
          return;
        }

        clienteData = data;
      }

      setForm({
        nombre: clienteData.nombre || "",
        apellidos: clienteData.apellidos || "",
        telefono: clienteData.telefono || "",
        nif: clienteData.nif || "",
        direccion: clienteData.direccion || "",
        correo: clienteData.correo || "",
      });

      setLoading(false);
    }

    fetchCliente();
  }, [id, location.state]);

  /**
   * Actualiza los valores del formulario
   */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /**
   * Guarda los cambios del cliente
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.nombre.trim() || !form.telefono.trim()) {
      setMensajeModal("Nombre y teléfono son obligatorios.");
      setMostrarModalError(true);
      return;
    }

    setLoading(true);

    const { error } = await supabase
      .from("clientes")
      .update({
        nombre: form.nombre,
        apellidos: form.apellidos,
        telefono: form.telefono,
        nif: form.nif || null,
        direccion: form.direccion || null,
        correo: form.correo || null,
      })
      .eq("id", id);

    setLoading(false);

    if (error) {
      setMensajeModal("Error al modificar el cliente.");
      setMostrarModalError(true);
    } else {
      setMensajeModal("Cliente modificado correctamente.");
      setMostrarModalExito(true);
      setTimeout(() => navigate("/clientes/ver"), 1200);
    }
  };

  return (
    <WrapperPage>
      <BotonVolver to="/clientes/ver" />
      <TituloPage>Editar Cliente</TituloPage>

      <FormularioBootstrap
        fields={[
          { name: "nombre", label: "Nombre", required: true },
          { name: "apellidos", label: "Apellidos" },
          { name: "telefono", label: "Teléfono", required: true },
          { name: "nif", label: "NIF" },
          { name: "direccion", label: "Dirección" },
          { name: "correo", label: "Correo", type: "email" },
        ]}
        values={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
        loading={loading}
        mensaje={null}
        buttonText={loading ? "Modificando..." : "Modificar"}
      />

      {/* Modal éxito */}
      {mostrarModalExito && (
        <ModalOverlay onClick={() => setMostrarModalExito(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader className="success">✅</ModalHeader>
            <ModalMessage>{mensajeModal}</ModalMessage>
            <ModalButton onClick={() => setMostrarModalExito(false)}>Aceptar</ModalButton>
          </ModalContent>
        </ModalOverlay>
      )}

      {/* Modal error */}
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
