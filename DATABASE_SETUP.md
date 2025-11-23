# 🗄️ Configuración de Base de Datos - TechnoFix

Este documento contiene todos los comandos SQL necesarios para configurar completamente la base de datos de TechnoFix en Supabase.

## 📋 Índice
1. [Tablas principales](#tablas-principales)
2. [Políticas RLS](#políticas-rls)
3. [Storage y buckets](#storage-y-buckets)
4. [Configuración de roles](#configuración-de-roles)

---

## 🛠️ Tablas principales

### 1. Tabla `usuarios`
```sql
-- Crear tabla usuarios
CREATE TABLE usuarios (
    id BIGSERIAL PRIMARY KEY,
    uid UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    nombre VARCHAR(100) NOT NULL,
    apellidos VARCHAR(150),
    telefono VARCHAR(20),
    correo VARCHAR(255) UNIQUE NOT NULL,
    rol VARCHAR(20) DEFAULT 'trabajador' CHECK (rol IN ('admin', 'trabajador')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Crear índices para optimizar consultas
CREATE INDEX idx_usuarios_uid ON usuarios(uid);
CREATE INDEX idx_usuarios_correo ON usuarios(correo);
CREATE INDEX idx_usuarios_rol ON usuarios(rol);
```

### 2. Tabla `clientes`
```sql
-- Crear tabla clientes
CREATE TABLE clientes (
    id BIGSERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellidos VARCHAR(150),
    nif VARCHAR(20),
    telefono VARCHAR(20),
    direccion TEXT,
    correo VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Crear índices
CREATE INDEX idx_clientes_nombre ON clientes(nombre);
CREATE INDEX idx_clientes_nif ON clientes(nif);
CREATE INDEX idx_clientes_telefono ON clientes(telefono);
```

### 3. Tabla `reparaciones`
```sql
-- Crear tabla reparaciones
CREATE TABLE reparaciones (
    id BIGSERIAL PRIMARY KEY,
    cliente_id BIGINT REFERENCES clientes(id) ON DELETE CASCADE,
    dispositivo VARCHAR(255) NOT NULL,
    problema TEXT NOT NULL,
    estado VARCHAR(50) DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'en_proceso', 'completada', 'entregada')),
    precio DECIMAL(10,2),
    observaciones TEXT,
    fecha_entrada TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    fecha_salida TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Crear índices
CREATE INDEX idx_reparaciones_cliente_id ON reparaciones(cliente_id);
CREATE INDEX idx_reparaciones_estado ON reparaciones(estado);
CREATE INDEX idx_reparaciones_fecha_entrada ON reparaciones(fecha_entrada);
```

### 4. Tabla `categorias`
```sql
-- Crear tabla categorias
CREATE TABLE categorias (
    id BIGSERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    descripcion TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Insertar categorías por defecto
INSERT INTO categorias (nombre, descripcion) VALUES
('General', 'Productos generales'),
('Reparaciones', 'Servicios de reparación'),
('Accesorios', 'Accesorios y complementos'),
('Repuestos', 'Repuestos y componentes');
```

### 5. Tabla `categorias_productos`
```sql
-- Crear tabla categorias_productos (para TPV)
CREATE TABLE categorias_productos (
    id BIGSERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    descripcion TEXT,
    icono VARCHAR(10) DEFAULT '📁',
    activa BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Insertar categorías por defecto para TPV
INSERT INTO categorias_productos (nombre, descripcion, icono) VALUES
('Smartphones', 'Teléfonos inteligentes y móviles', '📱'),
('Tablets', 'Tablets y dispositivos táctiles', '💻'),
('Laptops', 'Ordenadores portátiles', '💻'),
('Desktop', 'Ordenadores de escritorio', '🖥️'),
('Gaming', 'Dispositivos y accesorios gaming', '🎮'),
('Audio', 'Auriculares, altavoces y audio', '🎧'),
('Cámaras', 'Cámaras y fotografía', '📷'),
('Accesorios', 'Cables, cargadores y accesorios', '🔌'),
('Reparaciones', 'Servicios de reparación', '🔧'),
('Componentes', 'Repuestos y componentes', '🔩');

-- Crear índices
CREATE INDEX idx_categorias_productos_nombre ON categorias_productos(nombre);
CREATE INDEX idx_categorias_productos_activa ON categorias_productos(activa);
```

### 6. Tabla `productos`
```sql
-- Crear tabla productos
CREATE TABLE productos (
    id BIGSERIAL PRIMARY KEY,
    codigo VARCHAR(10) UNIQUE, -- ⭐ NUEVO: Código único del producto (REP0001, ACC0001, etc.)
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    iva DECIMAL(5,2) DEFAULT 21.00, -- ⭐ NUEVO: IVA del producto
    stock INTEGER DEFAULT 0,
    stock_minimo INTEGER DEFAULT 5,
    categoria_id BIGINT REFERENCES categorias_productos(id) ON DELETE SET NULL, -- ⭐ ACTUALIZADO: Referencia a categorias_productos
    activo BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Crear índices
CREATE INDEX idx_productos_codigo ON productos(codigo); -- ⭐ NUEVO: Índice para búsqueda por código
CREATE INDEX idx_productos_nombre ON productos(nombre);
CREATE INDEX idx_productos_categoria_id ON productos(categoria_id);
CREATE INDEX idx_productos_activo ON productos(activo);

-- ⭐ NUEVO: Comentario explicativo
COMMENT ON COLUMN productos.codigo IS 'Código único del producto formato: PREFIJO + 4 dígitos (ej: REP0001, ACC0001)';
```

### 7. Tabla `ventas`
```sql
-- Crear tabla ventas
CREATE TABLE ventas (
    id BIGSERIAL PRIMARY KEY,
    cliente_id BIGINT REFERENCES clientes(id) ON DELETE SET NULL,
    subtotal DECIMAL(10,2) NOT NULL DEFAULT 0,
    descuento DECIMAL(10,2) DEFAULT 0,
    impuestos DECIMAL(10,2) DEFAULT 0, -- ⭐ NUEVO: Total de impuestos/IVA
    total DECIMAL(10,2) NOT NULL DEFAULT 0,
    metodo_pago VARCHAR(50) DEFAULT 'efectivo', -- ⭐ NUEVO: Método de pago
    estado VARCHAR(50) DEFAULT 'completada', -- ⭐ NUEVO: Estado de la venta
    notas TEXT, -- ⭐ NUEVO: Notas adicionales
    fecha TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Crear índices
CREATE INDEX idx_ventas_cliente_id ON ventas(cliente_id);
CREATE INDEX idx_ventas_fecha ON ventas(fecha);
CREATE INDEX idx_ventas_estado ON ventas(estado); -- ⭐ NUEVO
CREATE INDEX idx_ventas_metodo_pago ON ventas(metodo_pago); -- ⭐ NUEVO
```

### 8. Tabla `detalles_venta`
```sql
-- Crear tabla detalles_venta
CREATE TABLE detalles_venta (
    id BIGSERIAL PRIMARY KEY,
    venta_id BIGINT REFERENCES ventas(id) ON DELETE CASCADE,
    producto_id BIGINT REFERENCES productos(id) ON DELETE SET NULL, -- ⭐ ACTUALIZADO: SET NULL para productos manuales
    codigo_producto VARCHAR(10), -- ⭐ NUEVO: Código del producto para trazabilidad
    nombre_producto VARCHAR(255) NOT NULL, -- ⭐ ACTUALIZADO: Renombrado para claridad
    cantidad INTEGER NOT NULL,
    precio_unitario DECIMAL(10,2) NOT NULL,
    iva_porcentaje DECIMAL(5,2) DEFAULT 21.00, -- ⭐ NUEVO: IVA aplicado
    subtotal DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Crear índices
CREATE INDEX idx_detalles_venta_venta_id ON detalles_venta(venta_id);
CREATE INDEX idx_detalles_venta_producto_id ON detalles_venta(producto_id);
CREATE INDEX idx_detalles_venta_codigo ON detalles_venta(codigo_producto); -- ⭐ NUEVO: Índice para búsqueda por código

-- ⭐ NUEVO: Comentario explicativo
COMMENT ON COLUMN detalles_venta.codigo_producto IS 'Código del producto para trazabilidad de ventas (puede ser null para productos manuales)';
```

### 9. Tabla `configuracion_empresa`
```sql
-- Crear tabla configuracion_empresa
CREATE TABLE configuracion_empresa (
    id BIGSERIAL PRIMARY KEY,
    nombre_empresa VARCHAR(255),
    logo_url TEXT,
    mensaje_footer TEXT DEFAULT 'TechnoFix - Sistema de Gestión',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
```

### 10. Funciones de utilidad
```sql
-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Aplicar triggers a todas las tablas que tienen updated_at
CREATE TRIGGER update_usuarios_updated_at 
    BEFORE UPDATE ON usuarios
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_clientes_updated_at 
    BEFORE UPDATE ON clientes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reparaciones_updated_at 
    BEFORE UPDATE ON reparaciones
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_productos_updated_at 
    BEFORE UPDATE ON productos
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_configuracion_empresa_updated_at 
    BEFORE UPDATE ON configuracion_empresa
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

---

## 🔒 Políticas RLS

### Habilitar RLS en todas las tablas
```sql
-- Habilitar RLS en todas las tablas
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE clientes ENABLE ROW LEVEL SECURITY;
ALTER TABLE reparaciones ENABLE ROW LEVEL SECURITY;
ALTER TABLE categorias ENABLE ROW LEVEL SECURITY;
ALTER TABLE categorias_productos ENABLE ROW LEVEL SECURITY; -- ⭐ NUEVO
ALTER TABLE productos ENABLE ROW LEVEL SECURITY;
ALTER TABLE ventas ENABLE ROW LEVEL SECURITY;
ALTER TABLE detalles_venta ENABLE ROW LEVEL SECURITY;
ALTER TABLE configuracion_empresa ENABLE ROW LEVEL SECURITY;
```

### Políticas para tabla `usuarios`
```sql
-- Usuarios: Los usuarios pueden ver y editar su propio perfil
CREATE POLICY "Usuarios pueden ver su propio perfil" ON usuarios
    FOR SELECT USING (auth.uid() = uid);

CREATE POLICY "Usuarios pueden actualizar su propio perfil" ON usuarios
    FOR UPDATE USING (auth.uid() = uid);

-- Solo admins pueden ver todos los usuarios
CREATE POLICY "Admins pueden ver todos los usuarios" ON usuarios
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM usuarios u 
            WHERE u.uid = auth.uid() AND u.rol = 'admin'
        )
    );

-- Solo admins pueden crear usuarios
CREATE POLICY "Admins pueden crear usuarios" ON usuarios
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM usuarios u 
            WHERE u.uid = auth.uid() AND u.rol = 'admin'
        )
    );

