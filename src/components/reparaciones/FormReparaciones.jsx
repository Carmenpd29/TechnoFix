import { ZonaReparaciones } from "../../styles/ZonaReparacionesStyles";
import { Fechas, Datos } from "../../styles/FormReparacionesStyles";
import { IconBtn } from "../../index";
import { FiSave } from "react-icons/fi";

export function FormReparaciones({
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
  modoEdicion = false, // true para editar, false para alta
}) {
  return (
    <form onSubmit={onSubmit} style={{ width: '100%', maxWidth: 400, margin: '0 auto', background: '#fff', borderRadius: 16, boxShadow: '0 2px 18px #404a4c22', padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
      <Datos>
        <input type="text" placeholder="Nombre" value={cliente.nombre || ""} readOnly />
        <input type="text" placeholder="Apellidos" value={cliente.apellidos || ""} readOnly />
        <input type="text" placeholder="Teléfono" value={cliente.telefono || ""} readOnly />
      </Datos>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
          <label style={{ color: '#607074', fontSize: '0.95rem', marginBottom: '0.2rem' }}>Técnico:</label>
          <select className="tecnico" value={tecnico} onChange={e => setTecnico(e.target.value)} required disabled={loading} style={{ height: 40, fontSize: '1rem', borderRadius: 6, border: '1.5px solid #a5c4ca', background: '#fff', color: '#232728', width: '100%' }}>
            <option value="">Selecciona técnico</option>
            {tecnicos.map(t => (
              <option key={t.id} value={t.id}>{t.nombre}</option>
            ))}
          </select>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
          <label style={{ color: '#607074', fontSize: '0.95rem', marginBottom: '0.2rem' }}>Precio:</label>
          <input type="number" placeholder="Precio (€)" value={precio} onChange={e => setPrecio(e.target.value)} min="0" step="0.01" required className="precio" disabled={loading} style={{ height: 40, fontSize: '1rem', borderRadius: 6, border: '1.5px solid #a5c4ca', background: '#fff', color: '#232728', width: '100%', textAlign: 'right' }} />
        </div>
      </div>
      <Fechas>
        <div>
          <label>Fecha:</label>
          <input className="datos" required type="date" value={fecha} onChange={e => setFecha(e.target.value)} disabled={loading} />
        </div>
        <div>
          <label>Fecha entrega:</label>
          <input className="datos" type="date" value={fechaEntrega} onChange={e => setFechaEntrega(e.target.value)} disabled={loading} />
        </div>
      </Fechas>
      <Datos>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
          <label style={{ color: '#607074', fontSize: '0.95rem', marginBottom: '0.2rem' }}>Artículo:</label>
          <input className="datos" type="text" placeholder="Artículo" value={articulo} onChange={e => setArticulo(e.target.value)} required disabled={loading} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
          <label style={{ color: '#607074', fontSize: '0.95rem', marginBottom: '0.2rem' }}>Descripción:</label>
          <input className="datos" type="text" placeholder="Descripción" value={descripcion} onChange={e => setDescripcion(e.target.value)} required disabled={loading} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
          <label style={{ color: '#607074', fontSize: '0.95rem', marginBottom: '0.2rem' }}>Observaciones:</label>
          <textarea placeholder="Observaciones" value={observaciones} onChange={e => setObservaciones(e.target.value)} rows={3} disabled={loading} style={{ minHeight: 50, maxHeight: 120, fontSize: '1rem', borderRadius: 6, border: '1.5px solid #a5c4ca', background: '#fff', color: '#232728', width: '100%', resize: 'vertical', padding: '0.4rem' }} />
        </div>
        {mensaje && (
          <div style={{ color: mensaje.tipo === 'ok' ? 'green' : 'red', marginTop: '0.4rem', fontWeight: 500, fontSize: '0.98rem' }}>
            {typeof mensaje === 'object' ? mensaje.texto : mensaje}
          </div>
        )}
      </Datos>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
        <IconBtn type="submit" disabled={loading}>
          <FiSave size={16} />
          <span>{modoEdicion ? 'Guardar cambios' : 'Guardar'}</span>
        </IconBtn>
      </div>
    </form>
  );
}
