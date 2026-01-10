import styled from "styled-components";
import { primaryColor, secondaryColor, accentColor, backgroundColor } from "../utils/breakpoints";

export const CajaContainer = styled.div`
  position: relative;
  width: 100%;
  height: 65vh;
  display: flex;
  flex-direction: column;
  background: transparent;
  padding: 0;
  overflow-y: auto;
  margin-top: 0.5rem;

  @media (max-width: 1200px) {
    height: 70vh;
    overflow-y: auto;
  }

  @media (max-width: 700px) {
    height: 58vh;
    overflow-y: auto;
  }
  
  /* Estilo personalizado del scroll */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f8f9fa;
    border-radius: 4px;
    margin: 2px;
  }

  &::-webkit-scrollbar-thumb {
    background: #a5c4ca;
    border-radius: 4px;
    border: 1px solid #e9ecef;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #607074;
  }
`;

export const CajaMain = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 0.5rem;
  flex: 1;
  min-height: 0;
  overflow: hidden;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr auto;
    height: 100%;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 0.3rem;
  }
`;

export const ProductosSection = styled.div`
  background: white;
  border-radius: 6px;
  padding: 0.4rem;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-height: 0;
  height: 100%;
`;

export const SectionTitle = styled.h3`
  color: ${primaryColor};
  font-size: 1rem;
  margin-bottom: 0.2rem;
  border-bottom: 1px solid ${accentColor};
  padding-bottom: 0.15rem;
  flex-shrink: 0;
`;

export const ProductosLista = styled.div`
  flex: 1;
  overflow-y: auto;
  margin-bottom: 0.3rem;
  min-height: 100px;
  max-height: calc(65vh - 200px);
  border: 1px solid #eee;
  border-radius: 4px;
  padding: 0.2rem;
  width: 100%;

  @media (max-width: 1200px) {
    max-height: calc(70vh - 180px);
    min-height: 120px;
  }

  @media (max-width: 700px) {
    max-height: calc(58vh - 150px);
    min-height: 80px;
  }

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f8f9fa;
    border-radius: 4px;
    margin: 2px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${primaryColor};
    border-radius: 4px;
    border: 1px solid #e9ecef;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${secondaryColor};
  }

  /* Mostrar siempre el scroll en Firefox */
  scrollbar-width: thin;
  scrollbar-color: ${primaryColor} #f8f9fa;
`;

export const ProductoItem = styled.div`
  display: grid;
  grid-template-columns: 80px 1.8fr 0.7fr 0.5fr 0.5fr 0.5fr 0.5fr 60px;
  gap: 0.15rem;
  padding: 0.3rem;
  border: none;
  border-radius: 4px;
  margin-bottom: 0.2rem;
  font-size: 0.8rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  transition: all 0.2s;
  align-items: center;

  /* Cuando tiene input-group (para agregar producto) */
  .input-group {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.2rem;
  }

  .input-header {
    background: #a5c4ca;
    color: #232728;
    font-size: 0.8rem;
    font-weight: 600;
    padding: 0.2rem 0.4rem;
    border-radius: 3px;
    text-align: center;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.12);
  }

  @media (max-width: 900px) {
    grid-template-columns: 2fr 1fr 80px;
    gap: 0.3rem;
    
    .precio, .iva, .descuento {
      display: none;
    }
    
    .input-header {
      font-size: 0.75rem;
      padding: 0.15rem 0.3rem;
    }
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    
    .input-group {
      align-items: stretch;
    }
    
    .input-header {
      text-align: left;
    }
  }

  /* Cuando tiene input-group (para agregar producto) */
  .input-group {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.2rem;
  }

  .input-header {
    background: #a5c4ca;
    color: #232728;
    font-size: 0.8rem;
    font-weight: 600;
    padding: 0.2rem 0.4rem;
    border-radius: 3px;
    text-align: center;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.12);
  }

  @media (max-width: 900px) {
    grid-template-columns: 2fr 1fr 80px;
    gap: 0.3rem;
    
    .precio, .iva, .descuento {
      display: none;
    }
    
    .input-header {
      font-size: 0.75rem;
      padding: 0.15rem 0.3rem;
    }
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    
    .input-group {
      align-items: stretch;
    }
    
    .input-header {
      text-align: left;
    }
  }
`;

export const ProductoInput = styled.input`
  border: 1px solid #ddd;
  border-radius: 3px;
  padding: 0.15rem 0.2rem;
  font-size: 0.8rem;
  width: 100%;
  min-height: 28px;
  height: 28px;
  box-sizing: border-box;
  text-align: center;

  &:focus {
    outline: none;
    border-color: ${primaryColor};
  }
