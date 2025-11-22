import React, { useState, useEffect } from "react";
import { FaCalculator, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { BotonVolver, TituloPage, WrapperPage, supabase } from "../../index";
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
  IvaCheckboxLabel
} from "../../styles/CajaStyles";

export function Caja() {
  const [descuentoGeneral, setDescuentoGeneral] = useState(0);
  const [calculadoraAbierta, setCalculadoraAbierta] = useState(false);
  const [calculadoraMiniAbierta, setCalculadoraMiniAbierta] = useState(false);
  const [clienteSeleccionado, setClienteSeleccionado] = useState("");
  const [clientes, setClientes] = useState([]);
  const [busquedaCliente, setBusquedaCliente] = useState("");
  
  // Custom hooks para manejar la lógica
  const calculadora = useCalculadora();
  const productosManager = useProductos();
  const ventasManager = useVentas();

  // Cargar clientes al montar el componente
  useEffect(() => {
    async function cargarClientes() {
      const { data } = await supabase
        .from("clientes")
        .select("id, nombre, nif, telefono")
        .order("nombre", { ascending: true });
      setClientes(data || []);
    }
    cargarClientes();
  }, []);

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

  // Funciones de limpieza y venta
  const limpiarVenta = () => {
    productosManager.limpiarProductos();
    setDescuentoGeneral(0);
    setClienteSeleccionado("");
    setBusquedaCliente("");
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
    <WrapperPage maxWidth={1400}>
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
          <AgregarProductoForm onSubmit={productosManager.agregarProducto}>
            <div className="input-group">
              <div className="input-header">Producto</div>
              <ProductoInput
                type="text"
                value={productosManager.nuevoProducto.nombre}
                onChange={(e) => productosManager.setNuevoProducto({...productosManager.nuevoProducto, nombre: e.target.value})}
                placeholder="Nombre del producto"
                required
              />
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
              <div className="input-header">Cantidad</div>
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
                <span className="checkbox-text">Sí</span>
              </IvaCheckboxLabel>
            </div>
            <div className="input-group">
              <div className="input-header">Acción</div>
              <AgregarBtn type="submit" disabled={!productosManager.nuevoProducto.nombre || !productosManager.nuevoProducto.precio}>
                Agregar
              </AgregarBtn>
            </div>
          </AgregarProductoForm>
          
          <SectionTitle style={{marginTop: '0.5rem'}}>Líneas de Venta</SectionTitle>
          
          {/* Encabezado único para todas las líneas */}
          <TablaHeaders>
            <HeaderItem>Producto</HeaderItem>
            <HeaderItem>Precio</HeaderItem>
            <HeaderItem>Cantidad</HeaderItem>
            <HeaderItem>IVA %</HeaderItem>
            <HeaderItem>Desc. %</HeaderItem>
            <HeaderItem>IVA Inc.</HeaderItem>
            <HeaderItem>Acciones</HeaderItem>
          </TablaHeaders>
          
          <ProductosLista>
            {productosManager.productos.map((producto) => (
              <ProductoItem key={producto.id}>
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
                  <span className="checkbox-text">Sí</span>
                </IvaCheckboxLabel>
                <EliminarBtn onClick={() => productosManager.eliminarProducto(producto.id)}>
                  Eliminar
                </EliminarBtn>
              </ProductoItem>
            ))}
          </ProductosLista>
        </ProductosSection>

        {/* Sección de Calculadora y Totales */}
        <CalculadoraSection>
          {/* Selección de Cliente */}
          <TotalSection style={{ marginBottom: "1rem" }}>
            <SectionTitle>Cliente</SectionTitle>
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              position: "relative"
            }}>
              <input
                type="text"
                placeholder="Buscar cliente por nombre, NIF o teléfono..."
                value={busquedaCliente}
                onChange={(e) => setBusquedaCliente(e.target.value)}
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
              {busquedaCliente && busquedaCliente.length > 0 && (
                <div style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  right: 0,
                  maxHeight: "200px",
                  overflowY: "auto",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  backgroundColor: "white",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                  zIndex: 1000
                }}>
                  <div
                    onClick={() => {
                      setClienteSeleccionado("");
                      setBusquedaCliente("Cliente General");
                    }}
                    style={{
                      padding: "0.75rem",
                      cursor: "pointer",
                      borderBottom: "1px solid #eee",
                      backgroundColor: clienteSeleccionado === "" ? "#f0f8ff" : "white"
                    }}
                  >
                    Cliente General
                  </div>
                  {clientesFiltrados && clientesFiltrados.length > 0 && clientesFiltrados.map((cliente) => (
                    <div
                      key={cliente.id}
                      onClick={() => {
                        setClienteSeleccionado(cliente.id);
                        setBusquedaCliente(`${cliente.nombre} - ${cliente.nif}`);
                      }}
                      style={{
                        padding: "0.75rem",
                        cursor: "pointer",
                        borderBottom: "1px solid #eee",
                        backgroundColor: clienteSeleccionado === cliente.id ? "#f0f8ff" : "white"
                      }}
                      onMouseEnter={(e) => {
                        if (clienteSeleccionado !== cliente.id) {
                          e.target.style.backgroundColor = "#f8f9fa";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (clienteSeleccionado !== cliente.id) {
                          e.target.style.backgroundColor = "white";
                        }
                      }}
                    >
                      <div style={{ fontWeight: "600", color: "#232728" }}>
                        {cliente.nombre}
                      </div>
                      <div style={{ fontSize: "0.9rem", color: "#666" }}>
                        {cliente.nif || 'Sin NIF'} • {cliente.telefono || 'Sin teléfono'}
                      </div>
                    </div>
                  ))}
                  {clientesFiltrados && clientesFiltrados.length === 0 && busquedaCliente !== "Cliente General" && (
                    <div style={{
                      padding: "1rem",
                      textAlign: "center",
                      color: "#666",
                      fontStyle: "italic"
                    }}>
                      No se encontraron clientes
                    </div>
                  )}
                </div>
              )}
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
              {ventasManager.procesandoVenta ? 'Procesando...' : `Vender €${totales.total.toFixed(2)}`}
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
                <CalculadoraDisplay>{calculadora.calculadora}</CalculadoraDisplay>
                
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <SectionTitle style={{ margin: 0 }}>Calculadora</SectionTitle>
          <button 
            onClick={() => setCalculadoraMiniAbierta(false)}
            style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer' }}
          >
            ×
          </button>
        </div>
        <CalculadoraGrid>
          <CalculadoraDisplay>{calculadora.calculadora}</CalculadoraDisplay>
          
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
    </CajaContainer>
    </WrapperPage>
  );
}