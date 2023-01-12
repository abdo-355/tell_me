import { useState, FormEventHandler } from "react";
import axios from "axios";

import Input from "../UI/Input";

export interface ILoginFields {
  email: string;
  password: string;
}

interface IField {
  id: keyof ILoginFields;
  label: string;
  type: "text" | "email" | "password";
}

const fields: IField[] = [
  { id: "email", label: "Email", type: "email" },
  { id: "password", label: "Password", type: "password" },
];

const LoginForm = () => {
  const [formIsValid, setFormIsValid] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const sendData = async () => {
    if (!formIsValid) return;

    const res = await axios.post("/auth/signup", {
      email: formData.email,
      password: formData.password,
    });

    console.log(res.data);
  };

  const formSubmitHandler: FormEventHandler = (e) => {
    e.preventDefault();

    setFormIsValid(true);

    if (!formData.email.includes("@") || !formData.email.includes(".")) {
      setErrors((prev) => {
        return { ...prev, email: "Please enter a valid Email" };
      });
      setFormIsValid(false);
    }

    if (formData.password!.length < 8) {
      setErrors((prev) => {
        return { ...prev, password: "Password must be atleast 8 characters" };
      });
      setFormIsValid(false);
    }

    sendData();
  };

  return (
    <form
      onSubmit={formSubmitHandler}
      className="absolute inset-x-10 top-10 bottom-5 overflow-clip"
    >
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

export default LoginForm;
