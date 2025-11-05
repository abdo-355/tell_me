import { useState } from "react";

import { ClipboardDocumentIcon } from "@heroicons/react/24/outline";
import Modal from "../UI/Modal/Modal";

interface Props {
  data: { path: string; regenerated?: boolean } | null;
}

const GeneratedLink: React.FC<Props> = ({ data }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { origin } = window.location;

  const path = data ? origin + "/messages/" + data.path : "";
  const isNewLink = data?.regenerated;

  const copyToClipboard = async () => {
    try {
      if (path) {
        await window.navigator.clipboard.writeText(path);
        setModalIsOpen(true);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex bg-green-100 h-4/5 tall:h-36 md:h-3/5 w-11/12 tall:w-11/12 md:w-2/3 rounded-xl border-gray-900 border-2 overflow-hidden items-center ml-0 tall:ml-0 md:ml-5 my-5 relative">
      {isNewLink && (
        <div className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
          New!
        </div>
      )}
      <button
        title="copy to clipboard"
        onClick={copyToClipboard}
        className="h-full aspect-square border-r-2 border-green-900 inline-flex justify-center items-center hover:bg-green-200 transition-colors disabled:opacity-50"
        disabled={!path}
      >
        <ClipboardDocumentIcon className={`text-gray-700 h-3/5 ${showSuccess ? 'text-green-600' : ''}`} aria-hidden />
      </button>
      <input
        type="text"
        className={`bg-green-100 h-full w-full rounded-r-xl pl-2 xsm:pl-5 text-xl xsm:text-2xl placeholder:text-2xl sm:placeholder:text-3xl placeholder:text-gray-400 transition-colors ${
          showSuccess ? 'bg-green-50 border-green-300' : ''
        }`}
        placeholder="Click Generate to create your link"
        value={path}
        readOnly
      />
      {showSuccess && (
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-green-600 text-sm font-medium">
          ✓ Copied!
        </div>
      )}
      <Modal
        open={modalIsOpen}
        onClose={() => {
          setModalIsOpen(false);
        }}
      >
        URL copied to the clipboard
      </Modal>
    </div>
  );
};

export default GeneratedLink;
