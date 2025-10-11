import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logo from "../../assets/logo.png";
import { formatearFecha } from "../../utils/fecha";

export async function crearPDF(cliente, reparaciones) {
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

  // Tabla de reparaciones
  y += 30;
  autoTable(pdf, {
    startY: y,
    margin: { left: marginLeft, right: marginLeft },
    head: [[
      "Artículo",
      "Descripción",
      "Fecha",
      "Fecha Entrega",
      "Precio",
      "Observaciones"
    ]],
    body: reparaciones.map(r => [
      r.articulo,
      r.descripcion,
      formatearFecha(r.fecha),
      formatearFecha(r.fechaentrega),
      r.precio != null ? `${r.precio} €` : "-",
      r.observaciones || "-"
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
      0: { cellWidth: 70 }, // Artículo
      1: { cellWidth: 110 }, // Descripción
      2: { cellWidth: 70, halign: "center" }, // Fecha
      3: { cellWidth: 90, halign: "center" }, // Fecha Entrega
      4: { cellWidth: 50, halign: "right" }, // Precio
      5: { cellWidth: 120 } // Observaciones
    }
  });

  pdf.save(`reparaciones_${cliente?.nombre || ""}_${cliente?.nif || ""}.pdf`);
}
