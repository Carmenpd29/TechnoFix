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
  const [tipoMensaje, setTipoMensaje] = useState(""); // 'error' | 'success'
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setMensaje("");
    if (!nombre.trim() || !email.trim() || !password.trim()) {
      setMensaje("Rellena todos los campos.");
      setTipoMensaje('error');
      return;
    }
    if (password.length < 6) {
      setMensaje("La contraseña debe tener al menos 6 caracteres.");
      setTipoMensaje('error');
      return;
    }
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      console.error('supabase.signUp error:', error);
      // Mostrar mensaje concreto para depuración
      setMensaje(error.message || "Error al registrar. Comprueba la consola.");
      setTipoMensaje('error');
      return;
    }
    if (data?.user) {
      // No intentamos insertar desde el cliente para evitar RLS.
      // La creación del registro en `usuarios` debe gestionarse server-side (trigger o endpoint con service role).
      setMensaje("Registro enviado. El admin validará tu cuenta.");
      setTipoMensaje('success');
      setNombre("");
      setEmail("");
      setPassword("");
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
            {mensaje && (tipoMensaje === 'error' ? <ErrorMsg>{mensaje}</ErrorMsg> : <RegMsg>{mensaje}</RegMsg>)}
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