-- Solo admins pueden actualizar roles de otros usuarios
CREATE POLICY "Admins pueden actualizar usuarios" ON usuarios
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM usuarios u 
            WHERE u.uid = auth.uid() AND u.rol = 'admin'
        )
    );

-- Solo admins pueden eliminar usuarios
CREATE POLICY "Admins pueden eliminar usuarios" ON usuarios
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM usuarios u 
            WHERE u.uid = auth.uid() AND u.rol = 'admin'
        )
    );
```

### Políticas para tablas operativas (acceso general para usuarios autenticados)
```sql
-- Clientes: Acceso completo para usuarios autenticados
CREATE POLICY "Acceso completo clientes" ON clientes
    FOR ALL USING (auth.uid() IS NOT NULL);

-- Reparaciones: Acceso completo para usuarios autenticados
CREATE POLICY "Acceso completo reparaciones" ON reparaciones
    FOR ALL USING (auth.uid() IS NOT NULL);

-- Categorías: Acceso completo para usuarios autenticados
CREATE POLICY "Acceso completo categorias" ON categorias
    FOR ALL USING (auth.uid() IS NOT NULL);

-- Categorías productos (TPV): Acceso completo para usuarios autenticados
CREATE POLICY "Acceso completo categorias_productos" ON categorias_productos
    FOR ALL USING (auth.uid() IS NOT NULL);

