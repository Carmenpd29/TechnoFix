import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { Home, TPV, Clientes, Caja, Productos } from "../index";
import { VerClientes } from "../pages/Clientes/VerClientes";

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
      <Route path="/caja" element={<Caja />} />
      <Route path="/productos" element={<Productos />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}
