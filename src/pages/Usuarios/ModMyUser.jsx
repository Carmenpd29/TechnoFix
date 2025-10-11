import { useState, useEffect } from "react";
import styled from "styled-components";
import { supabase, BotonVolver, TituloPage } from "../../index";

export function ModMyUser() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ passwordActual: "", passwordNueva: "" });
  const [mensaje, setMensaje] = useState("");
  const [mensajeTipo, setMensajeTipo] = useState(""); // "error" o "success"
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (authUser) {
        const { data: usuarioDB } = await supabase
          .from("usuarios")
          .select("nombre, email")
          .eq("uid", authUser.id)
          .single();
        setUser({ ...usuarioDB, email: authUser.email });
      }
    })();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    setMensajeTipo("");
    setLoading(true);

    // 1. Reautenticación: comprobar contraseña actual
    const { error: loginError } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: form.passwordActual,
    });
    if (loginError) {
      setMensaje("La contraseña actual no es correcta.");
      setMensajeTipo("error");
      setLoading(false);
      return;
    }

    // 2. Cambiar la contraseña
    const { error } = await supabase.auth.updateUser({
      password: form.passwordNueva,
    });
    setLoading(false);
    if (error) {
      setMensaje("Error al cambiar la contraseña.");
      setMensajeTipo("error");
    } else {
      setMensaje("Contraseña cambiada correctamente.");
      setMensajeTipo("success");
      setForm({ passwordActual: "", passwordNueva: "" });
    }
  };

  if (!user) {
    return (
      <Wrapper>
        <TituloPage>Mi cuenta</TituloPage>
        <Mensaje>Cargando...</Mensaje>
      </Wrapper>
    );
  }

  return (
    <Wrapper style={{ position: "relative" }}>
      <BotonVolver to="/home" />
      <TituloPage>Mi cuenta</TituloPage>
      <FormContainer>
        <Form onSubmit={handleSubmit}>
          <Field>
            <Label>Nombre</Label>
            <Input value={user.nombre} disabled readOnly autoComplete="name" />
          </Field>
          <Field>
            <Label>Email</Label>
            <Input value={user.email} disabled readOnly autoComplete="username" />
          </Field>
          <Field>
            <Label>Contraseña actual</Label>
            <Input
              name="passwordActual"
              type="password"
              value={form.passwordActual}
              onChange={handleChange}
              required
              autoComplete="current-password"
              placeholder="Introduce tu contraseña actual"
              disabled={loading}
            />
          </Field>
          <Field>
            <Label>Nueva contraseña</Label>
            <Input
              name="passwordNueva"
              type="password"
              value={form.passwordNueva}
              onChange={handleChange}
              required
              autoComplete="new-password"
              placeholder="Introduce la nueva contraseña"
              disabled={loading}
            />
          </Field>
          <Boton type="submit" disabled={loading}>
            {loading ? "Guardando..." : "Guardar cambios"}
          </Boton>
          {mensaje && (
            <Mensaje $tipo={mensajeTipo}>{mensaje}</Mensaje>
          )}
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
`;

const Mensaje = styled.p`
  margin-top: 1.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: ${({ $tipo }) => ($tipo === "success" ? "#2e7d32" : "#d9534f")};
  text-align: center;
`;
