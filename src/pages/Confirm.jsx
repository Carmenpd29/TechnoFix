import { useEffect, useState } from 'react';
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
  const [status, setStatus] = useState('checking');
  const [message, setMessage] = useState('Confirmando tu correo...');
  const navigate = useNavigate();

  useEffect(() => {
    const confirm = async () => {
      try {
        const { data, error } = await supabase.auth.getSessionFromUrl({ storeSession: true });

        if (error) {
          setStatus('error');
          setMessage('El enlace de confirmación no es válido o ha expirado.');
          console.error(error);
          return;
        }

        setStatus('success');
        setMessage('Correo confirmado correctamente. Ya puedes iniciar sesión.');
      } catch (e) {
        setStatus('error');
        setMessage('No se ha podido confirmar el correo.');
        console.error(e);
      }
    };

    confirm();
  }, []);

  return (
    <WrapperPage>
      <TituloPage>Confirmación de correo</TituloPage>
      <Box>
        <h3>
          {status === 'checking'
            ? 'Confirmando...'
            : status === 'success'
            ? '¡Confirmado!'
            : 'Error'}
        </h3>

        <p>{message}</p>

        {status === 'success' && (
          <div style={{ marginTop: 16 }}>
            <button onClick={() => navigate('/login')}>
              Ir a Iniciar sesión
            </button>
          </div>
        )}
      </Box>
      <Footer />
    </WrapperPage>
  );
}
