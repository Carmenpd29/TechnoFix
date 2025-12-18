// Middleware de seguridad para validar datos en TPV
import { validarYSanitizarProducto, sanitizarNumero, sanitizarTexto, logSeguridad } from './seguridad';

// Validar datos de producto en TPV
export const validarProductoTPV = (producto, usuario = null) => {
  try {
    const resultado = validarYSanitizarProducto(producto);
    
    if (!resultado.valido) {
      logSeguridad('VALIDACION_PRODUCTO_FALLIDA', usuario, { 
        errores: resultado.errores,
        producto: producto 
      });
    }
    
    return resultado;
  } catch (error) {
    logSeguridad('ERROR_VALIDACION_PRODUCTO', usuario, { error: error.message });
    return {
      valido: false,
      errores: { general: 'Error en la validación del producto' },
      datosSanitizados: {}
    };
  }
};

// Validar datos de venta
export const validarDatosVenta = (ventaData, usuario = null) => {
  const resultado = {
    valido: true,
    errores: {},
    datosSanitizados: {}
  };
  
  try {
    // Validar productos
    if (!ventaData.productos || !Array.isArray(ventaData.productos) || ventaData.productos.length === 0) {
      resultado.valido = false;
      resultado.errores.productos = 'Debe incluir al menos un producto';
      return resultado;
    }
    
    // Validar cada producto
    const productosValidados = [];
    for (let i = 0; i < ventaData.productos.length; i++) {
      const producto = ventaData.productos[i];
      const validacionProducto = validarProductoTPV(producto, usuario);
      
      if (!validacionProducto.valido) {
        resultado.valido = false;
        resultado.errores[`producto_${i}`] = validacionProducto.errores;
      } else {
        productosValidados.push(validacionProducto.datosSanitizados);
      }
    }
    
    resultado.datosSanitizados.productos = productosValidados;
    
    // Validar totales
    if (!ventaData.totales || typeof ventaData.totales !== 'object') {
      resultado.valido = false;
      resultado.errores.totales = 'Los totales son requeridos';
    } else {
      resultado.datosSanitizados.totales = {
        subtotal: sanitizarNumero(ventaData.totales.subtotal),
        totalDescuentos: sanitizarNumero(ventaData.totales.totalDescuentos),
        totalIva: sanitizarNumero(ventaData.totales.totalIva),
        total: sanitizarNumero(ventaData.totales.total)
      };
      
      // Verificar que el total sea positivo
      if (resultado.datosSanitizados.totales.total <= 0) {
        resultado.valido = false;
        resultado.errores.total = 'El total debe ser mayor que 0';
      }
    }
    
    // Validar método de pago
    const metodosValidos = ['efectivo', 'bizum', 'tarjeta', 'transferencia', 'mixto'];
    if (!ventaData.metodoPago || !metodosValidos.includes(ventaData.metodoPago)) {
      resultado.valido = false;
      resultado.errores.metodoPago = 'Método de pago no válido';
    } else {
      resultado.datosSanitizados.metodoPago = ventaData.metodoPago;
    }
    
    // Validar cliente (opcional)
    if (ventaData.cliente) {
      if (!ventaData.cliente.id || typeof ventaData.cliente.id !== 'number') {
        resultado.valido = false;
        resultado.errores.cliente = 'ID de cliente no válido';
      } else {
        resultado.datosSanitizados.cliente = {
          id: parseInt(ventaData.cliente.id),
          nombre: sanitizarTexto(ventaData.cliente.nombre || ''),
          nif: sanitizarTexto(ventaData.cliente.nif || ''),
          telefono: sanitizarTexto(ventaData.cliente.telefono || '')
        };
      }
    }
    
    // Validar descuento general
    if (ventaData.descuentoGeneral !== undefined) {
      const descuento = sanitizarNumero(ventaData.descuentoGeneral);
      if (descuento < 0 || descuento > 100) {
        resultado.valido = false;
        resultado.errores.descuentoGeneral = 'El descuento debe estar entre 0 y 100';
      } else {
        resultado.datosSanitizados.descuentoGeneral = descuento;
      }
    }
    
    if (!resultado.valido) {
      logSeguridad('VALIDACION_VENTA_FALLIDA', usuario, { 
        errores: resultado.errores,
        venta: ventaData 
      });
    } else {
      logSeguridad('VENTA_VALIDADA_CORRECTAMENTE', usuario, { 
        total: resultado.datosSanitizados.totales.total,
        productos: resultado.datosSanitizados.productos.length 
      });
    }
    
    return resultado;
    
  } catch (error) {
    logSeguridad('ERROR_VALIDACION_VENTA', usuario, { error: error.message });
    return {
      valido: false,
      errores: { general: 'Error en la validación de la venta' },
      datosSanitizados: {}
    };
  }
};

