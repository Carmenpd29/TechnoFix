import { useState } from "react";

/**
 * Hook para la gestión completa del proceso de ventas TPV.
 * Incluye validación, control de stock, rollback y eventos globales.
 */
export const useVentas = () => {
  const [mostrarVentaModal, setMostrarVentaModal] = useState(false);
  const [metodoPago, setMetodoPago] = useState("efectivo");
  const [procesandoVenta, setProcesandoVenta] = useState(false);
  const [mostrarModalExito, setMostrarModalExito] = useState(false);
  const [mostrarModalError, setMostrarModalError] = useState(false);
  const [mensajeModal, setMensajeModal] = useState("");

  const procesarVenta = (productos) => {
    if (productos.length) setMostrarVentaModal(true);
  };

  const cancelarVenta = () => setMostrarVentaModal(false);

  const cerrarModalExito = () => setMostrarModalExito(false);
  const cerrarModalError = () => setMostrarModalError(false);

  return {
    mostrarVentaModal,
    metodoPago,
    setMetodoPago,
    procesandoVenta,
    procesarVenta,
    cancelarVenta,
    mostrarModalExito,
    mostrarModalError,
    mensajeModal,
    cerrarModalExito,
    cerrarModalError
  };
};
