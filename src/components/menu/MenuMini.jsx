import { FiLogOut, FiUsers, FiUser, FiX, FiSettings } from "react-icons/fi";
import { MdBuild } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useUserStore, UserInfo } from "../../index";
import { useConfiguracionEmpresaContext } from "../../contexts/ConfiguracionEmpresaContext";
import { Overlay, CloseButton, MenuLayout, ColLogo, LogoMini, MenuLinks, SalirButton, MenuOption, Backdrop } from "../../styles/MenuHamburStyles";

/**
 * MenuMini
 * Versión compacta del menú tipo overlay. Mismo comportamiento que MenuHambur pero usando `LogoMini` como imagen. 
 */
export function MenuMini({ user, open, setOpen }) {
  const navigate = useNavigate();
  const { rol } = user || {};
  const logout = useUserStore((state) => state.logout);
  const { configuracion } = useConfiguracionEmpresaContext();

  const menuHambur = [
    {
      label: "Usuarios",
      to: "/usuarios",
      icon: <FiUser size={20} style={{ marginRight: 8 }} />,
      visible: rol === "admin",
    },
    {
      label: "Empresa",
      to: "/empresa",
      icon: <FiSettings size={20} style={{ marginRight: 8 }} />,
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
            <LogoMini
              src={configuracion.logo_url || "/TechnoFix/assets/Logo.png"}
              alt="Logo empresa"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setOpen(false);
                navigate("/home");
              }}
            />
            <div onClick={() => setOpen(false)}>
              <UserInfo user={user} />
            </div>
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


