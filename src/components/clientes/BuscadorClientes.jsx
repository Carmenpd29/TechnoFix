import { FiSearch } from "react-icons/fi";
import { BusquedaContainer } from "../../styles/BuscadorClientesStyles";

/**
 * BuscadorClientes
 * Componente de búsqueda controlado usado en vistas de clientes.
 */
export function BuscadorClientes({
  busqueda,
  setBusqueda,
  placeholder = "Buscar por nombre, NIF o teléfono...",
}) {
  return (
    <BusquedaContainer>
      <FiSearch className="icono-lupa" />
      <input
        type="text"
        placeholder={placeholder}
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
    </BusquedaContainer>
  );
}
