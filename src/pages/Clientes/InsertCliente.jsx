import { useState } from "react";
import { BotonVolver, supabase, TituloPage, WrapperPage } from "../../index";
import { Form, Field, Label, Input, Error, Boton, Nota, Mensaje } from "../../styles/InsertClienteStyles";

const initialState = {
  nombre: "",
  apellidos: "",
  telefono: "",
  nif: "",
  direccion: "",
  correo: "",
};

export function InsertCliente() {
  const [form, setForm] = useState(initialState);
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBlur = (e) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    setMensaje("");

    // Validaciones antes de guardar
    if (
      !form.nombre.trim() ||
      !form.telefono.trim() ||
      !validarTelefono(form.telefono) ||
      !validarNIF(form.nif) ||
      !validarEmail(form.correo)
    ) {
      return; // No guardar si hay errores
    }

    setLoading(true);
    const { error } = await supabase.from("clientes").insert([
      {
        nombre: form.nombre,
        apellidos: form.apellidos,
        telefono: form.telefono,
        nif: form.nif || null,
        direccion: form.direccion || null,
        correo: form.correo || null,
      },
    ]);
    setLoading(false);

    if (error) {
      setMensaje("Error al insertar el cliente.");
    } else {
      setMensaje("Cliente insertado correctamente.");
      setForm(initialState);
      setTouched({});
      setSubmitted(false);
    }
  };

  const errorNombre = submitted && !form.nombre.trim();
  const errorTelefono = submitted && (!form.telefono.trim() || !validarTelefono(form.telefono));
  const errorNIF = submitted && !validarNIF(form.nif);
  const errorEmail = submitted && !validarEmail(form.correo);

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
            $error={errorNombre}
            placeholder="Nombre del cliente"
            disabled={loading}
            autoComplete="given-name"
          />
          {errorNombre && <Error>El nombre es obligatorio</Error>}
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
            $error={errorTelefono}
            placeholder="Teléfono de contacto"
            disabled={loading}
            autoComplete="tel"
          />
          {errorTelefono && <Error>Introduce un teléfono válido de 9 dígitos</Error>}
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
            $error={errorNIF}
          />
          {errorNIF && <Error>NIF inválido</Error>}
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
            $error={errorEmail}
          />
          {errorEmail && <Error>Correo electrónico inválido</Error>}
        </Field>

        <Boton type="submit" disabled={loading}>
          {loading ? "Guardando..." : "Guardar cliente"}
        </Boton>
      </Form>
      {mensaje && <Mensaje>{mensaje}</Mensaje>}
      <Nota>
        <span>()</span> Datos opcionales para clientes que requieran factura.
      </Nota>
    </WrapperPage>
  );
}

function validarNIF(nif) {
  if (!nif) return true; // Opcional
  const nifRegEx = /^[0-9]{8}[A-Za-z]$/;
  return nifRegEx.test(nif);
}

function validarEmail(email) {
  if (!email) return true; // Opcional
  const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegEx.test(email);
}

function validarTelefono(telefono) {
  const telRegEx = /^[0-9]{9}$/;
  return telRegEx.test(telefono);
}
