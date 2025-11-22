import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logo from "../../assets/logo.png";
import { formatearFecha } from "../../utils/fecha";

export async function crearPDF(cliente, reparaciones, ventas = []) {
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "pt",
    format: "a4"
  });

  const marginLeft = 40;
  let y = 40;

  // Logo
  const img = new window.Image();
  img.src = logo;
  await new Promise(resolve => { img.onload = resolve; });
  pdf.addImage(img, "PNG", marginLeft, y, 60, 60);

  // Card de cliente
  y += 70;
  pdf.setFontSize(14);
  pdf.setFont("helvetica", "bold");
  pdf.text("Datos del cliente", marginLeft, y);
  pdf.setFont("helvetica", "normal");
  y += 22;
  pdf.setFontSize(11);
  pdf.text(`Nombre: ${cliente?.nombre || ""} ${cliente?.apellidos || ""}`, marginLeft, y);
  y += 18;
  pdf.text(`NIF: ${cliente?.nif || ""}`, marginLeft, y);
  y += 18;
  pdf.text(`Teléfono: ${cliente?.telefono || ""}`, marginLeft, y);
  y += 18;
  pdf.text(`Correo: ${cliente?.correo || ""}`, marginLeft, y);
  y += 18;
  const direccion = pdf.splitTextToSize(`Dirección: ${cliente?.direccion || ""}`, 400);
  pdf.text(direccion, marginLeft, y);
  y += direccion.length * 14;

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
      "Total",
      "Estado"
    ]],
    body: ventas.map(venta => [
      formatearFecha(venta.fecha_venta),
      venta.detalles_venta?.map(detalle => {
        const nombre = detalle.productos?.nombre || detalle.nombre_producto || 'Producto manual';
        return `${nombre} x${detalle.cantidad}`;
      }).join('\n') || 'Sin detalles',
      venta.metodo_pago?.charAt(0).toUpperCase() + (venta.metodo_pago?.slice(1) || ''),
      `€${venta.subtotal?.toFixed(2) || '0.00'}`,
      `€${venta.impuestos?.toFixed(2) || '0.00'}`,
      `€${venta.total?.toFixed(2) || '0.00'}`,
      venta.estado?.charAt(0).toUpperCase() + (venta.estado?.slice(1) || '')
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
      1: { cellWidth: 110 }, // Productos
      2: { cellWidth: 70 }, // Método Pago
      3: { cellWidth: 60, halign: "right" }, // Subtotal
      4: { cellWidth: 50, halign: "right" }, // IVA
      5: { cellWidth: 60, halign: "right" }, // Total
      6: { cellWidth: 90 } // Estado
    }
  });

  pdf.save(`ficha_completa_${cliente?.nombre || ""}_${cliente?.nif || ""}.pdf`);
}
