import {
  FC,
  FocusEventHandler,
  SetStateAction,
  Dispatch,
  ChangeEventHandler,
  useState,
} from "react";
import { Eye, EyeOff } from "lucide-react";

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
  const [showPassword, setShowPassword] = useState(false);

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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex-1 mx-2 sm:mx-5 mb-3 pb-2">
      <label htmlFor={id} className="block text-lg pb-2">
        {label}
      </label>
      <div className="relative">
        <input
          type={type === "password" ? (showPassword ? "text" : "password") : type}
          id={id}
          onBlur={blurHandler}
          onFocus={focusHandler}
          onChange={changeHandler}
          aria-errormessage={`${id}ErrMsg`}
          aria-invalid="true"
          className={`w-full h-10 rounded-lg ${!error ? "border-green-900" : "border-red-700 bg-red-200"
            } border-2 px-2 pr-10 text-xl`}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 hover:text-gray-800"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
      {!!error && (
        <div className="relative">
          <span
            id={`${id}ErrMsg`}
            className="block absolute h-0 -top-1 text-red-700"
          >
            {error}
          </span>
        </div>
      )}
    </div>
  );
};

export default Input;
