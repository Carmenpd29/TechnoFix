import { useState } from "react";
import styled from "styled-components";
import { Footer } from "../components/Footer";
import { supabase } from "../index";

export function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Registro
  const [regNombre, setRegNombre] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regMensaje, setRegMensaje] = useState("");

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
            <Titulo style={{ margin: 0, marginLeft: "1rem" }}>Iniciar sesión</Titulo>
          </div>
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="username"
            />
            <Input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
            <Entrar type="submit">Entrar</Entrar>
            {error && <ErrorMsg>{error}</ErrorMsg>}
          </form>
          <BarraSeparadora />
          <Subtitulo>¿No tienes cuenta? Regístrate</Subtitulo>
          <form onSubmit={handleRegister} style={{ width: "100%" }}>
            <Input
              type="text"
              placeholder="Nombre"
              value={regNombre}
              onChange={e => setRegNombre(e.target.value)}
              required
              autoComplete="off"
            />
            <Input
              type="email"
              placeholder="Email"
              value={regEmail}
              onChange={e => setRegEmail(e.target.value)}
              required
              autoComplete="off"
            />
            <Input
              type="password"
              placeholder="Contraseña (6 caracteres mínimo)"
              value={regPassword}
              onChange={e => setRegPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
            <Entrar type="submit">Aceptar</Entrar>
            {regMensaje && <RegMsg>{regMensaje}</RegMsg>}
          </form>
        </Caja>
      </FondoDegradado>
      <Footer />
    </LoginWrapper>
  );
}

// --- ESTILOS ---
const LoginWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Caja = styled.div`
  font-family: 'Poppins';
  background: rgba(255,255,255,0.92);
  width: 100%;
  max-width: 370px;
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
    max-width: 98vw;
  }
`;

const Titulo = styled.h2`
  color: #232728;
  margin-bottom: 2rem;
  font-size: 1.8rem;
  font-weight: 700;
  letter-spacing: 1px;
  font-family: 'Poppins';
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
  font-size: 1.07rem;
  background: #f8fafc;
  color: #232728;
  transition: border 0.2s;
  &:focus {
    border: 1.5px solid #607074;
    outline: none;
    background: #fff;
  }
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
  font-size: 1.07rem;
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

const RegMsg = styled.div`
  color:rgb(47, 129, 44);
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
  width: 60px;
  height: 60px;
  border-radius: 12px;
  box-shadow: 0 2px 8px #a5c4ca33;
  background: #fff;
  object-fit: contain;
`;

