// Utilidades para cálculos de TPV

export const calcularTotales = (productos, descuentoGeneral = 0) => {
  let subtotal = 0;
  let totalIva = 0;
  let totalDescuentos = 0;

  productos.forEach(producto => {
    const precio = parseFloat(producto.precio) || 0;
    const cantidad = parseFloat(producto.cantidad) || 0;
    const iva = parseFloat(producto.iva) || 0;
    const descuento = parseFloat(producto.descuento) || 0;
    const ivaIncluido = producto.ivaIncluido !== false; // Por defecto true

    let precioBase, ivaProducto, subtotalProducto;

    if (ivaIncluido) {
      // Precio con IVA incluido - extraer la base imponible
      precioBase = precio / (1 + iva / 100);
      subtotalProducto = precioBase * cantidad;
      const descuentoProducto = (subtotalProducto * descuento) / 100;
      const subtotalConDescuento = subtotalProducto - descuentoProducto;
      ivaProducto = (subtotalConDescuento * iva) / 100;
      
      subtotal += subtotalProducto;
      totalDescuentos += descuentoProducto;
      totalIva += ivaProducto;
    } else {
      // Precio sin IVA - calcular IVA sobre el precio base
      subtotalProducto = precio * cantidad;
      const descuentoProducto = (subtotalProducto * descuento) / 100;
      const subtotalConDescuento = subtotalProducto - descuentoProducto;
      ivaProducto = (subtotalConDescuento * iva) / 100;

      subtotal += subtotalProducto;
      totalDescuentos += descuentoProducto;
      totalIva += ivaProducto;
    }
  });

  const descuentoGeneralImporte = (subtotal * descuentoGeneral) / 100;
  const totalConDescuentos = subtotal - totalDescuentos - descuentoGeneralImporte;
  const total = totalConDescuentos + totalIva;

  return {
    subtotal,
    totalDescuentos: totalDescuentos + descuentoGeneralImporte,
    totalIva,
    total
  };
};

export const procesarVentaCompleta = (ventaData) => {
  
  return {
    success: true,
    mensaje: "¡Venta realizada correctamente!"
  };
};

export const formatearMoneda = (cantidad) => {
  return `€${cantidad.toFixed(2)}`;
};

export const generarNumeroVenta = () => {
  const fecha = new Date();
  const año = fecha.getFullYear();
  const timestamp = Date.now();
  return `V${año}-${timestamp}`;
};

export const calcularPrecioMostrado = (producto) => {
  const precio = parseFloat(producto.precio) || 0;
  const iva = parseFloat(producto.iva) || 0;
  const ivaIncluido = producto.ivaIncluido !== false;

  if (ivaIncluido) {
    return precio; // Ya incluye IVA
  } else {
    return precio * (1 + iva / 100); // Agregar IVA para mostrar precio final
  }
};

export const calcularPrecioBase = (producto) => {
  const precio = parseFloat(producto.precio) || 0;
  const iva = parseFloat(producto.iva) || 0;
  const ivaIncluido = producto.ivaIncluido !== false;

  if (ivaIncluido) {
    return precio / (1 + iva / 100); // Extraer base imponible
  } else {
    return precio; // Ya es la base imponible
  }
};