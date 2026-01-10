import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  supabase,
  BotonVolver,
  TituloPage,
  WrapperPage
} from "../../index";
import { FormReparacionesBootstrap } from "../../components/reparaciones/FormReparacionesBootstrap";

/**
 * Pantalla para modificar una reparación existente
 */
export function ModReparaciones() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [reparacion, setReparacion] = useState(null);
  const [tecnicos, setTecnicos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  /**
   * Carga inicial de técnicos y reparación
   */
  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      // Técnicos
      const { data: tecnicosData } = await supabase
        .from("usuarios")
        .select("id, nombre")
        .order("nombre", { ascending: true });

      setTecnicos(tecnicosData || []);

      // Reparación
      const { data, error } = await supabase
        .from("reparaciones")
        .select(`
          idreparacion,
          articulo,
          descripcion,
          fecha,
          fechaentrega,
          precio,
          observaciones,
          idtecnico,
          clientes:clientes (
            id,
            nombre,
            apellidos,
            telefono
          )
        `)
        .eq("idreparacion", id)
        .single();

      if (error || !data) {
        setError("No se pudo cargar la reparación.");
        setLoading(false);
        return;
      }

      setReparacion(data);
      setLoading(false);
    }

    fetchData();
  }, [id]);

  /**
   * Guardado de los cambios
   */
  const handleGuardar = async (e) => {
    e.preventDefault();
    setMensaje("");
    setError("");
    setLoading(true);

    const { error } = await supabase
      .from("reparaciones")
      .update({
        articulo: reparacion.articulo,
        descripcion: reparacion.descripcion,
        fecha: reparacion.fecha,
        fechaentrega: reparacion.fechaentrega || null,
        precio:
          reparacion.precio === "" ? null : parseFloat(reparacion.precio),
        observaciones: reparacion.observaciones,
        idtecnico: reparacion.idtecnico,
      })
      .eq("idreparacion", id);

    setLoading(false);

    if (error) {
      setError("No se pudo guardar la reparación.");
    } else {
      setMensaje({
        texto: "Reparación actualizada correctamente.",
        tipo: "ok",
      });
    }
  };

  if (loading || !reparacion) {
    return (
      <WrapperPage>
        <TituloPage>Modificar Reparación</TituloPage>
        <p>{loading ? "Cargando..." : "No se encontró la reparación."}</p>
      </WrapperPage>
    );
  }

  return (
    <WrapperPage>
      <BotonVolver to="/reparaciones/ver" />
      <TituloPage>Modificar Reparación</TituloPage>

      <FormReparacionesBootstrap
        cliente={reparacion.clientes || { nombre: "", apellidos: "", telefono: "" }}
        tecnicos={tecnicos}
        tecnico={reparacion.idtecnico || ""}
        setTecnico={(v) =>
          setReparacion((r) => ({ ...r, idtecnico: v }))
        }
        precio={reparacion.precio || ""}
        setPrecio={(v) => setReparacion((r) => ({ ...r, precio: v }))}
        fecha={reparacion.fecha?.slice(0, 10) || ""}
        setFecha={(v) => setReparacion((r) => ({ ...r, fecha: v }))}
        fechaEntrega={reparacion.fechaentrega?.slice(0, 10) || ""}
        setFechaEntrega={(v) =>
          setReparacion((r) => ({ ...r, fechaentrega: v }))
        }
        articulo={reparacion.articulo || ""}
        setArticulo={(v) =>
          setReparacion((r) => ({ ...r, articulo: v }))
        }
        descripcion={reparacion.descripcion || ""}
        setDescripcion={(v) =>
          setReparacion((r) => ({ ...r, descripcion: v }))
        }
        observaciones={reparacion.observaciones || ""}
        setObservaciones={(v) =>
          setReparacion((r) => ({ ...r, observaciones: v }))
        }
        mensaje={mensaje || error}
        onSubmit={handleGuardar}
        loading={loading}
        modoEdicion={true}
        buttonText={loading ? "Modificando..." : "Modificar"}
      />
    </WrapperPage>
  );
}
