// Utilidades de validación para formularios

export const validarNIF = (nif) => {
  if (!nif) return true; // Opcional
  const nifRegex = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/i;
  return nifRegex.test(nif);
};

export const validarEmail = (email) => {
  if (!email) return true; // Opcional
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validarTelefono = (telefono) => {
  if (!telefono) return false;
  const telefonoRegex = /^[0-9]{9}$/;
  return telefonoRegex.test(telefono.replace(/\s/g, ""));
};

export const validarFormularioCliente = (form) => {
  const errores = {};
  
  if (!form.nombre?.trim()) {
    errores.nombre = "El nombre es obligatorio";
  }
  
  if (!form.telefono?.trim()) {
    errores.telefono = "El teléfono es obligatorio";
  } else if (!validarTelefono(form.telefono)) {
    errores.telefono = "El teléfono debe tener 9 dígitos";
  }
  
  if (form.nif && !validarNIF(form.nif)) {
    errores.nif = "NIF inválido";
  }
  
  if (form.correo && !validarEmail(form.correo)) {
    errores.email = "Email inválido";
  }
  
  return {
    esValido: Object.keys(errores).length === 0,
    errores
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