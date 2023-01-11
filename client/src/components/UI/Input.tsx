import { forwardRef, useState, FocusEventHandler } from "react";

interface Props {
  label: string;
  id: string;
  error?: string;
  type: "text" | "email" | "password";
}

const Input = forwardRef<HTMLInputElement, Props>(
  ({ id, label, type, error }, ref) => {
    const [errorMessage, setErrorMessage] = useState(error || "");

    const blurHandler: FocusEventHandler<HTMLInputElement> = (e) => {
      if (e.target.value === "") {
        setErrorMessage("this field can't be empty");
      }
    };

    return (
      <div className="flex-1 mx-5 mb-3 pb-2">
        <label htmlFor={id} className="block text-lg pb-2">
          {label}
        </label>
        <input
          type={type}
          id={id}
          ref={ref}
          onBlur={blurHandler}
          onFocus={() => setErrorMessage("")}
          className={`w-full h-10 rounded-lg ${
            errorMessage === ""
              ? "border-green-900"
              : "border-red-700 bg-red-200"
          } border-2 px-2 text-xl`}
        />
        {errorMessage !== "" && (
          <div className="relative">
            <span className="block absolute h-0 -top-1 text-red-700">
              {errorMessage}
            </span>
          </div>
        )}
      </div>
    );
  }
);

export default Input;
