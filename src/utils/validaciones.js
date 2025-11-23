// Utilidades de validación para formularios
import { 
  validarNIFCompleto, 
  validarEmailCompleto, 
  validarTelefonoEspanol,
  validarYSanitizarCliente 
} from './seguridad';

// Mantener compatibilidad con código existente
export const validarNIF = (nif) => {
  if (!nif) return true; // Opcional
  return validarNIFCompleto(nif);
};

export const validarEmail = (email) => {
  if (!email) return true; // Opcional
  return validarEmailCompleto(email);
};

export const validarTelefono = (telefono) => {
  if (!telefono) return false;
  return validarTelefonoEspanol(telefono);
};

export const validarFormularioCliente = (form) => {
  // Usar la nueva función de seguridad para validación completa
  const resultado = validarYSanitizarCliente(form);
  
  return {
    esValido: resultado.valido,
    errores: resultado.errores,
    datosSanitizados: resultado.datosSanitizados
  };
};

export const limpiarFormularioCliente = () => ({
  nombre: "",
  apellidos: "",
  telefono: "",
  nif: "",
  direccion: "",
  correo: ""
});