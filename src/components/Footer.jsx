import styled from "styled-components";

export function Footer() {
  return (
    <FooterContainer>
      © 2025 Carmen Pulido Díaz - DAW
    </FooterContainer>
  );
}

const FooterContainer = styled.footer`
  width: 100%;
  background: linear-gradient(
    120deg,
    #404a4c 100%,
    rgb(64, 94, 102) 80%,
    #404a4c 100%
  );
  color: #fff;
  text-align: center;
  padding: 0.8rem 0;
  font-size: 1rem;
  letter-spacing: 1px;
`;
