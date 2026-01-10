import {
  WrapperPage,
  TituloPage,
  Cargando,
  BotonVolver,
  ClienteCard,
  BotonPDFImprimir,
  Tabla,
  TablaContainer
} from "../../index";

import { useClienteDetalle } from "../../hooks/useClienteDetalle";
import { crearPDF } from "../../components/clientes/crearPDF";
import { formatearFecha } from "../../utils/fecha";

/**
 * VerClienteId
 * Muestra la ficha completa del cliente, reparaciones y ventas
 */
export function VerClienteId() {
  const { cliente, reparaciones, ventas, loading } = useClienteDetalle();

  /**
   * Genera el PDF del cliente
   */
  const handlePDF = () => {
    crearPDF(cliente, reparaciones, ventas);
  };

  if (loading) return <Cargando />;

  return (
    <WrapperPage maxWidth={1400}>
      <BotonVolver to="/clientes/ver" />
      <TituloPage>Ficha del Cliente</TituloPage>

      {cliente && <ClienteCard cliente={cliente} />}

      <div style={{ display: "flex", justifyContent: "center", margin: "1rem 0" }}>
        <BotonPDFImprimir onClick={handlePDF}>
          Descargar PDF
        </BotonPDFImprimir>
      </div>

      {/* Reparaciones */}
      <h3 style={{ textAlign: "center" }}>Reparaciones</h3>

      <TablaContainer>
        <Tabla>
          <thead>
            <tr>
              <th>Artículo</th>
              <th>Descripción</th>
              <th>Fecha</th>
              <th>Entrega</th>
              <th>Precio</th>
              <th>Observaciones</th>
            </tr>
          </thead>
          <tbody>
            {reparaciones.length === 0 ? (
              <tr><td colSpan="6" style={{ textAlign: "center" }}>No hay registros</td></tr>
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

      {/* Ventas */}
      <h3 style={{ textAlign: "center", marginTop: "2rem" }}>
        Historial de Ventas
      </h3>

      <TablaContainer>
        <Tabla>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Productos</th>
              <th>Pago</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {ventas.length === 0 ? (
              <tr><td colSpan="4" style={{ textAlign: "center" }}>No hay registros</td></tr>
            ) : (
              ventas.map((v) => (
                <tr key={v.id}>
                  <td>{formatearFecha(v.fecha_venta)}</td>
                  <td>
                    {v.detalles_venta?.map((d, i) => (
                      <div key={i}>
                        {d.productos?.nombre || d.nombre_producto}
                      </div>
                    ))}
                  </td>
                  <td>{v.metodo_pago}</td>
                  <td>€{v.total.toFixed(2)}</td>
                </tr>
              ))
            )}
          </tbody>
        </Tabla>
      </TablaContainer>
    </WrapperPage>
  );
}
