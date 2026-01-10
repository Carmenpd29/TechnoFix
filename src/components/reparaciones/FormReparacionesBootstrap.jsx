import { FiSave } from "react-icons/fi";
import { IconBtn } from "../general/IconBtn";
import 'bootstrap/dist/css/bootstrap.min.css';
import { formStyle, smallFont, labelSmall, textareaSmall } from "../../styles/FormReparacionesBootstrapStyles";

/**
 * FormReparacionesBootstrap
 * Formulario para crear o editar reparaciones.
 */
export function FormReparacionesBootstrap({
  cliente,
  tecnicos,
  tecnico,
  setTecnico,
  precio,
  setPrecio,
  fecha,
  setFecha,
  fechaEntrega,
  setFechaEntrega,
  articulo,
  setArticulo,
  descripcion,
  setDescripcion,
  observaciones,
  setObservaciones,
  mensaje,
  onSubmit,
  loading,
  modoEdicion = false,
}) {
  {/* Formulario de reparación.
    - En modo edición muestra los datos existentes
    - En modo creación permite registrar una nueva reparación
  */}
  return (
    <form onSubmit={onSubmit} className="container p-4 rounded-4 shadow-lg bg-white border border-2" style={formStyle}>
      <div className="row g-3 mb-2">
        <div className="col-12">
          <input type="text" className="form-control form-control-lg rounded-4 bg-light text-secondary" placeholder="Nombre" value={cliente?.nombre || ""} readOnly style={smallFont} />
        </div>
        <div className="col-12">
          <input type="text" className="form-control form-control-lg rounded-4 bg-light text-secondary" placeholder="Apellidos" value={cliente?.apellidos || ""} readOnly style={smallFont} />
        </div>
        <div className="col-12">
          <input type="text" className="form-control form-control-lg rounded-4 bg-light text-secondary" placeholder="Teléfono" value={cliente?.telefono || ""} readOnly style={smallFont} />
        </div>
      </div>
      <div className="row g-3 mb-2">
        <div className="col-12">
          <label className="form-label fw-semibold" style={labelSmall}>Técnico:</label>
          <select className="form-select form-select-lg rounded-4" value={tecnico} onChange={e => setTecnico(e.target.value)} required disabled={loading} style={smallFont}>
            <option value="">Selecciona técnico</option>
            {tecnicos.map(t => (
              <option key={t.id} value={t.id}>{t.nombre}</option>
            ))}
          </select>
        </div>
        <div className="col-12">
          <label className="form-label fw-semibold" style={labelSmall}>Precio:</label>
          <input type="number" className="form-control form-control-lg rounded-4 text-end" placeholder="Precio (€)" value={precio} onChange={e => setPrecio(e.target.value)} min="0" step="0.01" required disabled={loading} style={smallFont} />
        </div>
      </div>
      <div className="row g-3 mb-2">
        <div className="col-6">
          <label className="form-label fw-semibold" style={labelSmall}>Fecha:</label>
          <input type="date" className="form-control form-control-lg rounded-4" required value={fecha} onChange={e => setFecha(e.target.value)} disabled={loading} style={smallFont} />
        </div>
        <div className="col-6">
          <label className="form-label fw-semibold" style={labelSmall}>Fecha entrega:</label>
          <input type="date" className="form-control form-control-lg rounded-4" value={fechaEntrega} onChange={e => setFechaEntrega(e.target.value)} disabled={loading} style={smallFont} />
        </div>
      </div>
      <div className="row g-3 mb-2">
        <div className="col-12">
          <label className="form-label fw-semibold" style={labelSmall}>Artículo:</label>
          <input type="text" className="form-control form-control-lg rounded-4" placeholder="Artículo" value={articulo} onChange={e => setArticulo(e.target.value)} required disabled={loading} style={smallFont} />
        </div>
        <div className="col-12">
          <label className="form-label fw-semibold" style={labelSmall}>Descripción:</label>
          <input type="text" className="form-control form-control-lg rounded-4" placeholder="Descripción" value={descripcion} onChange={e => setDescripcion(e.target.value)} required disabled={loading} style={smallFont} />
        </div>
        <div className="col-12">
          <label className="form-label fw-semibold" style={labelSmall}>Observaciones:</label>
          <textarea className="form-control rounded-4" placeholder="Observaciones" value={observaciones} onChange={e => setObservaciones(e.target.value)} rows={3} disabled={loading} style={textareaSmall} />
        </div>
        {mensaje && (
          <div className={`mt-2 fw-semibold ${mensaje.tipo === 'ok' ? 'text-success' : 'text-danger'}`}>{typeof mensaje === 'object' ? mensaje.texto : mensaje}</div>
        )}
      </div>
      <div className="d-flex justify-content-center mt-4">
        <IconBtn type="submit" disabled={loading}>
          <FiSave size={16} />
          <span>{modoEdicion ? "Guardar cambios" : "Guardar"}</span>
        </IconBtn>
      </div>
    </form>
  );
}
