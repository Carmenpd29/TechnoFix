// Función para generar códigos de productos automáticamente
// Basado en categorías: REP0001, ACC0001, SER0001, etc.

// Mapeo de categorías a prefijos
export const prefijosCategoria = {
  'smartphones': 'TEL',
  'tablets': 'TAB', 
  'laptops': 'LAP',
  'desktop': 'DES',
  'gaming': 'GAM',
  'audio': 'AUD',
  'cámaras': 'CAM',
  'accesorios': 'ACC',
  'reparaciones': 'REP',
  'componentes': 'COM',
  'servicios': 'SER',
  'general': 'GEN'
};

// Función para obtener prefijo basado en el nombre de categoría
const obtenerPrefijo = (nombreCategoria) => {
  if (!nombreCategoria) return 'GEN'; // General si no hay categoría
  
  const nombreLimpio = nombreCategoria.toLowerCase();
  
  // Buscar coincidencia exacta primero
  if (prefijosCategoria[nombreLimpio]) {
    return prefijosCategoria[nombreLimpio];
  }
  
  // Buscar coincidencia parcial
  for (const [key, prefijo] of Object.entries(prefijosCategoria)) {
    if (nombreLimpio.includes(key) || key.includes(nombreLimpio)) {
      return prefijo;
    }
  }
  
  // Si no hay coincidencia, generar prefijo de las primeras 3 letras
  return nombreLimpio.substring(0, 3).toUpperCase();
};

// Función para generar el siguiente código en secuencia
export const generarCodigoProducto = async (supabase, categoriaId, nombreCategoria) => {
  try {
    // 1. Obtener el prefijo basado en la categoría
    const prefijo = obtenerPrefijo(nombreCategoria);
    
    // 2. Buscar el último código con este prefijo
    const { data: productos, error } = await supabase
      .from('productos')
      .select('codigo')
      .like('codigo', `${prefijo}%`)
      .order('codigo', { ascending: false })
      .limit(1);
    
    if (error) {
      console.error('Error buscando códigos:', error);
      return `${prefijo}0001`; // Código por defecto en caso de error
    }
    
    // 3. Calcular el siguiente número
    let siguienteNumero = 1;
    
    if (productos && productos.length > 0) {
      const ultimoCodigo = productos[0].codigo;
      // Extraer el número del código (últimos 4 dígitos)
      const ultimoNumero = parseInt(ultimoCodigo.slice(-4)) || 0;
      siguienteNumero = ultimoNumero + 1;
    }
    
    // 4. Formatear el código con 4 dígitos
    const numeroFormateado = siguienteNumero.toString().padStart(4, '0');
    
    return `${prefijo}${numeroFormateado}`;
    
  } catch (error) {
    console.error('Error generando código:', error);
    return `GEN0001`; // Código por defecto en caso de error
  }
};

// Función para verificar si un código ya existe
export const verificarCodigoUnico = async (supabase, codigo) => {
  try {
    const { data, error } = await supabase
      .from('productos')
      .select('id')
      .eq('codigo', codigo)
      .limit(1);
    
    if (error) {
      console.error('Error verificando código:', error);
      return false;
    }
    
    return data.length === 0; // true si no existe, false si ya existe
  } catch (error) {
    console.error('Error verificando código:', error);
    return false;
  }
};

// Función para regenerar código si hay conflicto
export const obtenerCodigoUnico = async (supabase, categoriaId, nombreCategoria) => {
  let intentos = 0;
  const maxIntentos = 100;
  
  while (intentos < maxIntentos) {
    const codigo = await generarCodigoProducto(supabase, categoriaId, nombreCategoria);
    const esUnico = await verificarCodigoUnico(supabase, codigo);
    
    if (esUnico) {
      return codigo;
    }
    
    // Si no es único, incrementar manualmente
    const prefijo = obtenerPrefijo(nombreCategoria);
    const numero = parseInt(codigo.slice(-4)) + intentos + 1;
    const numeroFormateado = numero.toString().padStart(4, '0');
    const nuevoCodigo = `${prefijo}${numeroFormateado}`;
    
    const esNuevoUnico = await verificarCodigoUnico(supabase, nuevoCodigo);
    if (esNuevoUnico) {
      return nuevoCodigo;
    }
    
    intentos++;
  }
  
  // Si llegamos aquí, usar timestamp como fallback
  const timestamp = Date.now().toString().slice(-4);
  return `GEN${timestamp}`;
};