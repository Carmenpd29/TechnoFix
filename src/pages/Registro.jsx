import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase, Footer, TituloPage } from "../index";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { LoginWrapper, RegistroCaja, Input, Entrar, ErrorMsg, RegMsg, FondoDegradado, PasswordWrapper, EyeButton } from "../styles/RegistroStyles";

export function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState(""); // 'error' | 'success'
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setMensaje("");
    if (!email.trim() || !password.trim()) {
      setMensaje("Rellena todos los campos.");
      setTipoMensaje('error');
      return;
    }
    if (password.length < 6) {
      setMensaje("La contraseña debe tener al menos 6 caracteres.");
      setTipoMensaje('error');
      return;
    }

    // build redirect base from env or current origin (strip trailing slash)
    const redirectBase = (import.meta.env.VITE_APP_URL || window.location.origin).replace(/\/$/, '');

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    }, {
      emailRedirectTo: `${redirectBase}/confirm`,
      redirectTo: `${redirectBase}/confirm`,
    });
    if (error) {
      console.error('supabase.signUp error:', error);
      setMensaje(error.message || "Error al registrar. Comprueba la consola.");
      setTipoMensaje('error');
      return;
    }

    let user = data?.user;

    // Si signUp no devuelve el user (p. ej. requiere confirmación por email), intentar obtenerlo
    if (!user) {
      try {
        const { data: getUserData, error: getUserError } = await supabase.auth.getUser();
        if (getUserError) console.warn('supabase.getUser error:', getUserError);
        user = getUserData?.user || null;
      } catch (e) {
        console.warn('Exception fetching user after signup:', e);
      }
    }

    // Preparar valores comunes
    const emailToUse = user?.email || email;

    // Si el signUp devuelve un user intentamos obtener la session; solo con session
    // podemos llamar a PostgREST como usuario autenticado (políticas RLS).
    if (user) {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();

      if (session && !sessionError) {
          try {
          const { error: upsertError } = await supabase
            .from('usuarios')
            .upsert(
              [{ email: emailToUse, uid: user.id }],
              { onConflict: 'email' }
            );

          if (upsertError) {
            console.error('Error upserting into usuarios:', upsertError);
            setMensaje('Registro creado, pero no se pudo guardar el perfil. Contacta al admin.');
            setTipoMensaje('error');
          } else {
            setMensaje('Registro completado. El admin validará tu cuenta.');
            setTipoMensaje('success');
          }
        } catch (e) {
          console.error('Exception upserting usuario:', e);
          setMensaje('Registro creado, pero error al guardar perfil. Contacta al admin.');
          setTipoMensaje('error');
        }

        // Cerrar sesión del cliente después de crear el perfil
        try {
          await supabase.auth.signOut();
        } catch (e) {
          console.warn('Error signing out after signup', e);
        }

        // limpiar campos
        setEmail('');
        setPassword('');
      } else {
        // No hay session: normalmente ocurre cuando se requiere confirmación por email.
        // Intentamos guardar nombre/email inmediatamente (anon insert). Esto requiere
        // una policy RLS que permita INSERTs por role=anon con uid IS NULL.
        try {
          const { error: upsertAnonError } = await supabase
            .from('usuarios')
            .upsert(
              [{ email: emailToUse, uid: null }],
              { onConflict: 'email' }
            );

          if (upsertAnonError) {
            console.warn('Upsert anon failed (could be RLS):', upsertAnonError);
            // No mostramos error al usuario, sólo informamos que confirme el correo
          }
        } catch (e) {
          console.warn('Exception upserting anon usuario:', e);
        }

        setMensaje('Registro creado. Confirma tu correo para completar el perfil.');
        setTipoMensaje('success');

        // limpiar campos
        setEmail('');
        setPassword('');
      }
    }
  };

  return (
    <LoginWrapper>
      <FondoDegradado>
        <RegistroCaja>
          <TituloPage>Registro de nuevo usuario</TituloPage>
          <form onSubmit={handleRegister} style={{ width: "100%" }}>
            {/* Nombre eliminado del formulario: lo asignará el admin en la validación */}
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="off"
            />
            <PasswordWrapper>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña (6 caracteres mínimo)"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete="new-password"
                style={{ marginBottom: 0 }}
              />
              <EyeButton
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                tabIndex={-1}
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </EyeButton>
            </PasswordWrapper>
            <Entrar type="submit">Aceptar</Entrar>
            {mensaje && (tipoMensaje === 'error' ? <ErrorMsg>{mensaje}</ErrorMsg> : <RegMsg>{mensaje}</RegMsg>)}
          </form>
          <br />
          <Entrar type="button" onClick={() => navigate("/login")}>
            Volver
          </Entrar>
        </RegistroCaja>
      </FondoDegradado>
      <Footer />
    </LoginWrapper>
  );
}



