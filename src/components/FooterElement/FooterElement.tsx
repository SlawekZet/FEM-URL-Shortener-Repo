import { ReactNode } from "react";

interface FooterElementProps {
  children: ReactNode;
}

export const FooterElement: React.FC<FooterElementProps> = ({ children }) => {
  return <div> {children} </div>;
};
