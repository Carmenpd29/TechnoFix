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
- **Usuarios:** Administración y registro de usuarios

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

## 7. Seguridad
- Validación y sanitización de entradas
- Autenticación y autorización con Supabase
- Políticas RLS en la base de datos

## 8. Base de Datos
- Tablas principales: clientes, reparaciones, productos, ventas, usuarios
- Storage para logos y PDFs

## 9. Contacto y Créditos
- Autor: Carmen Pulido Díaz
- Año: 2025

---
*Rellena los apartados específicos del documento técnico con esta información y añade detalles según el índice del PDF.*
