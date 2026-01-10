import { useState, useEffect } from "react";
import { supabase } from "../supabase/supabaseClient";

/**
 * useFacturacion
 * Hook personalizado para gestionar la facturación y ventas.
 * Permite cargar ventas desde Supabase, aplicar filtros y calcular estadísticas agregadas.
 */
export const useFacturacion = () => {
  // Listado completo de ventas transformadas
  const [ventas, setVentas] = useState([]);

  // Indica si las ventas están siendo cargadas
  const [loading, setLoading] = useState(true);

  // Filtros aplicables a la facturación
  const [filtros, setFiltros] = useState({
    fechaInicio: "",
    fechaFin: "",
    metodoPago: "",
    minImporte: "",
    maxImporte: ""
  });

  /**
   * Carga las ventas desde la base de datos (Supabase) junto con sus clientes y detalles de venta.
   */
  const cargarVentas = async () => {
    setLoading(true);
    try {
      const { data: ventasData, error } = await supabase
        .from('ventas')
        .select(`
          id,
          subtotal,
          descuento,
          impuestos,
          total,
          metodo_pago,
          estado,
          notas,
          created_at,
          cliente_id,
          clientes (
            nombre,
            apellidos,
            nif,
            telefono,
            correo,
            direccion
          ),
          detalles_venta (
            cantidad,
            precio_unitario,
            iva_porcentaje,
            subtotal,
            nombre_producto,
            codigo_producto
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      /**
       * Transformación de los datos obtenidos para adaptarlos al formato utilizado por la interfaz de usuario.
       */
      const ventasTransformadas = ventasData.map((venta) => ({
        id: venta.id,
        numero: 'V2024-' + String(venta.id).padStart(3, '0'),
        fecha: venta.created_at,
        cliente_id: venta.cliente_id,
        cliente: venta.clientes ? venta.clientes : "Cliente General",
        productos: venta.detalles_venta.map(detalle => ({
          nombre: detalle.nombre_producto,
          codigo: detalle.codigo_producto,
          cantidad: detalle.cantidad,
          precio: detalle.precio_unitario
        })),
        subtotal: venta.subtotal,
        iva: venta.impuestos,
        total: venta.total,
        metodoPago: venta.metodo_pago,
        descuentos: venta.descuento
      }));

      setVentas(ventasTransformadas);
    } catch (error) {
      console.error('Error cargando ventas:', error);
    } finally {
      // Finaliza el estado de carga
      setLoading(false);
    }
  };

  // Cargar ventas al montar el componente que use este hook
  useEffect(() => {
    cargarVentas();
  }, []);

  /**
   * Aplica los filtros seleccionados sobre el listado de ventas
   */
  const ventasFiltradas = ventas.filter(venta => {
    const fechaVenta = new Date(venta.fecha);
    const fechaInicio = filtros.fechaInicio ? new Date(filtros.fechaInicio) : null;
    const fechaFin = filtros.fechaFin ? new Date(filtros.fechaFin) : null;

    if (fechaInicio && fechaVenta < fechaInicio) return false;
    if (fechaFin && fechaVenta > fechaFin) return false;
    if (filtros.metodoPago && venta.metodoPago !== filtros.metodoPago) return false;
    if (filtros.minImporte && venta.total < parseFloat(filtros.minImporte)) return false;
    if (filtros.maxImporte && venta.total > parseFloat(filtros.maxImporte)) return false;

    return true;
  });

  /**
   * Estadísticas calculadas a partir de las ventas filtradas
   */
  const estadisticas = {
    totalVentas: ventasFiltradas.length,
    importeTotal: ventasFiltradas.reduce((sum, v) => sum + v.total, 0),
    ticketPromedio: ventasFiltradas.length > 0
      ? ventasFiltradas.reduce((sum, v) => sum + v.total, 0) / ventasFiltradas.length
      : 0,
    efectivo: ventasFiltradas
      .filter(v => v.metodoPago === 'efectivo')
      .reduce((sum, v) => sum + v.total, 0)
  };

  /**
   * Actualiza uno o varios filtros de facturación
   */
  const actualizarFiltros = (nuevosFiltros) => {
    setFiltros({ ...filtros, ...nuevosFiltros });
  };
 
  return {
    ventas: ventasFiltradas,
    filtros,
    estadisticas,
    loading,
    actualizarFiltros,
    recargarVentas: cargarVentas
  };
};

/**
 * Utilidad para formatear fechas en formato español
 */
export const formatearFecha = (fecha) => {
  return new Date(fecha).toLocaleString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

/**
 * Utilidad para convertir códigos de método de pago en textos legibles para la interfaz
 */
export const formatearMetodoPago = (metodo) => {
  const metodos = {
    'bizum': 'Bizum',
    'efectivo': 'Efectivo',
    'mixto': 'Mixto',
    'tarjeta': 'Tarjeta',
    'transferencia': 'Transferencia'
  };
  return metodos[metodo] || metodo;
};
