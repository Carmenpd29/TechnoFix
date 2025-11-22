import { useState } from "react";
import { supabase } from "../supabase/supabaseClient";

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
      // 1. Crear la venta
      const ventaInsert = {
        cliente_id: ventaData.cliente?.id || null,
        subtotal: ventaData.totales.subtotal,
        descuento: ventaData.totales.totalDescuentos,
        impuestos: ventaData.totales.totalIva,
        total: ventaData.totales.total,
        metodo_pago: metodoPago,
        estado: 'completada',
        notas: ventaData.cliente ? `Venta a ${ventaData.cliente.nombre}` : 'Venta a Cliente General'
      };

      const { data: ventaCreada, error: errorVenta } = await supabase
        .from('ventas')
        .insert([ventaInsert])
        .select()
        .single();

      if (errorVenta) throw errorVenta;

      // 2. Crear los detalles de venta
      const detallesVenta = ventaData.productos.map(producto => ({
        venta_id: ventaCreada.id,
        producto_id: null, // Para productos agregados manualmente
        cantidad: producto.cantidad,
        precio_unitario: producto.precio,
        iva_porcentaje: producto.iva,
        subtotal: producto.cantidad * producto.precio,
        nombre_producto: producto.nombre // Almacenar nombre del producto del input
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