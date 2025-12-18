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
      
      // 1. Antes de crear la venta: comprobar stock disponible para cada producto
      // Resolver productos que vienen sin id real (ej. añadidos manualmente) buscando por codigo o nombre
      const updatesStock = [];
      for (let producto of datosLimpios.productos) {
        const cantidadSolicitada = parseFloat(producto.cantidad) || 0;

        // Intentar resolver producto en BD por id, código o nombre
        let productoDB = null;

        // 1) Si tiene id y parece entero, buscar por id
        if (producto.id && Number.isInteger(Number(producto.id))) {
          const { data: rowsById, error: errById } = await supabase
            .from('productos')
            .select('id, stock')
            .eq('id', Number(producto.id))
            .limit(1);
          if (errById) {
            console.error('Error buscando producto por id:', errById);
          } else if (rowsById && rowsById.length > 0) {
            productoDB = rowsById[0];
          }
        }

        // 2) Si no encontrado y existe codigo, buscar por codigo
        if (!productoDB && producto.codigo) {
          const { data: rowsByCodigo, error: errByCodigo } = await supabase
            .from('productos')
            .select('id, stock')
            .eq('codigo', producto.codigo)
            .limit(1);
          if (errByCodigo) {
            console.error('Error buscando producto por codigo:', errByCodigo);
          } else if (rowsByCodigo && rowsByCodigo.length > 0) {
            productoDB = rowsByCodigo[0];
          }
        }

        // 3) Si no encontrado y hay nombre, intentar buscar por nombre (ilike)
        if (!productoDB && producto.nombre) {
          const { data: rowsByNombre, error: errByNombre } = await supabase
            .from('productos')
            .select('id, stock')
            .ilike('nombre', `%${producto.nombre}%`)
            .limit(1);
          if (errByNombre) {
            console.error('Error buscando producto por nombre:', errByNombre);
          } else if (rowsByNombre && rowsByNombre.length > 0) {
            productoDB = rowsByNombre[0];
          }
        }

        if (!productoDB) {
          // Producto no relacionado con BD (servicio o producto nuevo temporal): no actualizar stock
          continue;
        }

        const stockActual = (productoDB.stock !== null && productoDB.stock !== undefined) ? parseFloat(productoDB.stock) || 0 : 0;

        if (stockActual < cantidadSolicitada) {
          throw new Error(`Stock insuficiente para ${producto.nombre || producto.codigo || 'producto'} (disponible: ${stockActual}, solicitado: ${cantidadSolicitada})`);
        }

        updatesStock.push({ id: productoDB.id, nuevoStock: stockActual - cantidadSolicitada, cantidadSolicitada });
      }

      

      // 2. Intentar actualizar stocks condicionalmente ANTES de crear la venta
      const updatedProducts = [];
      try {
        for (let u of updatesStock) {
          const { data: prodUpdArr, error: errUpd } = await supabase
            .from('productos')
            .update({ stock: u.nuevoStock })
            .eq('id', u.id)
            .gte('stock', u.cantidadSolicitada)
            .select();

          if (errUpd) {
            throw errUpd;
          }

          const prodUpd = (Array.isArray(prodUpdArr) && prodUpdArr.length > 0) ? prodUpdArr[0] : null;
          if (!prodUpd) {
            throw new Error(`Condición de stock no cumplida para producto id=${u.id}`);
          }

          updatedProducts.push(u);
        }
      } catch (err) {
        // Si alguna actualización falla, no hemos creado venta todavía: devolver error claro
        console.error('Fallo al actualizar stock condicionalmente:', err);
        const detalleMsg = err?.message || err?.details || 'Error al actualizar stock';
        throw new Error(detalleMsg);
      }

      // 3. Crear la venta
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

      if (errorVenta) {
        // Rollback de stocks a valores originales si la creación de venta falla
        console.error('Error creando venta, realizando rollback de stocks:', errorVenta);
        for (let u of updatedProducts) {
          try {
            await supabase.from('productos').update({ stock: u.nuevoStock + u.cantidadSolicitada }).eq('id', u.id);
          } catch (rbErr) {
            console.error('Error restaurando stock en rollback:', rbErr);
          }
        }
        throw errorVenta;
      }

      // 2. Crear los detalles de venta
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

      if (errorDetalles) {
        console.error('Error insertando detalles_venta:', errorDetalles);
        // Rollback stocks previamente actualizados
        for (let u of updatedProducts) {
          try {
            await supabase.from('productos').update({ stock: u.nuevoStock + u.cantidadSolicitada }).eq('id', u.id);
          } catch (rbErr) {
            console.error('Error restaurando stock en rollback tras detalles fallidos:', rbErr);
          }
        }
        throw errorDetalles;
      }

      // 4. (Stocks ya actualizados condicionalmente antes de crear la venta)
      // 5. Limpiar y mostrar éxito
      limpiarVenta();
      setMostrarVentaModal(false);
      setMensajeModal(`Venta procesada correctamente\nTotal: €${ventaData.totales.total.toFixed(2)}\nMétodo: ${metodoPago.charAt(0).toUpperCase() + metodoPago.slice(1)}`);
      setMostrarModalExito(true);
      try {
        // Notificar a la app que se completó una venta para que otras partes recarguen datos
        if (typeof window !== 'undefined' && window.dispatchEvent) {
          window.dispatchEvent(new CustomEvent('venta:completada', { detail: { ventaId: ventaCreada?.id || null } }));
        }
      } catch (e) {
        // no-op
      }
      
    } catch (error) {
      console.error('Error procesando venta:', error?.message || error);
      const detalleMsg = error?.message || error?.statusText || 'Error desconocido';
      const detalleExtra = error?.details || error?.hint || '';
      setMensajeModal('Error al procesar la venta: ' + detalleMsg + (detalleExtra ? ' — ' + detalleExtra : ''));
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