import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import Modal from "../UI/Modal/Modal";
import authContext from "../../context/auth-context";

const LogoutButton = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { removeUser } = useContext(authContext);
  const navigate = useNavigate();

  const clickHandler = () => {
    setModalIsOpen(true);
  };

  const handleLogout = () => {
    removeUser();
    setModalIsOpen(false);
    navigate("/");
  };

  return (
    <>
      <button
        onClick={clickHandler}
        className="flex-initial font-sans text-white text-2xl sm:bg-green-600 sm:hover:bg-green-700 px-0 sm:px-3 py-1 rounded-full sm:tracking-wider sm:uppercase -ml-10"
      >
        Log out
      </button>
      <Modal open={modalIsOpen} onClose={() => setModalIsOpen(false)}>
        <div>
          <h2 className="block text-gray-800 text-xl font-semibold">
            Are you sure you want to logout
          </h2>
          <div className="flex justify-around items-center -mb-5 mt-5">
            <button
              onClick={handleLogout}
              className="bg-green-900 hover:bg-green-700 text-white text-xl w-16 h-10 rounded-lg"
            >
              Yes
            </button>
            <button
              onClick={() => setModalIsOpen(false)}
              className="bg-green-900 hover:bg-green-700 text-white text-xl w-16 h-10 rounded-lg"
            >
              No
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default LogoutButton;