`;

export const ProductoNombre = styled.div`
  font-weight: 500;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 3px;
  padding: 0.1rem 0.15rem;
  font-size: 0.8rem;
  width: 100%;
  min-height: 28px;
  height: 28px;
  box-sizing: border-box;
  background: white;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const EliminarBtn = styled.button`
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 3px;
  padding: 0.15rem;
  cursor: pointer;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.2rem;
  height: 2.2rem;
  transition: all 0.2s;

  &:hover {
    background: #c82333;
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
`;

export const AgregarProductoForm = styled.form`
  display: grid;
  grid-template-columns: 80px 1.8fr 0.7fr 0.5fr 0.5fr 0.5fr 0.5fr 60px;
  gap: 0.15rem;
  padding: 0.4rem;
  border: none;
  border-radius: 6px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
  margin-bottom: 0.4rem;

  & > button {
    align-self: center;
  }

  .input-group {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.2rem;
  }

  .input-header {
    background: #a5c4ca;
    color: #232728;
    font-size: 0.8rem;
    font-weight: 600;
    padding: 0.2rem 0.4rem;
    border-radius: 3px;
    text-align: center;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media (max-width: 900px) {
    grid-template-columns: 1fr 1fr;
    gap: 0.3rem;
    padding: 0.4rem;
    
    .input-header {
      font-size: 0.75rem;
      padding: 0.15rem 0.3rem;
    }
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    
    .input-group {
      align-items: stretch;
    }
    
    .input-header {
      text-align: left;
      font-size: 0.75rem;
    }
  }

  .input-group {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.2rem;
  }

  .input-header {
    background: #a5c4ca;
    color: #232728;
    font-size: 0.8rem;
    font-weight: 600;
    padding: 0.2rem 0.4rem;
    border-radius: 3px;
    text-align: center;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media (max-width: 900px) {
    grid-template-columns: 1fr 1fr;
    gap: 0.3rem;
    padding: 0.4rem;
    
    .input-header {
      font-size: 0.75rem;
      padding: 0.15rem 0.3rem;
    }
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    
    .input-group {
      align-items: stretch;
    }
    
    .input-header {
      text-align: left;
      font-size: 0.75rem;
    }
  }
`;

export const AgregarBtn = styled.button`
  background: ${primaryColor};
  color: white;
  border: none;
  border-radius: 3px;
  padding: 0.15rem;
  cursor: pointer;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.2rem;
  height: 2.2rem;
  transition: all 0.2s;

  &:hover {
    background: ${secondaryColor};
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

export const CalculadoraSection = styled.div`
  background: white;
  border-radius: 6px;
  padding: 0.5rem;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  height: 100%;
  overflow: hidden;
`;

export const TotalSection = styled.div`
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 4px;
  padding: 0.4rem;
  border-left: 2px solid ${primaryColor};
  box-shadow: 0 1px 3px rgba(0, 52, 89, 0.1);
  flex-shrink: 0;
`;

export const CalculadoraToggle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding: 0.5rem 0;
  transition: all 0.2s;

  &:hover {
    color: ${primaryColor};
  }
`;

export const CalculadoraIcon = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1000;
  box-shadow: 0 4px 16px rgba(0, 52, 89, 0.3);
  transition: all 0.3s;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 20px rgba(0, 52, 89, 0.4);
  }

  svg {
    color: white;
    font-size: 24px;
  }

  /* Mostrar en todas las resoluciones excepto desktop grande */
  @media (min-width: 1201px) {
    display: none;
  }
`;

export const CalculadoraMini = styled.div`
  position: fixed;
  bottom: 5rem;
  right: 1.5rem;
  background: white;
  border-radius: 6px;
  padding: 0.4rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  z-index: 999;
  width: 190px;
  transform: ${props => props.open ? 'scale(1) translateY(0)' : 'scale(0.8) translateY(20px)'};
  opacity: ${props => props.open ? '1' : '0'};
  visibility: ${props => props.open ? 'visible' : 'hidden'};
  transition: all 0.3s;

  @media (min-width: 1201px) {
    display: none;
  }
`;

export const TotalLinea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.2rem;
  font-size: 0.85rem;

  &.total-final {
    font-size: 1rem;
    font-weight: bold;
    color: ${primaryColor};
    border-top: 1px solid ${primaryColor};
    padding-top: 0.2rem;
    margin-top: 0.2rem;
  }
`;

export const DescuentoInput = styled.div`
  display: flex;
  align-items: center;
  gap: 0.2rem;
  margin-bottom: 0.3rem;

  label {
    font-weight: 500;
    color: #333;
    font-size: 0.75rem;
  }

  input {
    border: 1px solid #ddd;
    border-radius: 2px;
    padding: 0.1rem 0.3rem;
    width: 60px;
    text-align: right;
    font-size: 0.75rem;

    &:focus {
      outline: none;
      border-color: ${primaryColor};
    }
  }
`;

export const CalculadoraGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.1rem;
  margin-top: 0.15rem;
  flex-shrink: 0;
