import { useState } from "react";

/**
 * useProductos
 * Hook personalizado para gestionar productos en la caja/venta.
 * Permite agregar, editar y eliminar productos, tanto manuales como procedentes de la base de datos.
 */
export const useProductos = (onProductoAgregado = null) => {
  // Lista de productos añadidos a la venta
  const [productos, setProductos] = useState([]);

  // Estado del formulario para un nuevo producto
  const [nuevoProducto, setNuevoProducto] = useState({
    codigo: "",
    nombre: "",
    precio: "",
    cantidad: "1",
    iva: "21",
    descuento: "0",
    ivaIncluido: true
  });

  /**
   * Agrega un producto introducido manualmente
   */
  const agregarProducto = (e) => {
    e.preventDefault();
    if (!nuevoProducto.nombre || !nuevoProducto.precio) return;

    const producto = {
      id: nuevoProducto.id || Date.now(), // ID temporal si no viene de BD
      codigo: nuevoProducto.codigo || null,
      ...nuevoProducto,
      precio: parseFloat(nuevoProducto.precio) || 0,
      cantidad: parseFloat(nuevoProducto.cantidad) || 1,
      iva: parseFloat(nuevoProducto.iva) || 21,
      descuento: parseFloat(nuevoProducto.descuento) || 0,
      ivaIncluido: nuevoProducto.ivaIncluido
    };

    setProductos([...productos, producto]);

    // Reset del formulario de nuevo producto
    setNuevoProducto({
      nombre: "",
      precio: "",
      cantidad: "1",
      iva: "21",
      descuento: "0",
      ivaIncluido: true
    });

    // Callback opcional (ej. limpiar buscador)
    if (onProductoAgregado) {
      onProductoAgregado();
    }
  };

  /**
   * Agrega un producto seleccionado desde la base de datos
   */
  const agregarProductoBD = (productoBD) => {
    const producto = {
      id: productoBD.id,
      codigo: productoBD.codigo || null,
      nombre: productoBD.nombre,
      precio: productoBD.precio,
      cantidad: 1,
      iva: productoBD.iva || 21,
      descuento: 0,
      ivaIncluido: true
    };

    setProductos([...productos, producto]);
  };

  /**
   * Elimina un producto de la lista
   */
  const eliminarProducto = (id) => {
    setProductos(productos.filter(p => p.id !== id));
  };

  /**
   * Actualiza un campo concreto de un producto
   */
  const actualizarProducto = (id, campo, valor) => {
    setProductos(productos.map(p =>
      p.id === id ? { ...p, [campo]: valor } : p
    ));
  };

  /**
   * Limpia todos los productos y reinicia el formulario
   */
  const limpiarProductos = () => {
    setProductos([]);
    setNuevoProducto({
      codigo: "",
      nombre: "",
      precio: "",
      cantidad: "1",
      iva: "21",
      descuento: "0",
      ivaIncluido: true
    });
  };

  return {
    productos,
    nuevoProducto,
    setNuevoProducto,
    agregarProducto,
    agregarProductoBD,
    eliminarProducto,
    actualizarProducto,
    limpiarProductos
  };
};
