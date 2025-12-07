import styled from "styled-components";

export const FooterContainer = styled.footer`
  width: 100%;
  background: linear-gradient(
    120deg,
    #404a4c 100%,
    rgb(64, 94, 102) 80%,
    #404a4c 100%
  );
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0.35rem 0;
  min-height: unset;
  height: unset;
  font-size: 1rem;
  letter-spacing: 1px;
  position: static;
  left: unset;
  bottom: unset;
  z-index: 10;

  @media (max-width: 1120px) {
    font-size: 0.8rem;
  }
`;