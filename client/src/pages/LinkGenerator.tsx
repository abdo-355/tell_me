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
      <div className="flex items-center justify-around max-w-screen-xl flex-col tall:flex-col md:flex-row bg-green-400 h-48 tall:h-52 md:h-40 xsm:w-11/12 sm:w-5/6 md:w-2/3 rounded-3xl border-black border-2 shadow-xl">
        {/* to display the link and the copy button */}
        <GeneratedLink data={data} />
        <button
          title="Generate shareable link"
          onClick={generate}
          className="bg-green-100 h-3/5 tall:h-4/5 sm:w-1/5 tall:w-1/5 aspect-video rounded-xl border-gray-900 border-2 text-xl sm:text-2xl md:text-3xl tall:text-3xl my-3 md:mr-5"
          disabled={loading}
        >
          {loading ? <LoadingSpinner className="h-11 md:h-14" /> : "Generate"}
        </button>
      </div>
    </div>
  );
};

export default LinkGenerator;
