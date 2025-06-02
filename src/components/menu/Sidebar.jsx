import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FiLogOut } from "react-icons/fi";

const menuTrabajador = [
  { label: "TPV", to: "/tpv" },
  { label: "Clientes", to: "/clientes" },
  { label: "Salir", action: "logout" },
];

export function Sidebar({ user, onLogout }) {
  const navigate = useNavigate();
  const menu = menuTrabajador; 
  return (
    <SidebarLayout>
      <div>
        <LogoMenu
          src="/TechnoFix/assets/Logo.png"
          alt="TechnoFix logo"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/home")}
        />
        <BarraSeparadora />
        <MenuLinks>
          {menu
            .filter((item) => item.action !== "logout")
            .map((item) => (
              <MenuOption key={item.to} onClick={() => navigate(item.to)}>
                {item.label}
              </MenuOption>
            ))}
        </MenuLinks>
      </div>
      <div>
        <BarraSeparadora />
        <SalirButton onClick={onLogout}>
        <FiLogOut size={16} style={{ marginRight: 6 }} />
        Salir
      </SalirButton>
      </div>
      
    </SidebarLayout>
  );
}

const SidebarLayout = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  height: 100%;
  padding: 2.5rem 1.5rem 2rem 1.5rem;
  min-width: 150px;
  max-width: 220px;
  box-sizing: border-box;
  background: linear-gradient(
    180deg,
    rgb(144, 180, 189) 0%,
rgb(117, 156, 163) 30%,
rgb(92, 124, 131) 60%,
rgb(64, 94, 102) 80%,
    #404a4c 100%
  );
  position: relative;
  overflow: hidden;
`;

const LogoMenu = styled.img`
  width: 90px;         
  height: auto;
  border-radius: 16px;
  box-shadow: 0 4px 18px #3782a533;
  background: #fff;
  padding: 0.5rem;
  margin: 0 0 1.2rem 0.6rem;
`;

const MenuLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: stretch;
  margin: 2.2rem 0;
`;

const MenuOption = styled.button`
  background: none;
  border: none;
  color: #fff;
  font-family: 'Montserrat', sans-serif;
  font-size: 1.40rem;
  font-weight: bold;
  padding: 0.7rem 1.2rem;
  border-radius: 6px;
  cursor: pointer;
  transition:
    background 0.18s,
    color 0.18s,
    transform 0.13s;
  text-align: left;

  &:hover {
    background: #e7f7fa;
    color:rgb(123, 168, 189);
    transform: translateX(4px) scale(1.04);
    text-decoration: none;
  }
`;

const SalirButton = styled.button`
  background: linear-gradient(200deg,rgba(85, 25, 25, 0.81) 0%,rgb(156, 37, 37) 40%, #ff6b6b 100%);
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 0.98rem;
  font-weight: 700;
  padding: 0.38rem 0.95rem;
  cursor: pointer;
  margin: 1.2rem auto 0.2rem auto; /* Centrado horizontal */
  display: flex;
  align-items: center;
  box-shadow: 0 1px 4px #d32f2f22;
  border: 1px solid #fff;
  transition: background 0.2s, box-shadow 0.2s, transform 0.1s;

  &:hover {
    background: linear-gradient(100deg, #8a1616 0%, #d32f2f 50%, #ff5252 100%);
    box-shadow: 0 2px 8px #d32f2f44;
    transform: translateY(-2px) scale(1.04);
  }
`;

const BarraSeparadora = styled.div`
  width: 100%;
  height: 2px;
  background: linear-gradient(180deg, #caf0f8 0%, #a5c4ca 100%);
  margin: 0.2rem 0;
  border-radius: 2px;
`;

