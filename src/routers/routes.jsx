import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { Home, TPV, Clientes } from "../index";
import { Footer } from "../components/Footer";
import styled from "styled-components";

export function MyRoutes({ user }) {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <PageWrapper>
      <Content $isHome={isHome}>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/tpv" element={<TPV />} />
          <Route path="/clientes" element={<Clientes user={user} />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Content>
      <Footer />
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  min-height: 100vh;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  height: 100%;
  ${({ $isHome }) =>
    $isHome &&
    `
    background: linear-gradient(135deg, #e7f7fa 0%, #b3c6d1 100%);
  `}
`;