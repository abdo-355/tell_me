import { FC, ReactNode } from "react";
import ReactDOM from "react-dom";
import { motion } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { AnimatePresence } from "framer-motion";

import Backdrop from "./Backdrop";

const modalRoot = document.createElement("div");
const appRoot = document.getElementById("root");
modalRoot.setAttribute("id", "modal");
document.body.insertBefore(modalRoot, appRoot);

const dropIn = {
  initial: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
      duration: 500,
      delay: 0.3,
    },
  },
  exit: {
    opacity: 0,
    y: 50,
  },
};

interface ContentProps {
  children: ReactNode;
  onClose: () => void;
}

const ModalContent: FC<ContentProps> = ({ children, onClose }) => {
  return (
    <Backdrop onClose={onClose}>
      <motion.div
        variants={dropIn}
        initial="initial"
        animate="visible"
        exit="exit"
        className="bg-green-100 relative rounded-lg p-10 flex justify-center items-center border-2 border-green-800"
        onClick={(e) => e.stopPropagation()}
        data-testid="modal"
      >
        <XMarkIcon
          onClick={onClose}
          className="absolute h-10 top-0 right-0 cursor-pointer hover:scale-110 transition-all text-green-900 active:scale-90"
          data-testid="close-modal"
        />
        {children}
      </motion.div>
    </Backdrop>
  );
};

interface Props extends ContentProps {
  open: boolean;
}

const Modal: FC<Props> = ({ children, onClose, open }) => {
  return ReactDOM.createPortal(
    <AnimatePresence mode="wait">
      {open && <ModalContent onClose={onClose}>{children}</ModalContent>}
    </AnimatePresence>,
    modalRoot
  );
};

export default Modal;
