import React from "react";
import styled from "styled-components";
import { FiUsers, FiUserPlus, } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Opciones, WrapperPage, BotonMenu, ManualPage, TituloPage } from "../index";

export function Clientes({ user }) {
  const navigate = useNavigate();

  const opciones = [
    {
      label: "Ver",
      icon: <FiUsers size={36} />,
      onClick: () => navigate("/clientes/ver"),
      visible: true,
    },
    {
      label: "Añadir",
      icon: <FiUserPlus size={36} />,
      onClick: () => navigate("/clientes/insertar"),
      visible: true,
    },
  ];

  return (
    <WrapperPage>
      <TituloPage>Clientes</TituloPage>
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "1rem",
        margin: "1rem 0",
        padding: "0 1rem"
      }}>
        {opciones
          .filter(op => op.visible)
          .map(op => (
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
          Selecciona una opción para gestionar los clientes.
          <br />- <b>Ver</b>: Para ver, editar y eliminar clientes.
          <br />- <b>Añadir</b>: Para añadir un nuevo cliente.
        </p>
      </ManualPage>
    </WrapperPage>
  );
}

