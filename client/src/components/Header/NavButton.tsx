import { FC } from "react";

const NavButton: FC<{ content: string }> = ({ content }) => {
  return (
    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
      <button className="font-sans text-white text-2xl sm:bg-green-600 sm:hover:bg-green-700 px-0 sm:px-3 py-1 rounded-full sm:tracking-wider sm:uppercase">
        {content}
      </button>
    </div>
  );
};

export default NavButton;
