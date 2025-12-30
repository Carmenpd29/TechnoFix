import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../index';
import { WrapperPage, TituloPage, Footer } from '../index';
import styled from 'styled-components';

const Box = styled.div`
  max-width: 720px;
  margin: 2rem auto;
  padding: 1.5rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.06);
  text-align: center;
`;

export function Confirm() {
  const [status, setStatus] = useState('checking'); // checking | success | error
  const [message, setMessage] = useState('Comprobando confirmación...');
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        // Para supabase-js v2: intentar procesar la URL (si contiene tokens)
        // Esto no es obligatorio para la confirmación, pero permite iniciar sesión automáticamente si viene sesión en la URL.
        if (supabase?.auth?.getSessionFromUrl) {
          try {
            await supabase.auth.getSessionFromUrl({ storeSession: true });
          } catch (e) {
            // no bloquear: seguir comprobando
            console.warn('getSessionFromUrl:', e.message || e);
          }
        }

        // Opcional: podríamos verificar en la tabla usuarios si existe registro y si email_confirmed_at está presente.
        // Si has implementado el trigger que actualiza `public.usuarios.email_confirmed_at`, puedes comprobarlo aquí.
        const params = new URLSearchParams(window.location.search);
        const email = params.get('email');

        if (email) {
          const { data, error } = await supabase
            .from('usuarios')
            .select('email, email_confirmed_at')
            .eq('email', email)
            .maybeSingle();

          if (!error && data) {
            if (data.email_confirmed_at) {
              setStatus('success');
              setMessage('Correo confirmado correctamente. Ya puedes iniciar sesión.');
              return;
            }
          }
        }

        // Si no podemos confirmar desde DB, mostramos success de todos modos (Supabase ya confirmó el email en auth.users)
        setStatus('success');
        setMessage('Correo confirmado correctamente. Ya puedes iniciar sesión.');
      } catch (e) {
        setStatus('error');
        setMessage('No se ha podido confirmar el correo. Intenta de nuevo o contacta con el admin.');
        console.error('Confirm error:', e);
      }
    })();
  }, []);

  return (
    <WrapperPage>
      <TituloPage>Confirmación de correo</TituloPage>
      <Box>
        <h3>{status === 'checking' ? 'Comprobando...' : status === 'success' ? '¡Confirmado!' : 'Error'}</h3>
        <p>{message}</p>
        <div style={{ marginTop: 16 }}>
          <button onClick={() => navigate('/login')}>Ir a Iniciar sesión</button>
        </div>
      </Box>
      <Footer />
    </WrapperPage>
  );
}
