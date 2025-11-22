import styled from "styled-components";
import { primaryColor, secondaryColor, accentColor, backgroundColor } from "../utils/breakpoints";

export const ProductosContainer = styled.div`
  position: relative;
  width: 100%;
  height: 65vh;
  background: transparent;
  padding: 0;
  margin-top: 0.5rem;
`;

export const ProductosHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  padding: 0 1rem;

  @media (max-width: 700px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

export const ProductosGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 1rem;
  height: 100%;

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
    height: auto;
  }
`;

export const FormularioSection = styled.div`
  background: white;
  border-radius: 6px;
  padding: 1rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  height: fit-content;
  max-height: 100%;
  overflow-y: auto;
`;

export const ListaSection = styled.div`
  background: white;
  border-radius: 6px;
  padding: 1rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  max-height: 100%;
  flex-direction: column;
`;

export const SectionTitle = styled.h3`
  color: ${primaryColor};
  font-size: 1rem;
  margin-bottom: 0.75rem;
  border-bottom: 1px solid ${accentColor};
  padding-bottom: 0.25rem;
`;

export const FormularioProducto = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  label {
    font-weight: 500;
    color: #333;
    font-size: 0.8rem;
  }
`;

export const Input = styled.input`
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 0.5rem;
  font-size: 0.85rem;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: ${primaryColor};
    box-shadow: 0 0 0 2px ${primaryColor}20;
  }

  &:invalid {
    border-color: #dc3545;
  }
`;

export const TextArea = styled.textarea`
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 0.5rem;
  font-size: 0.85rem;
  min-height: 50px;
  resize: vertical;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: ${primaryColor};
    box-shadow: 0 0 0 2px ${primaryColor}20;
  }
`;

export const Select = styled.select`
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 0.5rem;
  font-size: 0.85rem;
  background: white;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: ${primaryColor};
    box-shadow: 0 0 0 2px ${primaryColor}20;
  }
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const GuardarBtn = styled.button`
  width: 50%;
  text-align: center;
  margin-top: 0.5rem;
  margin-left: auto;
  margin-right: auto;
  padding: 0.5rem 0;
  background: linear-gradient(90deg, #607074 0%, #a5c4ca 100%);
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  
  &:hover {
    background: linear-gradient(90deg, #a5c4ca 0%, #607074 100%);
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
  
  @media (max-width: 1120px) {
    font-size: 0.75rem;
    width: 40%;
  }
`;

export const BuscadorContainer = styled.div`
  margin-bottom: 0.5rem;
  position: relative;
`;

export const BuscadorInput = styled.input`
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  font-size: 1rem;
  background: #f8f9fa;

  &:focus {
    outline: none;
    border-color: ${primaryColor};
    background: white;
  }
`;

export const BuscadorIcon = styled.div`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
  pointer-events: none;
`;

export const ProductosListaContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  margin-top: 0.5rem;
  max-height: calc(65vh - 120px);
  min-height: 150px;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${primaryColor};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${secondaryColor};
  }
`;

export const ProductoCard = styled.div`
  background: #f8f9fa;
  border-radius: 6px;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  border-left: 3px solid ${primaryColor};
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    background: #e9ecef;
    transform: translateX(2px);
  }
`;

export const ProductoNombre = styled.div`
  font-weight: 600;
  color: #333;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
`;

export const ProductoInfo = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
  font-size: 0.9rem;
  color: #666;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 0.25rem;
  }
`;

export const ProductoInfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  
  .label {
    font-weight: 500;
  }
  
  .value {
    color: ${primaryColor};
    font-weight: 600;
  }
`;

export const ProductoDescripcion = styled.div`
  color: #666;
  font-size: 0.85rem;
  margin-top: 0.5rem;
  font-style: italic;
`;

export const AccionesProducto = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  justify-content: flex-end;
`;

export const EditarBtn = styled.button`
  background: ${accentColor};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.3rem 0.75rem;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #0056b3;
  }
`;

export const EliminarBtn = styled.button`
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.3rem 0.75rem;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #c82333;
  }
`;

export const EstadisticasContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 0.5rem;
  margin-bottom: 0.75rem;
`;

export const EstadisticaCard = styled.div`
  background: white;
  border-radius: 6px;
  padding: 0.5rem;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  border-top: 2px solid ${primaryColor};

  .numero {
    font-size: 1.1rem;
    font-weight: bold;
    color: ${primaryColor};
    margin-bottom: 0.15rem;
  }

  .label {
    color: #666;
    font-size: 0.7rem;
    font-weight: 500;
  }
`;

export const NoProductos = styled.div`
  text-align: center;
  padding: 1.5rem 1rem;
  color: #666;
  font-style: italic;

  .icono {
    font-size: 2rem;
    margin-bottom: 0.5rem;
    opacity: 0.3;
  }
`;

export const CategoriaTag = styled.span`
  background: ${primaryColor}20;
  color: ${primaryColor};
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
`;