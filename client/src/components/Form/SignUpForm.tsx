import { useState, FormEventHandler } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

import Input from "../UI/Input";

export interface ISignupFields {
  fName: string;
  lName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface IInputField {
  id: keyof ISignupFields;
  label: string;
  type: "text" | "email" | "password";
}

const fields: IInputField[] = [
  { id: "fName", label: "First name", type: "text" },
  { id: "lName", label: "Last name", type: "text" },
  { id: "email", label: "Email", type: "email" },
  { id: "password", label: "Password", type: "password" },
  { id: "confirmPassword", label: "Confirm Password", type: "password" },
];

const SignupForm = () => {
  const navigate = useNavigate();
  let formIsValid = false;

  const [formData, setFormData] = useState<ISignupFields>({
    fName: "",
    lName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<ISignupFields>({
    fName: "",
    lName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const sendData = async () => {
    if (!formIsValid) return;

    const res = await axios.post("http://localhost:8080/auth/signup", {
      firstName: formData.fName,
      lastName: formData.lName,
      email: formData.email,
      password: formData.password,
    });

    if (res.status === 200) {
      navigate("/auth/login");
    }
  };

  const formSubmitHandler: FormEventHandler = (e) => {
    e.preventDefault();

    formIsValid = true;

    if (formData.fName === "") {
      setErrors((prev) => {
        return { ...prev, fName: "First name can't be empty" };
      });
      formIsValid = false;
    }

    if (formData.lName === "") {
      setErrors((prev) => {
        return { ...prev, lName: "Last name can't be empty" };
      });
      formIsValid = false;
    }

    if (!formData.email.includes("@") || !formData.email.includes(".")) {
      setErrors((prev) => {
        return { ...prev, email: "Please enter a valid Email" };
      });
      formIsValid = false;
    }

    if (formData.password!.length < 8) {
      setErrors((prev) => {
        return { ...prev, password: "Password must be atleast 8 characters" };
      });
      formIsValid = false;
    }

    if (formData.confirmPassword !== formData.password) {
      setErrors((prev) => {
        return {
          ...prev,
          confirmPassword: "This doesn't match the entered password",
        };
      });
      formIsValid = false;
    }

    sendData();
  };

  return (
    <form onSubmit={formSubmitHandler} className="mx-5 my-7">
      <div className="flex">
        {fields
          .filter((e, i) => i < 2)
          .map((field) => (
            <Input
              key={field.id}
              id={field.id}
              label={field.label}
              type={field.type}
              error={errors[field.id]}
              setData={setFormData}
              setErrors={setErrors}
            />
          ))}
      </div>
      {fields
        .filter((e, i) => i >= 2)
        .map((field) => (
          <Input
            key={field.id}
            id={field.id}
            label={field.label}
            type={field.type}
            error={errors[field.id]}
            setData={setFormData}
            setErrors={setErrors}
          />
        ))}
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
      <span className="block text-center -mb-3">
        Already have an account?{" "}
        <NavLink
          className="text-blue-700 hover:text-green-700 underline underline-offset-2"
          to="/auth/login"
        >
          Login
        </NavLink>
      </span>
    </form>
  );
};

export default SignupForm;
