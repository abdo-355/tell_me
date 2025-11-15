import { Link, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

import styles from "./styles.module.css";
import ArrowLeft from "../components/UI/ArrowLeft";
import SignupForm from "../components/Form/SignUpForm";
import LoginForm from "../components/Form/LoginForm";
import Card from "../components/UI/Card";

const Form = () => {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Navigate to="/messages" />;
  }
  return (
    <div
      className={`${styles.background} h-screen relative flex justify-center items-center`}
    >
      <Card>
        <Routes>
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </Card>
      <Link
        to="/"
        className="absolute h-10 w-10 top-5 left-2 xsm:left-5 hover:bg-green-300 hover:bg-opacity-30 hover:rounded-lg hover:h-11 hover:w-11 transition-all"
      >
        <ArrowLeft styles="text-green-900" />
      </Link>
    </div>
  );
};

export default Form;
