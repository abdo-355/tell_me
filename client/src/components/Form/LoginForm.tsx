import { useState, FormEventHandler, useContext, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import Input from "../UI/Input";
import authContext from "../../context/auth-context";
import { emailRegex } from "../../data/regex";
import LoadingSpinner from "../UI/LoadingSpinner";
import useAxios from "../../hooks/use-axios";
import Modal from "../UI/Modal/Modal";
import GoogleButton from "../UI/Auth/GoogleButton";
import FacebookButton from "../UI/Auth/FacebookButton";

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
  const auth = useContext(authContext);
  const navigate = useNavigate();

  // for the errors
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const { request, data, statusCode, loading, error } = useAxios(
    "http://localhost:8080/auth/login",
    "post",
    {
      email: formData.email,
      password: formData.password,
    }
  );

  const sendData = async () => {
    if (!formIsValid) return;
    await request();
  };

  useEffect(() => {
    // act upon statusCode change
    if (statusCode === 202) {
      const { token } = data;
      auth.addUser(token);
      navigate("/");
    } else if (
      error &&
      (error.response?.status === 403 || error.response?.status === 404)
    ) {
      setModalIsOpen(true);
      setModalMessage("Email or password is incorrect");
    } else if (statusCode !== 202 && statusCode !== 0) {
      setModalIsOpen(true);
      // setModalMessage(error)
      setModalMessage(
        `Oops! something went wrong, please try again. status code ${statusCode}`
      );
    }
  }, [auth, data, error, navigate, statusCode]);

  const formSubmitHandler: FormEventHandler = async (e) => {
    e.preventDefault();
    formIsValid = true;

    if (!emailRegex.test(formData.email)) {
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
    <form onSubmit={formSubmitHandler} className="mx-0 sm:mx-5 my-7" noValidate>
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
      <div className="w-auto h-20 sm:h-[7rem] flex items-center justify-center">
        <button
          type="submit"
          className="bg-green-800 text-white uppercase w-40 sm:w-80 h-10 sm:h-16 mx-5 text-xl sm:text-3xl rounded-full"
          disabled={loading}
        >
          {loading ? <LoadingSpinner /> : "log in"}
        </button>
      </div>
      <p className="text-center text-2xl border-black border-opacity-30 border-b-2 leading-[.4rem] my-5 mx-8"><span className="bg-green-100 px-3 text-gray-700">or</span></p>
      <div className="flex flex-1 flex-col items-center m-5">
        <GoogleButton mode="Log in" />
        <FacebookButton mode="Log in" />
      </div>
      <span className="block text-center -mb-3">
        Don't have an account?{" "}
        <NavLink
          className="text-blue-700 hover:text-green-700 underline underline-offset-2"
          to="/auth/signup"
        >
          Signup
        </NavLink>
      </span>
      <Modal
        open={modalIsOpen}
        onClose={() => {
          setModalIsOpen(false);
          setModalMessage("");
        }}
      >
        {modalMessage}
      </Modal>
    </form>
  );
};

export default LoginForm;
