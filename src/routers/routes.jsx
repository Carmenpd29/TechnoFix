import { Route, Routes } from "react-router-dom";
import { Home, TPV, Clientes } from "../index";

export function MyRoutes({ user }) {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tpv" element={<TPV />} />
      <Route path="/clientes" element={<Clientes user={user} />} />
    </Routes>
  );
}