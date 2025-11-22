import styled from "styled-components";

export const TablaContainer = styled.div`
  width: 100%;
  overflow-x: auto;
`;

export const Tabla = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  th,
  td {
    padding: 0.8rem 0.5rem;
    border-bottom: 1px solid #e0e6ea;
    text-align: left;
    font-size: 0.75rem;
  }
  th {
    background: #a5c4ca;
    color: #232728;
    font-weight: 600;
    font-size: 0.8rem;
  }
  tr:last-child td {
    border-bottom: none;
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
