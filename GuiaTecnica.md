# Guía Técnica del Proyecto TechnoFix

## 1. Descripción General
TechnoFix es una aplicación web para la gestión de reparaciones, clientes, ventas y usuarios en un entorno de taller técnico. Permite controlar el flujo de trabajo, la facturación y la administración de clientes y productos.

## 2. Tecnologías Utilizadas
- **Frontend:** React 19, Vite, Bootstrap 5, styled-components
- **Backend:** Supabase (PostgreSQL, Auth, Storage)
- **Otros:** html2canvas, jsPDF, jsPDF-autotable

## 3. Estructura de Carpetas
```
public/
docs/
src/
  assets/
  components/
  pages/
  routers/
  store/
  styles/
  supabase/
  utils/
```

## 4. Principales Componentes
- **Clientes:** Gestión, búsqueda, edición y PDF de clientes
- **Reparaciones:** Alta, modificación, consulta y generación de PDF
- **TPV (Caja):** Venta de productos, gestión de líneas, cobro y selección de cliente
- **Usuarios:** Administración y registro de usuarios (solo admin). El usuario admin no tiene acciones de edición/eliminación.
- **Empresa:** Personalización de logo y nombre de empresa (solo admin).

## 5. Dependencias
- @supabase/supabase-js
- bootstrap
- express
- html2canvas
- jspdf
- jspdf-autotable
- react
- react-dom

## 6. Configuración y Despliegue
- Instalar dependencias: `npm install`
- Ejecutar en desarrollo: `npm run dev`
- Compilar para producción: `npm run build`
- Despliegue estático en carpeta `docs/`
- Si modificas la seguridad, revisa las políticas RLS y la persistencia de sesión en el store de usuario (Zustand).

## 7. Seguridad y Autenticación
- Validación y sanitización de entradas en formularios y búsquedas.
- Autenticación y autorización con Supabase: solo usuarios autenticados pueden acceder a rutas privadas.
- Protección de rutas en frontend: ningún usuario sin sesión puede acceder a vistas internas ni por URL directa.
- Persistencia de sesión: el estado de usuario se mantiene tras recargas y navegación interna.
- Gestión de roles: solo los administradores pueden gestionar usuarios y configuración de empresa. El usuario admin no puede ser editado ni eliminado desde la interfaz.
- Políticas RLS (Row Level Security) activas en la base de datos para proteger los datos según el usuario autenticado.

## 8. Base de Datos
- Tablas principales: clientes, reparaciones, productos, ventas, usuarios
- Storage para logos y PDFs

## 9. Contacto y Créditos
- Autor: Carmen Pulido Díaz
- Año: 2025

---
*Rellena los apartados específicos del documento técnico con esta información y añade detalles según el índice del PDF.*
