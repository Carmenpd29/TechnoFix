import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useUserStore } from "../../store/userStore";
import styled from "styled-components";
import { supabase, BotonVolver, TituloPage, IconBtn } from "../../index";
import { FiSave } from "react-icons/fi";

export function ModUsers() {
  const location = useLocation();
  const navigate = useNavigate();
  const usuario = location.state?.usuario;
  const [esUnicoAdmin, setEsUnicoAdmin] = useState(false);
  const { login } = useUserStore();

  const [form, setForm] = useState({
    rol: usuario?.rol || "",
  });
    useEffect(() => {
      async function checkUnicoAdmin() {
        if (usuario?.rol === "admin") {
          const { data, error } = await supabase
            .from("usuarios")
            .select("id")
            .eq("rol", "admin");
          if (!error && data && data.length === 1 && data[0].id === usuario.id) {
            setEsUnicoAdmin(true);
          } else {
            setEsUnicoAdmin(false);
          }
        }
      }
      checkUnicoAdmin();
    }, [usuario]);
  const [mensaje, setMensaje] = useState("");
  const [mensajeTipo, setMensajeTipo] = useState(""); // "error" o "success"
  const [loading, setLoading] = useState(false);

  if (!usuario) {
    return (
      <Wrapper>
        <BotonVolver to="/usuarios/lista" />
        <TituloPage>Modificar Usuario</TituloPage>
        <Mensaje $tipo="error">No se ha encontrado el usuario.</Mensaje>
      </Wrapper>
    );
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    setMensajeTipo("");
    setLoading(true);

    if (!form.rol) {
      setMensaje("El rol es obligatorio.");
      setMensajeTipo("error");
      setLoading(false);
      return;
    }
    // Bloquear si es el único admin y se intenta cambiar a otro rol
    if (usuario.rol === "admin" && esUnicoAdmin && form.rol !== "admin") {
      setMensaje("No puedes cambiar el rol de este usuario porque es el único administrador.");
      setMensajeTipo("error");
      setLoading(false);
      return;
    }

    const { error } = await supabase
      .from("usuarios")
      .update({ rol: form.rol })
      .eq("id", usuario.id);

    setLoading(false);

    if (error) {
      setMensaje("Error al actualizar el usuario.");
      setMensajeTipo("error");
    } else {
      setMensaje("Rol actualizado correctamente.");
      setMensajeTipo("success");
      // Refrescar el usuario en el store si es el usuario logueado
      if (usuario.id === useUserStore.getState().user?.id) {
        // Recargar datos del usuario desde supabase
        const { data: userActualizado } = await supabase
          .from("usuarios")
          .select("*")
          .eq("id", usuario.id)
          .single();
        if (userActualizado) login(userActualizado);
      }
    }
  };

  return (
    <Wrapper style={{ position: "relative" }}>
      <BotonVolver to="/usuarios/lista" />
      <TituloPage>Modificar Usuario</TituloPage>
      <FormContainer>
        <Form onSubmit={handleSubmit}>
          <Field>
            <Label>Nombre</Label>
            <Input
              name="nombre"
              value={usuario.nombre}
              disabled
              readOnly
            />
          </Field>
          <Field>
            <Label>Rol</Label>
            <Select
              name="rol"
              value={form.rol}
              onChange={handleChange}
              required
              disabled={loading || (usuario.rol === "admin" && esUnicoAdmin)}
            >
              <option value="">Selecciona un rol</option>
              <option value="admin">Administrador</option>
              <option value="encargado">Encargado/a</option>
              <option value="empleado">Empleado/a</option>
            </Select>
          </Field>
          <ButtonContainer>
            <IconBtn type="submit" disabled={loading}>
              <FiSave size={16} />
              <span>{loading ? "Guardando..." : "Guardar"}</span>
            </IconBtn>
          </ButtonContainer>
          {mensaje && (
            <Mensaje $tipo={mensajeTipo}>{mensaje}</Mensaje>
          )}
        </Form>
      </FormContainer>
    </Wrapper>
  );
}


const Wrapper = styled.div`
  width: 95%;
  max-width: 900px;
  margin: 2.5rem auto;
  padding: 2rem 1.5rem;
  background: #f8fafb;
  border-radius: 22px;
  box-shadow: 0 2px 18px #404a4c22;
  min-height: 70vh;
  border: 2px solid #a5c4ca;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  position: relative;
`;

const FormContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Form = styled.form`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: 600;
  margin-bottom: 0.4rem;
`;

const Input = styled.input`
  padding: 0.8rem;
  font-size: 1rem;
  border: 2px solid #a5c4ca;
  border-radius: 10px;
  width: 100%;
  box-sizing: border-box;
  box-shadow: inset 0 2px 8px #404a4c10;
  &:disabled {
    background: #e9ecef;
  }
`;

const Select = styled.select`
  padding: 0.8rem;
  font-size: 1rem;
  border: 2px solid #a5c4ca;
  border-radius: 10px;
  width: 100%;
  background: white;
  box-sizing: border-box;
  box-shadow: inset 0 2px 8px #404a4c10;
  &:disabled {
    background: #e9ecef;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

const Mensaje = styled.p`
  margin-top: 1.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: ${({ $tipo }) => ($tipo === "success" ? "#2e7d32" : "#d9534f")};
  text-align: center;
`;