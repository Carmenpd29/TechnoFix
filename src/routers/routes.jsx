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
  Confirm,
  Reparaciones,
  AddReparacion,
  VerReparaciones,
  ModReparaciones,
  VerClienteId,
  Empresa,
  ConfiguracionEmpresa,
} from "../index";
import { RutaAutenticada, RutaAdmin } from "../components/general/RutaProtegida";

export function MyRoutes({ user }) {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <Routes>
      {/* Ruta por defecto */}
      <Route path="/" element={<Navigate to="/home" replace />} />
      {/* Rutas públicas */}
      <Route path="/register" element={<Register />} />
      <Route path="/confirm" element={<Confirm />} />
      {/* Rutas protegidas */}
      <Route path="/home" element={
        <RutaAutenticada>
          <Home />
        </RutaAutenticada>
      } />
      {/* Clientes */}
      <Route path="/clientes" element={
        <RutaAutenticada>
          <Clientes user={user} />
        </RutaAutenticada>
      } />
      <Route path="/clientes/eliminar" element={
        <RutaAutenticada>
          <DelCliente />
        </RutaAutenticada>
      } />
      <Route path="/clientes/insertar" element={
        <RutaAutenticada>
          <InsertCliente />
        </RutaAutenticada>
      } />
      <Route path="/clientes/modificar" element={
        <RutaAutenticada>
          <ModCliente />
        </RutaAutenticada>
      } />
      <Route path="/clientes/modificar/:id" element={
        <RutaAutenticada>
          <ModClienteFinal />
        </RutaAutenticada>
      } />
      <Route path="/clientes/ver" element={
        <RutaAutenticada>
          <VerClientes />
        </RutaAutenticada>
      } />
      <Route path="/clientes/ver/:id" element={
        <RutaAutenticada>
          <VerClienteId />
        </RutaAutenticada>
      } />
      {/* Reparaciones */}
      <Route path="/reparaciones" element={
        <RutaAutenticada>
          <Reparaciones />
        </RutaAutenticada>
      } />
      <Route path="/reparaciones/add" element={
        <RutaAutenticada>
          <AddReparacion />
        </RutaAutenticada>
      } />
      <Route path="/reparaciones/mod/:id" element={
        <RutaAutenticada>
          <ModReparaciones />
        </RutaAutenticada>
      } />
      <Route path="/reparaciones/ver" element={
        <RutaAutenticada>
          <VerReparaciones />
        </RutaAutenticada>
      } />
      {/* TPV */}
      <Route path="/tpv" element={
        <RutaAutenticada>
          <TPV />
        </RutaAutenticada>
      } />
      <Route path="/tpv/caja" element={
        <RutaAutenticada>
          <Caja />
        </RutaAutenticada>
      } />
      <Route path="/tpv/productos" element={
        <RutaAutenticada>
          <Productos />
        </RutaAutenticada>
      } />
      <Route path="/tpv/facturacion" element={
        <RutaAutenticada>
          <Facturacion />
        </RutaAutenticada>
      } />
      {/* Usuarios */}
      <Route path="/usuarios" element={
        <RutaAdmin>
          <Usuarios />
        </RutaAdmin>
      } />
      <Route path="/usuarios/editar" element={
        <RutaAdmin>
          <ModUsers />
        </RutaAdmin>
      } />
      <Route path="/usuarios/editarme" element={
        <RutaAutenticada>
          <ModMyUser />
        </RutaAutenticada>
      } />
      <Route path="/usuarios/lista" element={
        <RutaAdmin>
          <AdminUsers />
        </RutaAdmin>
      } />
      <Route path="/usuarios/nuevo" element={
        <RutaAdmin>
          <NewUser />
        </RutaAdmin>
      } />
      {/* Empresa */}
      <Route path="/empresa" element={
        <RutaAdmin>
          <Empresa />
        </RutaAdmin>
      } />
      <Route path="/empresa/configuracion" element={
        <RutaAdmin>
          <ConfiguracionEmpresa />
        </RutaAdmin>
      } />
      {/* Ruta catch-all */}
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}
