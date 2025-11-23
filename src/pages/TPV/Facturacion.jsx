import React, { useState } from "react";
import { FiPrinter, FiDownload, FiEye, FiFilter, FiBarChart, FiRefreshCw, FiX } from "react-icons/fi";
import styled from "styled-components";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logo from "../../assets/logo.png";
import { formatearFecha } from "../../utils/fecha";
import { BotonVolver, TituloPage, WrapperPage, Tabla, TablaContainer, IconBtn } from "../../index";
import { useFacturacion, formatearMetodoPago } from "../../hooks/useFacturacion";
import { useConfiguracionEmpresaContext } from "../../contexts/ConfiguracionEmpresaContext";
import { primaryColor, secondaryColor, accentColor, backgroundColor } from "../../utils/breakpoints";
import { supabase } from "../../supabase/supabaseClient";

const FacturacionContainer = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  max-height: 65vh;
  background: transparent;
  padding: 0;
  margin-top: 0.5rem;
  overflow: visible;
`;

const FiltrosSection = styled.div`
  background: white;
  border-radius: 6px;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

const FiltrosGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  align-items: end;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    font-weight: 500;
    color: #333;
    font-size: 0.9rem;
  }
`;

const Input = styled.input`
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 0.75rem;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: ${primaryColor};
  }
`;

const Select = styled.select`
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 0.75rem;
  font-size: 1rem;
  background: white;

  &:focus {
    outline: none;
    border-color: ${primaryColor};
  }
`;

// Removed - using IconBtn now

const VentasGrid = styled.div`
  display: grid;
  gap: 1rem;
`;

const VentaCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-left: 4px solid ${primaryColor};
`;

const VentaHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const VentaInfo = styled.div`
  .numero {
    font-size: 1.2rem;
    font-weight: bold;
    color: ${primaryColor};
  }
  .fecha {
    color: #666;
    font-size: 0.9rem;
  }
`;

const VentaTotal = styled.div`
  text-align: right;
  .total {
    font-size: 1.3rem;
    font-weight: bold;
    color: #28a745;
  }
  .metodo {
    color: #666;
    font-size: 0.85rem;
  }
`;

const VentaProductos = styled.div`
  margin: 1rem 0;
  padding-top: 1rem;
  border-top: 1px solid #eee;
`;

const ProductoLinea = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.25rem 0;
  font-size: 0.9rem;

  .nombre {
    flex: 1;
  }
  .cantidad {
    width: 60px;
    text-align: center;
    color: #666;
  }
  .precio {
    width: 80px;
    text-align: right;
    font-weight: 500;
  }
`;

const VentaAcciones = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
`;

// Removed - using IconBtn now

const EstadisticasGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const EstadisticaCard = styled.div`
  background: white;
  border-radius: 6px;
  padding: 0.75rem;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  border-top: 3px solid ${primaryColor};

  .numero {
    font-size: 1.3rem;
    font-weight: bold;
    color: ${primaryColor};
    margin-bottom: 0.25rem;
  }

  .label {
    color: #666;
    font-size: 0.9rem;
    font-weight: 500;
  }
`;

