import { useState, useEffect } from "react";
import { supabase } from "../supabase/supabaseClient";
import { obtenerCodigoUnico } from "../utils/generarCodigoProducto";
import { withTimeout } from "../utils/supabaseUtils";

/**
 * Hook personalizado para la gestión de productos del TPV.
 * Maneja CRUD de productos, categorías, stock, filtros de búsqueda y control de modales de confirmación, éxito y error.
 */
export const useProductosTPV = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [productoEditando, setProductoEditando] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(true);

  // Estados para modales
  const [mostrarModalExito, setMostrarModalExito] = useState(false);
  const [mostrarModalError, setMostrarModalError] = useState(false);
  const [mostrarModalConfirmacion, setMostrarModalConfirmacion] = useState(false);
  const [mensajeModal, setMensajeModal] = useState("");
  const [productoAEliminar, setProductoAEliminar] = useState(null);

  // Formulario de producto
  const [formulario, setFormulario] = useState({
    codigo: "",
    nombre: "",
    descripcion: "",
    precio: "",
    categoria: "",
    iva: "21",
    codigoBarras: "",
    stock: "0",
    stockMinimo: "5"
  });

  // Formulario de categoría
  const [formularioCategoria, setFormularioCategoria] = useState({
    nombre: "",
    descripcion: "",
    icono: "📱"
  });

  /**
   * Carga inicial de productos y categorías
   */
  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    setCargando(true);
    try {
      await Promise.all([cargarProductos(), cargarCategorias()]);
    } finally {
      setCargando(false);
    }
  };

  const cargarProductos = async () => {
    try {
      const { data, error } = await withTimeout(
        supabase.from("productos").select("*, categoria:categorias_productos(nombre)").eq("activo", true).order("codigo"),
        15000
      );
      if (!error) setProductos(data || []);
      else console.error('Error cargarProductos:', error);
    } catch (err) {
      console.error('Error cargarProductos (timeout or network):', err);
    }
  };

  const cargarCategorias = async () => {
    try {
      const { data, error } = await withTimeout(
        supabase.from("categorias_productos").select("*").eq("activa", true).order("nombre"),
        15000
      );
      if (!error) setCategorias(data || []);
      else console.error('Error cargarCategorias:', error);
    } catch (err) {
      console.error('Error cargarCategorias (timeout or network):', err);
    }
  };

  /**
   * Recarga productos tras completar una venta
   */
  useEffect(() => {
    const handler = () => cargarDatos();
    window?.addEventListener("venta:completada", handler);
    return () => window?.removeEventListener("venta:completada", handler);
  }, []);

  /**
   * Filtrado de productos por texto de búsqueda
   */
  const productosFiltrados = productos.filter(p =>
    [p.nombre, p.descripcion, p.categoria, p.codigoBarras]
      .join(" ")
      .toLowerCase()
      .includes(busqueda.toLowerCase())
  );

  /**
   * Manejo de cambios del formulario de producto
   */
  const manejarCambio = async (e) => {
    const { name, value } = e.target;

    if (name === "categoria" && value && !formulario.codigo && !productoEditando) {
      const categoria = categorias.find(c => c.id === parseInt(value));
      if (categoria) {
        const codigo = await obtenerCodigoUnico(supabase, categoria.id, categoria.nombre);
        setFormulario(prev => ({ ...prev, categoria: value, codigo }));
        return;
      }
    }

    setFormulario(prev => ({ ...prev, [name]: value }));
  };

  /**
   * Crear o actualizar producto
   */
  const guardarProducto = async (e) => {
    e.preventDefault();
    setCargando(true);

    try {
      const datos = {
        nombre: formulario.nombre,
        descripcion: formulario.descripcion,
        precio: parseFloat(formulario.precio) || 0,
        iva: parseFloat(formulario.iva) || 21,
        stock: Math.max(0, parseInt(formulario.stock) || 0),
        stock_minimo: Math.max(0, parseInt(formulario.stockMinimo) || 5),
        categoria_id: parseInt(formulario.categoria) || null
      };

      if (productoEditando) {
        await supabase.from("productos").update(datos).eq("id", productoEditando.id);
      } else {
        if (!formulario.codigo) {
          const nombreCategoria = categorias.find(c => c.id === datos.categoria_id)?.nombre || "general";
          datos.codigo = await obtenerCodigoUnico(supabase, datos.categoria_id, nombreCategoria);
        } else {
          datos.codigo = formulario.codigo;
        }

        await supabase.from("productos").insert([datos]);
      }

      await cargarProductos();
      limpiarFormulario();
      setProductoEditando(null);
      setMensajeModal("Producto guardado correctamente");
      setMostrarModalExito(true);

    } catch (error) {
      setMensajeModal("Error al guardar el producto");
      setMostrarModalError(true);
    } finally {
      setCargando(false);
    }
  };

  const editarProducto = (producto) => {
    setProductoEditando(producto);
    setFormulario({
      codigo: producto.codigo || "",
      nombre: producto.nombre || "",
      descripcion: producto.descripcion || "",
      precio: producto.precio?.toString() || "",
      categoria: producto.categoria_id?.toString() || "",
      iva: producto.iva?.toString() || "21",
      codigoBarras: producto.codigo_barras || "",
      stock: producto.stock?.toString() || "0",
      stockMinimo: producto.stock_minimo?.toString() || "5"
    });
  };

  const eliminarProducto = (id) => {
    const prod = productos.find(p => p.id === id);
    setProductoAEliminar(prod);
    setMensajeModal(`¿Eliminar "${prod?.nombre}"?`);
    setMostrarModalConfirmacion(true);
  };

  const confirmarEliminacion = async () => {
    if (!productoAEliminar) return;
    await supabase.from("productos").update({ activo: false }).eq("id", productoAEliminar.id);
    await cargarProductos();
    setMostrarModalConfirmacion(false);
    setMostrarModalExito(true);
    setMensajeModal("Producto eliminado");
  };

  const cancelarEdicion = () => {
    setProductoEditando(null);
    limpiarFormulario();
  };

  const limpiarFormulario = () => {
    setFormulario({
      codigo: "",
      nombre: "",
      descripcion: "",
      precio: "",
      categoria: "",
      iva: "21",
      codigoBarras: "",
      stock: "0",
      stockMinimo: "5"
    });
  };

  /**
   * Estadísticas del inventario
   */
  const estadisticas = {
    totalProductos: productos.length,
    valorInventario: productos.reduce((s, p) => s + p.precio * p.stock, 0),
    stockBajo: productos.filter(p => p.stock <= p.stock_minimo).length,
    categorias: categorias.length
  };

  return {
    productos: productosFiltrados,
    categorias,
    formulario,
    formularioCategoria,
    productoEditando,
    busqueda,
    setBusqueda,
    cargando,
    manejarCambio,
    guardarProducto,
    editarProducto,
    eliminarProducto,
    confirmarEliminacion,
    cancelarEdicion,
    estadisticas,
    mostrarModalExito,
    mostrarModalError,
    mostrarModalConfirmacion,
    mensajeModal
  };
};
