import { FC } from "react";

const NavButton: FC<{ content: string }> = ({ content }) => {
  return (
    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
      <button className="font-sans text-white text-2xl bg-green-600 hover:bg-green-700 px-3 py-1 rounded-full border-black tracking-wider uppercase">
        {content}
      </button>
    </div>
  );
};

export default NavButton;
