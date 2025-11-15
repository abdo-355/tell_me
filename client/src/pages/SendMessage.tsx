import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import styles from "./styles.module.css";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import Modal from "../components/UI/Modal/Modal";
import useAxios from "../hooks/use-axios";

const SendMessage = () => {
  const [error, setError] = useState("");
  const [messageValue, setMessageValue] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { usertpath } = useParams();

  let [modalMessage, setModalMessage] = useState("");

  const { request, loading, statusCode } = useAxios(
    `${process.env.REACT_APP_BACKEND}/api/messages/${usertpath}`,
    "post",
    {
      message: messageValue,
    }
  );

  const handleSend = async () => {
    if (!messageValue) {
      setError("Message can't be empty");
    } else {
      await request();

      showModal();
    }
  };

  const showModal = useCallback(() => {
    if (statusCode === 404) {
      setModalMessage("This link is no longer valid. The recipient may have regenerated their link.");
      setModalIsOpen(true);
    } else if (statusCode !== 201 && statusCode !== 0) {
      setModalMessage(
        `Something went wrong! please try again status-code: ${statusCode}`
      );
      setModalIsOpen(true);
    } else if (statusCode === 201) {
      setModalMessage("Message sent successfully");
      setModalIsOpen(true);
    }
  }, [statusCode]);

  useEffect(() => {
    showModal();
  }, [showModal]);

  const handleFocus = () => {
    setError("");
  };

  return (
    <>
      <div
        className={`${styles.background} flex justify-center items-center h-screen`}
      >
        <div className="absolute inset-x-3 sm:relative sm:inset-x-auto flex flex-col bg-green-600 border-2 border-green-900 p-5 rounded-2xl shadow-2xl">
          <label
            htmlFor="message"
            className="text-white font-roboto text-xl pb-2"
          >
            Enter your message
          </label>
          <textarea
            className="w-auto sm:w-96 h-60 rounded-md border-[1px] border-green-700 shadow-md bg-green-100 px-5 py-2 text-xl text-gray-700 focus:shadow-green-400 focus:border-transparent focus:outline-none mb-10 z-10"
            aria-errormessage="messageErr"
            aria-invalid="true"
            id="message"
            onFocus={handleFocus}
            onChange={(e) => setMessageValue(e.target.value)}
            value={messageValue}
          />
          {!!error && (
            <div className="relative h-0">
              <span
                id={`messageErr`}
                className="absolute bg-red-100 w-full rounded-b-lg -mt-1 py-1 pl-2 z-0 -top-10 text-red-500"
              >
                {error}
              </span>
            </div>
          )}
          <button
            onClick={handleSend}
            className="bg-green-900 w-40 h-12 mx-auto rounded-full font-roboto tracking-wider text-white text-2xl font-semibold"
            disabled={loading}
          >
            {loading ? <LoadingSpinner /> : "SEND"}
          </button>
        </div>
      </div>
      <Modal
        open={modalIsOpen}
        onClose={() => {
          setModalIsOpen(false);
          setMessageValue("");
        }}
      >
        {modalMessage}
      </Modal>
    </>
  );
};

export default SendMessage;
