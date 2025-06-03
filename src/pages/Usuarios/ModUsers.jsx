import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
import { supabase, BotonVolver } from "../../index";

export function ModUsers() {
  const location = useLocation();
  const navigate = useNavigate();
  const usuario = location.state?.usuario;

  const [form, setForm] = useState({
    rol: usuario?.rol || "",
  });
  const [mensaje, setMensaje] = useState("");
  const [mensajeTipo, setMensajeTipo] = useState(""); // "error" o "success"
  const [loading, setLoading] = useState(false);

  if (!usuario) {
    return (
      <Wrapper>
        <BotonVolver to="/usuarios/lista" />
        <Titulo>Modificar Usuario</Titulo>
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
    }
  };

  return (
    <Wrapper style={{ position: "relative" }}>
      <BotonVolver to="/usuarios/lista" />
      <Titulo>Modificar Usuario</Titulo>
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
              disabled={loading}
            >
              <option value="">Selecciona un rol</option>
              <option value="admin">Administrador</option>
              <option value="encargado">Encargado/a</option>
              <option value="empleado">Empleado/a</option>
            </Select>
          </Field>
          <Boton type="submit" disabled={loading}>
            {loading ? "Guardando..." : "Guardar cambios"}
          </Boton>
          {mensaje && (
            <Mensaje $tipo={mensajeTipo}>{mensaje}</Mensaje>
          )}
        </Form>
      </FormContainer>
    </Wrapper>
  );
}

// --- ESTILOS IGUAL QUE EN NewUser ---
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

const Titulo = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #232728;
  text-align: center;
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

const Boton = styled.button`
  padding: 0.8rem;
  font-size: 1rem;
  color: white;
  background: linear-gradient(90deg, #607074 0%, #a5c4ca 100%);
  border: none;
  border-radius: 10px;
  width: 100%;
  box-sizing: border-box;
  cursor: pointer;
  transition: background 0.3s;
  &:disabled {
    background: #007bff70;
    cursor: not-allowed;
  }
`;

const Mensaje = styled.p`
  margin-top: 1.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: ${({ $tipo }) => ($tipo === "success" ? "#2e7d32" : "#d9534f")};
  text-align: center;
`;