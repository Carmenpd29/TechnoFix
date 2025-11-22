import { FiLogOut, FiShoppingCart, FiUsers, FiUser, FiX } from "react-icons/fi";
import { MdBuild } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useUserStore, NombreUsuario } from "../../index";
import { Overlay, CloseButton, MenuLayout, ColLogo, LogoHambur, MenuLinks, SalirButton, MenuOption, Backdrop } from "../../styles/MenuHamburStyles";

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