-- Productos: Acceso completo para usuarios autenticados
CREATE POLICY "Acceso completo productos" ON productos
    FOR ALL USING (auth.uid() IS NOT NULL);

-- Ventas: Acceso completo para usuarios autenticados
CREATE POLICY "Acceso completo ventas" ON ventas
    FOR ALL USING (auth.uid() IS NOT NULL);

-- Detalles de venta: Acceso completo para usuarios autenticados
CREATE POLICY "Acceso completo detalles_venta" ON detalles_venta
    FOR ALL USING (auth.uid() IS NOT NULL);

-- Configuración empresa: Acceso completo para usuarios autenticados
CREATE POLICY "Acceso completo configuracion" ON configuracion_empresa
    FOR ALL USING (auth.uid() IS NOT NULL);
```

---

## 📁 Storage y buckets

### Crear bucket para logos de empresa
```sql
-- Crear bucket público para logos
INSERT INTO storage.buckets (id, name, public) 
VALUES ('empresa-assets', 'empresa-assets', true);

-- Política para subir archivos al bucket
CREATE POLICY "Permitir subida logos empresa" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'empresa-assets' AND
        auth.uid() IS NOT NULL
    );

-- Política para acceso público de lectura
CREATE POLICY "Acceso publico logos empresa" ON storage.objects
    FOR SELECT USING (bucket_id = 'empresa-assets');

