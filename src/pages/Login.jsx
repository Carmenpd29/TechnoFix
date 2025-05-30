import { useState } from "react";
import styled from "styled-components";
import { FiUser, FiSettings } from "react-icons/fi";
import { Footer } from "../components/Footer";

export function Login({ onLogin }) {
  const [rol, setRol] = useState("administrador");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRol = (nuevoRol) => {
    setRol(nuevoRol);
    setPassword("");
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      (rol === "administrador" && password === "admin1234") ||
      (rol === "empleado1" && password === "user1234") ||
      (rol === "empleado2" && password === "user1234")
    ) {
      onLogin({ rol }); 
      setError("");
    } else {
      setError("Contraseña incorrecta");
    }
  };

  return (
    <LoginWrapper>
      <FondoDegradado>
        <Caja>
          <Titulo>Iniciar sesión</Titulo>
          <Botonera>
            <RolButton
              type="button"
              active={rol === "administrador"}
              onClick={() => handleRol("administrador")}
            >
              <IconWrapper>
                <FiSettings size={38} />
              </IconWrapper>
              Admin
            </RolButton>
            <RolButton
              type="button"
              active={rol === "empleado1"}
              onClick={() => handleRol("empleado1")}
            >
              <IconWrapper>
                <FiUser size={38} />
              </IconWrapper>
              Empleado 1
            </RolButton>
            <RolButton
              type="button"
              active={rol === "empleado2"}
              onClick={() => handleRol("empleado2")}
            >
              <IconWrapper>
                <FiUser size={38} />
              </IconWrapper>
              Empleado 2
            </RolButton>
          </Botonera>
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <Input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <Entrar type="submit">Entrar</Entrar>
            {error && <ErrorMsg>{error}</ErrorMsg>}
          </form>
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

const Titulo = styled.h2`
  color: #232728;
  margin-bottom: 2rem;
  font-size: 1.8rem;
  font-weight: 700;
  letter-spacing: 1px;
  font-family: 'Poppins';
`;

const Botonera = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.7rem;
  width: 100%;
  justify-content: center;
`;

const RolButton = styled.button`
  font-family: 'Poppins';
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1 / 1; 
  min-width: 90px;
  max-width: 120px;
  min-height: 90px;
  max-height: 120px;
  padding: 0.7rem 0.2rem;
  border: none;
  border-radius: 12px;
  background: ${({ active }) => (active ? "#607074" : "#a5c4ca")};
  color: ${({ active }) => (active ? "#caf0f8" : "#232728")};
  font-weight: 600;
  font-size: 1.05rem;
  cursor: pointer;
  box-shadow: ${({ active }) => (active ? "0 2px 8px #404a4c33" : "none")};
  transition: background 0.2s, color 0.2s, box-shadow 0.2s;
  outline: ${({ active }) => (active ? "2px solid #404a4c" : "none")};
  &:hover {
    background: ${({ active }) => (active ? "#404a4c" : "#82999e")};
    color: #caf0f8;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.7rem; 
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
  font-weight: 500;
  letter-spacing: 0.2px;
`;

const FondoDegradado = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

