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
export * from './styles/breakpoints';
export * from './styles/FondoDegradado';
export * from './styles/FondoDegradadoMenu';
export * from './styles/FooterStyles';
export * from './styles/GlobalStyles';
export * from './styles/HomeTemplateStyles';
export * from './styles/LoginStyles';
export * from './styles/MenuHamburStyles';
export * from './styles/RegistroStyles';
export * from './styles/SidebarStyles';
export * from './styles/TablaStyles';

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
export * from './components/general/ManualPage';
export * from './components/general/NombreUsuario';
export * from './components/general/Opciones';
export * from './components/general/TituloPage';

// Components - Menu
export * from './components/menu/MenuHambur';
export * from './components/menu/Sidebar';

// Components - Reparaciones
export * from './components/reparaciones/FormReparaciones';
export * from './components/reparaciones/ZonaCliente';
export * from './components/reparaciones/ZonaReparaciones';

// Components - Templates
export * from './components/templates/HomeTemplate';
export * from './components/templates/WrapperPage';

// =====================================
// PAGES
// =====================================

// Pages - Main
export * from './pages/Clientes';
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
export * from './pages/TPV/Productos';

// Pages - Usuarios
export * from './pages/Usuarios/AdminUsers';
export * from './pages/Usuarios/ModMyUser';
export * from './pages/Usuarios/ModUsers';
export * from './pages/Usuarios/NewUser';

