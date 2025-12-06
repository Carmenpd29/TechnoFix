import React, { useState, useEffect } from "react";
import { FiTrash } from "react-icons/fi";
import { FaCalculator, FaChevronDown, FaChevronUp, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import { FiPlus, FiShoppingCart } from "react-icons/fi";
import { BotonVolver, TituloPage, WrapperPage, supabase } from "../../index";
import { IconBtnTabla } from "../../styles/TablaAdminStyles";
import { IconBtn } from "../../components/general/IconBtn";
import { obtenerCodigoDisplay } from "../../utils/formatearCodigo";
import { useCalculadora } from "../../hooks/useCalculadora";
import { useProductos } from "../../hooks/useProductos";
import { useVentas } from "../../hooks/useVentas";
import { calcularTotales } from "../../utils/tpvUtils";
import {
  CajaContainer,
  CajaMain,
  ProductosSection,
  SectionTitle,
  ProductosLista,
  ProductoItem,
  ProductoInput,
  ProductoNombre,
  EliminarBtn,
  AgregarProductoForm,
  AgregarBtn,
  CalculadoraSection,
  TotalSection,
  TotalLinea,
  DescuentoInput,
  CalculadoraGrid,
  CalculadoraDisplay,
  CalculadoraBtn,
  AccionesSection,
  AccionBtn,
  VentaModal,
  VentaModalContent,
  MetodoPagoSection,
  TablaHeaders,
  HeaderItem,
  CalculadoraToggle,
  CalculadoraIcon,
  CalculadoraMini,
  IvaCheckbox,
  IvaCheckboxLabel,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalMessage,
  ModalButton
} from "../../styles/CajaStyles";

export function Caja() {
    // Refs para los inputs de display de la calculadora
    const inputCalcDisplayRef = React.useRef(null);
    const inputCalcMiniDisplayRef = React.useRef(null);
  const [descuentoGeneral, setDescuentoGeneral] = useState(0);
  const [calculadoraAbierta, setCalculadoraAbierta] = useState(false);
  const [calculadoraMiniAbierta, setCalculadoraMiniAbierta] = useState(false);
  const [clienteSeleccionado, setClienteSeleccionado] = useState("");
  const [clientes, setClientes] = useState([]);
  const [busquedaCliente, setBusquedaCliente] = useState("Cliente General");
  const [productosDB, setProductosDB] = useState([]);
  const [busquedaProducto, setBusquedaProducto] = useState("");
  const [mostrarSugerenciasProducto, setMostrarSugerenciasProducto] = useState(false);
  const [busquedaCodigo, setBusquedaCodigo] = useState("");
  const [mostrarSugerenciasCodigo, setMostrarSugerenciasCodigo] = useState(false);
  
  // Función para limpiar búsqueda cuando se agrega producto
  const limpiarBusquedaProducto = () => {
    setBusquedaProducto("");
    setMostrarSugerenciasProducto(false);
    setBusquedaCodigo("");
    setMostrarSugerenciasCodigo(false);
  };

  // Custom hooks para manejar la lógica
  const calculadora = useCalculadora();
  const productosManager = useProductos(limpiarBusquedaProducto);
  const ventasManager = useVentas();

  // Cargar clientes y productos al montar el componente
  useEffect(() => {
    async function cargarDatos() {
      // Cargar clientes
      const { data: clientesData } = await supabase
        .from("clientes")
        .select("id, nombre, nif, telefono")
        .order("nombre", { ascending: true });
      setClientes(clientesData || []);

      // Cargar productos
      const { data: productosData, error } = await supabase
        .from("productos")
        .select("id, codigo, nombre, precio, iva, activo")
        .order("nombre", { ascending: true });
      
      if (error) {
        console.error("Error al cargar productos:", error);
      }
      console.log("=== DATOS DE BASE DE DATOS ===");
      console.log("Total productos cargados:", productosData?.length || 0);
      console.log("Primeros 3 productos completos:", productosData?.slice(0, 3));
      
      // Revisar específicamente los códigos
      productosData?.forEach((producto, index) => {
        console.log(`Producto ${index + 1}: ID=${producto.id}, Código="${producto.codigo}", Nombre="${producto.nombre}"`);
      });
      
      const productosConCodigo = productosData?.filter(p => p.codigo && p.codigo.trim() !== '') || [];
      console.log("Productos con código válido:", productosConCodigo.length);
      console.log("==============================");
      setProductosDB(productosData || []);
    }
    cargarDatos();
  }, []);

  useEffect(() => {
    if (calculadoraAbierta && inputCalcDisplayRef.current) {
      inputCalcDisplayRef.current.focus();
      inputCalcDisplayRef.current.setSelectionRange(inputCalcDisplayRef.current.value.length, inputCalcDisplayRef.current.value.length);
    }
  }, [calculadoraAbierta]);

  useEffect(() => {
    if (calculadoraMiniAbierta && inputCalcMiniDisplayRef.current) {
      inputCalcMiniDisplayRef.current.focus();
      inputCalcMiniDisplayRef.current.setSelectionRange(inputCalcMiniDisplayRef.current.value.length, inputCalcMiniDisplayRef.current.value.length);
    }
  }, [calculadoraMiniAbierta]);

  // Cerrar sugerencias de productos al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if ((mostrarSugerenciasProducto || mostrarSugerenciasCodigo) && !event.target.closest('.input-group')) {
        setMostrarSugerenciasProducto(false);
        setMostrarSugerenciasCodigo(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mostrarSugerenciasProducto, mostrarSugerenciasCodigo]);

  // Filtrar clientes según búsqueda
  const clientesFiltrados = busquedaCliente && clientes && busquedaCliente.trim().length > 0 ? clientes.filter(cliente => {
    const nombre = cliente.nombre || '';
    const nif = cliente.nif || '';
    const telefono = cliente.telefono || '';
    const busqueda = busquedaCliente.toLowerCase();
    
    return nombre.toLowerCase().includes(busqueda) ||
           nif.toLowerCase().includes(busqueda) ||
           telefono.toLowerCase().includes(busqueda);
  }) : [];

  // Filtrar productos según búsqueda por nombre
  const productosFiltrados = busquedaProducto && productosDB && busquedaProducto.trim().length > 0 ? productosDB.filter(producto => {
    const nombre = producto.nombre || '';
    const busqueda = busquedaProducto.toLowerCase();
    return nombre.toLowerCase().includes(busqueda);
  }) : [];

  // Filtrar productos según búsqueda por código
  const productosFiltradosCodigo = busquedaCodigo && productosDB && busquedaCodigo.trim().length > 0 ? productosDB.filter(producto => {
    console.log(`=== ANÁLISIS INDIVIDUAL PRODUCTO ===`);
    console.log(`ID: ${producto.id}`);
    console.log(`Código raw:`, producto.codigo);
    console.log(`Código type:`, typeof producto.codigo);
    console.log(`Código length:`, producto.codigo ? producto.codigo.length : 'null/undefined');
    console.log(`Nombre:`, producto.nombre);
    console.log(`Objeto completo:`, producto);
    
    const codigo = producto.codigo || '';
    console.log(`Código después de || '':`, codigo);
    console.log(`¿Está vacío?:`, !codigo || codigo.trim() === '');
    
    if (!codigo || codigo.trim() === '') {
      console.log(`❌ RECHAZADO: Código vacío o nulo`);
      return false;
    }
    
    const busqueda = busquedaCodigo.toLowerCase().trim();
    const codigoLimpio = codigo.toLowerCase().trim();
    
    console.log(`Búsqueda procesada: "${busqueda}"`);
    console.log(`Código procesado: "${codigoLimpio}"`);
    
    const coincide = codigoLimpio.includes(busqueda);
    console.log(`¿Coincide "${codigoLimpio}".includes("${busqueda}")? ${coincide}`);
    
    if (coincide) {
      console.log(`✅ ENCONTRADO: ${codigoLimpio} contiene ${busqueda} (${producto.nombre})`);
    } else {
      console.log(`❌ NO COINCIDE: ${codigoLimpio} no contiene ${busqueda}`);
    }
    console.log(`=== FIN ANÁLISIS ===`);
    return coincide;
  }) : [];
  
  if (busquedaCodigo) {
    console.log(`Búsqueda '${busquedaCodigo}' encontró ${productosFiltradosCodigo.length} productos`);
  }

  // Función para seleccionar producto de la base de datos
  const seleccionarProductoDB = (producto) => {
    productosManager.setNuevoProducto({
      ...productosManager.nuevoProducto,
      id: producto.id,
      codigo: producto.codigo || '',
      nombre: producto.nombre,
      precio: producto.precio || '',
      iva: producto.iva || '21'
    });
    setBusquedaProducto("");
    setMostrarSugerenciasProducto(false);
    setBusquedaCodigo(producto.codigo || '');
    setMostrarSugerenciasCodigo(false);
  };

  // Funciones de limpieza y venta
  const limpiarVenta = () => {
    productosManager.limpiarProductos();
    setDescuentoGeneral(0);
    setClienteSeleccionado("");
    setBusquedaCliente("Cliente General");
    setBusquedaProducto("");
    setMostrarSugerenciasProducto(false);
    setBusquedaCodigo("");
    setMostrarSugerenciasCodigo(false);
    calculadora.limpiarCalculadora();
  };

  const manejarConfirmarVenta = () => {
    const clienteInfo = clienteSeleccionado 
      ? clientes.find(c => c.id === clienteSeleccionado)
      : null;
      
    const ventaData = {
      productos: productosManager.productos,
      totales: calcularTotales(productosManager.productos, descuentoGeneral),
      cliente: clienteInfo ? {
        id: clienteInfo.id,
        nombre: clienteInfo.nombre,
        nif: clienteInfo.nif,
        telefono: clienteInfo.telefono
      } : null,
      descuentoGeneral
    };
    
    ventasManager.confirmarVenta(ventaData, limpiarVenta);
  };

  const totales = calcularTotales(productosManager.productos, descuentoGeneral);

  return (
    <WrapperPage maxWidth={1600}>
      <BotonVolver to="/tpv" />
      
      {/* Header responsive para evitar superposición */}
      <style>{`
        .tpv-caja-header {
          padding-left: 120px;
        }
        
        @media (max-width: 768px) {
          .tpv-caja-header {
            padding-left: 20px !important;
            margin-top: 1rem !important;
          }
        }
        
        @media (max-width: 480px) {
          .tpv-caja-header {
            padding-left: 10px !important;
            margin-top: 1.5rem !important;
          }
        }
        
        /* Control de visibilidad de calculadoras */
        .calculadora-desplegable {
          display: block;
        }
        
        @media (max-width: 1200px) {
          .calculadora-desplegable {
            display: none !important;
          }
        }
      `}</style>
      
      <div className="tpv-caja-header">
        <TituloPage>Terminal Punto de Venta</TituloPage>
      </div>
      
      <CajaContainer>
        <CajaMain>
        {/* Sección de Productos */}
        <ProductosSection>
          <SectionTitle>Agregar Producto</SectionTitle>
          
          {/* Formulario con inputs individuales */}
          <AgregarProductoForm
            onSubmit={productosManager.agregarProducto}
            onKeyDown={e => {
              if (
                e.key === 'Enter' &&
                productosManager.nuevoProducto.nombre &&
                productosManager.nuevoProducto.precio
              ) {
                e.preventDefault();
                productosManager.agregarProducto(e);
              }
            }}
          >
            <div className="input-group" style={{ position: 'relative' }}>
              <div className="input-header">Código</div>
              <ProductoInput
                type="text"
                value={busquedaCodigo}
                onChange={(e) => {
                  const valor = e.target.value;
                  setBusquedaCodigo(valor);
                  setMostrarSugerenciasCodigo(valor.length > 0);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    if (productosFiltradosCodigo.length === 1) {
                      seleccionarProductoDB(productosFiltradosCodigo[0]);
                    } else if (productosFiltradosCodigo.length > 1) {
                      // Si hay varios productos, seleccionar el primero
                      seleccionarProductoDB(productosFiltradosCodigo[0]);
                    }
                  }
                }}
                placeholder="Ej: 0001, 0002..."
              />
              {mostrarSugerenciasCodigo && busquedaCodigo.length > 0 && (
                <div style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  width: "350px",
                  minWidth: "250px",
                  maxWidth: "95vw",
                  maxHeight: "180px",
                  overflowY: "auto",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  backgroundColor: "white",
                  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.13)",
                  zIndex: 1000,
                  padding: "0.2rem"
                }}>
                  {productosFiltradosCodigo.length > 0 ? (
                    productosFiltradosCodigo.map((producto) => (
                      <div
                        key={producto.id}
                        onClick={() => seleccionarProductoDB(producto)}
                        style={{
                          padding: "0.5rem",
                          cursor: "pointer",
                          borderBottom: "1px solid #eee",
                          fontSize: "0.75rem",
                          fontWeight: "500"
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = "#f0f8ff"}
                        onMouseLeave={(e) => e.target.style.backgroundColor = "white"}
                      >
                        <div style={{ fontWeight: "bold", color: "rgb(14, 41, 61)" }}>{obtenerCodigoDisplay(producto)}</div>
                        <div>{producto.nombre}</div>
                        <div style={{ fontSize: "0.65rem", color: "#666" }}>€{producto.precio.toFixed(2)}</div>
                      </div>
                    ))
                  ) : (
                    <div style={{
                      padding: "0.75rem",
                      fontSize: "0.75rem",
                      color: "#856404",
                      backgroundColor: "#fff3cd",
                      textAlign: "center",
                      fontStyle: "italic"
                    }}>
                      No se encontraron productos con código "{busquedaCodigo}".
                      <br />
                      <small>Los productos necesitan tener códigos asignados para aparecer aquí.</small>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="input-group" style={{ position: 'relative' }}>
              <div className="input-header">Producto</div>
              <ProductoInput
                type="text"
                value={productosManager.nuevoProducto.nombre}
                onChange={(e) => {
                  const valor = e.target.value;
                  productosManager.setNuevoProducto({...productosManager.nuevoProducto, nombre: valor});
                  setBusquedaProducto(valor);
                  setMostrarSugerenciasProducto(valor.length > 0);
                }}
                placeholder="Escribir o buscar producto existente"
                required
              />
              {mostrarSugerenciasProducto && busquedaProducto.length > 0 && productosFiltrados.length > 0 && (
                <div style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  width: "350px",
                  minWidth: "250px",
                  maxWidth: "95vw",
                  maxHeight: "180px",
                  overflowY: "auto",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  backgroundColor: "white",
                  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.13)",
                  zIndex: 1000,
                  padding: "0.2rem"
                }}>
                  {productosFiltrados.map((producto) => (
                    <div
                      key={producto.id}
                      onClick={() => seleccionarProductoDB(producto)}
                      style={{
                        padding: "0.5rem",
                        cursor: "pointer",
                        borderBottom: "1px solid #eee",
                        fontSize: "0.75rem",
                        fontWeight: "500"
                      }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = "#f0f8ff"}
                      onMouseLeave={(e) => e.target.style.backgroundColor = "white"}
                    >
                      <div style={{ fontWeight: "bold", color: "rgb(14, 41, 61)" }}>{obtenerCodigoDisplay(producto)}</div>
                      <div>{producto.nombre}</div>
                      <div style={{ fontSize: "0.65rem", color: "#666" }}>€{producto.precio.toFixed(2)}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="input-group">
              <div className="input-header">Precio</div>
              <ProductoInput
                type="number"
                value={productosManager.nuevoProducto.precio}
                onChange={(e) => productosManager.setNuevoProducto({...productosManager.nuevoProducto, precio: e.target.value})}
                placeholder="0.00"
                step="0.01"
                required
              />
            </div>
            <div className="input-group">
              <div className="input-header">Uds.</div>
              <ProductoInput
                type="number"
                value={productosManager.nuevoProducto.cantidad}
                onChange={(e) => productosManager.setNuevoProducto({...productosManager.nuevoProducto, cantidad: e.target.value})}
                placeholder="1"
                step="1"
              />
            </div>
            <div className="input-group">
              <div className="input-header">IVA %</div>
              <ProductoInput
                type="number"
                value={productosManager.nuevoProducto.iva}
                onChange={(e) => productosManager.setNuevoProducto({...productosManager.nuevoProducto, iva: e.target.value})}
                placeholder="21"
              />
            </div>
            <div className="input-group">
              <div className="input-header">Desc. %</div>
              <ProductoInput
                type="number"
                value={productosManager.nuevoProducto.descuento}
                onChange={(e) => productosManager.setNuevoProducto({...productosManager.nuevoProducto, descuento: e.target.value})}
                placeholder="0"
              />
            </div>
            <div className="input-group">
              <div className="input-header">IVA Inc.</div>
              <IvaCheckboxLabel>
                <IvaCheckbox
                  type="checkbox"
                  checked={productosManager.nuevoProducto.ivaIncluido}
                  onChange={(e) => productosManager.setNuevoProducto({...productosManager.nuevoProducto, ivaIncluido: e.target.checked})}
                />
              </IvaCheckboxLabel>
            </div>
            <div className="input-group">
              <div className="input-header">Acción</div>
              <IconBtnTabla
                type="submit"
                title="Agregar producto"
                disabled={!productosManager.nuevoProducto.nombre || !productosManager.nuevoProducto.precio}
              >
                <FiShoppingCart
                  style={{
                    fontSize: '1.3rem',
                    color: (!productosManager.nuevoProducto.nombre || !productosManager.nuevoProducto.precio) ? '#607074' : '#007bff',
                    paddingTop: '4px'
                  }}
                />
              </IconBtnTabla>
            </div>
          </AgregarProductoForm>
          
          <SectionTitle style={{marginTop: '0.5rem'}}>Líneas de Venta</SectionTitle>
          
          {/* Encabezado único para todas las líneas */}
          <TablaHeaders>
            <HeaderItem>Código</HeaderItem>
            <HeaderItem>Producto</HeaderItem>
            <HeaderItem>Precio</HeaderItem>
            <HeaderItem>Uds.</HeaderItem>
            <HeaderItem>IVA %</HeaderItem>
            <HeaderItem>Desc. %</HeaderItem>
            <HeaderItem>IVA Inc.</HeaderItem>
            <HeaderItem>Acción</HeaderItem>
          </TablaHeaders>
          
          <ProductosLista>
            {productosManager.productos.map((producto) => (
              <ProductoItem key={producto.id}>
                <div style={{ 
                  fontFamily: "monospace", 
                  fontSize: "0.75rem", 
                  fontWeight: "bold", 
                  color: "#007bff",
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  {obtenerCodigoDisplay(producto)}
                </div>
                <ProductoNombre>{producto.nombre}</ProductoNombre>
                <ProductoInput
                  type="number"
                  value={producto.precio}
                  onChange={(e) => productosManager.actualizarProducto(producto.id, 'precio', e.target.value)}
                  placeholder="0.00"
                  step="0.01"
                  className="precio"
                />
                <ProductoInput
                  type="number"
                  value={producto.cantidad}
                  onChange={(e) => productosManager.actualizarProducto(producto.id, 'cantidad', e.target.value)}
                  placeholder="1"
                  step="1"
                />
                <ProductoInput
                  type="number"
                  value={producto.iva}
                  onChange={(e) => productosManager.actualizarProducto(producto.id, 'iva', e.target.value)}
                  placeholder="21"
                  className="iva"
                />
                <ProductoInput
                  type="number"
                  value={producto.descuento}
                  onChange={(e) => productosManager.actualizarProducto(producto.id, 'descuento', e.target.value)}
                  placeholder="0"
                  className="descuento"
                />
                <IvaCheckboxLabel>
                  <IvaCheckbox
                    type="checkbox"
                    checked={producto.ivaIncluido !== false}
                    onChange={(e) => productosManager.actualizarProducto(producto.id, 'ivaIncluido', e.target.checked)}
                  />
                </IvaCheckboxLabel>
                <IconBtnTabla eliminar onClick={() => productosManager.eliminarProducto(producto.id)} title="Eliminar línea">
                  <FiTrash style={{ fontSize: '1.3rem', paddingTop: '4px' }} />
                </IconBtnTabla>
              </ProductoItem>
            ))}
          </ProductosLista>
        </ProductosSection>

        {/* Sección de Calculadora y Totales */}
        <CalculadoraSection>
          {/* Selección de Cliente */}
          <TotalSection style={{ marginBottom: "1rem" }}>
            <SectionTitle>Cliente</SectionTitle>
            <div className="input-group" style={{ position: 'relative', marginBottom: '0.5rem' }}>
              <div className="input-header">Buscar cliente</div>
              <input
                type="text"
                value={busquedaCliente}
                onChange={(e) => {
                  const valor = e.target.value;
                  setBusquedaCliente(valor);
                  if (valor === "") {
                    setClienteSeleccionado("");
                    setBusquedaCliente("Cliente General");
                  }
                }}
                onFocus={() => {
                  if (busquedaCliente === "Cliente General") {
                    setBusquedaCliente("");
                  }
                }}
                placeholder="Buscar cliente por nombre, NIF o teléfono..."
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "3px",
                  padding: "0.15rem 0.2rem",
                  fontSize: "0.75rem",
                  width: "100%",
                  minHeight: "26px",
                  boxSizing: "border-box",
                  backgroundColor: "white"
                }}
              />
              {busquedaCliente && busquedaCliente !== "Cliente General" && busquedaCliente.length > 0 &&
                !clienteSeleccionado && clientesFiltrados.length > 0 && (
                  <div style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    width: "100%",
                    minWidth: "180px",
                    maxWidth: "100%",
                    maxHeight: "180px",
                    overflowY: "auto",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    backgroundColor: "white",
                    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.13)",
                    zIndex: 1000,
                    padding: "0.2rem"
                  }}>
                    {clientesFiltrados.map((cliente) => (
                      <div
                        key={cliente.id}
                        onClick={() => {
                          setClienteSeleccionado(cliente.id);
                          setBusquedaCliente(cliente.nombre);
                          setTimeout(() => {
                            document.activeElement.blur();
                          }, 0);
                        }}
                        style={{
                          padding: "0.5rem",
                          cursor: "pointer",
                          borderBottom: "1px solid #eee",
                          fontSize: "0.75rem",
                          fontWeight: "500"
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = "#f0f8ff"}
                        onMouseLeave={(e) => e.target.style.backgroundColor = "white"}
                      >
                        <div style={{ fontWeight: "bold", color: "rgb(14, 41, 61)" }}>{cliente.nombre}</div>
                        <div>{cliente.nif || 'Sin NIF'} • {cliente.telefono || 'Sin teléfono'}</div>
                      </div>
                    ))}
                  </div>
                )
              }
              {busquedaCliente && busquedaCliente !== "Cliente General" && busquedaCliente.length > 0 &&
                !clienteSeleccionado && clientesFiltrados.length === 0 && (
                  <div style={{
                    padding: "0.75rem",
                    fontSize: "0.75rem",
                    color: "#856404",
                    backgroundColor: "#fff3cd",
                    textAlign: "center",
                    fontStyle: "italic"
                  }}>
                    No se encontraron clientes con "{busquedaCliente}".
                  </div>
                )
              }
              {clienteSeleccionado && busquedaCliente && busquedaCliente !== "Cliente General" && (
                <div style={{
                  padding: "0.5rem",
                  backgroundColor: "#f0f8ff",
                  borderRadius: "4px",
                  fontSize: "0.9rem",
                  color: "#0066cc",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}>
                  <span>✓ Cliente seleccionado</span>
                  <button
                    onClick={() => {
                      setClienteSeleccionado("");
                      setBusquedaCliente("");
                    }}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#dc3545",
                      cursor: "pointer",
                      fontSize: "0.9rem"
                    }}
                  >
                    Limpiar
                  </button>
                </div>
              )}
            </div>
          </TotalSection>

          {/* Totales */}
          <TotalSection>
            <SectionTitle>Resumen de Venta</SectionTitle>
            
            <DescuentoInput>
              <label>Descuento:</label>
              <input
                type="number"
                value={descuentoGeneral}
                onChange={(e) => setDescuentoGeneral(parseFloat(e.target.value) || 0)}
                placeholder="0"
                step="0.1"
                min="0"
                max="100"
              />
              <span>%</span>
            </DescuentoInput>

            <TotalLinea>
              <span>Subtotal:</span>
              <span>€{totales.subtotal.toFixed(2)}</span>
            </TotalLinea>
            <TotalLinea>
              <span>Descuentos:</span>
              <span>-€{totales.totalDescuentos.toFixed(2)}</span>
            </TotalLinea>
            <TotalLinea>
              <span>IVA:</span>
              <span>€{totales.totalIva.toFixed(2)}</span>
            </TotalLinea>
            <TotalLinea className="total-final">
              <span>TOTAL:</span>
              <span>€{totales.total.toFixed(2)}</span>
            </TotalLinea>
          </TotalSection>

          {/* Acciones */}
          <AccionesSection>
            <AccionBtn cobrar onClick={() => ventasManager.procesarVenta(productosManager.productos)} disabled={productosManager.productos.length === 0}>
              {ventasManager.procesandoVenta ? 'Procesando...' : `Finalizar venta €${totales.total.toFixed(2)}`}
            </AccionBtn>
            <AccionBtn limpiar onClick={limpiarVenta}>
              Limpiar
            </AccionBtn>
          </AccionesSection>


          {/* Calculadora Desplegable - Solo en pantallas grandes */}
          <div className="calculadora-desplegable">
            <CalculadoraToggle onClick={() => setCalculadoraAbierta(!calculadoraAbierta)}>
              <SectionTitle>Calculadora</SectionTitle>
              {calculadoraAbierta ? <FaChevronUp /> : <FaChevronDown />}
            </CalculadoraToggle>
            
            {calculadoraAbierta && (
              <CalculadoraGrid>
                <div style={{gridColumn: '1 / -1', marginBottom: '0.5rem'}}>
                  <input
                    ref={inputCalcDisplayRef}
                    value={calculadora.calculadora}
                    style={{
                      width: '100%',
                      background: 'transparent',
                      border: 'none',
                      fontSize: '1.3rem',
                      fontWeight: 'bold',
                      color: '#232728',
                      textAlign: 'right',
                      outline: 'none',
                    }}
                    onChange={() => {}}
                    onKeyDown={e => {
                      if (e.key >= '0' && e.key <= '9') calculadora.inputDigito(Number(e.key));
                      if (e.key === '+' || e.key === '-') calculadora.inputOperador(e.key);
                      if (e.key === '*' || e.key === 'x' || e.key === 'X') calculadora.inputOperador('×');
                      if (e.key === '/' || e.key === ':') calculadora.inputOperador('÷');
                      if (e.key === '.' || e.key === ',') calculadora.inputDecimal();
                      if (e.key === 'Enter' || e.key === '=') calculadora.ejecutarCalculo();
                      if (e.key === 'Backspace') calculadora.setCalculadora(calculadora.calculadora.slice(0, -1) || '0');
                      if (e.key === 'c' || e.key === 'C') calculadora.limpiarCalculadora();
                      e.preventDefault();
                    }}
                  />
                </div>
                <CalculadoraBtn clear onClick={calculadora.limpiarCalculadora}>C</CalculadoraBtn>
                <CalculadoraBtn onClick={() => calculadora.inputOperador("÷")}>÷</CalculadoraBtn>
                <CalculadoraBtn onClick={() => calculadora.inputOperador("×")}>×</CalculadoraBtn>
                <CalculadoraBtn onClick={() => calculadora.setCalculadora(calculadora.calculadora.slice(0, -1) || "0")}>←</CalculadoraBtn>
                <CalculadoraBtn onClick={() => calculadora.inputDigito(7)}>7</CalculadoraBtn>
                <CalculadoraBtn onClick={() => calculadora.inputDigito(8)}>8</CalculadoraBtn>
                <CalculadoraBtn onClick={() => calculadora.inputDigito(9)}>9</CalculadoraBtn>
                <CalculadoraBtn operator onClick={() => calculadora.inputOperador("-")}>-</CalculadoraBtn>
                <CalculadoraBtn onClick={() => calculadora.inputDigito(4)}>4</CalculadoraBtn>
                <CalculadoraBtn onClick={() => calculadora.inputDigito(5)}>5</CalculadoraBtn>
                <CalculadoraBtn onClick={() => calculadora.inputDigito(6)}>6</CalculadoraBtn>
                <CalculadoraBtn operator onClick={() => calculadora.inputOperador("+")}>+</CalculadoraBtn>
                <CalculadoraBtn onClick={() => calculadora.inputDigito(1)}>1</CalculadoraBtn>
                <CalculadoraBtn onClick={() => calculadora.inputDigito(2)}>2</CalculadoraBtn>
                <CalculadoraBtn onClick={() => calculadora.inputDigito(3)}>3</CalculadoraBtn>
                <CalculadoraBtn equals onClick={calculadora.ejecutarCalculo} style={{gridRow: "span 2"}}>=</CalculadoraBtn>
                <CalculadoraBtn onClick={() => calculadora.inputDigito(0)} style={{gridColumn: "span 2"}}>0</CalculadoraBtn>
                <CalculadoraBtn onClick={calculadora.inputDecimal}>.</CalculadoraBtn>
              </CalculadoraGrid>
            )}
          </div>
        </CalculadoraSection>
      </CajaMain>

      {/* Modal de Venta */}
      {ventasManager.mostrarVentaModal && (
        <VentaModal onClick={ventasManager.cancelarVenta}>
          <VentaModalContent onClick={e => e.stopPropagation()}>
            <h3>Confirmar Venta</h3>
            <div className="total">€{totales.total.toFixed(2)}</div>
            
            <MetodoPagoSection>
              <label>Método de Pago:</label>
              <select value={ventasManager.metodoPago} onChange={(e) => ventasManager.setMetodoPago(e.target.value)}>
                <option value="efectivo">Efectivo</option>
                <option value="tarjeta">Tarjeta</option>
                <option value="transferencia">Transferencia</option>
                <option value="mixto">Pago Mixto</option>
              </select>
            </MetodoPagoSection>

            <div>
              {clienteSeleccionado && (
                <p><strong>Cliente:</strong> {clientes.find(c => c.id === clienteSeleccionado)?.nombre || "Cliente General"}</p>
              )}
              <p>{productosManager.productos.length} productos</p>
              <p>IVA: €{totales.totalIva.toFixed(2)}</p>
              {totales.totalDescuentos > 0 && (
                <p>Descuentos aplicados: €{totales.totalDescuentos.toFixed(2)}</p>
              )}
            </div>

            <div className="acciones">
              <AccionBtn onClick={ventasManager.cancelarVenta}>
                Cancelar
              </AccionBtn>
              <AccionBtn cobrar onClick={manejarConfirmarVenta} disabled={ventasManager.procesandoVenta}>
                {ventasManager.procesandoVenta ? 'Procesando...' : 'Confirmar Venta'}
              </AccionBtn>
            </div>
          </VentaModalContent>
        </VentaModal>
      )}

      {/* Calculadora Flotante para móviles/tablets */}
      <CalculadoraIcon onClick={() => setCalculadoraMiniAbierta(!calculadoraMiniAbierta)}>
        <FaCalculator />
      </CalculadoraIcon>

      <CalculadoraMini open={calculadoraMiniAbierta}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <SectionTitle style={{ margin: 0, fontSize: '0.9rem' }}>Calculadora</SectionTitle>
          <button 
            onClick={() => setCalculadoraMiniAbierta(false)}
            style={{ background: 'none', border: 'none', fontSize: '1rem', cursor: 'pointer' }}
          >
            ×
          </button>
        </div>
        <CalculadoraGrid>
          <div style={{gridColumn: '1 / -1', marginBottom: '0.5rem'}}>
            <input
              ref={inputCalcMiniDisplayRef}
              value={calculadora.calculadora}
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none',
                fontSize: '1.3rem',
                fontWeight: 'bold',
                color: '#232728',
                textAlign: 'right',
                outline: 'none',
              }}
              onChange={() => {}}
              onKeyDown={e => {
                if (e.key >= '0' && e.key <= '9') calculadora.inputDigito(Number(e.key));
                if (e.key === '+' || e.key === '-') calculadora.inputOperador(e.key);
                if (e.key === '*' || e.key === 'x' || e.key === 'X') calculadora.inputOperador('×');
                if (e.key === '/' || e.key === ':') calculadora.inputOperador('÷');
                if (e.key === '.' || e.key === ',') calculadora.inputDecimal();
                if (e.key === 'Enter' || e.key === '=') calculadora.ejecutarCalculo();
                if (e.key === 'Backspace') calculadora.setCalculadora(calculadora.calculadora.slice(0, -1) || '0');
                if (e.key === 'c' || e.key === 'C') calculadora.limpiarCalculadora();
                e.preventDefault();
              }}
            />
          </div>
          <CalculadoraBtn clear onClick={calculadora.limpiarCalculadora}>C</CalculadoraBtn>
          <CalculadoraBtn onClick={() => calculadora.inputOperador("÷")}>÷</CalculadoraBtn>
          <CalculadoraBtn onClick={() => calculadora.inputOperador("×")}>×</CalculadoraBtn>
          <CalculadoraBtn onClick={() => calculadora.setCalculadora(calculadora.calculadora.slice(0, -1) || "0")}>←</CalculadoraBtn>
          <CalculadoraBtn onClick={() => calculadora.inputDigito(7)}>7</CalculadoraBtn>
          <CalculadoraBtn onClick={() => calculadora.inputDigito(8)}>8</CalculadoraBtn>
          <CalculadoraBtn onClick={() => calculadora.inputDigito(9)}>9</CalculadoraBtn>
          <CalculadoraBtn operator onClick={() => calculadora.inputOperador("-")}>-</CalculadoraBtn>
          <CalculadoraBtn onClick={() => calculadora.inputDigito(4)}>4</CalculadoraBtn>
          <CalculadoraBtn onClick={() => calculadora.inputDigito(5)}>5</CalculadoraBtn>
          <CalculadoraBtn onClick={() => calculadora.inputDigito(6)}>6</CalculadoraBtn>
          <CalculadoraBtn operator onClick={() => calculadora.inputOperador("+")}>+</CalculadoraBtn>
          <CalculadoraBtn onClick={() => calculadora.inputDigito(1)}>1</CalculadoraBtn>
          <CalculadoraBtn onClick={() => calculadora.inputDigito(2)}>2</CalculadoraBtn>
          <CalculadoraBtn onClick={() => calculadora.inputDigito(3)}>3</CalculadoraBtn>
          <CalculadoraBtn equals onClick={calculadora.ejecutarCalculo} style={{gridRow: "span 2"}}>=</CalculadoraBtn>
          <CalculadoraBtn onClick={() => calculadora.inputDigito(0)} style={{gridColumn: "span 2"}}>0</CalculadoraBtn>
          <CalculadoraBtn onClick={calculadora.inputDecimal}>.</CalculadoraBtn>
        </CalculadoraGrid>
      </CalculadoraMini>

      {/* Modal de Éxito */}
      {ventasManager.mostrarModalExito && (
        <ModalOverlay onClick={ventasManager.cerrarModalExito}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader className="success">
              <FaCheckCircle className="icon" />
            </ModalHeader>
            <ModalMessage>{ventasManager.mensajeModal}</ModalMessage>
            <ModalButton onClick={ventasManager.cerrarModalExito}>
              Aceptar
            </ModalButton>
          </ModalContent>
        </ModalOverlay>
      )}

      {/* Modal de Error */}
      {ventasManager.mostrarModalError && (
        <ModalOverlay onClick={ventasManager.cerrarModalError}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader className="error">
              <FaExclamationTriangle className="icon" />
            </ModalHeader>
            <ModalMessage>{ventasManager.mensajeModal}</ModalMessage>
            <ModalButton error onClick={ventasManager.cerrarModalError}>
              Aceptar
            </ModalButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </CajaContainer>
  </WrapperPage>
  );
}