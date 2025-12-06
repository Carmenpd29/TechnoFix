import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FiSettings, FiBriefcase } from "react-icons/fi";
import { WrapperPage, InfoCard, TituloPage, IconBtn } from "../index";

export function Empresa() {
  const navigate = useNavigate();

  const opciones = [
    {
      label: "Ver",
      icon: <FiSettings size={20} />,
      onClick: () => navigate("/empresa/configuracion"),
    }
  ];

  return (
    <WrapperPage>
      <TituloPage>Configuración de Empresa</TituloPage>
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: "1rem",
        margin: "1rem 0",
        padding: "0 1rem",
        maxWidth: "400px",
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
            <FiSettings size={20} />
            <span>{op.label}</span>
          </IconBtn>
        ))}
      </div>
      <InfoCard title="Configuración de Empresa" icon={<FiBriefcase size={18} />}>
        <p>
          Aquí puedes personalizar la configuración de tu empresa.
        </p>
        <p>
          - <b>Ver</b>: Para configurar el logo, nombre de empresa y mensaje del footer.
        </p>
      </InfoCard>
    </WrapperPage>
  );
}