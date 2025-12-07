import { Tabla, TablaContainer } from "../../styles/TablaStyles";
import { IconBtnTabla, ColRol, ColAcciones, ColNombre } from "../../styles/TablaAdminStyles";

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
          {data.map((row) => (
            <tr key={row.id}>
              {columns.map((col) => {
                if (col.key === "nombre") return <ColNombre key={col.key}>{row[col.key]}</ColNombre>;
                if (col.key === "rol") return <ColRol key={col.key}>{row[col.key]}</ColRol>;
                return <td key={col.key}>{row[col.key]}</td>;
              })}
              {(onEdit || onDelete) && (
                <ColAcciones>
                  {/* Ocultar acciones para admin */}
                  {row.rol !== "admin" && (
                    <>
                      {onEdit && IconEdit && (
                        <IconBtnTabla title="Editar" onClick={() => onEdit(row)}>
                          <IconEdit />
                        </IconBtnTabla>
                      )}
                      {onDelete && IconDelete && (
                        <IconBtnTabla
                          title="Eliminar"
                          eliminar
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
          ))}
        </tbody>
      </Tabla>
    </TablaContainer>
  );
}