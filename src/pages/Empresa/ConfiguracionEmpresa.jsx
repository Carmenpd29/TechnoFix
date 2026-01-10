import React, { useState, useEffect } from "react";
import { supabase } from "../../supabase/supabaseClient";
import { BotonVolver, TituloPage, WrapperPage, IconBtn } from "../../index";
import { ModalOverlay, ModalContent, ModalHeader, ModalMessage, ModalButton } from "../../styles/CajaStyles";
import { useConfiguracionEmpresaContext } from "../../contexts/ConfiguracionEmpresaContext";
import { FiSave } from "react-icons/fi";
import { ConfigContainer, FormGroup, Input, FileInput, ButtonContainer, PreviewImage, Mensaje } from "../../styles/ConfiguracionEmpresaStyles";

export function ConfiguracionEmpresa() {
  const { configuracion: configGlobal, actualizarConfiguracion, cargarConfiguracion: cargarConfigGlobal } = useConfiguracionEmpresaContext();
  const [configuracion, setConfiguracion] = useState({
    nombre_empresa: '',
    logo_url: '',
    mensaje_footer: 'TechnoFix - Sistema de Gestión'
  });
  const [logoFile, setLogoFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [mensaje, setMensaje] = useState('');
  const [mostrarModalExito, setMostrarModalExito] = useState(false);

  // Cargar configuración actual
  useEffect(() => {
    setConfiguracion(configGlobal);
    setPreviewUrl(configGlobal.logo_url || '');
    setLoadingData(false);
  }, [configGlobal]);

  // Limpiar URLs temporales al desmontar el componente
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setConfiguracion(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const redimensionarImagen = (img, maxWidth, maxHeight, tipoOriginal) => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // Calcular nuevas dimensiones manteniendo proporción
      let { width, height } = img;
      const aspectRatio = width / height;
      
      if (width > maxWidth || height > maxHeight) {
        if (aspectRatio > maxWidth / maxWidth) {
          // Imagen más ancha que alta
          width = maxWidth;
          height = maxWidth / aspectRatio;
        } else {
          // Imagen más alta que ancha
          height = maxHeight;
          width = maxHeight * aspectRatio;
        }
      }
      
      canvas.width = width;
      canvas.height = height;
      
      // Si es PNG, mantener transparencia
      if (tipoOriginal === 'image/png') {
        ctx.clearRect(0, 0, width, height);
      }
      
      // Dibujar imagen redimensionada
      ctx.drawImage(img, 0, 0, width, height);
      
      // Mantener formato original para preservar transparencia
      const formatoSalida = tipoOriginal === 'image/png' ? 'image/png' : 'image/jpeg';
      const calidad = formatoSalida === 'image/jpeg' ? 0.9 : undefined;
      
      canvas.toBlob(resolve, formatoSalida, calidad);
    });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validar tamaño del archivo (máximo 5MB para el original)
      const maxSizeInMB = 5;
      const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
      
      if (file.size > maxSizeInBytes) {
        setMensaje({ 
          tipo: 'error', 
          texto: `El archivo es muy grande. Tamaño máximo permitido: ${maxSizeInMB}MB` 
        });
        return;
      }

      try {
        // Cargar imagen
        const img = new Image();
        img.onload = async function() {
          // Limpiar URL temporal anterior si existe
          if (previewUrl && previewUrl.startsWith('blob:')) {
            URL.revokeObjectURL(previewUrl);
          }

          const maxWidth = 400;
          const maxHeight = 200;
          
          let archivoFinal = file;
          let mensajeInfo = '';
          
          // Si la imagen es muy grande, redimensionar automáticamente
          if (this.width > maxWidth || this.height > maxHeight) {
            setMensaje({ 
              tipo: 'info', 
              texto: `Redimensionando imagen desde ${this.width}x${this.height} píxeles...` 
            });
            
            const imagenRedimensionada = await redimensionarImagen(this, maxWidth, maxHeight, file.type);
            
            // Mantener extensión original
            const extension = file.type === 'image/png' ? '.png' : 
                             file.type === 'image/gif' ? '.gif' :
                             file.type === 'image/webp' ? '.webp' : '.jpg';
            
            archivoFinal = new File([imagenRedimensionada], `logo_redimensionado${extension}`, {
              type: file.type
            });
            
            mensajeInfo = `Imagen redimensionada automáticamente desde ${this.width}x${this.height} píxeles`;
          }

          // Crear preview URL
          const previewURL = URL.createObjectURL(archivoFinal);
          
          // Establecer archivo y preview
          setLogoFile(archivoFinal);
          setPreviewUrl(previewURL);
          
          if (mensajeInfo) {
            setTimeout(() => {
              setMensaje({ tipo: 'success', texto: mensajeInfo });
            }, 500);
          } else {
            setMensaje(''); // Limpiar mensajes previos
          }
          
          // Limpiar URL temporal original
          URL.revokeObjectURL(img.src);
        };

        img.onerror = function() {
          setMensaje({ 
            tipo: 'error', 
            texto: 'No se pudo cargar la imagen. Asegúrate de que sea un archivo de imagen válido.' 
          });
          URL.revokeObjectURL(img.src);
        };

        // Crear URL temporal para cargar la imagen
        const tempUrl = URL.createObjectURL(file);
        img.src = tempUrl;
        
      } catch (error) {
        console.error('Error procesando imagen:', error);
        setMensaje({ 
          tipo: 'error', 
          texto: 'Error procesando la imagen. Inténtalo de nuevo.' 
        });
      }
    }
  };

  const subirLogo = async () => {
    if (!logoFile) return configuracion.logo_url;

    const fileExt = logoFile.name.split('.').pop();
    const fileName = `logo-${Date.now()}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from('empresa-assets')
      .upload(fileName, logoFile);

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from('empresa-assets')
      .getPublicUrl(fileName);

    return publicUrl;
  };

  const guardarConfiguracion = async () => {
    setLoading(true);
    setMensaje('');

    try {
      let logoUrl = configuracion.logo_url;
      
      // Subir nuevo logo si se seleccionó uno
      if (logoFile) {
        logoUrl = await subirLogo();
      }

      const datosGuardar = {
        nombre_empresa: configuracion.nombre_empresa,
        logo_url: logoUrl,
        mensaje_footer: configuracion.mensaje_footer
      };

      // Intentar actualizar primero
      const { data: existing, error: selectError } = await supabase
        .from('configuracion_empresa')
        .select('id')
        .maybeSingle();

      if (existing) {
        // Actualizar
        const { data: updateData, error: updateError } = await supabase
          .from('configuracion_empresa')
          .update(datosGuardar)
          .eq('id', existing.id)
          .select();

        if (updateError) throw updateError;
      } else {
        // Insertar
        const { data: insertData, error: insertError } = await supabase
          .from('configuracion_empresa')
          .insert([datosGuardar])
          .select();

        if (insertError) throw insertError;
      }

      const nuevaConfig = { ...configuracion, logo_url: logoUrl };
      setConfiguracion(nuevaConfig);
      actualizarConfiguracion(nuevaConfig);
      setLogoFile(null);
      setMostrarModalExito(true);
      
      // Recargar configuración global para actualizar otros componentes
      await cargarConfigGlobal();

    } catch (error) {
      console.error('Error guardando configuración:', error);
      
      let mensajeError = 'Error al guardar la configuración: ' + error.message;
      
      if (error.message.includes('row-level security policy')) {
        mensajeError = 'Error de permisos. Necesitas configurar las políticas de seguridad en Supabase.';
      } else if (error.message.includes('permission denied')) {
        mensajeError = 'Permisos denegados. Verifica la configuración de RLS en Supabase.';
      } else if (error.message.includes('relation') && error.message.includes('does not exist')) {
        mensajeError = 'La tabla configuracion_empresa no existe. Necesitas crearla en Supabase.';
      }
      
      setMensaje({ tipo: 'error', texto: mensajeError });
    } finally {
      setLoading(false);
    }
  };

  if (loadingData) {
    return (
      <WrapperPage>
        <BotonVolver to="/empresa" />
        <TituloPage>Configuración de Empresa</TituloPage>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          Cargando configuración...
        </div>
      </WrapperPage>
    );
  }

    return (
      <WrapperPage>
        <BotonVolver to="/empresa" />
        <TituloPage>Configuración de Empresa</TituloPage>      <ConfigContainer>
        <FormGroup>
          <label htmlFor="nombre_empresa">Nombre de la Empresa</label>
          <Input
            type="text"
            id="nombre_empresa"
            name="nombre_empresa"
            value={configuracion.nombre_empresa}
            onChange={handleInputChange}
            placeholder="Ej: Mi Taller de Reparaciones"
          />
        </FormGroup>

        <FormGroup>
          <label htmlFor="logo">Logo de la Empresa</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', marginBottom: '0.5rem' }}>
            {previewUrl ? (
              <PreviewImage src={previewUrl} alt="Preview del logo" />
            ) : (
              <PreviewImage src="/TechnoFix/assets/Logo.png" alt="Logo por defecto TechnoFix" />
            )}
            <IconBtn
              type="button"
              style={{ background: '#e57373', color: '#fff' }}
              onClick={() => {
                setPreviewUrl('');
                setLogoFile(null);
                setConfiguracion(prev => ({ ...prev, logo_url: '' }));
              }}
              disabled={loading}
            >
              Quitar logo
            </IconBtn>
          </div>
          <FileInput
            type="file"
            id="logo"
            accept="image/png,image/jpeg,image/jpg,image/gif,image/webp"
            onChange={handleFileChange}
          />
          <small style={{ color: '#666', display: 'block', marginTop: '0.5rem' }}>
            <strong>🖼️ Logo automático:</strong><br/>
            • Las imágenes grandes se redimensionan automáticamente a 400×200px<br/>
            • Peso máximo del archivo original: 5MB<br/>
            • Formatos: PNG, JPG, GIF, WebP<br/>
            • ✨ <em>¡Sube cualquier imagen y nosotros la ajustamos!</em>
          </small>
        </FormGroup>

        <FormGroup>
          <label htmlFor="mensaje_footer">Mensaje del Footer (PDFs)</label>
          <Input
            type="text"
            id="mensaje_footer"
            name="mensaje_footer"
            value={configuracion.mensaje_footer}
            onChange={handleInputChange}
            placeholder="Ej: Mi Empresa - Sistema de Gestión"
          />
        </FormGroup>

        {mensaje && (
          <Mensaje tipo={mensaje.tipo}>
            {mensaje.texto}
          </Mensaje>
        )}

        <ButtonContainer>
          <IconBtn onClick={guardarConfiguracion} disabled={loading}>
            <FiSave size={16} />
            <span>{loading ? 'Guardando...' : 'Guardar'}</span>
          </IconBtn>
        </ButtonContainer>
      </ConfigContainer>

      {/* Modal de éxito */}
      {mostrarModalExito && (
        <ModalOverlay>
          <ModalContent>
            <ModalHeader style={{ color: '#a5c4ca' }}>✅ Configuración Guardada</ModalHeader>
            <ModalMessage>
              La configuración de empresa se ha guardado correctamente.
            </ModalMessage>
            <ModalButton onClick={() => setMostrarModalExito(false)}>
              Aceptar
            </ModalButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </WrapperPage>
  );
}