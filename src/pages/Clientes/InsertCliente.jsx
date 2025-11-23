import React from "react";
import { BotonVolver, TituloPage, WrapperPage, IconBtn } from "../../index";
import { FiSave } from "react-icons/fi";
import { useFormularioCliente } from "../../hooks/useFormularioCliente";
import { Form, Field, Label, Input, Error, Nota, Mensaje } from "../../styles/InsertClienteStyles";

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
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Field>
          <Label>
            Nombre <span>*</span>
          </Label>
          <Input
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            $error={!!errores.nombre}
            placeholder="Nombre del cliente"
            disabled={loading}
            autoComplete="given-name"
          />
          {errores.nombre && <Error>El nombre es obligatorio</Error>}
        </Field>
        <Field>
          <Label>Apellidos</Label>
          <Input
            name="apellidos"
            value={form.apellidos}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Apellidos del cliente"
            disabled={loading}
          />
        </Field>
        <Field>
          <Label>
            Teléfono <span>*</span>
          </Label>
          <Input
            name="telefono"
            value={form.telefono}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            $error={!!errores.telefono}
            placeholder="Teléfono de contacto"
            disabled={loading}
            autoComplete="tel"
          />
          {errores.telefono && <Error>Introduce un teléfono válido de 9 dígitos</Error>}
        </Field>
        <Field>
          <Label>NIF</Label>
          <Input
            name="nif"
            value={form.nif}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="NIF (opcional)"
            disabled={loading}
            $error={!!errores.nif}
          />
          {errores.nif && <Error>{errores.nif}</Error>}
        </Field>
        <Field>
          <Label>Dirección</Label>
          <Input
            name="direccion"
            value={form.direccion}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Dirección (opcional)"
            disabled={loading}
          />
        </Field>
        <Field>
          <Label>Correo</Label>
          <Input
            name="correo"
            value={form.correo}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Correo electrónico (opcional)"
            type="email"
            disabled={loading}
            autoComplete="email"
            $error={!!errores.email}
          />
          {errores.email && <Error>{errores.email}</Error>}
        </Field>

        <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
          <IconBtn type="submit" disabled={loading}>
            <FiSave size={16} />
            <span>{loading ? "Guardando..." : "Guardar cliente"}</span>
          </IconBtn>
        </div>
      </Form>
      {mensaje && <Mensaje>{mensaje}</Mensaje>}
      <Nota>
        <span>()</span> Datos opcionales para clientes que requieran factura.
      </Nota>
    </WrapperPage>
  );
}


