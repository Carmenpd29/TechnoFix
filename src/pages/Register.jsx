import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { supabase, Footer, TituloPage } from "../index";
import { FiEye, FiEyeOff } from "react-icons/fi";

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
        <Caja>
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

const FondoDegradado = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
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

