import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import {
  Home,
  TPV,
  Clientes,
  Caja,
  Productos,
  Facturacion,
  VerClientes,
  InsertCliente,
  ModCliente,
  ModClienteFinal,
  DelCliente,
  AdminUsers,
  NewUser,
  Usuarios,
  ModUsers,
  ModMyUser,
  Register,
  Reparaciones,
  AddReparacion,
  VerReparaciones,
  ModReparaciones,
  VerClienteId,
  Empresa,
  ConfiguracionEmpresa,
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
      <Route path="/tpv" element={<TPV />} />
      <Route path="/tpv/caja" element={<Caja />} />
      <Route path="/tpv/productos" element={<Productos />} />
      <Route path="/tpv/facturacion" element={<Facturacion />} />
      
      {/* Rutas de Usuarios */}
      <Route path="/usuarios" element={<Usuarios />} />
      <Route path="/usuarios/editar" element={<ModUsers />} />
      <Route path="/usuarios/editarme" element={<ModMyUser />} />
      <Route path="/usuarios/lista" element={<AdminUsers />} />
      <Route path="/usuarios/nuevo" element={<NewUser />} />
      
      {/* Rutas de Empresa */}
      <Route path="/empresa" element={<Empresa />} />
      <Route path="/empresa/configuracion" element={<ConfiguracionEmpresa />} />
      
      {/* Ruta catch-all */}
      <Route path="*" element={<Home />} />
    </Routes>
  );
}
