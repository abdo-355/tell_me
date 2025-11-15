import { useState, FormEventHandler } from "react";
import { useSignUp } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

import Card from "../../components/UI/Card";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import Modal from "../../components/UI/Modal/Modal";
import styles from "../styles.module.css";

const VerifyEmail = () => {
  const { signUp, isLoaded } = useSignUp();
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const formSubmitHandler: FormEventHandler = async (e) => {
    e.preventDefault();

    if (!code || !isLoaded) return;

    setLoading(true);
    try {
      const result = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (result.status === "complete") {
        window.location.href = "/messages";
      } else {
        setModalMessage("Verification failed. Please try again.");
        setModalIsOpen(true);
      }
    } catch (err: any) {
      setModalMessage(err.errors?.[0]?.message || "An error occurred");
      setModalIsOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${styles.background} h-screen relative flex justify-center items-center`}>
      <Card>
        <div className="mx-0 sm:mx-5 my-7">
          <h2 className="font-roboto text-4xl uppercase font-bold tracking-wider text-green-900 mb-10 text-center">
            Verify Your Email
          </h2>
          <p className="text-sm text-gray-600 mb-6 text-center">
            Please verify your email now. If you don't, you'll need to register again.
          </p>
          <form onSubmit={formSubmitHandler} noValidate className="space-y-4">
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                Verification Code
              </label>
              <input
                id="code"
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full h-12 sm:h-14 bg-green-800 text-white font-semibold text-base sm:text-lg rounded-lg transition-all hover:bg-green-700 disabled:opacity-60"
              disabled={loading}
            >
              {loading ? <LoadingSpinner /> : "Verify"}
            </button>
          </form>
        </div>
      </Card>
      <Modal
        open={modalIsOpen}
        onClose={() => {
          setModalIsOpen(false);
          setModalMessage("");
        }}
      >
        <span className="w-full mr-2">{modalMessage}</span>
      </Modal>
    </div>
  );
};

export default VerifyEmail;