import { Card } from "../../styles/ClienteCardStyles";

/**
 * ClienteCard
 * Componente presentacional para mostrar los datos básicos de un cliente.
 */
export function ClienteCard({ cliente }) {
  // Protección: si no hay cliente no renderizamos nada.
  if (!cliente) return null;

  // Mostrar propiedades básicas del cliente en una tarjeta.
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