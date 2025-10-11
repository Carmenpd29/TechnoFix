import styled from "styled-components";

export const LoginWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const LoginCaja = styled.div`
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

export const Subtitulo = styled.h3`
  color: #232728;
  margin: 1.2rem 0 1rem 0;
  font-size: 1.1rem;
  font-weight: 600;
  text-align: center;
`;

export const Input = styled.input`
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

export const PasswordWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 1.2rem;
`;

export const EyeButton = styled.button`
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

export const Entrar = styled.button`
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

export const ErrorMsg = styled.div`
  color: #d32f2f;
  margin-top: 0.7rem;
  text-align: center;
  font-weight: 600;
  letter-spacing: 0.2px;
`;

export const BarraSeparadora = styled.hr`
  width: 100%;
  border: none;
  border-top: 1.5px solid #a5c4ca;
  margin: 2rem 0 1.2rem 0;
`;

export const FondoDegradado = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LogoImg = styled.img`
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