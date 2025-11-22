import React, { useState } from "react";
import { FiSearch, FiPackage, FiTool, FiCpu, FiSettings, FiHeadphones, FiActivity, FiArrowLeft, FiPlus, FiFolder, FiHelpCircle } from "react-icons/fi";
import { BotonVolver, TituloPage, WrapperPage, Opciones, ManualPage, Tabla, TablaContainer, IconBtn, BotonesContainer, BotonMenu } from "../../index";
import { TPVBotonMenu } from "../../styles/TPVBotonMenuStyles";
import { useProductosTPV } from "../../hooks/useProductosTPV";
import {
  ProductosContainer,
  ProductosGrid,
  FormularioSection,
  ListaSection,
  SectionTitle,
  FormularioProducto,
  FormGroup,
  Input,
  TextArea,
  Select,
  FormRow,
  GuardarBtn,
  BuscadorContainer,
  BuscadorInput,
  BuscadorIcon,
  ProductosListaContainer,
  ProductoCard,
  ProductoNombre,
  ProductoInfo,
  ProductoInfoItem,
  ProductoDescripcion,
  AccionesProducto,
  EditarBtn,
  EliminarBtn,
  EstadisticasContainer,
  EstadisticaCard,
  NoProductos,
  CategoriaTag
} from "../../styles/ProductosStyles";

// Estilos CSS para las animaciones
const animationStyles = `
  @keyframes slideDown {
    from {
      opacity: 0;
      max-height: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      max-height: 1000px;
      transform: translateY(0);
    }
  }
`;

// Insertar estilos en el head si no existen
if (!document.querySelector('#productos-animations')) {
  const style = document.createElement('style');
  style.id = 'productos-animations';
  style.textContent = animationStyles;
  document.head.appendChild(style);
}

