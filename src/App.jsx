import { Header, HamburguesaButton, AppWrapper, Container } from "./styles/AppStyles";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FiMenu } from "react-icons/fi";
import {
  supabase,
  GlobalStyles,
  MyRoutes,
  Sidebar,
  Login,
  Register,
  useUserStore,
  MenuHambur,
  Footer, 
} from "./index";
import { ConfiguracionEmpresaProvider } from "./contexts/ConfiguracionEmpresaContext";

function App() {
  const user = useUserStore((state) => state.user);
  const login = useUserStore((state) => state.login);
  const logout = useUserStore((state) => state.logout);
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let timeoutId;
    (async () => {
      timeoutId = setTimeout(() => setLoading(false), 6000); // Timeout de seguridad 6s
      try {
        const { data: { user: supaUser } } = await supabase.auth.getUser();
        if (supaUser) {
          const { data: usuarioDB } = await supabase
            .from("usuarios")
            .select("*")
            .eq("uid", supaUser.id)
            .single();
          if (usuarioDB && usuarioDB.rol) {
            login(usuarioDB);
          } else {
            logout();
          }
        } else {
          logout();
        }
      } catch (e) {
        logout();
      } finally {
        setLoading(false);
        clearTimeout(timeoutId);
      }
    })();
    return () => clearTimeout(timeoutId);
  }, [login, logout]);

  if (loading) return <div>Cargando...</div>;

  return (
    <ConfiguracionEmpresaProvider>
      <AppWrapper>
        <GlobalStyles />
        <Routes>
        <Route
          path="/login"
          element={
            user ? <Navigate to="/" replace /> : <Login onLogin={login} />
          }
        />
        <Route
          path="/register"
          element={
            user ? <Navigate to="/" replace /> : <Register />
          }
        />
        <Route
          path="*"
          element={
            user ? (
              <Container>
                {!menuOpen && window.innerWidth <= 900 && (
                  <HamburguesaButton
                    onClick={() => setMenuOpen(true)}
                    style={{
                      position: 'fixed',
                      top: '18px',
                      left: '18px',
                      zIndex: 210,
                      background: '#fff',
                      borderRadius: '50%',
                      boxShadow: '0 2px 8px #404a4c22',
                      width: '48px',
                      height: '48px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    <FiMenu size={30} color="#003459" />
                  </HamburguesaButton>
                )}
                <section className="contentSidebar">
                  <Sidebar user={user} onLogout={logout} />
                </section>
                <section className="contentMenuHambur">
                  <MenuHambur
                    user={user}
                    onLogout={logout}
                    open={menuOpen}
                    setOpen={setMenuOpen}
                  />
                </section>
                <section className="contentRouters">
                  <MyRoutes user={user} />
                </section>
                <Footer /> 
              </Container>
            ) : (
              <Navigate to="/login" replace state={{ from: location }} />
            )
          }
        />
      </Routes>
    </AppWrapper>
    </ConfiguracionEmpresaProvider>
  );
}

export default App;
