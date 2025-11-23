import { useState, useEffect } from "react";
import { supabase } from "../supabase/supabaseClient";
import { obtenerCodigoUnico } from "../utils/generarCodigoProducto";

// Hook para manejar la gestión de productos TPV
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
      .order('codigo');
    
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
  const manejarCambio = async (e) => {
    const { name, value } = e.target;
    
    // Si cambió la categoría y no hay código manual, generar uno sugerido
    if (name === 'categoria' && value && !formulario.codigo?.trim() && !productoEditando) {
      try {
        // Obtener nombre de la categoría
        const categoria = categorias.find(cat => cat.id === parseInt(value));
        if (categoria) {
          const codigoSugerido = await obtenerCodigoUnico(supabase, parseInt(value), categoria.nombre);
          setFormulario(prev => ({
            ...prev,
            [name]: value,
            codigo: codigoSugerido
          }));
          return;
        }
      } catch (error) {
        console.error('Error generando código sugerido:', error);
      }
    }
    
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
        // Editar producto existente - no cambiar el código
        const { error } = await supabase
          .from('productos')
          .update(datosProducto)
          .eq('id', productoEditando.id);
        
        if (error) throw error;
      } else {
        // Crear nuevo producto
        
        let codigoFinal = formulario.codigo?.trim();
        
        // Si no hay código manual, generar uno automático
        if (!codigoFinal) {
          // 1. Obtener la información de la categoría para generar el código
          let nombreCategoria = 'general';
          if (datosProducto.categoria_id) {
            const { data: categoria } = await supabase
              .from('categorias_productos')
              .select('nombre')
              .eq('id', datosProducto.categoria_id)
              .single();
            
            if (categoria) {
              nombreCategoria = categoria.nombre;
            }
          }
          
          // 2. Generar código único automático
          codigoFinal = await obtenerCodigoUnico(supabase, datosProducto.categoria_id, nombreCategoria);
        }
        
        // 3. Agregar el código final a los datos del producto
        datosProducto.codigo = codigoFinal;
        
        // 4. Insertar el producto con el código
        const { error } = await supabase
          .from('productos')
          .insert([datosProducto]);
        
        if (error) throw error;
      }
      
      // Recargar productos
      await cargarProductos();
      
      const eraEdicion = productoEditando !== null;
      limpiarFormulario();
      setProductoEditando(null);
      
      setMensajeModal(eraEdicion ? 'Producto actualizado correctamente' : 'Producto creado correctamente');
      setMostrarModalExito(true);
    } catch (error) {
      console.error('Error guardando producto:', error);
      setMensajeModal('Error al guardar el producto: ' + error.message);
      setMostrarModalError(true);
    } finally {
      setCargando(false);
    }
  };

  // Editar producto
  const editarProducto = (producto) => {
    setProductoEditando(producto);
    setFormulario({
      codigo: producto.codigo || "",
      nombre: producto.nombre || "",
      descripcion: producto.descripcion || "",
      precio: producto.precio ? producto.precio.toString() : "",
      categoria: producto.categoria_id ? producto.categoria_id.toString() : "",
      iva: producto.iva ? producto.iva.toString() : "21",
      codigoBarras: producto.codigo_barras || "",
      stock: producto.stock ? producto.stock.toString() : "0",
      stockMinimo: producto.stock_minimo ? producto.stock_minimo.toString() : "5"
    });
  };

  // Eliminar producto (desactivar)
  const eliminarProducto = (id) => {
    const producto = productos.find(p => p.id === id);
    setProductoAEliminar(producto);
    setMensajeModal(`¿Estás seguro de que quieres eliminar el producto "${producto?.nombre}"?`);
    setMostrarModalConfirmacion(true);
  };

  const confirmarEliminacion = async () => {
    if (!productoAEliminar) return;
    
    setCargando(true);
    setMostrarModalConfirmacion(false);
    
    try {
      const { error } = await supabase
        .from('productos')
        .update({ activo: false })
        .eq('id', productoAEliminar.id);
      
      if (error) throw error;
      
      await cargarProductos();
      setMensajeModal('Producto eliminado correctamente');
      setMostrarModalExito(true);
    } catch (error) {
      console.error('Error eliminando producto:', error);
      setMensajeModal('Error al eliminar el producto: ' + error.message);
      setMostrarModalError(true);
    } finally {
      setCargando(false);
      setProductoAEliminar(null);
    }
  };

  const cancelarEliminacion = () => {
    setMostrarModalConfirmacion(false);
    setProductoAEliminar(null);
    setMensajeModal("");
  };

  // Cancelar edición
  const cancelarEdicion = () => {
    setProductoEditando(null);
    limpiarFormulario();
  };

  // Limpiar formulario
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
          icono: formularioCategoria.icono,
          activa: true
        }]);
      
      if (error) throw error;
      
      await cargarCategorias();
      setFormularioCategoria({ nombre: "", descripcion: "", icono: "📱" });
      setMensajeModal('Categoría creada correctamente');
      setMostrarModalExito(true);
    } catch (error) {
      console.error('Error guardando categoría:', error);
      setMensajeModal('Error al crear la categoría: ' + error.message);
      setMostrarModalError(true);
    } finally {
      setCargando(false);
    }
  };

  // Funciones para cerrar modales
  const cerrarModalExito = () => {
    setMostrarModalExito(false);
    setMensajeModal("");
  };

  const cerrarModalError = () => {
    setMostrarModalError(false);
    setMensajeModal("");
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
    estadisticas,
    // Estados y funciones para modales
    mostrarModalExito,
    mostrarModalError,
    mostrarModalConfirmacion,
    mensajeModal,
    cerrarModalExito,
    cerrarModalError,
    confirmarEliminacion,
    cancelarEliminacion
  };
};