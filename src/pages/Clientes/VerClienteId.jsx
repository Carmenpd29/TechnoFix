import React from "react";
import { WrapperPage, TituloPage, Cargando, BotonVolver, ClienteCard, BotonPDFImprimir, Tabla, TablaContainer } from "../../index";
import { useClienteDetalle } from "../../hooks/useClienteDetalle";
import { crearPDF } from "../../components/clientes/crearPDF";
import { formatearFecha } from "../../utils/fecha";

export function VerClienteId() {
  const { cliente, reparaciones, loading } = useClienteDetalle();

  const handlePDF = () => {
    crearPDF(cliente, reparaciones);
  };

  if (loading) return <Cargando />;

  return (
    <WrapperPage>
      <BotonVolver to="/clientes/ver" />
      <TituloPage>Ficha del Cliente</TituloPage>
      {cliente && <ClienteCard cliente={cliente} />}

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "1.5rem" }}>
        <h3 style={{ textAlign: "center", marginBottom: "0.5rem" }}>Reparaciones</h3>
        {reparaciones.length > 0 && (
          <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
            <BotonPDFImprimir onClick={handlePDF}>Descargar PDF</BotonPDFImprimir>
          </div>
        )}
      </div>

      {reparaciones.length === 0 ? (
        <p>No hay reparaciones para este cliente.</p>
      ) : (
        <TablaContainer>
          <Tabla id="tabla-reparaciones" className="tabla-pdf">
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
              {reparaciones.map((r) => (
                <tr key={r.idreparacion}>
                  <td>{r.articulo}</td>
                  <td>{r.descripcion}</td>
                  <td>{formatearFecha(r.fecha)}</td>
                  <td>{formatearFecha(r.fechaentrega)}</td>
                  <td>{r.precio != null ? `${r.precio} €` : "-"}</td>
                  <td>{r.observaciones || "-"}</td>
                </tr>
              ))}
            </tbody>
          </Tabla>
        </TablaContainer>
      )}
    </WrapperPage>
  );
}
