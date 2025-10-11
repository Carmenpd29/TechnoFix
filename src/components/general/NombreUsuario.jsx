import styled from "styled-components";
import { Link } from "react-router-dom";

export const NombreUsuario = styled(Link)`
  font-size: 1rem;
  color: rgb(220, 227, 233);
  font-weight: 700;
  text-align: center;
  margin: 1.1rem 0 1.1rem 0;
  letter-spacing: 0.5px;
  text-decoration: none;
  cursor: pointer;
  border-radius: 8px;
  padding: 0.4rem 0.7rem;
  align-self: center;
  transition: background 0.18s, color 0.18s, box-shadow 0.18s, transform 0.13s;

  &:hover {
    background: linear-gradient(90deg, #caf0f8 0%, #a5c4ca 100%);
    color: rgb(113, 160, 161);
    box-shadow: 0 2px 8px #a5c4ca55;
    transform: scale(1.04);
    text-decoration: none;
  }
  @media (max-width: 1120px) {
    font-size: 0.9rem;
  }
`;