// Validar datos de usuario
export const validarDatosUsuario = (datosUsuario, usuario = null) => {
  const resultado = {
    valido: true,
    errores: {},
    datosSanitizados: {}
  };
  
  try {
    // Validar nombre
    if (!datosUsuario.nombre || typeof datosUsuario.nombre !== 'string' || !datosUsuario.nombre.trim()) {
      resultado.valido = false;
      resultado.errores.nombre = 'El nombre es obligatorio';
    } else {
      const nombreSanitizado = sanitizarTexto(datosUsuario.nombre);
      if (!nombreSanitizado || nombreSanitizado.length < 2) {
        resultado.valido = false;
        resultado.errores.nombre = 'El nombre debe tener al menos 2 caracteres válidos';
      } else {
        resultado.datosSanitizados.nombre = nombreSanitizado;
      }
    }
    
    // Validar email
    if (!datosUsuario.email || typeof datosUsuario.email !== 'string' || !datosUsuario.email.trim()) {
      resultado.valido = false;
      resultado.errores.email = 'El email es obligatorio';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(datosUsuario.email)) {
        resultado.valido = false;
        resultado.errores.email = 'El email no tiene un formato válido';
      } else {
        resultado.datosSanitizados.email = datosUsuario.email.toLowerCase().trim();
      }
    }
    
    // Validar rol
    const rolesValidos = ['admin', 'trabajador'];
    if (!datosUsuario.rol || !rolesValidos.includes(datosUsuario.rol)) {
      resultado.valido = false;
      resultado.errores.rol = 'El rol debe ser admin o trabajador';
    } else {
      resultado.datosSanitizados.rol = datosUsuario.rol;
    }
    
    // Validar contraseña (solo en creación)
    if (datosUsuario.password) {
      if (datosUsuario.password.length < 6) {
        resultado.valido = false;
        resultado.errores.password = 'La contraseña debe tener al menos 6 caracteres';
      } else {
        resultado.datosSanitizados.password = datosUsuario.password;
      }
    }
    
    if (!resultado.valido) {
      logSeguridad('VALIDACION_USUARIO_FALLIDA', usuario, { 
        errores: resultado.errores,
        email: datosUsuario.email 
      });
    }
    
    return resultado;
    
  } catch (error) {
    logSeguridad('ERROR_VALIDACION_USUARIO', usuario, { error: error.message });
    return {
      valido: false,
      errores: { general: 'Error en la validación del usuario' },
      datosSanitizados: {}
    };
  }
};

// Validar datos de reparación
export const validarDatosReparacion = (datosReparacion, usuario = null) => {
  const resultado = {
    valido: true,
    errores: {},
    datosSanitizados: {}
  };
  
  try {
    // Validar cliente
    if (!datosReparacion.idcliente || typeof datosReparacion.idcliente !== 'number') {
      resultado.valido = false;
      resultado.errores.cliente = 'Debe seleccionar un cliente válido';
    } else {
      resultado.datosSanitizados.idcliente = parseInt(datosReparacion.idcliente);
    }
    
    // Validar técnico
    if (!datosReparacion.idtecnico || typeof datosReparacion.idtecnico !== 'number') {
      resultado.valido = false;
      resultado.errores.tecnico = 'Debe seleccionar un técnico válido';
    } else {
      resultado.datosSanitizados.idtecnico = parseInt(datosReparacion.idtecnico);
    }
    
    // Validar artículo
    if (!datosReparacion.articulo || typeof datosReparacion.articulo !== 'string' || !datosReparacion.articulo.trim()) {
      resultado.valido = false;
      resultado.errores.articulo = 'El artículo es obligatorio';
    } else {
      resultado.datosSanitizados.articulo = sanitizarTexto(datosReparacion.articulo);
    }
    
    // Validar descripción
    if (!datosReparacion.descripcion || typeof datosReparacion.descripcion !== 'string' || !datosReparacion.descripcion.trim()) {
      resultado.valido = false;
      resultado.errores.descripcion = 'La descripción es obligatoria';
    } else {
      resultado.datosSanitizados.descripcion = sanitizarTexto(datosReparacion.descripcion);
    }
    
    // Validar fecha
    if (!datosReparacion.fecha) {
      resultado.valido = false;
      resultado.errores.fecha = 'La fecha es obligatoria';
    } else {
      const fecha = new Date(datosReparacion.fecha);
      if (isNaN(fecha.getTime())) {
        resultado.valido = false;
        resultado.errores.fecha = 'La fecha no es válida';
      } else {
        resultado.datosSanitizados.fecha = datosReparacion.fecha;
      }
    }
    
    // Validar precio
    const precio = sanitizarNumero(datosReparacion.precio);
    if (precio < 0) {
      resultado.valido = false;
      resultado.errores.precio = 'El precio no puede ser negativo';
    } else {
      resultado.datosSanitizados.precio = precio;
    }
    
    // Validar fecha de entrega (opcional)
    if (datosReparacion.fechaentrega) {
      const fechaEntrega = new Date(datosReparacion.fechaentrega);
      if (isNaN(fechaEntrega.getTime())) {
        resultado.valido = false;
        resultado.errores.fechaentrega = 'La fecha de entrega no es válida';
      } else {
        resultado.datosSanitizados.fechaentrega = datosReparacion.fechaentrega;
      }
    }
    
    // Validar observaciones (opcional)
    if (datosReparacion.observaciones) {
      resultado.datosSanitizados.observaciones = sanitizarTexto(datosReparacion.observaciones);
    }
    
    if (!resultado.valido) {
      logSeguridad('VALIDACION_REPARACION_FALLIDA', usuario, { 
        errores: resultado.errores 
      });
    }
    
    return resultado;
    
  } catch (error) {
    logSeguridad('ERROR_VALIDACION_REPARACION', usuario, { error: error.message });
    return {
      valido: false,
      errores: { general: 'Error en la validación de la reparación' },
      datosSanitizados: {}
    };
  }
};