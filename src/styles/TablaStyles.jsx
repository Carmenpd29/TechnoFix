import styled from "styled-components";

export const TablaContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  max-width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

export const Tabla = styled.table`
  width: 100%;
  min-width: 0;
  border-collapse: collapse;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  table-layout: auto;
  th {
    padding: 0.8rem 0.5rem;
    border-bottom: 1px solid #e0e6ea;
    border-right: 1px solid #f0f4f5;
    text-align: center;
    font-size: 0.75rem;
    vertical-align: middle;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    &:last-child {
      border-right: none;
    }
  }
  td {
    padding: 0.8rem 0.5rem;
    border-bottom: 1px solid #e0e6ea;
    border-right: 1px solid #f0f4f5;
    text-align: left;
    font-size: 0.75rem;
    vertical-align: middle;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    &:last-child {
      border-right: none;
    }
  }

  th:nth-child(2), td:nth-child(2) {
    min-width: 340px;
    max-width: 520px;
    white-space: normal;
    overflow: auto;
    text-overflow: unset;
  }

  th:nth-child(2), td:nth-child(2) { /* Descripción o Productos */
    min-width: 120px;
    white-space: pre-line;
    overflow: visible;
    text-overflow: unset;
  }

  th:nth-child(6), td:nth-child(6) { /* Observaciones */
    min-width: 100px;
    white-space: pre-line;
    overflow: visible;
    text-overflow: unset;
  }

  th:nth-child(3), td:nth-child(3) {
    min-width: 60px;
    max-width: 80px;
    white-space: nowrap;
    overflow: visible;
    text-overflow: unset;
  }

  th:nth-child(4), td:nth-child(4) { /* Subtotal */
    min-width: 70px;
    text-align: right;
    overflow: visible;
    text-overflow: unset;
  }

  th:nth-child(2), td:nth-child(2) { /* Descripción o Productos */
    min-width: 220px;
    max-width: 340px;
  }
  th:nth-child(6), td:nth-child(6) { /* Observaciones */
    min-width: 180px;
    max-width: 260px;
  }
  th:nth-child(3), td:nth-child(3) { /* Método de Pago */
    min-width: 120px;
    max-width: 180px;
  }
  th:nth-child(4) {
    min-width: 100px;
    max-width: 140px;
    text-align: center;
  }

  #tabla-ventas td:nth-child(4) {
    text-align: right;
  }

  td:last-child {
    text-align: center;
    vertical-align: middle;
    white-space: normal;
  }

  th {
    background: #a5c4ca;
    color: #232728;
    font-weight: 600;
    font-size: 0.8rem;
    text-align: center;
    border-right: 1px solid rgba(35, 39, 40, 0.1);
    white-space: nowrap;
    padding-right: 1.2rem;
    &:last-child {
      border-right: none;
    }
  }
    
  tr:last-child td {
    border-bottom: none;
  }

  @media (max-width: 900px) {
    min-width: 700px;
    th, td {
      font-size: 0.7rem;
      max-width: 120px;
    }
  }

  @media (max-width: 600px) {
    min-width: 600px;
    th, td {
      font-size: 0.65rem;
      max-width: 90px;
    }
  }
  @media (max-width: 1120px) {
    th {
      font-size: 0.75rem;
    }
    td {
      font-size: 0.7rem;
    }
  }

  &.tabla-pdf {
    width: 100%;
    margin: 0 auto;
    font-size: 10px;
    table-layout: fixed;
    border-collapse: collapse;
    max-width: 900px; /* Opcional, para limitar el ancho máximo */
  }

  &.tabla-pdf th,
  &.tabla-pdf td {
    padding: 3px 4px;
    border: 1px solid #ccc;
    word-break: break-word;
  }

  &.tabla-pdf th {
    text-align: center;
  }

  &.tabla-pdf td:nth-child(3),
  &.tabla-pdf td:nth-child(4) {
    text-align: center; /* Centra las fechas */
    white-space: nowrap;
  }

  &.tabla-pdf th:nth-child(1),
  &.tabla-pdf td:nth-child(1) {
    width: 13%;
  }
  &.tabla-pdf th:nth-child(2),
  &.tabla-pdf td:nth-child(2) {
    width: 17%;
  }
  &.tabla-pdf th:nth-child(3),
  &.tabla-pdf td:nth-child(3) {
    width: 12%;
    white-space: nowrap;
  }
  &.tabla-pdf th:nth-child(4),
  &.tabla-pdf td:nth-child(4) {
    width: 16%;
    white-space: nowrap;
  }
  &.tabla-pdf th:nth-child(5),
  &.tabla-pdf td:nth-child(5) {
    width: 10%;
    text-align: right;
  }
  &.tabla-pdf th:nth-child(6),
  &.tabla-pdf td:nth-child(6) {
    width: 22%;
    white-space: pre-line;
  }
`;
