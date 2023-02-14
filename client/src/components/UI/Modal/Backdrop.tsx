import { ReactNode, FC } from "react";
import { motion } from "framer-motion";

interface Props {
  children: ReactNode;
  onClose: () => void;
}

const Backdrop: FC<Props> = ({ children, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      onClick={onClose}
      className="fixed flex justify-center items-center z-50 h-screen w-screen bg-black bg-opacity-80"
      data-testid="modal-backdrop"
    >
      {children}
    </motion.div>
  );
};

export default Backdrop;
