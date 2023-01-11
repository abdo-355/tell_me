import { useState, useRef, FormEventHandler } from "react";

import Input from "../UI/Input";

interface IInputErrors {
  fName: string;
  lName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUpForm = () => {
  const [errors, setErrors] = useState<IInputErrors>({
    fName: "",
    lName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formIsValid, setFormIsValid] = useState(true);

  const fNameRef = useRef<HTMLInputElement>(null);
  const lNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const formSubmitHandler: FormEventHandler = (e) => {
    e.preventDefault();

    const enteredFName = fNameRef.current?.value;
    const enteredLName = lNameRef.current?.value;
    const enteredEmail = emailRef.current?.value;
    const enteredPassword = passwordRef.current?.value;
    const enteredPasswordConfirm = confirmPasswordRef.current?.value;

    if (enteredFName === "") {
      setErrors((prev) => {
        return { ...prev, fName: "First name can't be empty" };
      });
      setFormIsValid(false);
    }

    if (enteredLName === "") {
      setErrors((prev) => {
        return { ...prev, lName: "Last name can't be empty" };
      });
      setFormIsValid(false);
    }

    if (!enteredEmail?.includes("@") || !enteredEmail?.includes(".")) {
      setErrors((prev) => {
        return { ...prev, email: "Please enter a valid Email" };
      });
      setFormIsValid(false);
    }

    if (enteredPassword!.length < 8) {
      setErrors((prev) => {
        return { ...prev, password: "Password must be atleast 8 characters" };
      });
      setFormIsValid(false);
    }

    if (enteredPasswordConfirm !== enteredPassword) {
      setErrors((prev) => {
        return {
          ...prev,
          confirmPassword: "This doesn't match the entered password",
        };
      });
      setFormIsValid(false);
    }
  };
  return (
    <form
      onSubmit={formSubmitHandler}
      className="absolute inset-x-10 top-10 bottom-5 overflow-clip"
    >
      <div className="flex">
        <Input
          ref={fNameRef}
          id="fName"
          label="First name"
          type="text"
          error={errors.fName}
          setMessage={(message) =>
            setErrors((prev) => {
              return { ...prev, fName: message };
            })
          }
        />
        <Input
          ref={lNameRef}
          id="lName"
          label="Last name"
          type="text"
          error={errors.lName}
          setMessage={(message) =>
            setErrors((prev) => {
              return { ...prev, lName: message };
            })
          }
        />
      </div>
      <Input
        ref={emailRef}
        id="email"
        label="Email"
        type="email"
        error={errors.email}
        setMessage={(message) =>
          setErrors((prev) => {
            return { ...prev, email: message };
          })
        }
      />
      <Input
        ref={passwordRef}
        id="password"
        label="Password"
        type="password"
        error={errors.password}
        setMessage={(message) =>
          setErrors((prev) => {
            return { ...prev, password: message };
          })
        }
      />
      <Input
        ref={confirmPasswordRef}
        id="confirmPassword"
        label="Confirm password"
        type="password"
        error={errors.confirmPassword}
        setMessage={(message) =>
          setErrors((prev) => {
            return { ...prev, confirmPassword: message };
          })
        }
      />
      <span className="block mx-6">
        By signing up you agree to our{" "}
        <a
          href="/signup"
          className="text-blue-900 underline underline-offset-2"
        >
          Privacy Policy
        </a>
      </span>
      <div className="w-auto h-[7rem] flex items-center justify-center">
        <button
          type="submit"
          className="bg-green-800 text-white uppercase w-80 h-16 mx-5 text-3xl rounded-full"
        >
          Sign up
        </button>
      </div>
    </form>
  );
};

export default SignUpForm;
