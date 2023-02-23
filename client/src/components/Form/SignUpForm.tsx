import { useState, useEffect, FormEventHandler } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useAxios from "../../hooks/use-axios";

import Input from "../UI/Input";
import { emailRegex } from "../../data/regex";
import LoadingSpinner from "../UI/LoadingSpinner";
import Modal from "../UI/Modal/Modal";

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

  // for the errors
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

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

  const { request, statusCode, loading, error } = useAxios(
    "http://localhost:8080/auth/signup",
    "post",
    {
      firstName: formData.fName,
      lastName: formData.lName,
      email: formData.email,
      password: formData.password,
    }
  );

  const sendData = async () => {
    if (!formIsValid) return;

    await request();
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

  useEffect(() => {
    // act upon statusCode change
    if (statusCode === 201) {
      navigate("/auth/login");
    } else if (error && error.response?.status === 400) {
      setModalIsOpen(true);
      setModalMessage(error.response.data!.message);
    } else if (statusCode !== 200 && statusCode !== 0) {
      setModalIsOpen(true);
      // setModalMessage(error)
      setModalMessage(`Oops! something went wrong, please try again`);
    }
  }, [error, navigate, statusCode]);

  return (
    <form onSubmit={formSubmitHandler} className="mt-20 xsm:mt-5 mb-5 my-7">
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
      <div className="w-auto h-28 sm:h-[7rem] flex items-center justify-center">
        <button
          type="submit"
          className="bg-green-800 text-white uppercase w-48 sm:w-80 h-12 sm:h-16 mx-5 text-xl sm:text-3xl rounded-full"
          disabled={loading}
        >
          {loading ? <LoadingSpinner /> : "Sign up"}
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
      <Modal
        open={modalIsOpen}
        onClose={() => {
          setModalIsOpen(false);
          setModalMessage("");
        }}
      >
        <span className="w-full mr-2">{modalMessage}</span>
        <NavLink
          className="text-blue-700 hover:text-green-700 underline underline-offset-2"
          to="/auth/login"
        >
          Login
        </NavLink>
      </Modal>
    </form>
  );
};

export default SignupForm;
