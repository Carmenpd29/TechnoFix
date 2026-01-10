import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logo from "../../assets/logo.png";
import { formatearFecha } from "../../utils/fecha";
import { supabase } from "../../supabase/supabaseClient";

export async function crearPDF(cliente, reparaciones, ventas = []) {
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "pt",
    format: "a4"
  });

  const marginLeft = 40;
  let y = 40;

  // Cargar configuración de empresa
  let configuracion = {
    logo_url: '',
    mensaje_footer: 'TechnoFix - Sistema de Gestión'
  };

  try {
    const { data, error } = await supabase
      .from('configuracion_empresa')
      .select('logo_url, mensaje_footer')
      .single();

    if (!error && data) {
      configuracion = data;
    }
  } catch (error) {
    console.error('Error cargando configuración:', error);
  }

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

  // Card de cliente
  y += 70;
  
  // Dimensiones para la caja del cliente
  const clientBoxX = marginLeft;
  const clientBoxWidth = 300;
  const clientBoxHeight = 120;
  
  // Dibujar caja de datos del cliente
  pdf.setDrawColor(165, 196, 202); 
  pdf.setLineWidth(1);
  pdf.rect(clientBoxX, y, clientBoxWidth, clientBoxHeight);
  
  // Fondo suave para la caja
  pdf.setFillColor(245, 250, 252); 
  pdf.rect(clientBoxX, y, clientBoxWidth, clientBoxHeight, 'F');
  pdf.rect(clientBoxX, y, clientBoxWidth, clientBoxHeight); 
  
  // Título de datos del cliente
  pdf.setFontSize(12);
  pdf.setFont("helvetica", "bold");
  pdf.setTextColor(0, 52, 89); 
  pdf.text("Datos del Cliente", clientBoxX + 10, y + 15);
  
  // Contenido de datos del cliente
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);
  pdf.setTextColor(60, 60, 60); 
  pdf.text(`Nombre: ${cliente?.nombre || ""} ${cliente?.apellidos || ""}`, clientBoxX + 10, y + 30);
  pdf.text(`NIF: ${cliente?.nif || ""}`, clientBoxX + 10, y + 45);
  pdf.text(`Teléfono: ${cliente?.telefono || ""}`, clientBoxX + 10, y + 60);
  pdf.text(`Correo: ${cliente?.correo || ""}`, clientBoxX + 10, y + 75);
  
  const direccion = pdf.splitTextToSize(`Dirección: ${cliente?.direccion || ""}`, 280);
  pdf.text(direccion, clientBoxX + 10, y + 90);
  
  // Ajustar y para continuar después de la caja
  y += clientBoxHeight + 20;
  
  // Resetear colores para el resto del documento
  pdf.setTextColor(0, 0, 0);

  // Título de Reparaciones
  y += 30;
  pdf.setFontSize(12);
  pdf.setFont("helvetica", "bold");
  pdf.text("Reparaciones", marginLeft, y);
  
  // Tabla de reparaciones
  y += 20;
  const reparacionesBody = reparaciones.length > 0 
    ? reparaciones.map(r => [
        r.articulo,
        r.descripcion,
        formatearFecha(r.fecha),
        formatearFecha(r.fechaentrega),
        r.precio != null ? `${r.precio} €` : "-",
        r.observaciones || "-"
      ])
    : [["", "", "", "", "", ""], ["", "", "", "", "", ""], ["", "", "", "", "", ""]]; // 3 filas vacías mínimas

  autoTable(pdf, {
    startY: y,
    margin: { left: marginLeft, right: marginLeft },
    tableWidth: 'wrap',
    theme: 'grid',
    minCellHeight: 20,
    head: [[
      "Artículo",
      "Descripción",
      "Fecha",
      "Fecha Entrega",
      "Precio",
      "Observaciones"
    ]],
    body: reparacionesBody,
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
    columnStyles: {
      0: { cellWidth: 70 }, // Artículo
      1: { cellWidth: 110 }, // Descripción
      2: { cellWidth: 70, halign: "center" }, // Fecha
      3: { cellWidth: 90, halign: "center" }, // Fecha Entrega
      4: { cellWidth: 60, halign: "right" }, // Precio
      5: { cellWidth: 110 } // Observaciones
    }
  });

  // Título de Ventas TPV
  const finalY = pdf.lastAutoTable.finalY || y;
  let ventasY = finalY + 30;
  
  // Verificar si necesitamos nueva página
  if (ventasY > 700) {
    pdf.addPage();
    ventasY = 40;
  }
  
  pdf.setFontSize(12);
  pdf.setFont("helvetica", "bold");
  pdf.text("Historial de Ventas TPV", marginLeft, ventasY);
  
  // Tabla de ventas
  ventasY += 20;
  autoTable(pdf, {
    startY: ventasY,
    margin: { left: marginLeft, right: marginLeft },
    tableWidth: 'wrap',
    theme: 'grid',
    head: [[
      "Fecha",
      "Productos",
      "Método Pago",
      "Subtotal",
      "IVA",
      "Total"
    ]],
    body: ventas.map(venta => [
      formatearFecha(venta.fecha_venta),
      venta.detalles_venta?.map(detalle => {
        const nombre = detalle.productos?.nombre || detalle.nombre_producto || 'Producto manual';
        const cantidad = detalle.cantidad != null ? ` (${detalle.cantidad})` : '';
        return `${nombre}${cantidad}`;
      }).join('\n') || 'Sin detalles',
      venta.metodo_pago?.charAt(0).toUpperCase() + (venta.metodo_pago?.slice(1) || ''),
      `€${venta.subtotal?.toFixed(2) || '0.00'}`,
      `€${venta.impuestos?.toFixed(2) || '0.00'}`,
      `€${venta.total?.toFixed(2) || '0.00'}`
    ]),
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
    columnStyles: {
      0: { cellWidth: 70 }, // Fecha
      1: { cellWidth: 140 }, // Productos (permitir salto de línea)
      2: { cellWidth: 80 }, // Método Pago
      3: { cellWidth: 60, halign: "right" }, // Subtotal
      4: { cellWidth: 50, halign: "right" }, // IVA
      5: { cellWidth: 110, halign: "right" } // Total
    }
  });

  // Añadir footer y numeración de páginas en cada página
  const pageCount = pdf.getNumberOfPages ? pdf.getNumberOfPages() : pdf.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    pdf.setPage(i);
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const footerY = pageHeight - 40;

    pdf.setFontSize(9);
    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(100, 100, 100); 
    pdf.text(configuracion.mensaje_footer || "TechnoFix - Sistema de Gestión", marginLeft, footerY);

    const pageStr = `Página ${i} / ${pageCount}`;
    pdf.text(pageStr, pageWidth - marginLeft, footerY, { align: 'right' });
  }

  pdf.save(`ficha_completa_${cliente?.nombre || ""}_${cliente?.nif || ""}.pdf`);
}
