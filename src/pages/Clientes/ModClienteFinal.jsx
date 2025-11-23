import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BotonVolver, supabase, TituloPage, WrapperPage, IconBtn } from "../../index";
import { FiSave } from "react-icons/fi";
import { Form, Field, Label, Input, Mensaje, ErrorMsg, ObligatorioMsg } from "../../styles/ModClienteFinalStyles";

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
      <BotonVolver to="/clientes/ver" />
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
            autoComplete="given-name"
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
            autoComplete="tel"
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
            autoComplete="email"
          />
        </Field>
        <ObligatorioMsg>
        <span>*</span> Campos obligatorios
      </ObligatorioMsg>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
          <IconBtn type="submit" disabled={loading}>
            <FiSave size={16} />
            <span>{loading ? "Modificando..." : "Modificar"}</span>
          </IconBtn>
        </div>
      </Form>
      
      {mensaje && <Mensaje>{mensaje}</Mensaje>}
      {error && <ErrorMsg>{error}</ErrorMsg>}
    </WrapperPage>
  );
}