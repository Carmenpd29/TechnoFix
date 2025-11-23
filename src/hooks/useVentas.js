import { useState } from "react";
import { supabase } from "../supabase/supabaseClient";
import { validarDatosVenta } from "../utils/middleware-seguridad";
import { formatearCodigoProducto } from "../utils/formatearCodigo";

// Hook para manejar las ventas y modal de confirmación
export const useVentas = () => {
  const [mostrarVentaModal, setMostrarVentaModal] = useState(false);
  const [metodoPago, setMetodoPago] = useState("efectivo");
  const [procesandoVenta, setProcesandoVenta] = useState(false);
  const [mostrarModalExito, setMostrarModalExito] = useState(false);
  const [mostrarModalError, setMostrarModalError] = useState(false);
  const [mensajeModal, setMensajeModal] = useState("");

  const procesarVenta = (productos) => {
    if (productos.length === 0) return;
    setMostrarVentaModal(true);
  };

  const confirmarVenta = async (ventaData, limpiarVenta) => {
    setProcesandoVenta(true);
    
    try {
      // Validar y sanitizar datos de venta
      const validacion = validarDatosVenta({
        ...ventaData,
        metodoPago
      });
      
      if (!validacion.valido) {
        console.error('Datos de venta no válidos:', validacion.errores);
        setMensajeModal('Error en los datos de la venta: ' + Object.values(validacion.errores).join(', '));
        setMostrarModalError(true);
        return;
      }
      
      const datosLimpios = validacion.datosSanitizados;
      
      // 1. Crear la venta
      const ventaInsert = {
        cliente_id: datosLimpios.cliente?.id || null,
        subtotal: datosLimpios.totales.subtotal,
        descuento: datosLimpios.totales.totalDescuentos,
        impuestos: datosLimpios.totales.totalIva,
        total: datosLimpios.totales.total,
        metodo_pago: datosLimpios.metodoPago,
        estado: 'completada',
        notas: datosLimpios.cliente ? `Venta a ${datosLimpios.cliente.nombre}` : 'Venta a Cliente General'
      };

      const { data: ventaCreada, error: errorVenta } = await supabase
        .from('ventas')
        .insert([ventaInsert])
        .select()
        .single();

      if (errorVenta) throw errorVenta;

      // 2. Crear los detalles de venta
      console.log('=== Productos a guardar en detalles_venta ===');
      datosLimpios.productos.forEach((producto, idx) => {
        console.log(`Producto #${idx + 1}:`, {
          id: producto.id,
          codigo: producto.codigo,
          nombre: producto.nombre,
          resultadoCodigo: formatearCodigoProducto(producto)
        });
      });
      const detallesVenta = datosLimpios.productos.map(producto => ({
        venta_id: ventaCreada.id,
        cantidad: producto.cantidad,
        precio_unitario: producto.precio,
        iva_porcentaje: producto.iva,
        subtotal: producto.cantidad * producto.precio,
        nombre_producto: producto.nombre,
        codigo_producto: formatearCodigoProducto(producto) // Usar código formateado con fallback
      }));
      const { error: errorDetalles } = await supabase
        .from('detalles_venta')
        .insert(detallesVenta);

      if (errorDetalles) throw errorDetalles;

      // 3. Limpiar y mostrar éxito
      limpiarVenta();
      setMostrarVentaModal(false);
      setMensajeModal(`Venta procesada correctamente\nTotal: €${ventaData.totales.total.toFixed(2)}\nMétodo: ${metodoPago.charAt(0).toUpperCase() + metodoPago.slice(1)}`);
      setMostrarModalExito(true);
      
    } catch (error) {
      console.error('Error procesando venta:', error);
      setMensajeModal('Error al procesar la venta: ' + error.message);
      setMostrarModalError(true);
    } finally {
      setProcesandoVenta(false);
    }
  };

  const cancelarVenta = () => {
    setMostrarVentaModal(false);
  };

  const cerrarModalExito = () => {
    setMostrarModalExito(false);
    setMensajeModal("");
  };

  const cerrarModalError = () => {
    setMostrarModalError(false);
    setMensajeModal("");
  };

  return {
    mostrarVentaModal,
    metodoPago,
    setMetodoPago,
    procesandoVenta,
    procesarVenta,
    confirmarVenta,
    cancelarVenta,
    mostrarModalExito,
    mostrarModalError,
    mensajeModal,
    cerrarModalExito,
    cerrarModalError
  };
};