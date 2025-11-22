import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FiShoppingCart, FiFileText } from "react-icons/fi";
import { MdPointOfSale } from "react-icons/md";
import { Opciones, WrapperPage, BotonMenu, ManualPage, TituloPage } from "../index";

export function TPV() {
  const navigate = useNavigate();

  const opciones = [
    {
      label: "Caja",
      icon: <MdPointOfSale size={36} />,
      onClick: () => navigate("/tpv/caja"),
    },
    {
      label: "Productos",
      icon: <FiShoppingCart size={36} />,
      onClick: () => navigate("/tpv/productos"),
    },
    {
      label: "Facturación",
      icon: <FiFileText size={36} />,
      onClick: () => navigate("/tpv/facturacion"),
    },
  ];

  return (
    <WrapperPage>
      <TituloPage>Terminal Punto de Venta</TituloPage>
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: "1rem",
        margin: "1rem 0",
        padding: "0 1rem"
      }}>
        {opciones.map((op) => (
          <button
            key={op.label}
            onClick={op.onClick}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.75rem 1rem",
              backgroundColor: "#a5c4ca",
              color: "#232728",
              border: "none",
              borderRadius: "8px",
              fontSize: "1rem",
              fontWeight: "600",
              cursor: "pointer",
              transition: "background-color 0.2s",
              boxShadow: "0 2px 8px rgba(64, 74, 76, 0.15)",
              justifyContent: "flex-start"
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#607074";
              e.target.style.color = "#caf0f8";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#a5c4ca";
              e.target.style.color = "#232728";
            }}
          >
            {React.cloneElement(op.icon, { size: 20 })}
            {op.label}
          </button>
        ))}
      </div>
      <ManualPage>
        <p>
          - Pulsa <b>Caja</b> para procesar ventas y cobros.<br />
          - Pulsa <b>Productos</b> para gestionar el catálogo.<br />
          - Pulsa <b>Facturación</b> para ver el historial de ventas.
        </p>
      </ManualPage>
    </WrapperPage>
  );
}

