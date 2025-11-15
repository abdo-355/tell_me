import { useState, FormEventHandler } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Tab } from "@headlessui/react";
import { useSignUp } from "@clerk/clerk-react";

import Input from "../UI/Input";
import { emailRegex } from "../../data/regex";
import LoadingSpinner from "../UI/LoadingSpinner";
import Modal from "../UI/Modal/Modal";
import GoogleButton from "../UI/Auth/GoogleButton";
import FacebookButton from "../UI/Auth/FacebookButton";
import GitHubButton from "../UI/Auth/GitHubButton";

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
  const { signUp, isLoaded } = useSignUp();
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

  const [loading, setLoading] = useState(false);

  const formSubmitHandler: FormEventHandler = async (e) => {
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

    if (!formIsValid || !isLoaded) return;

    setLoading(true);
    try {
      await signUp.create({
        firstName: formData.fName,
        lastName: formData.lName,
        emailAddress: formData.email,
        password: formData.password,
      });

      if (signUp.status === "complete") {
        navigate("/messages");
      } else {
        await signUp.prepareEmailAddressVerification();
        navigate("/email/verify");
      }
    } catch (err: any) {
      setModalIsOpen(true);
      setModalMessage(err.errors?.[0]?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-0 sm:mx-5 my-7">
        <Tab.Group>
          <Tab.List className="flex gap-2 rounded-lg bg-green-900/10 p-1 mb-6">
            <Tab className={({ selected }) =>
              `w-full rounded-lg py-2 text-sm font-medium leading-5 transition-all ${
                selected
                  ? 'bg-white text-green-700 shadow'
                  : 'text-green-600 hover:bg-white/[0.12] hover:text-green-700'
              }`
            }>
              Email
            </Tab>
            <Tab className={({ selected }) =>
              `w-full rounded-lg py-2 text-sm font-medium leading-5 transition-all ${
                selected
                  ? 'bg-white text-green-700 shadow'
                  : 'text-green-600 hover:bg-white/[0.12] hover:text-green-700'
              }`
            }>
              Social
            </Tab>
          </Tab.List>
          <Tab.Panels className="mt-4">
            <Tab.Panel>
              <form onSubmit={formSubmitHandler} noValidate className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                <div id="clerk-captcha"></div>
                <span className="text-sm text-gray-600 mt-4 px-4">
                  By signing up you agree to our{" "}
                  <a
                    href="/signup"
                    className="text-blue-900 underline underline-offset-2"
                  >
                    Privacy Policy
                  </a>
                </span>
                <button
                  type="submit"
                  className="w-full h-12 sm:h-14 bg-green-800 text-white font-semibold text-base sm:text-lg rounded-lg transition-all hover:bg-green-700 disabled:opacity-60"
                  disabled={loading}
                >
                  {loading ? <LoadingSpinner /> : "Sign up"}
                </button>
              </form>
            </Tab.Panel>
          <Tab.Panel>
            <div className="flex flex-col space-y-3 mt-6 relative">
              <GoogleButton mode="Sign up" />
              <FacebookButton mode="Sign up" />
              <GitHubButton mode="Sign up" />
              {process.env.REACT_APP_SOCIAL_AUTH_ENABLED !== 'true' && (
                <div className="absolute inset-0 bg-white bg-opacity-75 backdrop-blur-sm flex items-center justify-center rounded-lg">
                  <div className="text-center p-4">
                    <p className="text-sm text-gray-700 mb-2">
                      Social authentication has been disabled for this portfolio project to streamline deployment and avoid platform-specific configurations.
                    </p>
                    <p className="text-xs text-gray-500">
                      To explore social login functionality, please clone the repository and integrate your own Clerk application keys.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
        <span className="block text-center mt-6 text-sm sm:text-base">
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
    </div>
  );
};

export default SignupForm;
