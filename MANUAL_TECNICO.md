# Manual Técnico — TechnoFix

## 1. Descripción general
TechnoFix es una aplicación web para la gestión de reparaciones, clientes, ventas y usuarios en un entorno de taller técnico. Permite controlar el flujo de trabajo, la facturación y la administración de clientes, productos y configuraciones de empresa.

## 2. Tecnologías utilizadas
- Frontend: React 19, Vite, Bootstrap 5, styled-components
- Backend: Supabase (Postgres, Auth, Storage)
- Librerías adicionales: html2canvas, jsPDF, jspdf-autotable

## 3. Estructura de carpetas (resumen)
```
src/
  assets/
  components/
  contexts/
  hooks/
  pages/
  routers/
  store/
  styles/
  supabase/
  utils/
App.jsx
index.js
main.jsx
```

## 4. Principales componentes y responsabilidades
- Clientes: gestión (alta/edición/baja), búsqueda y generación de PDF de ficha de cliente.
- Reparaciones: alta, modificación, consulta e impresión/exportación en PDF.
- TPV (Caja): gestión de ventas, líneas, cobro, selección de cliente y generación de facturas/PDF.
- Usuarios: administración de usuarios y roles (solo Admin).
- Empresa: personalización de logo/nombre y pie de página en documentos (solo Admin).

## 5. Dependencias clave (resumen de uso)
- `@supabase/supabase-js`: cliente Supabase — auth, consultas y storage.
- `bootstrap`: estilos y componentes UI responsivos.
- `html2canvas`: captura de DOM para exportar imágenes/PDFs.
- `jspdf` + `jspdf-autotable`: generación de PDFs y tablas en PDF.
- `react`, `react-dom`: infraestructura de la UI.

## 6. Configuración y despliegue
- Producción: la app se publica en GitHub Pages (contenido compilado en `docs/`).
    Acceso URL: https://carmenpd29.github.io/TechnoFix 
- Desarrollo local:
  1. Clonar repositorio.
  2. `npm install`.
  3. `npm run dev` para entorno de desarrollo.
  4. `npm run build` para generar producción.
  5. El contenido de `docs/` puede publicarse en GitHub Pages.
  6. Configurar variables de Supabase en entorno (`.env` o en el código según uso).
- No es necesario desplegar servidor propio: Supabase gestiona BD, auth y storage.

## 7. Seguridad y autenticación
- Validación y sanitización de entradas (NIF, textos, direcciones) en frontend.
- Autenticación mediante Supabase Auth; solo usuarios autenticados acceden a rutas privadas.
- Persistencia de sesión en el store de usuario (Zustand) y manejo de token.
- Gestión de roles: `Administrador`, `Encargado`, `Empleado`.
- Políticas RLS en la base de datos para aislar datos por empresa/usuario.

## 8. Base de datos — Tablas principales
- `clientes`: nombre, apellidos, telefono, nif, direccion, correo.
- `usuarios`: nombre, email, rol, uid_auth.
- `reparaciones`: idcliente, articulo, descripcion, fecha, precio, observaciones.
- `productos`: nombre, descripcion, precio, iva, stock, categoria, codigo.
- `categorias_productos`: categorías de productos.
- `ventas`: cliente_id, fecha, totales, metodo_pago, estado, notas.
- `detalles_venta`: líneas de venta (cantidad, precio_unitario, iva, subtotal, nombre, codigo, venta_id).
- `configuracion_empresa`: nombre, logo_url, mensaje_footer.

### Nota sobre integridad histórica
No existe foreign key directa entre `detalles_venta` y `productos`; cada línea almacena nombre y código del producto para mantener el histórico aunque el producto cambie o se elimine.

## 9. Storage y archivos
- Supabase Storage se utiliza para guardar logos y PDFs generados (reportes, tickets, facturas).

## 10. Buenas prácticas operativas
- Implementar constraints únicos en BD para `telefono` y `correo` si se requiere unicidad a nivel global.
- Monitorizar uso de Supabase y planificar migración a plan de pago si se supera el Free tier.
- Automatizar backups y conservar histórico mínimo (p. ej. 7 días para producción).
- Deploys desde `main` con etiquetas y GitHub Actions para CI/CD hacia GitHub Pages.