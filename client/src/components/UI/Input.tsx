import { forwardRef, FocusEventHandler } from "react";

interface Props {
  label: string;
  id: string;
  error?: string;
  type: "text" | "email" | "password";
  setMessage?: (message: string) => void;
}

const Input = forwardRef<HTMLInputElement, Props>(
  ({ id, label, type, error, setMessage }, ref) => {
    const blurHandler: FocusEventHandler<HTMLInputElement> = (e) => {
      if (e.target.value === "" && setMessage) {
        setMessage("This field can't be empty");
      }
    };

    const focusHandler: FocusEventHandler<HTMLInputElement> = (e) => {
      if (setMessage) {
        setMessage("");
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
          onBlur={blurHandler}
          onFocus={focusHandler}
          ref={ref}
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
  }
);

export default Input;
