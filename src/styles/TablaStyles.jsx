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
    text-align: center;
    font-size: 0.9rem;
  }
  th {
    background: #a5c4ca;
    color: #232728;
    font-weight: 600;
    font-size: 1rem;
  }
  tr:last-child td {
    border-bottom: none;
  }
  @media (max-width: 900px) {
    td {
      font-size: 0.9rem;
    }
  }
`;