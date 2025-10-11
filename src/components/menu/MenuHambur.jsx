import styled from "styled-components";
import { FiLogOut, FiShoppingCart, FiUsers, FiUser, FiX } from "react-icons/fi";
import { MdBuild } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useUserStore, NombreUsuario } from "../../index";

export function MenuHambur({ user, onLogout, open, setOpen }) {
  const navigate = useNavigate();
  const { rol } = user || {};
  const logout = useUserStore((state) => state.logout);

  const menuHambur = [
    {
      label: "Usuarios",
      to: "/usuarios",
      icon: <FiUser size={20} style={{ marginRight: 8 }} />,
      visible: rol === "admin",
    },
    //{ label: "TPV", to: "/tpv", icon: <FiShoppingCart size={20} style={{ marginRight: 8 }} /> },
    {
      label: "Clientes",
      to: "/clientes",
      icon: <FiUsers size={20} style={{ marginRight: 8 }} />,
    },
    {
      label: "Reparaciones",
      to: "/reparaciones",
      icon: <MdBuild size={20} style={{ marginRight: 8 }} />,
    },
  ];

  const handleLogout = async () => {
    setOpen(false);
    await logout();
    navigate("/login");
  };

  if (!open) return null;

  return (
    <>
      <Backdrop onClick={() => setOpen(false)} />
      <Overlay>
        <CloseButton onClick={() => setOpen(false)} aria-label="Cerrar menú">
          <FiX size={30} />
        </CloseButton>
        <MenuLayout>
          <ColLogo>
            <LogoHambur
              src="/TechnoFix/assets/Logo.png"
              alt="TechnoFix logo"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setOpen(false);
                navigate("/home");
              }}
            />
            {user?.nombre && (
              <NombreUsuario
                to="/usuarios/editarme"
                onClick={() => setOpen(false)}
              >
                {user.nombre}
              </NombreUsuario>
            )}
            <SalirButton onClick={handleLogout}>
              <FiLogOut size={16} style={{ marginRight: 6 }} />
              Salir
            </SalirButton>
          </ColLogo>
          <MenuLinks>
            {menuHambur
              .filter((item) => item.visible !== false)
              .map((item) => (
                <MenuOption
                  key={item.to}
                  onClick={() => {
                    setOpen(false);
                    navigate(item.to);
                  }}
                >
                  {item.icon}
                  {item.label}
                </MenuOption>
              ))}
          </MenuLinks>
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
  margin: 0 0 0 15px;
  width: 70%;
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

  @media (max-width: 1120px) {
    width: 98vw;
    min-width: 0;
    margin: 0;
    padding: 2rem 0.5rem 1rem 2.5rem;
    max-width: 98vw;
    font-size: 0.9rem;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #003459;
  position: absolute;
  top: 1.2rem;
  right: 3rem;
  cursor: pointer;
  z-index: 201;
`;

const MenuLayout = styled.div`
  display: grid;
  grid-template-columns: minmax(70px, 100px) 1fr;
  gap: 1.2rem;
  align-items: start;
  width: 100%;
`;

const ColLogo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 70px;

  & > a,
  & > button {
    margin-top: 0.7rem;
  }

  @media (max-width: 1120px) {
    margin-left: 0.5rem;
    margin-bottom: 0.7rem;
    text-align: center;
    align-items: center;
    & > a,
    & > button {
      margin-top: 0.5rem;
    }
    font-size: 0.9rem;
  }
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
  gap: 0.6rem;
  align-items: flex-start;
  padding-left: 1.5rem;

  @media (max-width: 1120px) {
    margin: 0;
    padding-left: 1.5rem;
    gap: 1rem;
    width: 100%;
    align-items: flex-start;
    font-size: 0.9rem;
  }
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
  font-size: 0.9rem;
  font-weight: 700;
  padding: 0.38rem 0.95rem;
  cursor: pointer;
  margin-bottom: 0rem;
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
  @media (max-width: 1120px) {
    font-size: 0.8rem;
  }
`;

const MenuOption = styled.button`
  background: none;
  border: none;
  color: rgb(14, 41, 61);
  font-family: "Montserrat", sans-serif;
  font-size: 1.1rem;
  font-weight: bold;
  padding: 0.4rem 1.2rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.18s, color 0.18s, transform 0.13s;
  text-align: left;
  display: flex;
  align-items: center;

  &:hover {
    background: #e7f7fa;
    color: rgb(123, 168, 189);
    transform: translateX(4px) scale(1.04);
    text-decoration: none;
  }
  @media (max-width: 1120px) {
    font-size: 0.9rem;
  }
`;

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(30, 44, 54, 0.25);
  z-index: 199;
`;
