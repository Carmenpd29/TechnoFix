import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FiShoppingCart, FiFileText, FiCreditCard } from "react-icons/fi";
import { MdPointOfSale } from "react-icons/md";
import { Opciones, WrapperPage, BotonMenu, InfoCard, TituloPage, IconBtn } from "../index";

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
        padding: "0 1rem",
        maxWidth: "800px",
        marginLeft: "auto",
        marginRight: "auto"
      }}>
        {opciones.map((op) => (
          <IconBtn
            key={op.label}
            onClick={op.onClick}
            style={{
              minHeight: "50px",
              justifyContent: "flex-start"
            }}
          >
            {op.label === "Caja" ? <MdPointOfSale size={20} /> : 
             op.label === "Productos" ? <FiShoppingCart size={20} /> : 
             <FiFileText size={20} />}
            <span>{op.label}</span>
          </IconBtn>
        ))}
      </div>
      <InfoCard title="Terminal Punto de Venta" icon={<FiCreditCard size={18} />}>
        <p>
          - Pulsa <b>Caja</b> para procesar ventas y cobros.<br />
          - Pulsa <b>Productos</b> para gestionar el catálogo.<br />
          - Pulsa <b>Facturación</b> para ver el historial de ventas.
        </p>
      </InfoCard>
    </WrapperPage>
  );
}

