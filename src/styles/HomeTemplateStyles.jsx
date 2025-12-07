import styled from "styled-components";

export const Fondo = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  background: linear-gradient(135deg, #e7f7fa 0%, #b3c6d1 100%);
  padding: 0.5rem 1rem;
  box-sizing: border-box;
  overflow-y: auto;
  overflow-x: hidden;

  @media (max-width: 900px) {
    height: 100%;
    max-height: none;
    min-height: 0;
    padding-bottom: 0;
    align-items: flex-start;
  }
`;

export const Card = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 18px;
  box-shadow: 0 8px 32px rgba(55, 130, 165, 0.18),
    0 1.5px 8px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90vw;
  max-width: 800px;
  min-width: 0;

  @media (max-width: 1120px) {
    padding: 1.5rem 1rem;
    width: 95vw;
    max-width: 95vw;
  }
  
  @media (max-width: 768px) {
    padding: 1rem;
    width: 98vw;
    max-width: 98vw;
  }
`;

export const LogoFijo = styled.div``;

export const Titulo = styled.h2`
  font-family: "Poppins", "Montserrat";
  color: #003459;
  margin-bottom: 1.5rem;
  font-weight: 700;
  letter-spacing: 1px;
  text-align: center;
  
  @media (max-width: 1120px) {
    font-size: 1.2rem;
  }
`;

export const Texto = styled.div`
  font-family: "Poppins", "Montserrat";
  color: #3782a5;
  font-size: 1.1rem;
  text-align: center;
  margin: 0 1.2rem 1.1rem 1.2rem;
  
  span {
    color: #27618a;
    font-weight: 600;
    font-size: 0.9rem;
  }
  
  @media (max-width: 1120px) {
    font-size: 0.8rem;
  }
`;

export const OptionHome = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: left;
  
  p {
    margin: 0.05rem 0;
    font-size: 0.9rem;
  }
  
  span {
    font-size: 1rem;
  }
  
  @media (max-width: 1120px) {
    p {
      font-size: 0.8rem;
    }
    span {
      font-size: 0.8rem;
    }
  }
`;