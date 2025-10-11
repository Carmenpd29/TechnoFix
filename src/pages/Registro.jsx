import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase, Footer, TituloPage } from "../index";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { LoginWrapper, RegistroCaja, Input, Entrar, ErrorMsg, RegMsg, FondoDegradado, PasswordWrapper, EyeButton } from "../styles/RegistroStyles";

export function Register() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setMensaje("");
    if (!nombre.trim() || !email.trim() || !password.trim()) {
      setMensaje("Rellena todos los campos.");
      return;
    }
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      setMensaje("Error al registrar, email en uso o contraseña de menos de 6 caracteres.");
      return;
    }
    if (data?.user) {
      const { error: insertError } = await supabase
        .from("usuarios")
        .insert([{
          nombre,
          email,
          rol: null,
          uid: data.user.id,
        }]);
      if (insertError) {
        setMensaje("Error al guardar usuario: " + insertError.message);
      } else {
        setMensaje("¡Registro enviado! Espera a que el admin te valide.");
        setNombre("");
        setEmail("");
        setPassword("");
      }
    }
  };

  return (
    <LoginWrapper>
      <FondoDegradado>
        <RegistroCaja>
          <TituloPage>Registro de nuevo usuario</TituloPage>
          <form onSubmit={handleRegister} style={{ width: "100%" }}>
            <Input
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              required
              autoComplete="off"
            />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="off"
            />
            <PasswordWrapper>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña (6 caracteres mínimo)"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete="new-password"
                style={{ marginBottom: 0 }}
              />
              <EyeButton
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                tabIndex={-1}
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </EyeButton>
            </PasswordWrapper>
            <Entrar type="submit">Aceptar</Entrar>
            {mensaje && <RegMsg>{mensaje}</RegMsg>}
          </form>
          <br />
          <Entrar type="button" onClick={() => navigate("/login")}>
            Volver
          </Entrar>
        </RegistroCaja>
      </FondoDegradado>
      <Footer />
    </LoginWrapper>
  );
}



