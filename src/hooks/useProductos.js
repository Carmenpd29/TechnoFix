import { useState } from "react";

// Hook para manejar la gestión de productos en la caja
export const useProductos = () => {
  const [productos, setProductos] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({
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
      id: Date.now(),
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
    eliminarProducto,
    actualizarProducto,
    limpiarProductos
  };
};