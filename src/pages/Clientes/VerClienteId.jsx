import React from "react";
import { WrapperPage, TituloPage, Cargando, BotonVolver, ClienteCard, BotonPDFImprimir, Tabla, TablaContainer } from "../../index";
import { useClienteDetalle } from "../../hooks/useClienteDetalle";
import { crearPDF } from "../../components/clientes/crearPDF";
import { formatearFecha } from "../../utils/fecha";

export function VerClienteId() {
  const { cliente, reparaciones, ventas, loading } = useClienteDetalle();

  const handlePDF = () => {
    crearPDF(cliente, reparaciones, ventas);
  };

  if (loading) return <Cargando />;

  return (
    <WrapperPage maxWidth={1400}>
      <BotonVolver to="/clientes/ver" />
      <TituloPage>Ficha del Cliente</TituloPage>
      
      <div style={{
        position: 'relative',
        width: '100%',
        height: '65vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'transparent',
        padding: 0,
        overflowY: 'auto',
        marginTop: '0.5rem'
      }}>
        {cliente && <ClienteCard cliente={cliente} />}

      <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem", marginTop: "1rem" }}>
        <BotonPDFImprimir onClick={handlePDF}>Descargar PDF</BotonPDFImprimir>
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "1.5rem" }}>
        <h3 style={{ textAlign: "center", marginBottom: "0.5rem" }}>Reparaciones</h3>
      </div>

      <TablaContainer style={{ overflow: 'visible', margin: '0', width: '100%' }}>
        <Tabla id="tabla-reparaciones" style={{ width: '100%', tableLayout: 'fixed' }}>
          <thead>
            <tr>
              <th>Artículo</th>
              <th>Descripción</th>
              <th>Fecha</th>
              <th>Fecha Entrega</th>
              <th>Precio</th>
              <th>Observaciones</th>
            </tr>
          </thead>
          <tbody>
            {reparaciones.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: "center", padding: "2rem", fontStyle: "italic", color: "#666" }}>
                  No hay registros
                </td>
              </tr>
            ) : (
              reparaciones.map((r) => (
                <tr key={r.idreparacion}>
                  <td>{r.articulo}</td>
                  <td>{r.descripcion}</td>
                  <td>{formatearFecha(r.fecha)}</td>
                  <td>{formatearFecha(r.fechaentrega)}</td>
                  <td>{r.precio != null ? `${r.precio} €` : "-"}</td>
                  <td>{r.observaciones || "-"}</td>
                </tr>
              ))
            )}
          </tbody>
        </Tabla>
      </TablaContainer>

      {/* Sección de Ventas */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "1.5rem", marginTop: "2rem" }}>
        <h3 style={{ textAlign: "center", marginBottom: "0.5rem" }}>Historial de Ventas TPV</h3>
      </div>

      <TablaContainer style={{ overflow: 'visible', margin: '0', width: '100%' }}>
        <Tabla id="tabla-ventas" style={{ width: '100%', tableLayout: 'fixed' }}>
          <thead>
            <tr>
              <th>Fecha</th>
              <th style={{ width: "30%" }}>Productos</th>
              <th>Método Pago</th>
              <th>Subtotal</th>
              <th>IVA</th>
              <th>Total</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {ventas.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: "center", padding: "2rem", fontStyle: "italic", color: "#666" }}>
                  No hay registros
                </td>
              </tr>
            ) : (
              ventas.map((venta) => (
                <tr key={venta.id}>
                  <td>{formatearFecha(venta.fecha_venta)}</td>
                  <td>
                    <div>
                      {venta.detalles_venta?.map((detalle, index) => (
                        <div key={index} style={{ marginBottom: "0.25rem" }}>
                          <span style={{ fontWeight: "600" }}>
                            {detalle.productos?.nombre || detalle.nombre_producto || 'Producto manual'}
                          </span>
                          <span style={{ color: "#666", marginLeft: "0.5rem" }}>
                            {detalle.cantidad}
                          </span>
                        </div>
                      )) || 'Sin detalles'}
                    </div>
                  </td>
                  <td style={{ textTransform: "capitalize" }}>
                    {venta.metodo_pago}
                  </td>
                  <td>€{venta.subtotal.toFixed(2)}</td>
                  <td>€{venta.impuestos.toFixed(2)}</td>
                  <td style={{ fontWeight: "bold", color: "#28a745" }}>
                    €{venta.total.toFixed(2)}
                  </td>
                  <td>
                    <span style={{
                      backgroundColor: venta.estado === 'completada' ? "#d4edda" : "#fff3cd",
                      color: venta.estado === 'completada' ? "#155724" : "#856404",
                      padding: "0.25rem 0.5rem",
                      borderRadius: "4px",
                      fontSize: "0.8rem",
                      fontWeight: "500"
                    }}>
                      {venta.estado}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Tabla>
      </TablaContainer>
      </div>
    </WrapperPage>
  );
}
