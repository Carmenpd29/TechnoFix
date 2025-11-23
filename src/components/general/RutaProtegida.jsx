import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSeguridad } from '../hooks/useSeguridad';
import { Cargando } from '../components/general/Cargando';

// Componente para proteger rutas que requieren autenticación
export function RutaProtegida({ children, requiereRol = null, funcionalidad = null }) {
  const { usuario, loading, error, tieneRol, puedeAcceder } = useSeguridad();

  // Mostrar loading mientras se verifica la autenticación
  if (loading) {
    return <Cargando>Verificando autenticación...</Cargando>;
  }

  // Si hay error o no hay usuario, redirigir al login
  if (error || !usuario) {
    return <Navigate to="/login" replace />;
  }

  // Verificar rol específico si es requerido
  if (requiereRol && !tieneRol(requiereRol)) {
    return (
      <div style={{ 
        padding: '2rem', 
        textAlign: 'center', 
        background: '#f8f9fa',
        borderRadius: '8px',
        margin: '2rem',
        border: '2px solid #dc3545'
      }}>
        <h2 style={{ color: '#dc3545' }}>Acceso Denegado</h2>
        <p>No tienes permisos para acceder a esta sección.</p>
        <p>Rol requerido: <strong>{Array.isArray(requiereRol) ? requiereRol.join(' o ') : requiereRol}</strong></p>
        <p>Tu rol actual: <strong>{usuario.rol}</strong></p>
        <button 
          onClick={() => window.history.back()}
          style={{
            padding: '0.5rem 1rem',
            background: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Volver
        </button>
      </div>
    );
  }

  // Verificar funcionalidad específica si es requerida
  if (funcionalidad && !puedeAcceder(funcionalidad)) {
    return (
      <div style={{ 
        padding: '2rem', 
        textAlign: 'center', 
        background: '#f8f9fa',
        borderRadius: '8px',
        margin: '2rem',
        border: '2px solid #dc3545'
      }}>
        <h2 style={{ color: '#dc3545' }}>Funcionalidad Restringida</h2>
        <p>No tienes permisos para usar esta funcionalidad.</p>
        <p>Funcionalidad: <strong>{funcionalidad}</strong></p>
        <p>Tu rol actual: <strong>{usuario.rol}</strong></p>
        <button 
          onClick={() => window.history.back()}
          style={{
            padding: '0.5rem 1rem',
            background: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Volver
        </button>
      </div>
    );
  }

  // Si todo está correcto, mostrar el contenido
  return children;
}

// Componente específico para rutas de administrador
export function RutaAdmin({ children }) {
  return (
    <RutaProtegida requiereRol="admin">
      {children}
    </RutaProtegida>
  );
}

// Componente para rutas que requieren autenticación básica
export function RutaAutenticada({ children }) {
  return (
    <RutaProtegida requiereRol={['admin', 'trabajador']}>
      {children}
    </RutaProtegida>
  );
}