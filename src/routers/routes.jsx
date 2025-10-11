import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import {
  Home,
  TPV,
  Clientes,
  Caja,
  Productos,
  VerClientes,
  InsertCliente,
  ModCliente,
  ModClienteFinal,
  DelCliente,
  AdminUsers,
  NewUser,
  Users,
  ModUsers,
  ModMyUser,
  Register,
  Reparaciones,
  AddReparacion,
  VerReparaciones,
  ModReparaciones,
  VerClienteId,
} from "../index";

export function MyRoutes({ user }) {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<Home />} />
      <Route path="/tpv" element={<TPV />} />
      <Route path="/clientes" element={<Clientes user={user} />} />
      <Route path="/clientes/ver" element={<VerClientes />} />
      <Route path="/clientes/insertar" element={<InsertCliente />} />
      <Route path="/clientes/modificar" element={<ModCliente />} />
      <Route path="/clientes/modificar/:id" element={<ModClienteFinal />} />
      <Route path="/clientes/eliminar" element={<DelCliente />} />
      <Route path="/caja" element={<Caja />} />
      <Route path="/productos" element={<Productos />} />
      <Route path="/usuarios" element={<Users />} />
      <Route path="/usuarios/lista" element={<AdminUsers />} />
      <Route path="/usuarios/nuevo" element={<NewUser />} />
      <Route path="/usuarios/editar" element={<ModUsers />} />
      <Route path="/usuarios/editarme" element={<ModMyUser />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reparaciones" element={<Reparaciones />} />
      <Route path="/reparaciones/add" element={<AddReparacion />} />
      <Route path="/reparaciones/ver" element={<VerReparaciones />} />
      <Route path="*" element={<Home />} />
      <Route path="/reparaciones/mod/:id" element={<ModReparaciones />} />
      <Route path="/clientes/ver/:id" element={<VerClienteId />} />
    </Routes>
  );
}
