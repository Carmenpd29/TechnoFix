import React from "react";
import { BotonVolver, TituloPage, WrapperPage, IconBtn } from "../../index";
import { FiSave } from "react-icons/fi";
import { useFormularioCliente } from "../../hooks/useFormularioCliente";
import { Form, Field, Label, Input, Error, Nota, Mensaje } from "../../styles/InsertClienteStyles";
import { FormularioBootstrap } from "../../components/general/FormularioBootstrap";

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
    await insertarCliente();
  };

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
        mensaje={mensaje ? { tipo: "ok", texto: mensaje } : errores.nombre ? { tipo: "error", texto: errores.nombre } : errores.telefono ? { tipo: "error", texto: errores.telefono } : errores.email ? { tipo: "error", texto: errores.email } : null}
        buttonText={loading ? "Guardando..." : "Guardar"}
      />
      <Nota>
        <span>()</span> Datos opcionales para clientes que requieran factura.
      </Nota>
    </WrapperPage>
  );
}


