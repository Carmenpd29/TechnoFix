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
      {/* Ruta por defecto */}
      <Route path="/" element={<Navigate to="/home" replace />} />
      
      {/* Rutas principales */}
      <Route path="/home" element={<Home />} />
      <Route path="/register" element={<Register />} />
      
      {/* Rutas de Clientes */}
      <Route path="/clientes" element={<Clientes user={user} />} />
      <Route path="/clientes/eliminar" element={<DelCliente />} />
      <Route path="/clientes/insertar" element={<InsertCliente />} />
      <Route path="/clientes/modificar" element={<ModCliente />} />
      <Route path="/clientes/modificar/:id" element={<ModClienteFinal />} />
      <Route path="/clientes/ver" element={<VerClientes />} />
      <Route path="/clientes/ver/:id" element={<VerClienteId />} />
      
      {/* Rutas de Reparaciones */}
      <Route path="/reparaciones" element={<Reparaciones />} />
      <Route path="/reparaciones/add" element={<AddReparacion />} />
      <Route path="/reparaciones/mod/:id" element={<ModReparaciones />} />
      <Route path="/reparaciones/ver" element={<VerReparaciones />} />
      
      {/* Rutas de TPV */}
      <Route path="/caja" element={<Caja />} />
      <Route path="/productos" element={<Productos />} />
      <Route path="/tpv" element={<TPV />} />
      
      {/* Rutas de Usuarios */}
      <Route path="/usuarios" element={<Users />} />
      <Route path="/usuarios/editar" element={<ModUsers />} />
      <Route path="/usuarios/editarme" element={<ModMyUser />} />
      <Route path="/usuarios/lista" element={<AdminUsers />} />
      <Route path="/usuarios/nuevo" element={<NewUser />} />
      
      {/* Ruta catch-all */}
      <Route path="*" element={<Home />} />
    </Routes>
  );
}
