import { useState, useEffect } from "react";

// Hook para manejar filtros y datos de facturación/ventas
export const useFacturacion = () => {
  const [ventas, setVentas] = useState([]);
  const [filtros, setFiltros] = useState({
    fechaInicio: "",
    fechaFin: "",
    metodoPago: "",
    minImporte: "",
    maxImporte: ""
  });

  // Cargar datos de ejemplo (en producción vendría de Supabase)
  useEffect(() => {
    const ventasEjemplo = [
      {
        id: 1,
        numero: "V2024-001",
        fecha: new Date().toISOString(),
        productos: [
          { nombre: "Reparación Pantalla iPhone", cantidad: 1, precio: 89.99 },
          { nombre: "Protector de Pantalla", cantidad: 1, precio: 9.99 }
        ],
        subtotal: 99.98,
        iva: 20.99,
        total: 120.97,
        metodoPago: "tarjeta",
        descuentos: 0
      },
      {
        id: 2,
        numero: "V2024-002",
        fecha: new Date(Date.now() - 86400000).toISOString(),
        productos: [
          { nombre: "Batería Samsung Galaxy", cantidad: 1, precio: 45.50 },
          { nombre: "Diagnóstico Completo", cantidad: 1, precio: 25.00 }
        ],
        subtotal: 70.50,
        iva: 14.81,
        total: 85.31,
        metodoPago: "efectivo",
        descuentos: 0
      }
    ];
    setVentas(ventasEjemplo);
  }, []);

  // Filtrar ventas según criterios
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

  // Calcular estadísticas
  const estadisticas = {
    totalVentas: ventasFiltradas.length,
    importeTotal: ventasFiltradas.reduce((sum, v) => sum + v.total, 0),
    ticketPromedio: ventasFiltradas.length > 0 
      ? ventasFiltradas.reduce((sum, v) => sum + v.total, 0) / ventasFiltradas.length 
      : 0,
    efectivo: ventasFiltradas.filter(v => v.metodoPago === 'efectivo').reduce((sum, v) => sum + v.total, 0)
  };

  const actualizarFiltros = (nuevosFiltros) => {
    setFiltros({ ...filtros, ...nuevosFiltros });
  };

  return {
    ventas: ventasFiltradas,
    filtros,
    estadisticas,
    actualizarFiltros
  };
};

// Utilidades para formateo
export const formatearFecha = (fecha) => {
  return new Date(fecha).toLocaleString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const formatearMetodoPago = (metodo) => {
  const metodos = {
    'efectivo': 'Efectivo',
    'tarjeta': 'Tarjeta',
    'transferencia': 'Transferencia',
    'mixto': 'Mixto'
  };
  return metodos[metodo] || metodo;
};

export const verDetalleVenta = (venta) => {
  // Esta función ya no es necesaria ya que se maneja con el modal en el componente
  return venta;
};

export const imprimirVenta = (venta) => {
  // Esta función ya no es necesaria ya que se maneja directamente en el componente
  return venta;
};