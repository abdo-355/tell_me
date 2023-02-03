import { ClipboardDocumentIcon } from "@heroicons/react/24/outline";

import styles from "./styles.module.css";

const URLGenerator = () => {
  return (
    <div
      className={`${styles.background} h-[calc(100vh-64px)] flex justify-center items-center`}
    >
      <div className="flex items-center justify-center bg-green-400 h-40 w-4/6 rounded-3xl border-black border-2 shadow-xl">
        <div className="flex bg-green-100 h-3/5 w-2/3 rounded-xl border-gray-900 border-2 overflow-hidden items-center">
          <button
            title="copy to clipboard"
            className="h-full aspect-square border-r-2 border-green-900 inline-flex justify-center items-center"
          >
            <ClipboardDocumentIcon
              className="text-gray-700 h-3/5"
              aria-hidden
            />
          </button>
          <input
            type="text"
            className="bg-green-100 h-full w-full rounded-r-xl pl-5 text-3xl text-gray-400"
            placeholder="Generate a Link"
            readOnly
          />
        </div>
      </div>
    </div>
  );
};

export default URLGenerator;
