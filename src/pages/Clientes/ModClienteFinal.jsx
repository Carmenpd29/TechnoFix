import styled from "styled-components";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BotonVolver, supabase } from "../../index";

const initialState = {
  nombre: "",
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
        telefono: form.telefono,
        nif: form.nif || null,
        direccion: form.direccion || null,
        correo: form.correo || null,
      })
      .eq("id", id);
    setLoading(false);
    if (error) {
      setError("Error al modificar el cliente.");
    } else {
      setMensaje("Cliente modificado correctamente.");
      setTimeout(() => navigate("/clientes/ver"), 1200);
    }
  };

  return (
    <Wrapper>
      <BotonVolver to="/clientes" />
      <Titulo>Editar Cliente</Titulo>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Field>
          <Label>Nombre <span>*</span></Label>
          <Input
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            required
            placeholder="Nombre del cliente"
            disabled={loading}
          />
        </Field>
        <Field>
          <Label>Teléfono <span>*</span></Label>
          <Input
            name="telefono"
            value={form.telefono}
            onChange={handleChange}
            required
            placeholder="Teléfono de contacto"
            disabled={loading}
          />
        </Field>
        <Field>
          <Label>NIF</Label>
          <Input
            name="nif"
            value={form.nif}
            onChange={handleChange}
            placeholder="NIF (opcional)"
            disabled={loading}
          />
        </Field>
        <Field>
          <Label>Dirección</Label>
          <Input
            name="direccion"
            value={form.direccion}
            onChange={handleChange}
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
            placeholder="Correo electrónico (opcional)"
            type="email"
            disabled={loading}
          />
        </Field>
        <Boton type="submit" disabled={loading}>
          {loading ? "Modificando..." : "Modificar"}
        </Boton>
      </Form>
      {mensaje && <Mensaje>{mensaje}</Mensaje>}
      {error && <ErrorMsg>{error}</ErrorMsg>}
    </Wrapper>
  );
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
  border: 1.5px solid #a5c4ca;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  transition: border 0.2s;
  &:focus {
    border-color: #607074;
  }
`;

const Boton = styled.button`
  margin-top: 1.2rem;
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

const Mensaje = styled.div`
  margin-top: 1rem;
  color: #2e7d32;
  font-weight: 600;
  text-align: center;
`;

const ErrorMsg = styled.div`
  color: #e74c3c;
  margin-top: 1rem;
  font-weight: 600;
  text-align: center;
`;