`;

export const CalculadoraDisplay = styled.div`
  grid-column: 1 / -1;
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  color: #ecf0f1;
  padding: 0.2rem 0.3rem;
  border-radius: 3px;
  font-size: 0.7rem;
  font-weight: bold;
  text-align: right;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  min-height: 16px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.2);
  border: 1px solid ${accentColor};
`;

export const CalculadoraBtn = styled.button.withConfig({ shouldForwardProp: (prop) => !['operator','equals','clear'].includes(prop) })`
  background: ${props => {
    if (props.operator) return `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`;
    if (props.equals) return `linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)`;
    if (props.clear) return `linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)`;
    return `linear-gradient(135deg, #95a5a6 0%, #7f8c8d 100%)`;
  }};
  color: white;
  border: none;
  border-radius: 2px;
  padding: 0.15rem;
  font-size: 0.65rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  min-height: 20px;
  max-height: 20px;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
    filter: brightness(1.1);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }
`;

export const AccionesSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  flex-shrink: 0;
`;

export const AccionBtn = styled.button.withConfig({ shouldForwardProp: (prop) => !['cobrar','limpiar'].includes(prop) })`
  background: ${props => {
    if (props.cobrar) return '#28a745';
    if (props.limpiar) return '#dc3545';
    return primaryColor;
  }};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.4rem;
  font-size: 0.8rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

export const VentaModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const VentaModalContent = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  max-width: 500px;
  width: 90%;
  text-align: center;

  h3 {
    color: ${primaryColor};
    margin-bottom: 1rem;
  }

  .total {
    font-size: 2rem;
    font-weight: bold;
    color: #28a745;
    margin: 1rem 0;
  }

  .acciones {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-top: 2rem;
  }
`;

export const MetodoPagoSection = styled.div`
  margin: 1rem 0;

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }

  select {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;

    &:focus {
      outline: none;
      border-color: ${primaryColor};
    }
  }
`;

export const TablaHeaders = styled.div`
  display: grid;
  grid-template-columns: 80px 1.8fr 0.7fr 0.5fr 0.5fr 0.5fr 0.5fr 60px;
  gap: 0.15rem;
  padding: 0.3rem;
  background: #a5c4ca;
  color: #232728;
  border-radius: 4px;
  font-weight: 600;
  font-size: 0.8rem;
  margin-bottom: 0.3rem;
  flex-shrink: 0;
  border: 1px solid #9bb8bf;

  &.agregar-headers {
    background: #a5c4ca;
    color: #232728;
    border-radius: 4px;
    margin-bottom: 0.1rem;
    font-size: 0.8rem;
  }

  @media (max-width: 1120px) {
    font-size: 0.75rem;
  }

  @media (max-width: 900px) {
    grid-template-columns: 2fr 1fr 80px;
    
    .precio-header, .iva-header, .descuento-header {
      display: none;
    }
  }

  &.agregar-headers {
    background: #a5c4ca;
    color: #232728;
    border-radius: 4px;
    margin-bottom: 0.1rem;
    font-size: 0.8rem;
  }

  @media (max-width: 1120px) {
    font-size: 0.75rem;
  }

  @media (max-width: 900px) {
    grid-template-columns: 2fr 1fr 80px;
    
    .precio-header, .iva-header, .descuento-header {
      display: none;
    }
  }
`;

export const HeaderItem = styled.div`
  text-align: center;
  border-right: 1px solid rgba(35, 39, 40, 0.2);
  padding-right: 0.3rem;
  
  &:last-child {
    border-right: none;
    padding-right: 0;
  }
  
  &.nombre-header {
    text-align: left;
  }
`;

export const IvaCheckbox = styled.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: ${primaryColor};
`;

export const IvaCheckboxLabel = styled.label`
  font-size: 0.7rem;
  color: #333;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.1rem;
  cursor: pointer;
  
  .checkbox-text {
    white-space: nowrap;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
`;

export const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  max-width: 400px;
  width: 90%;
  text-align: center;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  animation: modalAppear 0.3s ease-out;

  @keyframes modalAppear {
    from {
      opacity: 0;
      transform: scale(0.8) translateY(-20px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  
  .icon {
    font-size: 3rem;
    margin-right: 0.5rem;
  }
  
  &.success .icon {
    color: #27ae60;
  }
  
  &.error .icon {
    color: #e74c3c;
  }
`;

export const ModalMessage = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  color: #333;
  margin-bottom: 1.5rem;
  white-space: pre-line;
`;

export const ModalButton = styled.button`
  background: ${props => props.error ? '#e74c3c' : '#a5c4ca'};
  color: ${props => props.error ? 'white' : '#232728'};
  border: none;
  border-radius: 6px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${props => props.error ? '#c0392b' : '#607074'};
    color: ${props => props.error ? 'white' : '#caf0f8'};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;