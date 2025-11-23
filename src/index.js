// =====================================
// APP PRINCIPAL
// =====================================
export { default as App } from './App';

// =====================================
// SERVICIOS
// =====================================
export * from './supabase/supabaseClient';

// =====================================
// STORE
// =====================================
export * from './store/userStore';

// =====================================
// ROUTERS
// =====================================
export * from './routers/routes';

// =====================================
// STYLES
// =====================================
export * from './styles/AdminStyles';
export * from './styles/AppStyles';
export * from './styles/BotonMenuStyles';
export * from './styles/BotonPDFImprimirStyles';
export * from './styles/BotonVolverStyles';
export * from './styles/BuscadorClientesStyles';
export * from './styles/CajaStyles';
export * from './styles/ClienteCardStyles';
export * from './styles/DelClienteStyles';
export * from './styles/FondoDegradado';
export * from './styles/FooterStyles';
export * from './styles/FormReparacionesStyles';
export * from './styles/GlobalStyles';
export * from './styles/HomeTemplateStyles';
export * from './styles/InsertClienteStyles';
export * from './styles/LoginStyles';
export * from './styles/ManualPageStyles';
export * from './styles/MenuHamburStyles';
export * from './styles/ModalStyles';
export * from './styles/ModClienteFinalStyles';
export * from './styles/ModClienteStyles';
export * from './styles/NombreUsuarioStyles';
export * from './styles/OpcionesStyles';
export * from './styles/ProductosStyles';
export * from './styles/RegistroStyles';
export * from './styles/SidebarStyles';
export * from './styles/TablaAdminStyles';
export * from './styles/TablaStyles';
export * from './styles/TituloPageStyles';
export * from './styles/VerClientesStyles';
export * from './styles/VerReparacionesStyles';
export * from './styles/ZonaClienteStyles';
export * from './styles/ZonaReparacionesStyles';

// =====================================
// UTILS
// =====================================
export * from './utils/breakpoints';
export * from './utils/tpvUtils';
export * from './utils/validaciones';

// =====================================
// HOOKS
// =====================================
export * from './hooks/useCalculadora';
export * from './hooks/useProductos';
export * from './hooks/useProductosTPV';
export * from './hooks/useVentas';
export * from './hooks/useFormularioCliente';
export * from './hooks/useUsuarios';
export * from './hooks/useClienteDetalle';
export * from './hooks/useFacturacion';
export * from './hooks/useConfiguracionEmpresa';
export * from './hooks/useSeguridad';

// =====================================
// COMPONENTS
// =====================================

// Components - Admin
export * from './components/admin/TablaAdmin';

// Components - Clientes
export * from './components/clientes/BuscadorClientes';
export * from './components/clientes/ClienteCard';
export * from './components/clientes/crearPDF';

// Components - General
export * from './components/general/BotonMenu';
export * from './components/general/BotonVolver';
export * from './components/general/Cargando';
export * from './components/general/Footer';
export * from './components/general/IconBtn';
export * from './components/general/InfoCard';
export * from './components/general/ManualPage';
export * from './components/general/TituloPage';
export * from './components/general/UserInfo';

// Components - Menu
export * from './components/menu/MenuHambur';
export * from './components/menu/Sidebar';

// Components - Reparaciones
export * from './components/reparaciones/BotonPDFImprimir';
export * from './components/reparaciones/FormReparaciones';
export * from './components/reparaciones/ZonaCliente';

// Components - Templates
export * from './components/templates/HomeTemplate';
export * from './components/templates/WrapperPage';

// =====================================
// PAGES
// =====================================

// Pages - Main
export * from './pages/Clientes';
export * from './pages/Empresa';
export * from './pages/Home';
export * from './pages/Login';
export * from './pages/Registro';
export * from './pages/Reparaciones';
export * from './pages/TPV';
export * from './pages/Usuarios';

// Pages - Clientes
export * from './pages/Clientes/DelCliente';
export * from './pages/Clientes/InsertCliente';
export * from './pages/Clientes/ModCliente';
export * from './pages/Clientes/ModClienteFinal';
export * from './pages/Clientes/VerClientes';
export * from './pages/Clientes/VerClienteId';

// Pages - Reparaciones
export * from './pages/Reparaciones/AddReparacion';
export * from './pages/Reparaciones/ModReparaciones';
export * from './pages/Reparaciones/VerReparaciones';

// Pages - TPV
export * from './pages/TPV/Caja';
export * from './pages/TPV/Facturacion';
export * from './pages/TPV/Productos';

// Pages - Usuarios
export * from './pages/Usuarios/AdminUsers';
export * from './pages/Usuarios/ModMyUser';
export * from './pages/Usuarios/ModUsers';
export * from './pages/Usuarios/NewUser';
export * from './pages/Empresa/ConfiguracionEmpresa';

// =====================================
// UTILS
// =====================================
export * from './utils/seguridad';
export * from './utils/middleware-seguridad';