-- Política para eliminar archivos (solo usuarios autenticados)
CREATE POLICY "Permitir eliminar logos empresa" ON storage.objects
    FOR DELETE USING (
        bucket_id = 'empresa-assets' AND
        auth.uid() IS NOT NULL
    );
```

---

## 👑 Configuración de roles

### Crear primer usuario administrador
```sql
-- Después de registrar un usuario en la aplicación, ejecutar:
-- (Reemplazar 'usuario@email.com' por el email del admin)
UPDATE usuarios 
SET rol = 'admin' 
WHERE correo = 'usuario@email.com';
```

### Función para generar números de venta únicos
```sql
-- Función para generar números de venta secuenciales
CREATE OR REPLACE FUNCTION generar_numero_venta()
RETURNS TEXT AS $$
DECLARE
    ultimo_numero INTEGER;
    nuevo_numero TEXT;
BEGIN
    -- Obtener el último número de venta del año actual
    SELECT COALESCE(
        MAX(CAST(SUBSTRING(numero FROM '^F(\d+)-') AS INTEGER)), 
        0
    ) INTO ultimo_numero
    FROM ventas 
    WHERE numero LIKE 'F%-' || TO_CHAR(NOW(), 'YYYY');
    
    -- Generar el nuevo número
    nuevo_numero := 'F' || LPAD((ultimo_numero + 1)::TEXT, 4, '0') || '-' || TO_CHAR(NOW(), 'YYYY');
    
    RETURN nuevo_numero;
END;
$$ LANGUAGE plpgsql;
```

---

## 🚀 Comandos de verificación

### Verificar que todo esté configurado correctamente
```sql
-- Verificar tablas creadas
SELECT table_name, table_type 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- Verificar políticas RLS
SELECT schemaname, tablename, policyname, cmd, qual 
FROM pg_policies 
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- Verificar buckets de storage
SELECT id, name, public 
FROM storage.buckets;

-- Verificar usuarios y roles
SELECT nombre, apellidos, correo, rol, created_at 
FROM usuarios 
ORDER BY created_at;
```

---

## 📝 Notas importantes

1. **Ejecutar en orden**: Los comandos deben ejecutarse en el orden presentado debido a las dependencias entre tablas.

2. **Primer administrador**: Después de registrar el primer usuario en la aplicación, ejecutar el comando para asignarlo como admin.

3. **Backup**: Se recomienda hacer backup de la base de datos antes de ejecutar estos comandos en producción.

4. **Índices**: Los índices están optimizados para las consultas más frecuentes del sistema.

5. **Storage**: El bucket `empresa-assets` es público para permitir el acceso a los logos desde los PDFs.

---

## 🔧 Comandos opcionales de mantenimiento

```sql
-- Limpiar datos de prueba (CUIDADO: Solo en desarrollo)
TRUNCATE TABLE detalles_venta, ventas, productos, categorias, reparaciones, clientes RESTART IDENTITY CASCADE;

-- Resetear secuencias
ALTER SEQUENCE usuarios_id_seq RESTART WITH 1;
ALTER SEQUENCE clientes_id_seq RESTART WITH 1;
ALTER SEQUENCE productos_id_seq RESTART WITH 1;
-- (Repetir para todas las tablas)

-- Verificar espacio usado
SELECT 
    schemaname,
    tablename,
    attname,
    n_distinct,
    correlation
FROM pg_stats 
WHERE schemaname = 'public'
ORDER BY tablename, attname;
```

---

✅ **Una vez ejecutados todos estos comandos, tu base de datos estará completamente configurada y lista para usar con TechnoFix.**