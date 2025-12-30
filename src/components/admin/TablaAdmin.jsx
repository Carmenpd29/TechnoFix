import { Tabla, TablaContainer } from "../../styles/TablaStyles";
import { IconBtnTabla, ColRol, ColAcciones, ColNombre, ColEstado } from "../../styles/TablaAdminStyles";

export function TablaAdmin({
  columns = [],
  data = [],
  loading = false,
  onEdit,
  onDelete,
  iconEdit: IconEdit,
  iconDelete: IconDelete,
  emptyMsg = "No hay registros.",
}) {
  return (
    <TablaContainer>
      <Tabla>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
            {(onEdit || onDelete) && <th>Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {loading && (
            <tr>
              <td colSpan={columns.length + 1} style={{ textAlign: "center" }}>
                Cargando...
              </td>
            </tr>
          )}
          {!loading && data.length === 0 && (
            <tr>
              <td colSpan={columns.length + 1} style={{ textAlign: "center", color: "#607074" }}>
                {emptyMsg}
              </td>
            </tr>
          )}
          {data.map((row) => {
            const confirmed = !!(row.email_confirmed || row.email_confirmed_at);
            return (
              <tr key={row.id}>
                {columns.map((col) => {
                  if (col.key === "nombre") return <ColNombre key={col.key}>{row[col.key]}</ColNombre>;
                  if (col.key === "rol") return <ColRol key={col.key}>{row[col.key]}</ColRol>;
                  if (col.key === "email_confirmed" || col.key === "email_confirmed_at") {
                    return (
                      <ColEstado key={col.key}>
                        <span
                          title={confirmed ? 'Confirmado' : 'Pendiente de confirmación'}
                          style={{
                            display: 'inline-block',
                            padding: '4px 10px',
                            borderRadius: '999px',
                            fontWeight: 600,
                            fontSize: '0.8rem',
                            color: '#fff',
                            backgroundColor: confirmed ? '#2e7d32' : '#c62828',
                            margin: '0 auto'
                          }}
                        >
                          {confirmed ? 'CONFIRMADO' : 'CONFIRMAR'}
                        </span>
                      </ColEstado>
                    );
                  }
                  return <td key={col.key}>{row[col.key]}</td>;
                })}
                {(onEdit || onDelete) && (
                  <ColAcciones>
                    {/* Ocultar acciones para admin */}
                    {row.rol !== "admin" && (
                      <>
                        {onEdit && IconEdit && (
                          <IconBtnTabla
                            title={
                              confirmed ? 'Editar' : 'Usuario no confirmado — no se puede editar hasta confirmar email'
                            }
                            onClick={() => onEdit(row)}
                            disabled={!confirmed}
                          >
                            <IconEdit />
                          </IconBtnTabla>
                        )}
                        {onDelete && IconDelete && (
                          <IconBtnTabla
                            title="Eliminar"
                            $eliminar
                            onClick={() => onDelete(row)}
                          >
                            <IconDelete />
                          </IconBtnTabla>
                        )}
                      </>
                    )}
                  </ColAcciones>
                )}
              </tr>
            );
          })}
        </tbody>
      </Tabla>
    </TablaContainer>
  );
}