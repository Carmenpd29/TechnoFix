import { Manual } from "../../styles/ManualPageStyles";

export function ManualPage({ children, ...props }) {
  return <Manual {...props}>{children}</Manual>;
}