import GeneratedLink from "../components/Link/GeneratedLink";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useAxios from "../hooks/use-axios";
import styles from "./styles.module.css";

const LinkGenerator = () => {
  const { request, data, loading } = useAxios(
    "http://localhost:8080/messages/path",
    "get"
  );

  const generate = async () => {
    await request();
  };

  return (
    <div
      className={`${styles.background} h-[calc(100vh-64px)] flex justify-center items-center`}
    >
      <div className="flex items-center justify-around bg-green-400 h-40 w-4/6 rounded-3xl border-black border-2 shadow-xl">
        {/* to display the link and the copy button */}
        <GeneratedLink data={data} />
        <button
          title="Generate shareable link"
          onClick={generate}
          className="bg-green-100 h-3/5 w-1/5 rounded-xl border-gray-900 border-2 text-4xl mr-5"
          disabled={loading}
        >
          {loading ? <LoadingSpinner /> : "Generate"}
        </button>
      </div>
    </div>
  );
};

export default LinkGenerator;
