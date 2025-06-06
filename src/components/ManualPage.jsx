import styled from "styled-components";

export function ManualPage({ children, ...props }) {
  return <Manual {...props}>{children}</Manual>;
}

const Manual = styled.div`
  color: #607074;
  font-size: 1.05rem;
  margin-bottom: 2rem;
  max-width: 600px;
  width: 100%;
  @media (max-width: 900px) {
    font-size: 0.9rem;
  }
`;