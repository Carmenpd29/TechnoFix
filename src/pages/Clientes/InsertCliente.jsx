import styled from "styled-components";
import { useState } from "react";
import { BotonVolver, supabase } from "../../index";

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
    if (!form.nombre.trim() || !form.telefono.trim()) return;

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
  const errorTelefono = submitted && !form.telefono.trim();
  const errorNIF = submitted && !validarNIF(form.nif);
  const errorEmail = submitted && !validarEmail(form.correo);

  return (
    <Wrapper style={{ position: "relative" }}>
      <BotonVolver to="/clientes" />
      <Titulo>Insertar Cliente</Titulo>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Field>
          <Label>Nombre <span>*</span></Label>
          <Input
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            $error={errorNombre}
            placeholder="Nombre del cliente"
            disabled={loading}
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
          <Label>Teléfono <span>*</span></Label>
          <Input
            name="telefono"
            value={form.telefono}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            $error={errorTelefono}
            placeholder="Teléfono de contacto"
            disabled={loading}
          />
          {errorTelefono && <Error>El teléfono es obligatorio</Error>}
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
    </Wrapper>
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

const Wrapper = styled.div`
  width: 90%;
  margin: 2.5rem auto;
  padding: 1.5rem 1rem 1.5rem 1rem;
  background: #f8fafb;
  border-radius: 22px;
  box-shadow: 0 2px 18px #404a4c22;
  min-height: 70vh;
  border: 2px solid #a5c4ca;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  position: relative;
  padding-top: 2.5rem;

  @media (max-width: 700px) {
    padding-top: 4.5rem;
  }
`;
const Titulo = styled.h2`
  font-size: 1.7rem;
  margin-bottom: 1.5rem;
  color: #232728;
  text-align: center;
`;

const Form = styled.form`
  width: 100%;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: 600;
  margin-bottom: 0.3rem;
  color: #003459;
  span {
    color: #e74c3c;
    font-size: 1.1em;
    margin-left: 2px;
  }
`;

const Input = styled.input`
  padding: 0.6rem 0.8rem;
  border: 1.5px solid ${({ $error }) => ($error ? "#e74c3c" : "#a5c4ca")};
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  transition: border 0.2s;
  &:focus {
    border-color: #607074;
  }
`;

const Error = styled.span`
  color: #e74c3c;
  font-size: 0.95rem;
  margin-top: 0.2rem;
`;

const Boton = styled.button`
  width: 50%;  
  text-align: center;
  margin-top: 1.2rem;
  margin-left: auto;
  margin-right: auto;
  padding: 0.7rem 0;
  background: linear-gradient(90deg, #607074 0%, #a5c4ca 100%);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: linear-gradient(90deg, #a5c4ca 0%, #607074 100%);
  }
`;

const Nota = styled.div`
  margin-top: 1.5rem;
  color: #607074;
  font-size: 0.98rem;
  text-align: center;
  span {
    color: #e74c3c;
    font-weight: bold;
  }
`;

const Mensaje = styled.div`
  margin-top: 1rem;
  color: #2e7d32;
  font-weight: 600;
  text-align: center;
`;

