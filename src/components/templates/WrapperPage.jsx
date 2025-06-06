import styled from "styled-components";

export function WrapperPage({ children, maxWidth = 800 }) {
  return <Wrapper $maxWidth={maxWidth}>{children}</Wrapper>;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  max-width: ${({ $maxWidth }) => $maxWidth}px;
  margin: 0 auto;
`;