import { Link, Routes, Route } from "react-router-dom";

import styles from "./styles.module.css";
import ArrowLeft from "../components/UI/ArrowLeft";
import SignupForm from "../components/Form/SignupForm";
import LoginForm from "../components/Form/LoginForm";

const Form = () => {
  return (
    <div className={`${styles.background} h-screen relative`}>
      <div className="absolute inset-y-20 inset-x-16 mx-auto  max-w-xl shadow-gray-800 shadow-md rounded-xl bg-green-100">
        <Routes>
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </div>
      <Link
        to="/"
        className="absolute h-10 w-10 top-5 left-5 hover:bg-green-300 hover:bg-opacity-30 hover:rounded-lg hover:h-11 hover:w-11 transition-all"
      >
        <ArrowLeft styles="text-green-900" />
      </Link>
    </div>
  );
};

export default Form;
