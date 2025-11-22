import { useState, useEffect } from "react";
import { supabase } from "../supabase/supabaseClient";

// Hook para manejar la gestión de productos TPV
export const useProductosTPV = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [productoEditando, setProductoEditando] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(true);
  const [formulario, setFormulario] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    categoria: "",
    iva: "21",
    codigoBarras: "",
    stock: "0",
    stockMinimo: "5"
  });
  const [formularioCategoria, setFormularioCategoria] = useState({
    nombre: "",
    descripcion: "",
    icono: "📱"
  });

  // Cargar productos y categorías de la base de datos
  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    setCargando(true);
    try {
      await Promise.all([cargarProductos(), cargarCategorias()]);
    } catch (error) {
      console.error('Error cargando datos:', error);
    } finally {
      setCargando(false);
    }
  };

  const cargarProductos = async () => {
    const { data, error } = await supabase
      .from('productos')
      .select(`
        *,
        categoria:categorias_productos(nombre)
      `)
      .eq('activo', true)
      .order('nombre');
    
    if (error) {
      console.error('Error cargando productos:', error);
      return;
    }
    
    setProductos(data || []);
  };

  const cargarCategorias = async () => {
    const { data, error } = await supabase
      .from('categorias_productos')
      .select('*')
      .eq('activa', true)
      .order('nombre');
    
    if (error) {
      console.error('Error cargando categorías:', error);
      return;
    }
    
    setCategorias(data || []);
  };

  // Filtrar productos por búsqueda
  const productosFiltrados = productos.filter(producto =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    producto.descripcion.toLowerCase().includes(busqueda.toLowerCase()) ||
    producto.categoria.toLowerCase().includes(busqueda.toLowerCase()) ||
    producto.codigoBarras.toLowerCase().includes(busqueda.toLowerCase())
  );

  // Manejar cambios en el formulario
  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormulario(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Guardar producto (crear o editar)
  const guardarProducto = async (e) => {
    e.preventDefault();
    setCargando(true);
    
    try {
      const datosProducto = {
        nombre: formulario.nombre,
        descripcion: formulario.descripcion,
        precio: parseFloat(formulario.precio) || 0,
        iva: parseFloat(formulario.iva) || 21,
        stock: parseInt(formulario.stock) || 0,
        stock_minimo: parseInt(formulario.stockMinimo) || 5,
        categoria_id: parseInt(formulario.categoria) || null
      };

      if (productoEditando) {
        // Editar producto existente
        const { error } = await supabase
          .from('productos')
          .update(datosProducto)
          .eq('id', productoEditando.id);
        
        if (error) throw error;
      } else {
        // Crear nuevo producto
        const { error } = await supabase
          .from('productos')
          .insert([datosProducto]);
        
        if (error) throw error;
      }
      
      // Recargar productos
      await cargarProductos();
      limpiarFormulario();
      
      alert(productoEditando ? 'Producto actualizado correctamente' : 'Producto creado correctamente');
    } catch (error) {
      console.error('Error guardando producto:', error);
      alert('Error al guardar el producto: ' + error.message);
    } finally {
      setCargando(false);
    }
  };

  // Editar producto
  const editarProducto = (producto) => {
    setProductoEditando(producto);
    setFormulario({
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio.toString(),
      categoria: producto.categoria,
      iva: producto.iva.toString(),
      codigoBarras: producto.codigoBarras,
      stock: producto.stock.toString(),
      stockMinimo: producto.stockMinimo.toString()
    });
  };

  // Eliminar producto (desactivar)
  const eliminarProducto = async (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este producto?")) {
      setCargando(true);
      try {
        const { error } = await supabase
          .from('productos')
          .update({ activo: false })
          .eq('id', id);
        
        if (error) throw error;
        
        await cargarProductos();
        alert('Producto eliminado correctamente');
      } catch (error) {
        console.error('Error eliminando producto:', error);
        alert('Error al eliminar el producto: ' + error.message);
      } finally {
        setCargando(false);
      }
    }
  };

  // Cancelar edición
  const cancelarEdicion = () => {
    setProductoEditando(null);
    limpiarFormulario();
  };

  // Limpiar formulario
  const limpiarFormulario = () => {
    setFormulario({
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

  // Funciones para categorías
  const manejarCambioCategoria = (e) => {
    const { name, value } = e.target;
    setFormularioCategoria(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const guardarCategoria = async (e) => {
    e.preventDefault();
    setCargando(true);
    
    try {
      const { error } = await supabase
        .from('categorias_productos')
        .insert([{
          nombre: formularioCategoria.nombre,
          descripcion: formularioCategoria.descripcion,
          icono: formularioCategoria.icono
        }]);
      
      if (error) throw error;
      
      await cargarCategorias();
      setFormularioCategoria({ nombre: "", descripcion: "", icono: "📱" });
      alert('Categoría creada correctamente');
    } catch (error) {
      console.error('Error guardando categoría:', error);
      alert('Error al crear la categoría: ' + error.message);
    } finally {
      setCargando(false);
    }
  };

  // Calcular estadísticas
  const estadisticas = {
    totalProductos: productos.length,
    valorInventario: productos.reduce((sum, p) => sum + (p.precio * p.stock), 0),
    stockBajo: productos.filter(p => p.stock <= p.stock_minimo).length,
    categorias: categorias.length
  };

  return {
    productos: productosFiltrados,
    categorias,
    productoEditando,
    busqueda,
    setBusqueda,
    formulario,
    formularioCategoria,
    cargando,
    manejarCambio,
    manejarCambioCategoria,
    guardarProducto,
    guardarCategoria,
    editarProducto,
    eliminarProducto,
    cancelarEdicion,
    cargarDatos,
    estadisticas
  };
};