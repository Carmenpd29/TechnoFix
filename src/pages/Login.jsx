import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase, Footer, TituloPage } from "../index";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { LoginWrapper, LoginCaja, Subtitulo, Input, PasswordWrapper, EyeButton, Entrar, ErrorMsg, BarraSeparadora, FondoDegradado, LogoImg } from "../styles/LoginStyles";

export function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Registro
  const [regNombre, setRegNombre] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regMensaje, setRegMensaje] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  // LOGIN
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    // Login con Supabase Auth
    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      if (
        authError.message?.toLowerCase().includes("email not confirmed") ||
        authError.message?.toLowerCase().includes("correo no confirmado")
      ) {
        setError("Debes confirmar tu correo antes de iniciar sesión. Revisa tu bandeja de entrada.");
      } else {
        setError("Usuario o contraseña incorrectos.");
      }
      return;
    }

    // Búsqueda del usuario en la tabla usuarios por uid
    const { data: usuarioDB, error: dbError } = await supabase
      .from("usuarios")
      .select("*")
      .eq("uid", data.user.id)
      .single();

    if (dbError || !usuarioDB) {
      setError("No tienes permiso para acceder.");
      return;
    }
    if (!usuarioDB.rol) {
      setError("Tu cuenta aún no ha sido validada por un administrador.");
      return;
    }
    onLogin(usuarioDB);
  };

  // REGISTRO
  const handleRegister = async (e) => {
    e.preventDefault();
    setRegMensaje("");
    if (!regNombre.trim() || !regEmail.trim() || !regPassword.trim()) {
      setRegMensaje("Rellena todos los campos.");
      return;
    }

    // 1. Registrar en Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email: regEmail,
      password: regPassword,
    });

    if (error) {
      setRegMensaje("Error al registrar, email en uso o contraseña de menos de 6 caracteres.");
      return;
    }

    // 2. Guardar en la tabla usuarios
    if (data?.user) {
      const { error: insertError } = await supabase
        .from("usuarios")
        .insert([{
          nombre: regNombre,
          email: regEmail,
          rol: null,
          uid: data.user.id,
        }]);
      if (insertError) {
        setRegMensaje("Error al guardar usuario: " + insertError.message);
      } else {
        setRegMensaje("¡Registro enviado! Espera a que el admin te valide.");
        setRegNombre("");
        setRegEmail("");
        setRegPassword("");
      }
    }
  };

  return (
    <LoginWrapper>
      <FondoDegradado>
        <LoginCaja>
          <div style={{ display: "flex", alignItems: "center", width: "100%", marginBottom: "2rem" }}>
            <LogoImg src="/TechnoFix/assets/Logo.png" alt="TechnoFix" />
            <TituloPage >Iniciar sesión</TituloPage>
          </div>
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <Input
              type="email"
              name="email" 
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="username"
            />
            <PasswordWrapper>
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Contraseña"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete="current-password"
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
            <Entrar type="submit">Entrar</Entrar>
            {error && <ErrorMsg>{error}</ErrorMsg>}
          </form>
          <BarraSeparadora />
          <Subtitulo>¿No tienes cuenta?</Subtitulo>
          <Entrar type="button" onClick={() => navigate("/register")}>
            Regístrate
          </Entrar>
        </LoginCaja>
      </FondoDegradado>
      <Footer />
    </LoginWrapper>
  );
}