const NoVentas = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  color: #666;
  font-style: italic;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export function Facturacion() {
  const { ventas, filtros, estadisticas, loading, actualizarFiltros } = useFacturacion();
  const { configuracion } = useConfiguracionEmpresaContext();
  const [ventaSeleccionada, setVentaSeleccionada] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  const abrirDetalleVenta = (venta) => {
    setVentaSeleccionada(venta);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setVentaSeleccionada(null);
  };

  const crearPDFVenta = async (venta) => {
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4"
    });

    const marginLeft = 40;
    const marginRight = 40;
    const pageWidth = 595; // A4 width in points
    let y = 40;

    // Logo (usar configuración de empresa si existe)
    const logoSrc = configuracion.logo_url || logo;
    const img = new window.Image();
    img.src = logoSrc;
    await new Promise(resolve => { img.onload = resolve; });
    
    // Calcular dimensiones proporcionales para el logo
    const maxLogoWidth = 80;
    const maxLogoHeight = 60;
    const aspectRatio = img.width / img.height;
    
    let logoWidth, logoHeight;
    if (aspectRatio > maxLogoWidth / maxLogoHeight) {
      // Logo más ancho que alto
      logoWidth = maxLogoWidth;
      logoHeight = maxLogoWidth / aspectRatio;
    } else {
      // Logo más alto que ancho
      logoHeight = maxLogoHeight;
      logoWidth = maxLogoHeight * aspectRatio;
    }
    
    pdf.addImage(img, "PNG", marginLeft, y, logoWidth, logoHeight);

    // Título del documento
    y += 70;
    pdf.setFontSize(16);
    pdf.setFont("helvetica", "bold");
    pdf.text("FACTURA DE VENTA", marginLeft, y);
    
    // Obtener datos del cliente si no es cliente general
    let datosCliente = null;
    if (venta.cliente_id && venta.cliente !== "Cliente General") {
      try {
        const { data, error } = await supabase.from('clientes')
          .select('nombre, apellidos, nif, telefono, direccion, correo')
          .eq('id', venta.cliente_id)
          .single();
        
        if (!error && data) {
          datosCliente = data;
        }
      } catch (error) {
        console.error('Error obteniendo datos del cliente:', error);
      }
    } else if (venta.cliente && venta.cliente !== "Cliente General" && typeof venta.cliente === 'object') {
      // Si ya vienen los datos del cliente en el objeto venta
      datosCliente = venta.cliente;
    }
    
    y += 30;
    
    // Dimensiones para las cajas
    const leftBoxX = marginLeft;
    const leftBoxWidth = datosCliente ? 250 : 350;
    const rightBoxX = pageWidth - marginRight - 250;
    const rightBoxWidth = 240;
    const boxHeight = datosCliente ? 120 : 100;
    
    // Dibujar caja de información de venta (lado izquierdo)
    pdf.setDrawColor(165, 196, 202); // Color del borde (azul claro)
    pdf.setLineWidth(1);
    pdf.rect(leftBoxX, y, leftBoxWidth, boxHeight);
    
    // Fondo suave para la caja izquierda
    pdf.setFillColor(250, 252, 253); // Azul muy claro
    pdf.rect(leftBoxX, y, leftBoxWidth, boxHeight, 'F');
    pdf.rect(leftBoxX, y, leftBoxWidth, boxHeight); // Borde encima del relleno
    
    // Título de información de venta
    pdf.setFontSize(12);
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(0, 52, 89); // Azul oscuro
    pdf.text("Información de la Venta", leftBoxX + 10, y + 15);
    
    // Contenido de información de venta
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);
    pdf.setTextColor(60, 60, 60); // Gris oscuro
    pdf.text(`Número de Venta: ${venta.numero}`, leftBoxX + 10, y + 30);
    pdf.text(`Fecha: ${formatearFecha(venta.fecha)}`, leftBoxX + 10, y + 45);
    pdf.text(`Cliente: ${typeof venta.cliente === 'object' ? `${venta.cliente.nombre} ${venta.cliente.apellidos || ''}` : (venta.cliente || "Cliente General")}`, leftBoxX + 10, y + 60);
    pdf.text(`Método de Pago: ${formatearMetodoPago(venta.metodoPago)}`, leftBoxX + 10, y + 75);
    
    // Dibujar caja de datos del cliente (lado derecho) - solo si hay cliente específico
    if (datosCliente) {
      // Caja del cliente
      pdf.setDrawColor(165, 196, 202);
      pdf.setLineWidth(1);
      pdf.rect(rightBoxX, y, rightBoxWidth, boxHeight);
      
      // Fondo suave para la caja derecha
      pdf.setFillColor(245, 250, 252); // Azul muy claro diferente
      pdf.rect(rightBoxX, y, rightBoxWidth, boxHeight, 'F');
      pdf.rect(rightBoxX, y, rightBoxWidth, boxHeight); // Borde encima del relleno
      
      // Título de datos del cliente
      pdf.setFontSize(12);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(0, 52, 89);
      pdf.text("Datos del Cliente", rightBoxX + 10, y + 15);
      
      // Contenido de datos del cliente
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(10);
      pdf.setTextColor(60, 60, 60);
      pdf.text(`Nombre: ${datosCliente.nombre || ""} ${datosCliente.apellidos || ""}`, rightBoxX + 10, y + 30);
      
      if (datosCliente.nif) {
        pdf.text(`NIF: ${datosCliente.nif}`, rightBoxX + 10, y + 45);
      }
      
      if (datosCliente.telefono) {
        pdf.text(`Teléfono: ${datosCliente.telefono}`, rightBoxX + 10, y + 60);
      }
      
      if (datosCliente.correo) {
        pdf.text(`Correo: ${datosCliente.correo}`, rightBoxX + 10, y + 75);
      }
      
      if (datosCliente.direccion) {
        const direccionLines = pdf.splitTextToSize(`Dirección: ${datosCliente.direccion}`, 220);
        pdf.text(direccionLines, rightBoxX + 10, y + 90);
      }
    }
    
    // Ajustar y para continuar después de las cajas
    y += boxHeight + 20;

    // Resetear colores para la tabla
    pdf.setTextColor(0, 0, 0); // Negro para texto normal
    
    // Tabla de productos
    autoTable(pdf, {
      startY: y,
      margin: { left: marginLeft, right: marginRight },
      theme: 'grid',
      minCellHeight: 20,
      head: [[
        "Producto",
        "Cantidad",
        "Precio Unitario",
        "Total"
      ]],
      body: venta.productos.map(producto => [
        producto.nombre,
        producto.cantidad.toString(),
        `€${producto.precio.toFixed(2)}`,
        `€${(producto.precio * producto.cantidad).toFixed(2)}`
      ]),
      foot: [[
        "",
        "",
        "Subtotal:",
        `€${venta.subtotal.toFixed(2)}`
      ], [
        "",
        "",
        "IVA:",
        `€${venta.iva.toFixed(2)}`
      ], [
        "",
        "",
        "TOTAL:",
        `€${venta.total.toFixed(2)}`
      ]],
      styles: {
        fontSize: 8,
        cellPadding: { top: 3, right: 6, bottom: 3, left: 6 },
        lineWidth: 0.5,
        lineColor: [255, 255, 255],
        overflow: "linebreak",
        valign: "middle"
      },
      headStyles: {
        fillColor: [165, 196, 202],
        textColor: [0, 52, 89],
        halign: "center",
        fontStyle: "bold"
      },
      footStyles: {
        fillColor: [165, 196, 202],
        textColor: [0, 52, 89],
        fontStyle: "bold",
        halign: "right"
      },
      didParseCell: function(data) {
        // Si es una celda del pie (foot) y es la columna 0 o 1, poner fondo blanco
        if (data.section === 'foot' && (data.column.index === 0 || data.column.index === 1)) {
          data.cell.styles.fillColor = [255, 255, 255];
        }
      },
      columnStyles: {
        0: { halign: "left" },     // Producto - ancho automático
        1: { cellWidth: 80, halign: "center" },   // Cantidad
        2: { cellWidth: 100, halign: "right" },   // Precio Unitario
        3: { cellWidth: 100, halign: "right" }    // Total
      }
    });

    // Footer en la parte inferior de la página
    const pageHeight = 842; // Altura de página A4 en puntos
    const footerY = pageHeight - 40; // 40pt desde el final de la página
    
    pdf.setFontSize(9);
    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(100, 100, 100); // Gris para el footer
    pdf.text("Gracias por su compra", marginLeft, footerY - 15);
    pdf.text(configuracion.mensaje_footer || "TechnoFix - Sistema de Gestión", marginLeft, footerY);

    pdf.save(`factura_venta_${venta.numero}_${venta.fecha}.pdf`);
  };

  return (
    <WrapperPage maxWidth={1400}>
      <BotonVolver to="/tpv" />
      
      {/* Header responsive para evitar superposición */}
      <style>{`
        .tpv-facturacion-header {
          padding-left: 120px;
        }
        
        @media (max-width: 768px) {
          .tpv-facturacion-header {
            padding-left: 20px !important;
            margin-top: 1rem !important;
          }
        }
        
        @media (max-width: 480px) {
          .tpv-facturacion-header {
            padding-left: 10px !important;
            margin-top: 1.5rem !important;
          }
        }
      `}</style>
      
      <div className="tpv-facturacion-header">
        <TituloPage>Historial de Ventas</TituloPage>
      </div>


      
      <FacturacionContainer>
        {/* Estadísticas */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
          gap: "0.5rem",
          marginBottom: "0.75rem"
        }}>
          <div style={{
            background: "white",
            borderRadius: "6px",
            padding: "0.5rem",
            boxShadow: "0 1px 4px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
            borderTop: `2px solid ${primaryColor}`
          }}>
            <div style={{
              fontSize: "1.1rem",
              fontWeight: "bold",
              color: primaryColor,
              marginBottom: "0.15rem"
            }}>{estadisticas.totalVentas}</div>
            <div style={{
              color: "#666",
              fontSize: "0.7rem",
              fontWeight: "500"
            }}>Total Ventas</div>
          </div>
          
          <div style={{
            background: "white",
            borderRadius: "6px",
            padding: "0.5rem",
            boxShadow: "0 1px 4px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
            borderTop: `2px solid ${primaryColor}`
          }}>
            <div style={{
              fontSize: "1.1rem",
              fontWeight: "bold",
              color: primaryColor,
              marginBottom: "0.15rem"
            }}>€{estadisticas.importeTotal.toFixed(2)}</div>
            <div style={{
              color: "#666",
              fontSize: "0.7rem",
              fontWeight: "500"
            }}>Importe Total</div>
          </div>
          
          <div style={{
            background: "white",
            borderRadius: "6px",
            padding: "0.5rem",
            boxShadow: "0 1px 4px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
            borderTop: `2px solid ${primaryColor}`
          }}>
            <div style={{
              fontSize: "1.1rem",
              fontWeight: "bold",
              color: primaryColor,
              marginBottom: "0.15rem"
            }}>€{estadisticas.ticketPromedio.toFixed(2)}</div>
            <div style={{
              color: "#666",
              fontSize: "0.7rem",
              fontWeight: "500"
            }}>Ticket Promedio</div>
          </div>
          
          <div style={{
            background: "white",
            borderRadius: "6px",
            padding: "0.5rem",
            boxShadow: "0 1px 4px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
            borderTop: `2px solid ${primaryColor}`
          }}>
            <div style={{
              fontSize: "1.1rem",
              fontWeight: "bold",
              color: primaryColor,
              marginBottom: "0.15rem"
            }}>€{estadisticas.efectivo.toFixed(2)}</div>
            <div style={{
              color: "#666",
              fontSize: "0.7rem",
              fontWeight: "500"
            }}>Efectivo</div>
          </div>
        </div>

      {/* Filtros en línea simple */}
      <div style={{ 
        marginBottom: "1rem", 
        display: "flex", 
        alignItems: "center", 
        gap: "1rem", 
        flexWrap: "wrap",
        padding: "1rem",
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)"
      }}>
        <label style={{ fontSize: "0.85rem", fontWeight: "500", color: "#232728", whiteSpace: "nowrap" }}>Desde:</label>
        <Input
          type="date"
          value={filtros.fechaInicio}
          onChange={(e) => actualizarFiltros({ fechaInicio: e.target.value })}
          style={{ width: "110px", padding: "0.4rem 0.5rem", fontSize: "0.85rem" }}
        />
        
        <label style={{ fontSize: "0.85rem", fontWeight: "500", color: "#232728", whiteSpace: "nowrap" }}>Hasta:</label>
        <Input
          type="date"
          value={filtros.fechaFin}
          onChange={(e) => actualizarFiltros({ fechaFin: e.target.value })}
          style={{ width: "110px", padding: "0.4rem 0.5rem", fontSize: "0.85rem" }}
        />
        
        <label style={{ fontSize: "0.85rem", fontWeight: "500", color: "#232728", whiteSpace: "nowrap" }}>Método:</label>
        <Select
          value={filtros.metodoPago}
          onChange={(e) => actualizarFiltros({ metodoPago: e.target.value })}
          style={{ width: "90px", padding: "0.4rem 0.5rem", fontSize: "0.85rem" }}
        >
          <option value="">Todos</option>
          <option value="bizum">Bizum</option>
          <option value="efectivo">Efectivo</option>
          <option value="mixto">Mixto</option>
          <option value="tarjeta">Tarjeta</option>
          <option value="transferencia">Transferencia</option>
        </Select>
        
        <label style={{ fontSize: "0.85rem", fontWeight: "500", color: "#232728", whiteSpace: "nowrap" }}>Min €:</label>
        <Input
          type="number"
          value={filtros.minImporte}
          onChange={(e) => actualizarFiltros({ minImporte: e.target.value })}
          placeholder="0"
          step="0.01"
          style={{ width: "60px", padding: "0.4rem 0.5rem", fontSize: "0.85rem" }}
        />
        
        <label style={{ fontSize: "0.85rem", fontWeight: "500", color: "#232728", whiteSpace: "nowrap" }}>Max €:</label>
        <Input
          type="number"
          value={filtros.maxImporte}
          onChange={(e) => actualizarFiltros({ maxImporte: e.target.value })}
          placeholder="999"
          step="0.01"
          style={{ width: "60px", padding: "0.4rem 0.5rem", fontSize: "0.85rem" }}
        />
        
        <IconBtn 
          onClick={() => {}}
          style={{ padding: "0.4rem 0.8rem", fontSize: "0.85rem" }}
        >
          <FiFilter size={14} />
          <span>Filtrar</span>
        </IconBtn>
      </div>

      {/* Tabla de Ventas */}
      <div style={{ 
        background: "white", 
        borderRadius: "8px", 
        padding: "1rem", 
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
        maxHeight: "400px",
        display: "flex",
        flexDirection: "column"
      }}>
        <h3 style={{ marginBottom: "1rem", color: primaryColor, flexShrink: 0 }}>Ventas</h3>
        
        {loading ? (
          <div style={{ 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center", 
            height: "200px",
            color: "#666"
          }}>
            Cargando ventas...
          </div>
        ) : ventas.length > 0 ? (
          <TablaContainer style={{ 
            overflowX: "auto", 
            overflowY: "auto",
            flex: 1,
            minHeight: 0
          }}>
            <Tabla style={{ 
              minWidth: "800px"
            }}>
              <thead>
                <tr>
                  <th>Nº Venta</th>
                  <th>Fecha</th>
                  <th>Cliente</th>
                  <th>Subtotal</th>
                  <th>IVA</th>
                  <th>Total</th>
                  <th>Método Pago</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {ventas.map((venta) => (
                  <tr key={venta.id} style={{ cursor: "pointer" }}>
                    <td style={{ fontWeight: "600", color: primaryColor }}>{venta.numero}</td>
                    <td style={{ color: "#6c757d" }}>{formatearFecha(venta.fecha)}</td>
                    <td>{typeof venta.cliente === 'object' ? `${venta.cliente.nombre} ${venta.cliente.apellidos || ''}` : (venta.cliente || "Cliente General")}</td>
                    <td>€{venta.subtotal.toFixed(2)}</td>
                    <td style={{ color: "#6c757d" }}>€{venta.iva.toFixed(2)}</td>
                    <td style={{ fontWeight: "600", color: "#28a745" }}>€{venta.total.toFixed(2)}</td>
                    <td>
                      <span style={{
                        padding: "0.25rem 0.5rem",
                        borderRadius: "12px",
                        fontSize: "0.8rem",
                        fontWeight: "500",
                        backgroundColor: venta.metodoPago === "efectivo" ? "#d4edda" : 
                                       venta.metodoPago === "tarjeta" ? "#d1ecf1" : 
                                       venta.metodoPago === "transferencia" ? "#e2e3e5" : "#fff3cd",
                        color: venta.metodoPago === "efectivo" ? "#155724" : 
                               venta.metodoPago === "tarjeta" ? "#0c5460" : 
                               venta.metodoPago === "transferencia" ? "#383d41" : "#856404"
                      }}>
                        {formatearMetodoPago(venta.metodoPago)}
                      </span>
                    </td>
                    <td>
                      <div style={{ 
                        display: "flex", 
                        gap: "0.25rem", 
                        justifyContent: "center",
                        flexWrap: "wrap"
                      }}>
                        <button
                          onClick={() => abrirDetalleVenta(venta)}
                          style={{
                            padding: "0.25rem 0.5rem",
                            borderRadius: "4px",
                            border: "none",
                            backgroundColor: "#a5c4ca",
                            color: "#232728",
                            fontSize: "0.8rem",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.25rem"
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
                          <FiEye size={12} /> Ver
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Tabla>
          </TablaContainer>
        ) : (
          <NoVentas>
            <div>No se encontraron ventas que coincidan con los filtros aplicados.</div>
          </NoVentas>
        )}
      </div>
      </FacturacionContainer>

      {/* Modal de Detalle de Venta */}
      {mostrarModal && ventaSeleccionada && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000
        }} onClick={cerrarModal}>
          <div style={{
            backgroundColor: "white",
            borderRadius: "8px",
            padding: "2rem",
            maxWidth: "600px",
            width: "90%",
            maxHeight: "80%",
            overflow: "auto",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)"
          }} onClick={(e) => e.stopPropagation()}>
            
            {/* Header del Modal */}
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1.5rem",
              paddingBottom: "1rem",
              borderBottom: "2px solid #dee2e6"
            }}>
              <div>
                <h2 style={{ 
                  margin: 0, 
                  color: primaryColor,
                  fontSize: "1.5rem"
                }}>Venta {ventaSeleccionada.numero}</h2>
                <p style={{ 
                  margin: "0.25rem 0 0 0", 
                  color: "#6c757d",
                  fontSize: "0.9rem"
                }}>{formatearFecha(ventaSeleccionada.fecha)}</p>
              </div>
              <button
                onClick={cerrarModal}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "1.5rem",
                  cursor: "pointer",
                  color: "#6c757d",
                  padding: "0.25rem"
                }}
              >
                <FiX />
              </button>
            </div>

            {/* Información General */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
              marginBottom: "1.5rem",
              padding: "1rem",
              backgroundColor: "#f8f9fa",
              borderRadius: "6px"
            }}>
              <div>
                <strong>Cliente:</strong>
                <div>{typeof ventaSeleccionada.cliente === 'object' ? `${ventaSeleccionada.cliente.nombre} ${ventaSeleccionada.cliente.apellidos || ''}` : (ventaSeleccionada.cliente || "Cliente General")}</div>
              </div>
              <div>
                <strong>Método de Pago:</strong>
                <div>
                  <span style={{
                    padding: "0.25rem 0.5rem",
                    borderRadius: "12px",
                    fontSize: "0.8rem",
                    fontWeight: "500",
                    backgroundColor: ventaSeleccionada.metodoPago === "efectivo" ? "#d4edda" : 
                                   ventaSeleccionada.metodoPago === "tarjeta" ? "#d1ecf1" : 
                                   ventaSeleccionada.metodoPago === "transferencia" ? "#e2e3e5" : "#fff3cd",
                    color: ventaSeleccionada.metodoPago === "efectivo" ? "#155724" : 
                           ventaSeleccionada.metodoPago === "tarjeta" ? "#0c5460" : 
                           ventaSeleccionada.metodoPago === "transferencia" ? "#383d41" : "#856404"
                  }}>
                    {formatearMetodoPago(ventaSeleccionada.metodoPago)}
                  </span>
                </div>
              </div>
            </div>

            {/* Lista de Productos */}
            <div style={{ marginBottom: "1.5rem" }}>
              <h3 style={{ 
                marginBottom: "1rem", 
                color: primaryColor,
                fontSize: "1.2rem"
              }}>Productos</h3>
              
              <div style={{ 
                border: "1px solid #dee2e6", 
                borderRadius: "6px",
                overflow: "hidden"
              }}>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "2fr 1fr 1fr 1fr",
                  backgroundColor: "#f8f9fa",
                  padding: "0.75rem",
                  fontWeight: "600",
                  borderBottom: "1px solid #dee2e6"
                }}>
                  <div>Producto</div>
                  <div style={{ textAlign: "center" }}>Cantidad</div>
                  <div style={{ textAlign: "right" }}>Precio Unit.</div>
                  <div style={{ textAlign: "right" }}>Subtotal</div>
                </div>
                
                {ventaSeleccionada.productos.map((producto, index) => (
                  <div key={index} style={{
                    display: "grid",
                    gridTemplateColumns: "2fr 1fr 1fr 1fr",
                    padding: "0.75rem",
                    borderBottom: index < ventaSeleccionada.productos.length - 1 ? "1px solid #dee2e6" : "none"
                  }}>
                    <div>{producto.nombre}</div>
                    <div style={{ textAlign: "center" }}>{producto.cantidad}</div>
                    <div style={{ textAlign: "right" }}>€{producto.precio.toFixed(2)}</div>
                    <div style={{ textAlign: "right" }}>€{(producto.precio * producto.cantidad).toFixed(2)}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Totales */}
            <div style={{
              padding: "1rem",
              backgroundColor: "#f8f9fa",
              borderRadius: "6px",
              marginBottom: "1.5rem"
            }}>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "0.5rem"
              }}>
                <span>Subtotal:</span>
                <span>€{ventaSeleccionada.subtotal.toFixed(2)}</span>
              </div>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "0.5rem"
              }}>
                <span>IVA:</span>
                <span>€{ventaSeleccionada.iva.toFixed(2)}</span>
              </div>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "1.2rem",
                fontWeight: "bold",
                paddingTop: "0.5rem",
                borderTop: "2px solid #dee2e6",
                color: "#28a745"
              }}>
                <span>TOTAL:</span>
                <span>€{ventaSeleccionada.total.toFixed(2)}</span>
              </div>
            </div>

            {/* Acciones */}
            <div style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "flex-end"
            }}>
              <button
                onClick={() => crearPDFVenta(ventaSeleccionada)}
                style={{
                  padding: "0.75rem 1.5rem",
                  borderRadius: "6px",
                  border: "none",
                  backgroundColor: "#6c757d",
                  color: "white",
                  fontSize: "1rem",
                  fontWeight: "500",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem"
                }}
              >
                <FiDownload /> Descargar PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </WrapperPage>
  );
}