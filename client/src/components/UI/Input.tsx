import { FC } from "react";

interface Props {
  label: string;
  id: string;
  type: "text" | "email" | "password";
}

const Input: FC<Props> = ({ id, label, type }) => {
  return (
    <div className="flex-auto mx-5 mb-5">
      <label htmlFor={id} className="block text-lg pb-2">
        {label}
      </label>
      <input
        type={type}
        id={id}
        className="w-full h-10 rounded-lg border-green-900 border-2 px-2 text-xl"
      />
    </div>
  );
};

export default Input;
