import { useState } from "react";
import styled from "styled-components";
import { FondoDegradado } from "../index";

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
      (rol === "trabajador" && password === "user1234")
    ) {
      onLogin({ rol }); 
      setError("");
    } else {
      setError("Contraseña incorrecta");
    }
  };

  return (
    <FondoDegradado>
      <Caja>
        <Titulo>Iniciar sesión</Titulo>
        <Botonera>
          <RolButton
            type="button"
            active={rol === "administrador"}
            onClick={() => handleRol("administrador")}
          >
            Admin
          </RolButton>
          <RolButton
            type="button"
            active={rol === "trabajador"}
            onClick={() => handleRol("trabajador")}
          >
            Trabajador
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
  );
}

const Caja = styled.div`
  font-family: 'Poppins';
  background: rgba(255,255,255,0.92); 
  padding: 1.7rem 2.7rem 2.2rem 2.7rem;
  border-radius: 18px;
  box-shadow: 0 8px 32px rgba(64,74,76,0.22), 0 1.5px 8px rgba(0,0,0,0.10);
  border: 1.5px solid #a5c4ca; /* Azul claro de tu paleta */
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 340px;
  transition: box-shadow 0.2s, border 0.2s;
`;

const Titulo = styled.h2`
  color: #232728;
  margin-bottom: 1rem;
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
  padding: 0.7rem 0;
  border: none;
  border-radius: 8px;
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

