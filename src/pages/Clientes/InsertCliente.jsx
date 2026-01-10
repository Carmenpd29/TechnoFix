import { useState } from "react";
import { BotonVolver, TituloPage, WrapperPage } from "../../index";
import { useFormularioCliente } from "../../hooks/useFormularioCliente";
import { FormularioBootstrap } from "../../components/general/FormularioBootstrap";
import { Nota } from "../../styles/InsertClienteStyles";
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalMessage,
  ModalButton
} from "../../styles/CajaStyles";

/**
 * InsertCliente
 * Formulario para crear un nuevo cliente.
 * Utiliza un hook personalizado para la lógica y validaciones.
 */
export function InsertCliente() {
  // Hook de formulario
  const {
    form,
    loading,
    handleChange,
    insertarCliente
  } = useFormularioCliente();

  // Estados para los modales
  const [mostrarModalExito, setMostrarModalExito] = useState(false);
  const [mostrarModalError, setMostrarModalError] = useState(false);
  const [mensajeModal, setMensajeModal] = useState("");

  /**
   * Maneja el envío del formulario
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const resultado = await insertarCliente();

    if (resultado && resultado.success) {
      setMensajeModal("Cliente guardado correctamente");
      setMostrarModalExito(true);
    } else {
      if (resultado?.errores) {
        const msgs = Object.values(resultado.errores)
          .filter(Boolean)
          .join("\n");
        setMensajeModal(msgs || "Errores en el formulario");
      } else {
        setMensajeModal(resultado?.error || "Error al guardar el cliente");
      }
      setMostrarModalError(true);
    }
  };

  return (
    <WrapperPage style={{ position: "relative" }}>
      <BotonVolver to="/clientes" />
      <TituloPage>Insertar Cliente</TituloPage>

      {/* Formulario principal */}
      <FormularioBootstrap
        fields={[
          { name: "nombre", label: "Nombre", required: true, placeholder: "Nombre del cliente" },
          { name: "apellidos", label: "Apellidos", placeholder: "Apellidos del cliente" },
          { name: "telefono", label: "Teléfono", required: true, placeholder: "Teléfono de contacto" },
          { name: "nif", label: "NIF", placeholder: "NIF (opcional)" },
          { name: "direccion", label: "Dirección", placeholder: "Dirección (opcional)" },
          { name: "correo", label: "Correo", type: "email", placeholder: "Correo electrónico (opcional)" }
        ]}
        values={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
        loading={loading}
        mensaje={null}
        buttonText={loading ? "Guardando..." : "Guardar"}
      />

      {/* Modal de éxito */}
      {mostrarModalExito && (
        <ModalOverlay onClick={() => setMostrarModalExito(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader className="success">✅</ModalHeader>
            <ModalMessage>{mensajeModal}</ModalMessage>
            <ModalButton onClick={() => setMostrarModalExito(false)}>
              Aceptar
            </ModalButton>
          </ModalContent>
        </ModalOverlay>
      )}

      {/* Modal de error */}
      {mostrarModalError && (
        <ModalOverlay onClick={() => setMostrarModalError(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader className="error">❌</ModalHeader>
            <ModalMessage style={{ whiteSpace: "pre-wrap" }}>
              {mensajeModal}
            </ModalMessage>
            <ModalButton error onClick={() => setMostrarModalError(false)}>
              Cerrar
            </ModalButton>
          </ModalContent>
        </ModalOverlay>
      )}

      {/* Nota informativa */}
      <Nota>
        <span>()</span> Datos opcionales para clientes que requieran factura.
      </Nota>
    </WrapperPage>
  );
}
