import { useState } from "react";

// Hook para manejar la gestión de productos en la caja
export const useProductos = (onProductoAgregado = null) => {
  const [productos, setProductos] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({
    codigo: "",
    nombre: "",
    precio: "",
    cantidad: "1",
    iva: "21",
    descuento: "0",
    ivaIncluido: true
  });

  const agregarProducto = (e) => {
    e.preventDefault();
    if (!nuevoProducto.nombre || !nuevoProducto.precio) return;

    const producto = {
      // Usar el id de la base de datos si existe, si no generar uno temporal
      id: nuevoProducto.id || Date.now(),
      codigo: nuevoProducto.codigo || null, // Agregar código si existe
      ...nuevoProducto,
      precio: parseFloat(nuevoProducto.precio) || 0,
      cantidad: parseFloat(nuevoProducto.cantidad) || 1,
      iva: parseFloat(nuevoProducto.iva) || 21,
      descuento: parseFloat(nuevoProducto.descuento) || 0,
      ivaIncluido: nuevoProducto.ivaIncluido
    };

    setProductos([...productos, producto]);
    setNuevoProducto({
      nombre: "",
      precio: "",
      cantidad: "1",
      iva: "21",
      descuento: "0",
      ivaIncluido: true
    });

    // Llamar callback si existe (para limpiar buscador)
    if (onProductoAgregado) {
      onProductoAgregado();
    }
  };

  // Función para agregar un producto desde la base de datos
  const agregarProductoBD = (productoBD) => {
    const producto = {
      id: productoBD.id, // ID real de la base de datos
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

  const eliminarProducto = (id) => {
    setProductos(productos.filter(p => p.id !== id));
  };

  const actualizarProducto = (id, campo, valor) => {
    setProductos(productos.map(p => 
      p.id === id ? { ...p, [campo]: valor } : p
    ));
  };

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