import { Link, useNavigate } from "react-router-dom";
import { FiLogOut, FiShoppingCart, FiUsers, FiUser, FiSettings } from "react-icons/fi";
import { MdBuild } from "react-icons/md";
import { useUserStore, UserInfo } from "../../index";
import { useConfiguracionEmpresaContext } from "../../contexts/ConfiguracionEmpresaContext";
import { SidebarWrapper, LogoMenu, MenuLinks, MenuOption, SalirButton, BarraSeparadora } from "../../styles/SidebarStyles";

export function Sidebar({ user }) {
  const navigate = useNavigate();
  const rol = user?.rol;
  const logout = useUserStore((state) => state.logout);
  const { configuracion } = useConfiguracionEmpresaContext();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <SidebarWrapper>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <LogoMenu
          src={configuracion.logo_url || "/TechnoFix/assets/Logo.png"}
          alt="Logo empresa"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/home")}
        />
        <BarraSeparadora />
        <UserInfo user={user} />
        <BarraSeparadora />
        <MenuLinks>
          {/* Opciones solo para admin */}
          {rol === "admin" && (
            <>
              <MenuOption onClick={() => navigate("/usuarios")}>
                <FiUser size={20} style={{ marginRight: 8 }} />
                Usuarios
              </MenuOption>
              <MenuOption onClick={() => navigate("/empresa")}>
                <FiSettings size={20} style={{ marginRight: 8 }} />
                Empresa
              </MenuOption>
              <BarraSeparadora />
            </>
          )}
          {/* Opciones para todos los usuarios */}
          {menuTrabajador
            .filter((item) => item.action !== "logout")
            .map((item) => (
              <MenuOption 
                key={item.to} 
                onClick={() => navigate(item.to)}
                className={item.hideOnMobile ? 'hide-on-mobile' : ''}
              >
                {item.icon}
                {item.label}
              </MenuOption>
            ))}
        </MenuLinks>
      </div>
      <div>
        <BarraSeparadora />
        <SalirButton onClick={handleLogout}>
          <FiLogOut size={16} style={{ marginRight: 6 }} />
          Salir
        </SalirButton>
      </div>
    </SidebarWrapper>
  );
}

const menuTrabajador = [
  { 
    label: "TPV", 
    to: "/tpv", 
    icon: <FiShoppingCart size={20} style={{ marginRight: 8 }} />,
    hideOnMobile: true 
  },
  { 
    label: "Clientes", 
    to: "/clientes", 
    icon: <FiUsers size={20} style={{ marginRight: 8 }} /> 
  },
  { 
    label: "Reparaciones", 
    to: "/reparaciones", 
    icon: <MdBuild size={20} style={{ marginRight: 8 }} /> 
  }, 
];


