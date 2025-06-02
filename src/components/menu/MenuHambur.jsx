import styled from "styled-components";
import { FiX, FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const menu = [
  { label: "TPV", to: "/tpv" },
  { label: "Clientes", to: "/clientes" },
];

export function MenuHambur({ onLogout, open, setOpen }) {
  const navigate = useNavigate();

  const handleNavigate = (to) => {
    setOpen(false);
    navigate(to);
  };

  const handleLogout = () => {
    setOpen(false);
    onLogout();
    navigate("/login");
  };

  if (!open) return null;

  return (
    <>
      <Backdrop onClick={() => setOpen(false)} />
      <Overlay>
        <CloseButton
          onClick={() => setOpen(false)}
          aria-label="Cerrar menú"
        >
          <FiX size={30} />
        </CloseButton>
        <MenuLayout>
          <LogoHambur
            src="/TechnoFix/assets/Logo.png"
            alt="TechnoFix logo"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setOpen(false);
              navigate("/home");
            }}
          />
          <MenuLinks>
            {menu.map((item) => (
              <MenuOption
                key={item.to}
                onClick={() => handleNavigate(item.to)}
              >
                {item.label}
              </MenuOption>
            ))}
          </MenuLinks>
          <SalirColumn>
            <div style={{ height: "2.5rem" }} />
            <SalirButton onClick={handleLogout}>
              <FiLogOut size={16} style={{ marginRight: 6 }} />
              Cerrar sesión
            </SalirButton>
          </SalirColumn>
        </MenuLayout>
      </Overlay>
    </>
  );
}

const Overlay = styled.div`
  position: fixed;
  top: 0; 
  left: 0;
  right: 0;
  z-index: 200;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 24px;
  box-shadow: 0 4px 24px #00345944;
  padding: 1.2rem 2.2rem 1.2rem 2.2rem;
  overflow: hidden;
  background: linear-gradient(
    180deg,
    rgb(144, 180, 189) 0%,
    rgb(117, 156, 163) 30%,
    rgb(92, 124, 131) 60%,
    rgb(64, 94, 102) 80%,
    #404a4c 100%
  );
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #003459;
  position: absolute;
  top: 1.2rem;
  right: 2rem;
  cursor: pointer;
  z-index: 201;
`;

const MenuLayout = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const LogoHambur = styled.img`
  width: 70px;
  height: auto;
  border-radius: 16px;
  box-shadow: 0 4px 18px #3782a533;
  background: #fff;
  padding: 0.5rem;
  z-index: 202;
`;

const MenuLinks = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
`;

const SalirColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  min-width: 90px;
`;

const SalirButton = styled.button`
  background: linear-gradient(
    200deg,
    rgba(85, 25, 25, 0.81) 0%,
    rgb(156, 37, 37) 40%,
    #ff6b6b 100%
  );
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 0.98rem;
  font-weight: 700;
  padding: 0.38rem 0.95rem;
  cursor: pointer;
  margin-top: 0.6rem; 
  margin-bottom: 0.1rem;
  display: flex;
  align-items: center;
  box-shadow: 0 1px 4px #d32f2f22;
  border: 1px solid #fff; 
  transition: background 0.2s, box-shadow 0.2s, transform 0.1s;

  &:hover {
    background: linear-gradient(
      100deg,
      #8a1616 0%,
      #d32f2f 50%,
      #ff5252 100%
    );
    box-shadow: 0 2px 8px #d32f2f44;
    transform: translateY(-2px) scale(1.04);
  }
`;

const MenuOption = styled.button`
  background: none;
  border: none;
  color: #fff;
  font-family: 'Montserrat', sans-serif;
  font-size: 1.50rem;
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
    color: rgb(123, 168, 189);
    transform: translateX(4px) scale(1.04);
    text-decoration: none;
  }
`;

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(30, 44, 54, 0.25);
  z-index: 199;
`;