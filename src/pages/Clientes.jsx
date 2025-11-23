import React from "react";
import styled from "styled-components";
import { FiUsers, FiUserPlus, } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Opciones, WrapperPage, BotonMenu, InfoCard, TituloPage, IconBtn } from "../index";

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
        padding: "0 1rem",
        maxWidth: "600px",
        marginLeft: "auto",
        marginRight: "auto"
      }}>
        {opciones
          .filter(op => op.visible)
          .map(op => (
            <IconBtn
              key={op.label}
              onClick={op.onClick}
              style={{
                minHeight: "50px",
                justifyContent: "flex-start"
              }}
            >
              {op.label === "Ver" ? <FiUsers size={20} /> : <FiUserPlus size={20} />}
              <span>{op.label}</span>
            </IconBtn>
          ))}
      </div>
      <InfoCard title="Gestión de Clientes" icon={<FiUsers size={18} />}>
        <p>
          Selecciona una opción para gestionar los clientes.
          <br />- <b>Ver</b>: Para ver, editar y eliminar clientes.
          <br />- <b>Añadir</b>: Para añadir un nuevo cliente.
        </p>
      </InfoCard>
    </WrapperPage>
  );
}

