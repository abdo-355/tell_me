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
  let formIsValid = false;

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const sendData = async () => {
    console.log("pressed");

    if (!formIsValid) return;

    console.log("pressed");

    const res = await axios.post("/auth/login", {
      email: formData.email,
      password: formData.password,
    });

    console.log(res.data);
  };

  const formSubmitHandler: FormEventHandler = async (e) => {
    e.preventDefault();
    formIsValid = true;
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

    await sendData();
  };

  return (
    <form onSubmit={formSubmitHandler} className="mx-5 my-7">
      {fields.map((field) => (
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
          log in
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
