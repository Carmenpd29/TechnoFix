import { NombreUsuario } from "../../index";
import { UserContainer, UserRole } from "../../styles/UserInfoStyles";

/**
 * UserInfo
 * Pequeño widget que muestra el nombre y rol del usuario.
 */
export function UserInfo({ user }) {
  // No renderizar si no existe nombre
  if (!user?.nombre) return null;

  // Capitaliza el rol: 'ADMIN' -> 'Admin'
  const capitalizeRole = (role) => {
    if (!role) return "";
    return role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
  };

  return (
    <UserContainer>
      <NombreUsuario to="/usuarios/editarme">{user.nombre}</NombreUsuario>
      <UserRole>{capitalizeRole(user.rol)}</UserRole>
    </UserContainer>
  );
}