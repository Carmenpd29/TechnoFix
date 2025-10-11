import styled from "styled-components";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BotonVolver, supabase, TituloPage, WrapperPage } from "../../index";

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
  console.log("ID recibido en ModClienteFinal:", id);
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
      setError("Error al modificar el cliente.");
    } else {
      setMensaje("Cliente modificado correctamente.");
      setTimeout(() => navigate("/clientes/ver"), 1200);
    }
  };

  return (
    <WrapperPage>
      <BotonVolver to="/clientes" />
      <TituloPage>Editar Cliente</TituloPage>
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
          <Label>Apellidos</Label>
          <Input
            name="apellidos"
            value={form.apellidos}
            onChange={handleChange}
            placeholder="Apellidos del cliente (opcional)"
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
        <ObligatorioMsg>
        <span>*</span> Campos obligatorios
      </ObligatorioMsg>
        <Boton type="submit" disabled={loading}>
          {loading ? "Modificando..." : "Modificar"}
        </Boton>
      </Form>
      
      {mensaje && <Mensaje>{mensaje}</Mensaje>}
      {error && <ErrorMsg>{error}</ErrorMsg>}
    </WrapperPage>
  );
}


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
  font-size: 0.9rem;
  outline: none;
  transition: border 0.2s;
  &::placeholder {
    font-size: 0.9rem;
    color: #b0b8ba;
    opacity: 1;
  }
  &:focus {
    border-color: #607074;
  }
`;

const Boton = styled.button`
  width: 40%;
  margin: 1.2rem auto 0 auto; 
  display: block;             
  padding: 0.7rem 0;
  background: linear-gradient(90deg, #607074 0%, #a5c4ca 100%);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: linear-gradient(90deg, #a5c4ca 0%, #607074 100%);
  }
`;

const Mensaje = styled.div`
  margin-top: 0.9rem;
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

const ObligatorioMsg = styled.div`
  margin-top: 0.5rem;
  color: #607074;
  font-size: 0.9rem;
  text-align: left;
  span {
    color: #e74c3c;
    font-size: 1.1em;
    margin-right: 4px;
    font-weight: bold;
  }
`;