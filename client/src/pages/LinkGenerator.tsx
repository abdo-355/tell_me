import { useState } from "react";

import GeneratedLink from "../components/Link/GeneratedLink";
import styles from "./styles.module.css";

const LinkGenerator = () => {
  const [link, setLink] = useState("");
  return (
    <div
      className={`${styles.background} h-[calc(100vh-64px)] flex justify-center items-center`}
    >
      <div className="flex items-center justify-around bg-green-400 h-40 w-4/6 rounded-3xl border-black border-2 shadow-xl">
        {/* to display the link and the copy button */}
        <GeneratedLink link={link} />
        <button
          title="Generate shareable link"
          className="bg-green-100 h-3/5 w-1/5 rounded-xl border-gray-900 border-2 text-4xl mr-5"
        >
          Generate
        </button>
      </div>
    </div>
  );
};

export default LinkGenerator;
