import { FC } from "react";
import { NavLink } from "react-router-dom";

interface Props {
  content: string;
  path: string;
}

const NavButton: FC<Props> = ({ content, path }) => {
  return (
    <div
      className={`absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0${content === "log in" ? " hidden sm:block" : ""
        }`}
    >
      <NavLink
        to={path}
        className="font-sans text-white text-2xl sm:bg-green-600 sm:hover:bg-green-700 px-0 sm:px-3 py-1 rounded-full sm:tracking-wider sm:uppercase"
      >
        {content}
      </NavLink>
    </div>
  );
};

export default NavButton;
