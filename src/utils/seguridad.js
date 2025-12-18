// Seguridad: sanitización y auditoría mínima

// Sanitización de strings para prevenir inyección de código
export const sanitizarTexto = (texto) => {
  if (!texto || typeof texto !== 'string') return '';
  return texto
    .trim()
    .replace(/[<>'"]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '')
    .replace(/script/gi, '')
    .replace(/eval/gi, '')
    .replace(/expression/gi, '')
    .slice(0, 1000);
};

// Sanitización específica para nombres
export const sanitizarNombre = (nombre) => {
  if (!nombre || typeof nombre !== 'string') return '';
  return nombre
    .trim()
    .replace(/[<>'"&]/g, '')
    .replace(/[0-9]/g, '')
    .replace(/[^\w\sáéíóúüñÁÉÍÓÚÜÑ-]/g, '')
    .slice(0, 100);
};

// Sanitización para NIFs
export const sanitizarNIF = (nif) => {
  if (!nif || typeof nif !== 'string') return '';
  return nif
    .trim()
    .toUpperCase()
    .replace(/[^0-9TRWAGMYFPDXBNJZSQVHLCKE]/g, '')
    .slice(0, 9);
};

// Sanitización para teléfonos
export const sanitizarTelefono = (telefono) => {
  if (!telefono || typeof telefono !== 'string') return '';
  return telefono
    .trim()
    .replace(/[^0-9+\s-]/g, '')
    .slice(0, 15);
};

// Sanitización para emails
export const sanitizarEmail = (email) => {
  if (!email || typeof email !== 'string') return '';
  return email
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9@._-]/g, '')
    .slice(0, 100);
};

// Sanitización para números (precios, cantidades, etc.)
export const sanitizarNumero = (numero, decimales = 2) => {
  if (numero === null || numero === undefined || numero === '') return 0;
  const num = parseFloat(numero);
  if (isNaN(num)) return 0;
  
  // Limitar a rangos razonables
  const limitado = Math.max(-999999.99, Math.min(999999.99, num));
  return parseFloat(limitado.toFixed(decimales));
};

// Validación mejorada de NIF con algoritmo de verificación
export const validarNIFCompleto = (nif) => {
  if (!nif || typeof nif !== 'string') return false;
  const nifSanitizado = sanitizarNIF(nif);
  
  // Verificar formato básico
  const nifRegex = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/;
  if (!nifRegex.test(nifSanitizado)) return false;
  
  // Verificar letra de control
  const letras = 'TRWAGMYFPDXBNJZSQVHLCKE';
  const numero = parseInt(nifSanitizado.substring(0, 8), 10);
  const letraCalculada = letras[numero % 23];
  const letraIntroducida = nifSanitizado.substring(8, 9);
  return letraCalculada === letraIntroducida;
};

// Validación mejorada de email
export const validarEmailCompleto = (email) => {
  if (!email || typeof email !== 'string') return false;
  const emailSanitizado = sanitizarEmail(email);
  
  // Regex más estricta para emails
  const emailRegex = /^[a-z0-9]([a-z0-9._-]*[a-z0-9])?@[a-z0-9]([a-z0-9.-]*[a-z0-9])?\.[a-z]{2,}$/;
  
  // Verificaciones adicionales
  if (!emailRegex.test(emailSanitizado)) return false;
  if (emailSanitizado.includes('..')) return false;
  if (emailSanitizado.startsWith('.') || emailSanitizado.endsWith('.')) return false;
  if (emailSanitizado.split('@').length !== 2) return false;
  const [local, domain] = emailSanitizado.split('@');
  if (local.length > 64 || domain.length > 253) return false;
  return true;
};

// Validación de teléfono español
export const validarTelefonoEspanol = (telefono) => {
  if (!telefono || typeof telefono !== 'string') return false;
  const telefonoSanitizado = sanitizarTelefono(telefono).replace(/[\s-]/g, '');
  
  // Formatos válidos españoles
  const formatosValidos = [
    /^[67][0-9]{8}$/, 
    /^9[0-9]{8}$/, 
    /^\+34[67][0-9]{8}$/, 
    /^\+349[0-9]{8}$/, 
  ];
  return formatosValidos.some(regex => regex.test(telefonoSanitizado));
};

// Función para escapar caracteres SQL (aunque Supabase lo maneja automáticamente)
export const escaparSQL = (texto) => {
  if (!texto || typeof texto !== 'string') return '';
  return texto
    .replace(/'/g, "''")
    .replace(/\\/g, '\\\\')
    .replace(/\x00/g, '\\0')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\x1a/g, '\\Z');
};

// Validar y sanitizar datos de cliente completos
export const validarYSanitizarCliente = (datos) => {
  const resultado = { valido: true, errores: {}, datosSanitizados: {} };
  if (!datos || typeof datos !== 'object') return { ...resultado, valido: false };
  if (!datos.nombre || typeof datos.nombre !== 'string' || !datos.nombre.trim()) {
    resultado.valido = false;
    resultado.errores.nombre = 'El nombre es obligatorio';
  } else {
    const nombreSanitizado = sanitizarNombre(datos.nombre);
    if (!nombreSanitizado || nombreSanitizado.length < 2) {
      resultado.valido = false;
      resultado.errores.nombre = 'El nombre debe tener al menos 2 caracteres válidos';
    } else resultado.datosSanitizados.nombre = nombreSanitizado;
  }
  
  // Apellidos (opcional)
  if (datos.apellidos) {
    const apellidosSanitizados = sanitizarNombre(datos.apellidos);
    resultado.datosSanitizados.apellidos = apellidosSanitizados;
  }
  
  // Teléfono (obligatorio)
  if (!datos.telefono || typeof datos.telefono !== 'string' || !datos.telefono.trim()) {
    resultado.valido = false;
    resultado.errores.telefono = 'El teléfono es obligatorio';
  } else if (!validarTelefonoEspanol(datos.telefono)) {
    resultado.valido = false;
    resultado.errores.telefono = 'El teléfono no tiene un formato válido';
  } else {
    resultado.datosSanitizados.telefono = sanitizarTelefono(datos.telefono);
  }
  
  // NIF (opcional pero si se proporciona debe ser válido)
  if (datos.nif) {
    if (!validarNIFCompleto(datos.nif)) {
      resultado.valido = false;
      resultado.errores.nif = 'El NIF no es válido';
    } else resultado.datosSanitizados.nif = sanitizarNIF(datos.nif);
  }
  
  // Email (opcional pero si se proporciona debe ser válido)
  if (datos.correo) {
    if (!validarEmailCompleto(datos.correo)) {
      resultado.valido = false;
      resultado.errores.correo = 'El email no tiene un formato válido';
    } else resultado.datosSanitizados.correo = sanitizarEmail(datos.correo);
  }
  
  // Dirección (opcional)
  if (datos.direccion) {
    resultado.datosSanitizados.direccion = sanitizarTexto(datos.direccion);
  }
  
  return resultado;
};

export const validarYSanitizarProducto = (datos) => {
  const resultado = { valido: true, errores: {}, datosSanitizados: {} };
  
  // Nombre del producto (obligatorio)
  if (!datos.nombre || typeof datos.nombre !== 'string' || !datos.nombre.trim()) {
    resultado.valido = false;
    resultado.errores.nombre = 'El nombre del producto es obligatorio';
  } else {
    const nombreSanitizado = sanitizarTexto(datos.nombre);
    if (!nombreSanitizado || nombreSanitizado.length < 2) {
      resultado.valido = false;
      resultado.errores.nombre = 'El nombre debe tener al menos 2 caracteres válidos';
    } else resultado.datosSanitizados.nombre = nombreSanitizado;
  }
  
  // Precio (obligatorio, debe ser positivo)
  const precio = sanitizarNumero(datos.precio);
  if (precio <= 0) { resultado.valido = false; resultado.errores.precio = 'El precio debe ser mayor que 0';
  } else { resultado.datosSanitizados.precio = precio; }
  
  // Cantidad (obligatorio, debe ser positivo)
  const cantidad = sanitizarNumero(datos.cantidad, 0);
  if (cantidad <= 0) { resultado.valido = false; resultado.errores.cantidad = 'La cantidad debe ser mayor que 0';
  } else { resultado.datosSanitizados.cantidad = cantidad; }
  
  // IVA (debe estar entre 0 y 100)
  const iva = sanitizarNumero(datos.iva);
  if (iva < 0 || iva > 100) { resultado.valido = false; resultado.errores.iva = 'El IVA debe estar entre 0 y 100';
  } else { resultado.datosSanitizados.iva = iva; }
  
  // Descuento (debe estar entre 0 y 100)
  if (datos.descuento !== undefined && datos.descuento !== null && datos.descuento !== '') {
    const descuento = sanitizarNumero(datos.descuento);
    if (descuento < 0 || descuento > 100) { resultado.valido = false; resultado.errores.descuento = 'El descuento debe estar entre 0 y 100'; }
    else resultado.datosSanitizados.descuento = descuento;
  }
  return resultado;
};

// Función para logs de seguridad (para auditoria)
// Almacenamiento mínimo en memoria para auditoría (no imprime por defecto)
const _auditLogs = [];
export const logSeguridad = (accion, usuario, datos = {}) => {
  try { _auditLogs.push({ timestamp: new Date().toISOString(), accion, usuario: usuario ? { id: usuario.id || null, nombre: usuario.nombre || null } : null, datos }); }
  catch (e) { /* no-op */ }
};
export const getAuditLogs = () => _auditLogs.slice();
export const clearAuditLogs = () => { _auditLogs.length = 0; };