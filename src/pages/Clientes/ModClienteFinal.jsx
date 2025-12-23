import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BotonVolver, supabase, TituloPage, WrapperPage, IconBtn } from "../../index";
import { ModalOverlay, ModalContent, ModalHeader, ModalMessage, ModalButton } from "../../styles/CajaStyles";
import { FiSave } from "react-icons/fi";
import { Form, Field, Label, Input, Mensaje, ErrorMsg, ObligatorioMsg } from "../../styles/ModClienteFinalStyles";
import { FormularioBootstrap } from "../../components/general/FormularioBootstrap";

const initialState = {
  nombre: "",
  apellidos: "",
  telefono: "",
  nif: "",
  direccion: "",
  correo: "",
};

export function ModClienteFinal() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [mostrarModalExito, setMostrarModalExito] = useState(false);
  const [mostrarModalError, setMostrarModalError] = useState(false);
  const [mensajeModal, setMensajeModal] = useState("");

  // Cargar datos del cliente
  useEffect(() => {
    async function fetchCliente() {
      setMensaje("");
      setError("");
      setLoading(true);
      let clienteData = location.state?.cliente;
      if (!clienteData) {
        const { data, error } = await supabase
          .from("clientes")
          .select("*")
          .eq("id", id)
          .single();
        if (error || !data) {
          setError("No se pudo cargar el cliente.");
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    setError("");
    if (!form.nombre.trim() || !form.telefono.trim()) {
      setError("Nombre y teléfono son obligatorios.");
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
      setMensajeModal('Error al modificar el cliente.');
      setMostrarModalError(true);
    } else {
      setMensajeModal('Cliente modificado correctamente.');
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
          { name: "nombre", label: "Nombre", required: true, placeholder: "Nombre del cliente" },
          { name: "apellidos", label: "Apellidos", placeholder: "Apellidos del cliente (opcional)" },
          { name: "telefono", label: "Teléfono", required: true, placeholder: "Teléfono de contacto" },
          { name: "nif", label: "NIF", placeholder: "NIF (opcional)" },
          { name: "direccion", label: "Dirección", placeholder: "Dirección (opcional)" },
          { name: "correo", label: "Correo", type: "email", placeholder: "Correo electrónico (opcional)" },
        ]}
        values={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
        loading={loading}
        mensaje={null}
        buttonText={loading ? "Modificando..." : "Modificar"}
      >
        <div className="text-muted mb-2" style={{ fontSize: '0.9rem' }}><span>*</span> Campos obligatorios</div>
      </FormularioBootstrap>
        {mostrarModalExito && (
          <ModalOverlay onClick={() => setMostrarModalExito(false)}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <ModalHeader className="success">✅</ModalHeader>
              <ModalMessage>{mensajeModal}</ModalMessage>
              <ModalButton onClick={() => setMostrarModalExito(false)}>Aceptar</ModalButton>
            </ModalContent>
          </ModalOverlay>
        )}
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