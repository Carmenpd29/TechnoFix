import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { supabase, Footer, TituloPage } from "../index";
import { FiEye, FiEyeOff } from "react-icons/fi";

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

    // Busca el usuario en tu tabla por uid
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
        <Caja>
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
        </Caja>
      </FondoDegradado>
      <Footer />
    </LoginWrapper>
  );
}

const LoginWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Caja = styled.div`
  font-family: 'Poppins';
  background: rgba(255,255,255,0.92);
  width: 90%;
  max-width: 350px;
  padding: 1.7rem 2.7rem 2.2rem 2.7rem;
  border-radius: 18px;
  box-shadow: 0 8px 32px rgba(64,74,76,0.22), 0 1.5px 8px rgba(0,0,0,0.10);
  border: 1.5px solid #a5c4ca;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: box-shadow 0.2s, border 0.2s;
  @media (max-width: 480px) {
    padding: 1.2rem 0.7rem 1.5rem 0.7rem;
    max-width: 80vw;
  }
`;

const Subtitulo = styled.h3`
  color: #232728;
  margin: 1.2rem 0 1rem 0;
  font-size: 1.1rem;
  font-weight: 600;
  text-align: center;
`;

const Input = styled.input`
  font-family: 'Poppins';
  width: 100%;
  box-sizing: border-box;
  padding: 0.85rem;
  margin-bottom: 1.2rem;
  border-radius: 8px;
  border: 1.5px solid #82999e;
  font-size: 0.9rem;
  background: #f8fafc;
  color: #232728;
  transition: border 0.2s;
  &:focus {
    border: 1.5px solid #607074;
    outline: none;
    background: #fff;
  }
`;

const PasswordWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 1.2rem;
`;

const EyeButton = styled.button`
  position: absolute;
  right: 1rem;
  top: 55%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #607074;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0;
`;

const Entrar = styled.button`
  font-family: 'Poppins';
  width: 100%;
  box-sizing: border-box;
  padding: 0.85rem;
  background: linear-gradient(90deg, #607074 60%, #404a4c 100%);
  color: #caf0f8;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 2px 8px #404a4c33;
  letter-spacing: 0.5px;
  transition: background 0.2s, box-shadow 0.2s;
  &:hover {
    background: linear-gradient(90deg, #404a4c 60%, #232728 100%);
    box-shadow: 0 4px 16px #404a4c55;
  }
`;

const ErrorMsg = styled.div`
  color: #d32f2f;
  margin-top: 0.7rem;
  text-align: center;
  font-weight: 600;
  letter-spacing: 0.2px;
`;

const BarraSeparadora = styled.hr`
  width: 100%;
  border: none;
  border-top: 1.5px solid #a5c4ca;
  margin: 2rem 0 1.2rem 0;
`;

const FondoDegradado = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogoImg = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 12px;
  box-shadow: 0 2px 8px #a5c4ca33;
  background: #fff;
  object-fit: contain;
  margin-left: 1rem;
  @media (max-width: 480px) {
    width: 80px;
    height: 80px;
  }

`;

