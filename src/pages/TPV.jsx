import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { MdPointOfSale } from "react-icons/md";
import { Opciones, WrapperPage, BotonMenu, ManualPage } from "../index";

export function TPV() {
  const navigate = useNavigate();

  const opciones = [
    {
      label: "Caja",
      icon: <MdPointOfSale size={48} />,
      onClick: () => navigate("/caja"),
    },
    {
      label: "Productos",
      icon: <FiShoppingCart size={48} />,
      onClick: () => navigate("/productos"),
    },
  ];

  return (
    <WrapperPage>
      <Titulo>TPV</Titulo>
      <Opciones>
        {opciones.map((op) => (
          <BotonMenu key={op.label} icon={op.icon} onClick={op.onClick}>
            {op.label}
          </BotonMenu>
        ))}
      </Opciones>
      <ManualPage>
        <p>
          - Pulsa <b>Caja</b> para cobrar.<br />
          - Pulsa <b>Productos</b> para ver productos.
        </p>
      </ManualPage>
    </WrapperPage>
  );
}

const Titulo = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
`;
