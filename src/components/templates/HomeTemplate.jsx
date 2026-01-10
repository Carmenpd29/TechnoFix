import { Fondo, Card, LogoFijo, Titulo } from "../../styles/HomeTemplateStyles";
import { useConfiguracionEmpresaContext } from "../../contexts/ConfiguracionEmpresaContext";
import { InfoCard } from "../../index";
import { FiHome } from "react-icons/fi";

/**
 * HomeTemplate
 * Página de bienvenida principal que muestra el logo y un resumen de secciones.
 */
export function HomeTemplate() {
  const { configuracion } = useConfiguracionEmpresaContext();
  return (
    <Fondo>
      <Card>
        <LogoFijo>
          <img
            src={configuracion.logo_url || "/TechnoFix/assets/Logo.png"}
            alt={`${configuracion.nombre_empresa || "TechnoFix"} logo`}
            style={{
              width: 200,
              height: "auto",
            }}
          />
        </LogoFijo>
        <Titulo>¡Bienvenid@ a {configuracion.nombre_empresa || "TechnoFix"}!</Titulo>
        <InfoCard title="Panel de Control" icon={<FiHome size={18} />}>
          <p>
            Utiliza el menú lateral o las opciones disponibles para acceder a las diferentes secciones del sistema:
          </p>
          <p>
            - <b>TPV</b>: Punto de venta completo con gestión de productos, categorías y facturación.<br />
            - <b>Clientes</b>: Administración integral de la base de clientes con historial completo.<br />
            - <b>Reparaciones</b>: Control detallado de servicios técnicos y seguimiento de reparaciones.<br />
            - <b>Usuarios</b>: Gestión de permisos y usuarios del sistema (solo administradores).<br />
            - <b>Empresa</b>: Personalización de logo, nombre y configuración empresarial.
          </p>
          <p>
            Haz clic en tu nombre en cualquier momento para acceder a la configuración de tu perfil personal.
          </p>
        </InfoCard>
      </Card>
    </Fondo>
  );
}