export function Productos() {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [mostrandoFormulario, setMostrandoFormulario] = useState(false);
  const [mostrandoFormularioCategoria, setMostrandoFormularioCategoria] = useState(false);
  const [mostrandoTablaProductos, setMostrandoTablaProductos] = useState(false);
  const [mostrandoTablaCategorias, setMostrandoTablaCategorias] = useState(false);
  const [filtroCategoria, setFiltroCategoria] = useState('');
  const [mostrandoAyuda, setMostrandoAyuda] = useState(false);
  const [categoriasAbiertas, setCategoriasAbiertas] = useState({});
  
  const {
    productos,
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
    estadisticas
  } = useProductosTPV();
  
  const toggleCategoria = (categoriaId) => {
    setCategoriasAbiertas(prev => ({
      ...prev,
      [categoriaId]: !prev[categoriaId]
    }));
  };
  
  const categoriasConIconos = [
    { id: 1, label: "Reparaciones", icon: <FiTool size={24} color="#28a745" /> },
    { id: 2, label: "Componentes", icon: <FiCpu size={24} color="#007bff" /> },
    { id: 3, label: "Servicios", icon: <FiSettings size={24} color="#ffc107" /> },
    { id: 4, label: "Accesorios", icon: <FiHeadphones size={24} color="#6f42c1" /> },
    { id: 5, label: "Diagnósticos", icon: <FiActivity size={24} color="#dc3545" /> }
  ];

  return (
    <WrapperPage maxWidth={1400}>
      <BotonVolver to="/tpv" />
      
      {/* Header responsive */}
      <style>{`
        .tpv-header {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 1rem;
          position: relative;
          padding-left: 120px;
          padding-right: 60px;
        }
        
        @media (max-width: 768px) {
          .tpv-header {
            padding-left: 20px !important;
            padding-right: 20px !important;
            margin-top: 1rem !important;
          }
        }
        
        @media (max-width: 480px) {
          .tpv-header {
            padding-left: 10px !important;
            padding-right: 50px !important;
            margin-top: 1.5rem !important;
          }
        }
      `}</style>
      
      <div className="tpv-header">
        <TituloPage style={{ 
          margin: 0,
          textAlign: "center",
          flex: 1
        }}>Gestión de Productos</TituloPage>
        
        <button
          onClick={() => setMostrandoAyuda(true)}
          style={{
            position: "absolute",
            right: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "36px",
            height: "36px",
            backgroundColor: "#a5c4ca",
            color: "#232728",
            border: "none",
            borderRadius: "50%",
            cursor: "pointer",
            fontSize: "1.1rem",
            fontWeight: "bold",
            transition: "background-color 0.2s",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#607074";
            e.target.style.color = "white";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "#a5c4ca";
            e.target.style.color = "#232728";
          }}
          title="Ayuda"
        >
          ?
        </button>
      </div>
      
      {cargando && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999
        }}>
          <div style={{
            backgroundColor: "white",
            padding: "2rem",
            borderRadius: "8px",
            textAlign: "center"
          }}>
            Cargando datos...
          </div>
        </div>
      )}

      <ProductosContainer>
        {/* Estadísticas */}
        <EstadisticasContainer>
          <EstadisticaCard>
            <div className="numero">{estadisticas.totalProductos}</div>
            <div className="label">Total Productos</div>
          </EstadisticaCard>
          <EstadisticaCard>
            <div className="numero">€{estadisticas.valorInventario.toFixed(2)}</div>
            <div className="label">Valor Inventario</div>
          </EstadisticaCard>
          <EstadisticaCard>
            <div className="numero">{estadisticas.stockBajo}</div>
            <div className="label">Stock Bajo</div>
          </EstadisticaCard>
          <EstadisticaCard>
            <div className="numero">{estadisticas.categorias}</div>
            <div className="label">Categorías</div>
          </EstadisticaCard>
        </EstadisticasContainer>

        {/* Botones de acción */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1rem",
          margin: "1rem 0",
          padding: "0 1rem"
        }}>
          <button
            onClick={() => setMostrandoFormulario(true)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.75rem 1rem",
              backgroundColor: "#a5c4ca",
              color: "#232728",
              border: "none",
              borderRadius: "8px",
              fontSize: "1rem",
              fontWeight: "600",
              cursor: "pointer",
              transition: "background-color 0.2s",
              boxShadow: "0 2px 8px rgba(64, 74, 76, 0.15)",
              justifyContent: "flex-start"
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#607074";
              e.target.style.color = "#caf0f8";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#a5c4ca";
              e.target.style.color = "#232728";
            }}
          >
            <FiPlus size={20} />
            Nuevo Producto
          </button>
          
          <button
            onClick={() => setMostrandoFormularioCategoria(true)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.75rem 1rem",
              backgroundColor: "#a5c4ca",
              color: "#232728",
              border: "none",
              borderRadius: "8px",
              fontSize: "1rem",
              fontWeight: "600",
              cursor: "pointer",
              transition: "background-color 0.2s",
              boxShadow: "0 2px 8px rgba(64, 74, 76, 0.15)",
              justifyContent: "flex-start"
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#607074";
              e.target.style.color = "#caf0f8";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#a5c4ca";
              e.target.style.color = "#232728";
            }}
          >
            <FiFolder size={20} />
            Nueva Categoría
          </button>
          
          <button
            onClick={() => setMostrandoTablaProductos(true)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.75rem 1rem",
              backgroundColor: "#a5c4ca",
              color: "#232728",
              border: "none",
              borderRadius: "8px",
              fontSize: "1rem",
              fontWeight: "600",
              cursor: "pointer",
              transition: "background-color 0.2s",
              boxShadow: "0 2px 8px rgba(64, 74, 76, 0.15)",
              justifyContent: "flex-start"
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#607074";
              e.target.style.color = "#caf0f8";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#a5c4ca";
              e.target.style.color = "#232728";
            }}
          >
            <FiPackage size={20} />
            Ver Productos
          </button>
          
          <button
            onClick={() => setMostrandoTablaCategorias(true)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.75rem 1rem",
              backgroundColor: "#a5c4ca",
              color: "#232728",
              border: "none",
              borderRadius: "8px",
              fontSize: "1rem",
              fontWeight: "600",
              cursor: "pointer",
              transition: "background-color 0.2s",
              boxShadow: "0 2px 8px rgba(64, 74, 76, 0.15)",
              justifyContent: "flex-start"
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#607074";
              e.target.style.color = "#caf0f8";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#a5c4ca";
              e.target.style.color = "#232728";
            }}
          >
            <FiFolder size={20} />
            Ver Categorías
          </button>
        </div>
      </ProductosContainer>

      {/* Modal Nuevo Producto */}
      {mostrandoFormulario && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          padding: "1rem"
        }}>
          <div style={{
            backgroundColor: "white",
            borderRadius: "12px",
            width: "90%",
            maxWidth: "800px",
            maxHeight: "80vh",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)"
          }}>
            <div style={{
              padding: "1.5rem",
              borderBottom: "1px solid #e0e0e0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <h2 style={{
                margin: 0,
                color: "#232728",
                fontSize: "1.5rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem"
              }}>
                <FiPlus size={24} />
                {productoEditando ? 'Editar Producto' : 'Nuevo Producto'}
              </h2>
              <button
                onClick={() => {
                  setMostrandoFormulario(false);
                  if (productoEditando) cancelarEdicion();
                }}
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  fontSize: "1.5rem",
                  cursor: "pointer",
                  color: "#666",
                  width: "30px",
                  height: "30px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%"
                }}
              >
                ×
              </button>
            </div>
            
            <div style={{
              padding: "1.5rem",
              overflowY: "auto",
              flex: 1
            }}>
              <FormularioProducto onSubmit={guardarProducto}>
                <FormRow>
                  <FormGroup>
                    <label>Nombre del Producto *</label>
                    <Input
                      type="text"
                      name="nombre"
                      value={formulario.nombre}
                      onChange={manejarCambio}
                      placeholder="Ej: Reparación Pantalla iPhone"
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <label>Precio (€) *</label>
                    <Input
                      type="number"
                      name="precio"
                      value={formulario.precio}
                      onChange={manejarCambio}
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      required
                    />
                  </FormGroup>
                </FormRow>

                <FormRow>
                  <FormGroup>
                    <label>Categoría *</label>
                    <Select name="categoria" value={formulario.categoria} onChange={manejarCambio} required>
                      <option value="">Seleccionar categoría</option>
                      {categorias.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                      ))}
                    </Select>
                  </FormGroup>
                  <FormGroup>
                    <label>IVA (%)</label>
                    <Select name="iva" value={formulario.iva} onChange={manejarCambio}>
                      <option value={21}>21% (General)</option>
                      <option value={10}>10% (Reducido)</option>
                      <option value={4}>4% (Superreducido)</option>
                      <option value={0}>0% (Exento)</option>
                    </Select>
                  </FormGroup>
                </FormRow>

                <FormRow>
                  <FormGroup>
                    <label>Stock inicial</label>
                    <Input
                      type="number"
                      name="stock"
                      value={formulario.stock}
                      onChange={manejarCambio}
                      placeholder="0"
                      min="0"
                    />
                  </FormGroup>
                  <FormGroup>
                    <label>Stock mínimo</label>
                    <Input
                      type="number"
                      name="stockMinimo"
                      value={formulario.stockMinimo}
                      onChange={manejarCambio}
                      placeholder="0"
                      min="0"
                    />
                  </FormGroup>
                </FormRow>

                <FormGroup>
                  <label>Descripción</label>
                  <TextArea
                    name="descripcion"
                    value={formulario.descripcion}
                    onChange={manejarCambio}
                    placeholder="Descripción opcional del producto..."
                    rows={3}
                  />
                </FormGroup>

                <BotonesContainer>
                  <GuardarBtn type="submit">
                    {productoEditando ? 'Actualizar' : 'Guardar'} Producto
                  </GuardarBtn>
                  <GuardarBtn 
                    type="button" 
                    onClick={() => {
                      setMostrandoFormulario(false);
                      if (productoEditando) cancelarEdicion();
                    }}
                    style={{ background: '#dc3545 !important', border: 'none !important' }}
                  >
                    Cancelar
                  </GuardarBtn>
                </BotonesContainer>
              </FormularioProducto>
            </div>
          </div>
        </div>
      )}

      {/* Modal Nueva Categoría */}
      {mostrandoFormularioCategoria && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          padding: "1rem"
        }}>
          <div style={{
            backgroundColor: "white",
            borderRadius: "12px",
            width: "90%",
            maxWidth: "600px",
            maxHeight: "80vh",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)"
          }}>
            <div style={{
              padding: "1.5rem",
              borderBottom: "1px solid #e0e0e0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <h2 style={{
                margin: 0,
                color: "#232728",
                fontSize: "1.5rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem"
              }}>
                <FiFolder size={24} />
                Nueva Categoría
              </h2>
              <button
                onClick={() => setMostrandoFormularioCategoria(false)}
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  fontSize: "1.5rem",
                  cursor: "pointer",
                  color: "#666",
                  width: "30px",
                  height: "30px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%"
                }}
              >
                ×
              </button>
            </div>
            
            <div style={{
              padding: "1.5rem",
              overflowY: "auto",
              flex: 1
            }}>
              <form onSubmit={guardarCategoria}>
                <FormRow>
                  <FormGroup>
                    <label>Nombre de la categoría *</label>
                    <Input
                      type="text"
                      name="nombre"
                      value={formularioCategoria.nombre}
                      onChange={manejarCambioCategoria}
                      placeholder="Ej: Smartphones, Tablets, etc."
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <label>Icono</label>
                    <Select 
                      name="icono" 
                      value={formularioCategoria.icono} 
                      onChange={manejarCambioCategoria}
                    >
                      <option value="📱">📱 Smartphone</option>
                      <option value="💻">💻 Tablet/Laptop</option>
                      <option value="🖥️">🖥️ Desktop</option>
                      <option value="🎮">🎮 Gaming</option>
                      <option value="🎧">🎧 Audio</option>
                      <option value="📷">📷 Cámara</option>
                      <option value="🔌">🔌 Accesorios</option>
                      <option value="🔧">🔧 Reparaciones</option>
                      <option value="🔩">🔩 Componentes</option>
                    </Select>
                  </FormGroup>
                </FormRow>
                <FormGroup>
                  <label>Descripción</label>
                  <TextArea
                    name="descripcion"
                    value={formularioCategoria.descripcion}
                    onChange={manejarCambioCategoria}
                    placeholder="Descripción opcional de la categoría..."
                    rows={2}
                  />
                </FormGroup>
                <BotonesContainer>
                  <GuardarBtn type="submit">
                    Crear Categoría
                  </GuardarBtn>
                  <GuardarBtn 
                    type="button" 
                    onClick={() => {
                      setMostrandoFormularioCategoria(false);
                      setFormularioCategoria({ nombre: "", descripcion: "", icono: "📱" });
                    }}
                    style={{ background: '#dc3545 !important', border: 'none !important' }}
                  >
                    Cancelar
                  </GuardarBtn>
                </BotonesContainer>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Productos */}
      {mostrandoTablaProductos && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          padding: "1rem"
        }}>
          <div style={{
            backgroundColor: "white",
            borderRadius: "12px",
            width: "90%",
            maxWidth: "1200px",
            maxHeight: "80vh",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)"
          }}>
            <div style={{
              padding: "1.5rem",
              borderBottom: "1px solid #e0e0e0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <h2 style={{
                margin: 0,
                color: "#232728",
                fontSize: "1.5rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem"
              }}>
                <FiPackage size={24} />
                Lista de Productos
              </h2>
              <button
                onClick={() => setMostrandoTablaProductos(false)}
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  fontSize: "1.5rem",
                  cursor: "pointer",
                  color: "#666",
                  width: "30px",
                  height: "30px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%"
                }}
              >
                ×
              </button>
            </div>
            
            <div style={{
              padding: "1.5rem",
              overflowY: "auto",
              flex: 1
            }}>
              <div style={{ marginBottom: "1rem", display: "flex", alignItems: "center", gap: "1rem" }}>
                <label style={{ fontSize: "0.9rem", fontWeight: "500", color: "#232728" }}>Filtrar por categoría:</label>
                <Select 
                  value={filtroCategoria} 
                  onChange={(e) => setFiltroCategoria(e.target.value)}
                  style={{ minWidth: "200px" }}
                >
                  <option value="">Todas las categorías</option>
                  {categorias.map((cat) => (
                    <option key={cat.id} value={cat.nombre}>{cat.nombre}</option>
                  ))}
                </Select>
              </div>
              
              <TablaContainer>
                <Tabla>
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th>Categoría</th>
                      <th>Precio</th>
                      <th>IVA</th>
                      <th>Stock</th>
                      <th>Descripción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productos
                      .filter(producto => !filtroCategoria || (producto.categoria && producto.categoria.nombre === filtroCategoria))
                      .map((producto) => (
                      <tr key={producto.id}>
                        <td style={{ fontWeight: "600", color: "#232728" }}>{producto.nombre}</td>
                        <td>
                          <span style={{
                            backgroundColor: "#e9f4f6",
                            color: "#2c5f66",
                            padding: "0.25rem 0.5rem",
                            borderRadius: "4px",
                            fontSize: "0.8rem",
                            fontWeight: "500"
                          }}>
                            {producto.categoria?.nombre || "Sin categoría"}
                          </span>
                        </td>
                        <td style={{ fontWeight: "bold", color: "#28a745" }}>
                          €{producto.precio.toFixed(2)}
                        </td>
                        <td>{producto.iva}%</td>
                        <td>
                          <span style={{ 
                            color: producto.stock <= producto.stock_minimo ? "#dc3545" : "#28a745",
                            fontWeight: producto.stock <= producto.stock_minimo ? "bold" : "normal"
                          }}>
                            {producto.stock} uds
                          </span>
                        </td>
                        <td style={{ maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {producto.descripcion || "-"}
                        </td>
                      </tr>
                    ))}
                    {productos.filter(producto => !filtroCategoria || producto.categoria === filtroCategoria).length === 0 && (
                      <tr>
                        <td colSpan="6" style={{ textAlign: "center", padding: "2rem", color: "#666", fontStyle: "italic" }}>
                          {filtroCategoria ? `No hay productos en la categoría "${filtroCategoria}"` : "No hay productos registrados"}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Tabla>
              </TablaContainer>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Categorías */}
      {mostrandoTablaCategorias && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          padding: "1rem"
        }}>
          <div style={{
            backgroundColor: "white",
            borderRadius: "12px",
            width: "90%",
            maxWidth: "1200px",
            maxHeight: "80vh",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)"
          }}>
            <div style={{
              padding: "1.5rem",
              borderBottom: "1px solid #e0e0e0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <h2 style={{
                margin: 0,
                color: "#232728",
                fontSize: "1.5rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem"
              }}>
                <FiFolder size={24} />
                Productos por Categoría
              </h2>
              <button
                onClick={() => setMostrandoTablaCategorias(false)}
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  fontSize: "1.5rem",
                  cursor: "pointer",
                  color: "#666",
                  width: "30px",
                  height: "30px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%"
                }}
              >
                ×
              </button>
            </div>
            
            <div style={{
              padding: "1.5rem",
              overflowY: "auto",
              flex: 1
            }}>
              {categoriasConIconos.map((categoria) => {
                const productosCategoria = productos.filter(p => p.categoria?.nombre === categoria.label);
                const estaAbierta = categoriasAbiertas[categoria.id];
                
                return (
                  <div key={categoria.id} style={{ marginBottom: "1.5rem" }}>
                    <div 
                      onClick={() => toggleCategoria(categoria.id)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "0.5rem",
                        marginBottom: estaAbierta ? "1rem" : "0",
                        padding: "0.75rem 1rem",
                        backgroundColor: estaAbierta ? "#e9f4f6" : "#f8f9fa",
                        borderRadius: "8px",
                        border: "1px solid #e0e0e0",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        boxShadow: estaAbierta ? "0 2px 4px rgba(0,0,0,0.1)" : "none"
                      }}
                    >
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem"
                      }}>
                        {categoria.icon}
                        <h3 style={{ margin: 0, color: "#232728", fontSize: "1.1rem" }}>
                          {categoria.label} ({productosCategoria.length} productos)
                        </h3>
                      </div>
                      
                      <div style={{
                        transform: estaAbierta ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.2s ease",
                        fontSize: "1.2rem",
                        color: "#666"
                      }}>
                        ▼
                      </div>
                    </div>
                    
                    {estaAbierta && (
                      <div style={{
                        animation: "slideDown 0.2s ease-out",
                        overflow: "hidden"
                      }}>
                        {productosCategoria.length > 0 ? (
                          <TablaContainer>
                            <Tabla>
                              <thead>
                                <tr>
                                  <th>Producto</th>
                                  <th>Precio</th>
                                  <th>IVA</th>
                                  <th>Stock</th>
                                  <th>Descripción</th>
                                </tr>
                              </thead>
                              <tbody>
                                {productosCategoria.map((producto) => (
                                  <tr key={producto.id}>
                                    <td style={{ fontWeight: "600", color: "#232728" }}>{producto.nombre}</td>
                                    <td style={{ fontWeight: "bold", color: "#28a745" }}>
                                      €{producto.precio.toFixed(2)}
                                    </td>
                                    <td>{producto.iva}%</td>
                                    <td>
                                      <span style={{ 
                                        color: producto.stock <= producto.stock_minimo ? "#dc3545" : "#28a745",
                                        fontWeight: producto.stock <= producto.stock_minimo ? "bold" : "normal"
                                      }}>
                                        {producto.stock} uds
                                      </span>
                                    </td>
                                    <td style={{ maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                      {producto.descripcion || "-"}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </Tabla>
                          </TablaContainer>
                        ) : (
                          <div style={{
                            textAlign: "center",
                            padding: "1rem",
                            color: "#666",
                            fontStyle: "italic",
                            backgroundColor: "#f8f9fa",
                            borderRadius: "6px",
                            border: "1px solid #e0e0e0",
                            marginTop: "0.5rem"
                          }}>
                            No hay productos en esta categoría
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Modal de Ayuda */}
      {mostrandoAyuda && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          padding: "1rem"
        }}>
          <div style={{
            backgroundColor: "white",
            borderRadius: "12px",
            width: "90%",
            maxWidth: "800px",
            maxHeight: "80vh",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)"
          }}>
            <div style={{
              padding: "1.5rem",
              borderBottom: "1px solid #e0e0e0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <h2 style={{
                margin: 0,
                color: "#232728",
                fontSize: "1.5rem"
              }}>
                Ayuda - Gestión de Productos
              </h2>
              <button
                onClick={() => setMostrandoAyuda(false)}
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  fontSize: "1.5rem",
                  cursor: "pointer",
                  color: "#666"
                }}
              >
                ×
              </button>
            </div>
            
            <div style={{
              padding: "1.5rem",
              overflowY: "auto",
              flex: 1,
              textAlign: "justify",
              lineHeight: "1.6"
            }}>
              <h3 style={{ color: "#232728", marginTop: 0 }}>Funciones Principales</h3>
              
              <h4 style={{ color: "#007bff" }}>🆕 Nuevo Producto</h4>
              <p>Permite registrar nuevos productos en el sistema. Completa los campos obligatorios como nombre, precio y categoría. También puedes especificar el IVA, stock inicial y descripción.</p>
              
              <h4 style={{ color: "#28a745" }}>📁 Nueva Categoría</h4>
              <p>Crea nuevas categorías para organizar mejor tus productos. Cada categoría puede tener un nombre, icono representativo y descripción opcional.</p>
              
              <h4 style={{ color: "#17a2b8" }}>👁️ Ver Productos</h4>
              <p>Visualiza todos los productos registrados en una tabla completa. Puedes filtrar por categoría y ver información detallada como precio, IVA, stock y descripción.</p>
              
              <h4 style={{ color: "#ffc107" }}>📂 Ver Categorías</h4>
              <p>Explora los productos organizados por categorías. Cada categoría es desplegable y muestra todos los productos que contiene, facilitando la navegación y gestión.</p>
              
              <h3 style={{ color: "#232728" }}>Estadísticas</h3>
              <p>En la parte superior encontrarás estadísticas importantes: total de productos, valor del inventario, productos con stock bajo y número de categorías. Esta información te ayuda a tener un control general del inventario.</p>
              
              <h3 style={{ color: "#232728" }}>Consejos</h3>
              <ul>
                <li>Mantén siempre actualizado el stock de tus productos</li>
                <li>Utiliza categorías para organizar mejor tu inventario</li>
                <li>Revisa regularmente los productos con stock bajo</li>
                <li>Incluye descripciones detalladas para identificar mejor los productos</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </WrapperPage>
  );
}