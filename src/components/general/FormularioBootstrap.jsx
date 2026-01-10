import 'bootstrap/dist/css/bootstrap.min.css';
import { FiSave } from "react-icons/fi";
import { IconBtn } from "./IconBtn";

/**
 * FormularioBootstrap
 * Componente genérico para formularios con Bootstrap.
 */
export function FormularioBootstrap({
  fields,
  values,
  onChange,
  onSubmit,
  loading,
  mensaje,
  buttonText = 'Guardar',
  children,
}) {
  return (
    <form onSubmit={onSubmit} className="container p-4 rounded-4 shadow-lg bg-white border border-2" style={{ maxWidth: 480, borderColor: '#a5c4ca' }}>
      {fields.map(({ name, label, type = 'text', required = false, placeholder = '', options }) => (
        <div className="mb-3" key={name}>
          <label className="form-label fw-semibold" style={{ color: '#003459', fontSize: '0.9rem' }}>{label}{required && ' *'}</label>
          {type === 'select' ? (
            <select
              className="form-select form-select-lg rounded-4"
              name={name}
              value={values[name] || ''}
              onChange={onChange}
              required={required}
              disabled={loading}
              style={{ fontSize: '0.9rem' }}
            >
              <option value="">Selecciona {label.toLowerCase()}</option>
              {options && options.map(opt => (
                <option key={opt.value || opt.id} value={opt.value || opt.id}>{opt.label || opt.nombre}</option>
              ))}
            </select>
          ) : type === 'textarea' ? (
            <textarea
              className="form-control rounded-4"
              name={name}
              value={values[name] || ''}
              onChange={onChange}
              rows={3}
              required={required}
              disabled={loading}
              placeholder={placeholder}
              style={{ fontSize: '0.9rem' }}
            />
          ) : (
            <input
              type={type}
              className="form-control form-control-lg rounded-4"
              name={name}
              value={values[name] || ''}
              onChange={onChange}
              required={required}
              disabled={loading}
              placeholder={placeholder}
              style={{ fontSize: '0.9rem' }}
            />
          )}
        </div>
      ))}
      {children}
      {mensaje && (
        <div className={`mt-2 fw-semibold ${mensaje.tipo === 'ok' ? 'text-success' : 'text-danger'}`}>{typeof mensaje === 'object' ? mensaje.texto : mensaje}</div>
      )}
      <div className="d-flex justify-content-center mt-4">
        <IconBtn type="submit" disabled={loading}>
          <FiSave size={16} />
          <span>{buttonText}</span>
        </IconBtn>
      </div>
    </form>
  );
}
