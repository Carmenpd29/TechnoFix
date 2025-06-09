import { useState } from "react";
import styled from "styled-components";
import { supabase, BotonVolver, TituloPage } from "../../index";

export function NewUser() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    rol: "",
    password: "",
  });
  const [mensaje, setMensaje] = useState("");
  const [mensajeTipo, setMensajeTipo] = useState(""); // "error" o "success"
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    setMensajeTipo("");
    setLoading(true);

    if (
      !form.nombre.trim() ||
      !form.email.trim() ||
      !form.rol ||
      !form.password
    ) {
      setMensaje("Todos los campos son obligatorios.");
      setMensajeTipo("error");
      setLoading(false);
      return;
    }

    // Comprobar si ya existe un usuario con ese email o nombre
    const { data: existe } = await supabase
      .from("usuarios")
      .select("id")
      .or(`nombre.eq.${form.nombre},email.eq.${form.email}`)
      .maybeSingle();

    if (existe) {
      setMensaje("Ese usuario o email ya existe. Elige otros.");
      setMensajeTipo("error");
      setLoading(false);
      return;
    }

    // 1. Crear usuario en Supabase Auth
    const { data, error: authError } = await supabase.auth.admin.createUser({
      email: form.email,
      password: form.password,
      email_confirm: true,
    });

    if (authError) {
      setMensaje("Error al crear el usuario en Auth: " + authError.message);
      setMensajeTipo("error");
      setLoading(false);
      return;
    }

    // 2. Insertar en la tabla usuarios
    const { error } = await supabase.from("usuarios").insert([
      {
        nombre: form.nombre,
        email: form.email,
        rol: form.rol,
        uid: data.user.id,
      },
    ]);
    setLoading(false);

    if (error) {
      setMensaje("Error al guardar en la base de datos.");
      setMensajeTipo("error");
    } else {
      setMensaje("Usuario creado correctamente.");
      setMensajeTipo("success");
      setForm({ nombre: "", email: "", rol: "", password: "" });
    }
  };

  return (
    <Wrapper style={{ position: "relative" }}>
      <BotonVolver to="/usuarios" />
      <TituloPage>Nuevo Usuario</TituloPage>
      <FormContainer>
        <Form onSubmit={handleSubmit}>
          <Field>
            <Label>Nombre</Label>
            <Input
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              required
              placeholder="Nombre del usuario"
              disabled={loading}
            />
          </Field>
          <Field>
            <Label>Email</Label>
            <Input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="Email del usuario"
              disabled={loading}
              autoComplete="email"
            />
          </Field>
          <Field>
            <Label>Rol</Label>
            <Select
              name="rol"
              value={form.rol}
              onChange={handleChange}
              required
              disabled={loading}
            >
              <option value="">Selecciona un rol</option>
              <option value="admin">Administrador</option>
              <option value="encargado">Encargado/a</option>
              <option value="empleado">Empleado/a</option>
            </Select>
          </Field>
          <Field>
            <Label>Contraseña</Label>
            <Input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="Contraseña"
              disabled={loading}
              autoComplete="new-password"
            />
          </Field>
          <Boton type="submit" disabled={loading}>
            {loading ? "Guardando..." : "Crear usuario"}
          </Boton>
          {mensaje && <Mensaje $tipo={mensajeTipo}>{mensaje}</Mensaje>}
        </Form>
      </FormContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 95%;
  max-width: 900px;
  margin: 2.5rem auto;
  padding: 2rem 1.5rem;
  background: #f8fafb;
  border-radius: 22px;
  box-shadow: 0 2px 18px #404a4c22;
  min-height: 70vh;
  border: 2px solid #a5c4ca;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  position: relative;
`;

const FormContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Form = styled.form`
  width: 100%;
  max-width: 400px;
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
  margin-bottom: 0.4rem;
  @media (max-width: 1120px) {
    font-size: 0.8rem;
  }
`;

const Input = styled.input`
  padding: 0.8rem;
  font-size: 1rem;
  border: 2px solid #a5c4ca;
  border-radius: 10px;
  width: 100%;
  box-sizing: border-box;
  box-shadow: inset 0 2px 8px #404a4c10;
  &:disabled {
    background: #e9ecef;
    cursor: not-allowed;
  }
  @media (max-width: 1120px) {
    font-size: 0.8rem;
  }
`;

const Select = styled.select`
  padding: 0.8rem;
  font-size: 1rem;
  border: 2px solid #a5c4ca;
  border-radius: 10px;
  width: 100%;
  background: white;
  box-sizing: border-box;
  box-shadow: inset 0 2px 8px #404a4c10;
  &:disabled {
    background: #e9ecef;
  }
`;

const Boton = styled.button`
  padding: 0.8rem;
  font-size: 1rem;
  color: white;
  background: linear-gradient(90deg, #607074 0%, #a5c4ca 100%);
  border: none;
  border-radius: 10px;
  width: 100%;
  box-sizing: border-box;
  cursor: pointer;
  transition: background 0.3s;
  &:disabled {
    background: #007bff70;
    cursor: not-allowed;
  }
  @media (max-width: 1120px) {
    font-size: 0.8rem;
    width: 40%;
    text-align: center;
    margin: 0 auto; 
  }
`;

const Mensaje = styled.p`
  margin-top: 1.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: ${({ $tipo }) => ($tipo === "success" ? "#2e7d32" : "#d9534f")};
  text-align: center;
  @media (max-width: 1120px) {
    font-size: 0.8rem;
  }
`;
