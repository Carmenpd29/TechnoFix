import styled from "styled-components";

export default function ClienteCard({ cliente }) {
  if (!cliente) return null;
  return (
    <Card>
      <h2>{cliente.nombre} {cliente.apellidos}</h2>
      <p><b>NIF:</b> {cliente.nif}</p>
      <p><b>Teléfono:</b> {cliente.telefono}</p>
      <p><b>Correo:</b> {cliente.correo}</p>
      <p><b>Dirección:</b> {cliente.direccion}</p>
    </Card>
  );
}

const Card = styled.div`
  background: #f8fcff;
  border-radius: 12px;
  box-shadow: 0 2px 8px #0001;
  padding: 1.5rem 2rem;
  margin-bottom: 2rem;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
  h2 {
    margin-bottom: 0.5rem;
    font-size: 1.3rem;
    color: #003459;
  }
  p {
    margin: 0.3rem 0;
    font-size: 1rem;
  }
`;