import { useState, useEffect } from "react";

import { ClipboardDocumentIcon } from "@heroicons/react/24/outline";
import Modal from "../UI/Modal/Modal";

interface Props {
  data: { path: string; regenerated?: boolean } | null;
}

const GeneratedLink: React.FC<Props> = ({ data }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const { origin } = window.location;

  const path = data ? origin + "/messages/" + data.path : "";
  const isNewLink = data?.regenerated;

  useEffect(() => {
    if (isNewLink) {
      setShowNew(true);
      const timer = setTimeout(() => setShowNew(false), 3000);
      return () => clearTimeout(timer);
    } else {
      setShowNew(false);
    }
  }, [isNewLink]);

  const copyToClipboard = async () => {
    try {
      if (path) {
        await window.navigator.clipboard.writeText(path);
        setModalIsOpen(true);
        setShowSuccess(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (showSuccess) {
      setTimeout(() => setShowSuccess(false), 2000);
    }
  }, [showSuccess]);

  return (
    <div className="flex flex-col sm:flex-row bg-green-100 h-4/5 tall:h-36 md:h-3/5 w-full rounded-xl border-gray-900 border-2 items-center mx-0 tall:mx-0 md:mx-5 my-5 relative sm:p-0 p-4 sm:space-y-0 space-y-3">
      {showNew && (
        <div className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
          New!
        </div>
      )}
      {/* Mobile layout */}
      <div className="sm:hidden flex flex-col space-y-3 w-full">
        <input
          type="text"
          data-testid="generated-link"
          className={`bg-white h-12 w-full rounded-lg px-3 text-lg placeholder:text-lg placeholder:text-gray-400 transition-colors border ${showSuccess ? 'bg-green-50 border-green-300' : 'border-gray-300'
            }`}
          placeholder="Click Generate to create your link"
          value={path}
          readOnly
        />
        <button
          title="copy to clipboard"
          data-testid="copy-button"
          onClick={copyToClipboard}
          className="bg-green-200 hover:bg-green-300 text-gray-700 px-4 py-2 rounded-lg border border-green-300 inline-flex justify-center items-center transition-colors disabled:opacity-50 text-sm font-medium"
          disabled={!path}
        >
          <ClipboardDocumentIcon className="text-gray-700 h-5 w-5 mr-2" aria-hidden />
          Copy Link
        </button>
      </div>
      {/* Desktop layout */}
      <div className="hidden sm:flex w-full h-full">
        <button
          title="copy to clipboard"
          data-testid="copy-button"
          onClick={copyToClipboard}
          className="h-full aspect-square border-r-2 border-green-900 inline-flex justify-center items-center hover:bg-green-200 transition-colors disabled:opacity-50 rounded-l-xl"
          disabled={!path}
        >
          <ClipboardDocumentIcon className={`text-gray-700 h-3/5 ${showSuccess ? 'text-green-600' : ''}`} aria-hidden />
        </button>
        <input
          type="text"
          data-testid="generated-link"
          className={`bg-green-100 h-full w-full rounded-r-xl pl-2 xsm:pl-5 text-xl xsm:text-2xl placeholder:text-2xl sm:placeholder:text-3xl placeholder:text-gray-400 transition-colors ${showSuccess ? 'bg-green-50 border-green-300' : ''
            }`}
          placeholder="Click Generate to create your link"
          value={path}
          readOnly
        />
      </div>
      {showSuccess && (
        <div className="absolute -top-2 -left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
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
