import React, { useState } from "react";
import { BotonVolver, TituloPage, WrapperPage, IconBtn } from "../../index";
import { FiSave } from "react-icons/fi";
import { useFormularioCliente } from "../../hooks/useFormularioCliente";
import { Form, Field, Label, Input, Error, Nota, Mensaje } from "../../styles/InsertClienteStyles";
import { FormularioBootstrap } from "../../components/general/FormularioBootstrap";
import { ModalOverlay, ModalContent, ModalHeader, ModalMessage, ModalButton } from "../../styles/CajaStyles";

export function InsertCliente() {
  const {
    form,
    touched,
    loading,
    mensaje,
    errores,
    handleChange,
    handleBlur,
    insertarCliente
  } = useFormularioCliente();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultado = await insertarCliente();
    if (resultado && resultado.success) {
      setMensajeModal('Cliente guardado correctamente');
      setMostrarModalExito(true);
    } else {
      if (resultado && resultado.errores) {
        const msgs = Object.values(resultado.errores).filter(Boolean).join('\n');
        setMensajeModal(msgs || 'Errores en el formulario');
      } else if (resultado && resultado.error) {
        setMensajeModal(resultado.error);
      } else {
        setMensajeModal('Error al guardar el cliente');
      }
      setMostrarModalError(true);
    }
  };

  const [mostrarModalExito, setMostrarModalExito] = useState(false);
  const [mostrarModalError, setMostrarModalError] = useState(false);
  const [mensajeModal, setMensajeModal] = useState('');

  return (
    <WrapperPage style={{ position: "relative" }}>
      <BotonVolver to="/clientes" />
      <TituloPage>Insertar Cliente</TituloPage>
      <FormularioBootstrap
        fields={[
          { name: "nombre", label: "Nombre", required: true, placeholder: "Nombre del cliente" },
          { name: "apellidos", label: "Apellidos", placeholder: "Apellidos del cliente" },
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
        buttonText={loading ? "Guardando..." : "Guardar"}
      />
      {/* Modal de Éxito */}
      {mostrarModalExito && (
        <ModalOverlay onClick={() => setMostrarModalExito(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader className="success">✅</ModalHeader>
            <ModalMessage>{mensajeModal}</ModalMessage>
            <ModalButton onClick={() => setMostrarModalExito(false)}>Aceptar</ModalButton>
          </ModalContent>
        </ModalOverlay>
      )}

      {/* Modal de Error */}
      {mostrarModalError && (
        <ModalOverlay onClick={() => setMostrarModalError(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader className="error">❌</ModalHeader>
            <ModalMessage style={{ whiteSpace: 'pre-wrap' }}>{mensajeModal}</ModalMessage>
            <ModalButton error onClick={() => setMostrarModalError(false)}>Cerrar</ModalButton>
          </ModalContent>
        </ModalOverlay>
      )}
      <Nota>
        <span>()</span> Datos opcionales para clientes que requieran factura.
      </Nota>
    </WrapperPage>
  );
}
