import {
  FC,
  FocusEventHandler,
  SetStateAction,
  Dispatch,
  ChangeEventHandler,
} from "react";

import { ISignupFields } from "../Form/SignUpForm";
import { ILoginFields } from "../Form/LoginForm";

interface Props {
  label: string;
  id: keyof ISignupFields | keyof ILoginFields;
  error?: string;
  type: "text" | "email" | "password";
  setData:
    | Dispatch<SetStateAction<ISignupFields>>
    | Dispatch<SetStateAction<ILoginFields>>;
  setErrors:
    | Dispatch<SetStateAction<ISignupFields>>
    | Dispatch<SetStateAction<ILoginFields>>;
}

const Input: FC<Props> = ({ id, label, type, error, setData, setErrors }) => {
  const blurHandler: FocusEventHandler<HTMLInputElement> = (e) => {
    if (e.target.value === "") {
      setErrors((prev: any) => {
        const curr = { ...prev };
        curr[id] = "This field can't be empty";
        return curr;
      });
    }
  };

  const focusHandler: FocusEventHandler<HTMLInputElement> = (e) => {
    setErrors((prev: any) => {
      const curr = { ...prev };
      curr[id] = "";
      return curr;
    });
  };

  const changeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    setData((prev: any) => {
      const curr = { ...prev };
      curr[id] = e.target.value;
      return curr;
    });
    setErrors((prev: any) => {
      const curr = { ...prev };
      curr[id] = "";
      return curr;
    });
  };

  return (
    <div className="flex-1 mx-5 mb-3 pb-2">
      <label htmlFor={id} className="block text-lg pb-2">
        {label}
      </label>
      <input
        type={type}
        id={id}
        onBlur={blurHandler}
        onFocus={focusHandler}
        onChange={changeHandler}
        className={`w-full h-10 rounded-lg ${
          !error ? "border-green-900" : "border-red-700 bg-red-200"
        } border-2 px-2 text-xl`}
      />
      {!!error && (
        <div className="relative">
          <span className="block absolute h-0 -top-1 text-red-700">
            {error}
          </span>
        </div>
      )}
    </div>
  );
};

export default Input;
