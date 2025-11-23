// Utilidades para formatear códigos de productos
// TechnoFix v2

/**
 * Formatea el código del producto con fallback al ID
 * @param {Object} producto - El objeto producto
 * @returns {string} - El código formateado
 */
export const formatearCodigoProducto = (producto) => {
  if (!producto) return "N/A";
  
  // Si tiene código personalizado, usarlo
  if (producto.codigo && producto.codigo.trim()) {
    return producto.codigo.trim();
  }
  
  // Si no tiene código, usar ID con formato 000+id
  if (producto.id) {
    return `000${producto.id}`;
  }
  
  // Fallback para productos temporales
  return "TEMP";
};

/**
 * Obtiene el código para mostrar en la interfaz
 * Distingue entre productos manuales y de base de datos
 * @param {Object} producto - El objeto producto
 * @returns {string} - El código para mostrar
 */
export const obtenerCodigoDisplay = (producto) => {
  if (!producto) return "N/A";
  // Si tiene código, mostrarlo siempre
  if (producto.codigo && producto.codigo.trim()) {
    return producto.codigo.trim();
  }
  // Si no tiene código pero tiene id válido, mostrar el id formateado
  if (producto.id && typeof producto.id === 'number' && producto.id <= 999999999) {
    return `000${producto.id}`;
  }
  // Si no tiene código ni id válido, mostrar MANUAL
  return "MANUAL";
};

/**
 * Verifica si un producto tiene código personalizado
 * @param {Object} producto - El objeto producto
 * @returns {boolean} - True si tiene código personalizado
 */
export const tieneCodigoPersonalizado = (producto) => {
  return producto?.codigo && producto.codigo.trim() && !producto.codigo.startsWith('000');
};

/**
 * Genera un código temporal para productos nuevos
 * @param {number} categoriaId - ID de la categoría
 * @returns {string} - Código temporal
 */
export const generarCodigoTemporal = (categoriaId) => {
  const timestamp = Date.now().toString().slice(-4);
  const prefijo = categoriaId ? `CAT${categoriaId}` : 'TEMP';
  return `${prefijo}${timestamp}`;
};