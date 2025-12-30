import { useState, useEffect } from "react";
import {
  Wrapper,
  FormContainer,
  Form,
  Field,
  Label,
  Input,
  PasswordWrapper,
  EyeButton,
  ButtonContainer,
  Mensaje,
} from "../../styles/ModMyUserStyles";
import { supabase, BotonVolver, TituloPage, IconBtn } from "../../index";
import { useUserStore } from "../../store/userStore";
import { FiSave, FiEye, FiEyeOff } from "react-icons/fi";

export function ModMyUser() {
  const { user: storeUser, login } = useUserStore();
  const [user, setUser] = useState(null);
  const [nombre, setNombre] = useState("");
  const [form, setForm] = useState({ passwordActual: "", passwordNueva: "" });
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [mensajeTipo, setMensajeTipo] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  useEffect(() => {
    async function load() {
      const { data: authGet } = await supabase.auth.getUser();
      const authUser = authGet?.user || null;
      if (!authUser) return;

      const { data: perfil, error } = await supabase
        .from("usuarios")
        .select("*")
        .eq("uid", authUser.id)
        .maybeSingle();

      if (error) {
        console.error("Error cargando perfil:", error);
      }

      if (perfil) {
        setUser(perfil);
        setNombre(perfil.nombre || "");
      } else {
        const { data: byEmail, error: err2 } = await supabase
          .from("usuarios")
          .select("*")
          .eq("email", authUser.email)
          .maybeSingle();
        if (!err2 && byEmail) {
          setUser(byEmail);
          setNombre(byEmail.nombre || "");
        }
      }
    }
    load();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    setMensajeTipo("");
    setLoading(true);

    if (!nombre || !nombre.trim()) {
      setMensaje("El nombre es obligatorio.");
      setMensajeTipo("error");
      setLoading(false);
      return;
    }

    try {
      const { data: authGet } = await supabase.auth.getUser();
      const authUser = authGet?.user || null;

      if (authUser) {
        const { data: updatedUser, error: updErr } = await supabase
          .from("usuarios")
          .update({ nombre: nombre.trim() })
          .eq("uid", authUser.id)
          .select()
          .maybeSingle();

        if (updErr) {
          console.error("Error actualizando nombre:", updErr);
          setMensaje(updErr.message || "Error al actualizar el nombre.");
          setMensajeTipo("error");
        } else if (updatedUser) {
          setUser(updatedUser);
          if (storeUser && storeUser.uid === updatedUser.uid) {
            login(updatedUser);
          }
          setMensaje("Nombre actualizado.");
          setMensajeTipo("success");
        } else {
          setMensaje("No se han aplicado cambios al nombre: comprueba las políticas RLS.");
          setMensajeTipo("error");
        }
      }

      if (form.passwordNueva) {
        const { error } = await supabase.auth.updateUser({ password: form.passwordNueva });
        if (error) {
          setMensaje(error.message || "Error al cambiar la contraseña.");
          setMensajeTipo("error");
        } else {
          setMensaje((m) => (m ? m + " Contraseña cambiada." : "Contraseña cambiada correctamente."));
          setMensajeTipo("success");
          setForm({ passwordActual: "", passwordNueva: "" });
        }
      }
    } catch (err) {
      console.error(err);
      setMensaje("Error al guardar los cambios.");
      setMensajeTipo("error");
    } finally {
      setLoading(false);
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
            <Input value={nombre} onChange={(e) => setNombre(e.target.value)} autoComplete="name" />
          </Field>
          <Field>
            <Label>Email</Label>
            <Input value={user.email} disabled readOnly autoComplete="username" />
          </Field>

          <Field>
            <Label>Contraseña actual</Label>
            <PasswordWrapper>
              <Input
                name="passwordActual"
                type={showCurrentPassword ? "text" : "password"}
                value={form.passwordActual}
                onChange={handleChange}
                autoComplete="current-password"
                placeholder="Introduce tu contraseña actual (necesaria sólo si cambias la contraseña)"
                disabled={loading}
              />
              <EyeButton type="button" onClick={() => setShowCurrentPassword(!showCurrentPassword)} disabled={loading}>
                {showCurrentPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </EyeButton>
            </PasswordWrapper>
          </Field>

          <Field>
            <Label>Nueva contraseña</Label>
            <PasswordWrapper>
              <Input
                name="passwordNueva"
                type={showNewPassword ? "text" : "password"}
                value={form.passwordNueva}
                onChange={handleChange}
                autoComplete="new-password"
                placeholder="Introduce la nueva contraseña (opcional)"
                disabled={loading}
              />
              <EyeButton type="button" onClick={() => setShowNewPassword(!showNewPassword)} disabled={loading}>
                {showNewPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </EyeButton>
            </PasswordWrapper>
          </Field>

          <ButtonContainer>
            <IconBtn type="submit" disabled={loading}>
              <FiSave size={16} />
              <span>{loading ? "Guardando..." : "Guardar"}</span>
            </IconBtn>
          </ButtonContainer>
          {mensaje && <Mensaje $tipo={mensajeTipo}>{mensaje}</Mensaje>}
        </Form>
      </FormContainer>
    </Wrapper>
  );
}

// Styles moved to src/styles/ModMyUserStyles.jsx
