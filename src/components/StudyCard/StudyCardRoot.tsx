import type { ReactNode } from "react";
import { NavLink } from "react-router";

interface IStudyCardRootProps {
  children: ReactNode;  
  slug: string;
}

export const StudyCardRoot = ({ children, slug }: IStudyCardRootProps) => {
  return (
    <NavLink
      to={slug}
      className="rounded-sm overflow-hidden shadow-md"
    >
      {children}
    </NavLink>
  );
};
