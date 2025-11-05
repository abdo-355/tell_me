import { useCallback } from "react";
import GeneratedLink from "../components/Link/GeneratedLink";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import SocialShare from "../components/UI/SocialShare";
import useAxios from "../hooks/use-axios";
import styles from "./styles.module.css";

const LinkGenerator = () => {
  const { request: requestGenerate, data, loading: loadingGenerate, error } = useAxios(
    `${process.env.REACT_APP_BACKEND}/api/messages/path`,
    "get"
  );
  const { request: requestRegenerate, loading: loadingRegenerate } = useAxios(
    `${process.env.REACT_APP_BACKEND}/api/messages/path?regenerate=true`,
    "get"
  );

  const loading = loadingGenerate || loadingRegenerate;

  const generate = useCallback(async (regenerate = false) => {
    if (loading) return;

    if (regenerate) {
      await requestRegenerate();
    } else {
      await requestGenerate();
    }
  }, [loading, requestGenerate, requestRegenerate]);

  return (
    <div
      className={`${styles.background} h-[calc(100vh-64px)] flex justify-center items-center`}
    >
      <div className="flex flex-col items-center max-w-screen-xl w-full px-4">
        <div className="flex items-center justify-around flex-col tall:flex-col md:flex-row bg-green-400 h-48 tall:h-52 md:h-40 xsm:w-11/12 sm:w-5/6 md:w-2/3 rounded-3xl border-black border-2 shadow-xl mb-4">
          {/* to display the link and the copy button */}
          <GeneratedLink data={data} />
          <button
            title="Generate shareable link"
            onClick={() => generate(false)}
            className="bg-green-100 h-3/5 tall:h-4/5 sm:w-1/5 tall:w-1/5 aspect-video rounded-xl border-gray-900 border-2 text-xl sm:text-2xl md:text-3xl tall:text-3xl my-3 md:mr-5 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? <LoadingSpinner className="h-11 md:h-14" /> : "Generate"}
          </button>
        </div>

        {data && (
          <div className="flex flex-col items-center mt-4">
            <button
              title="Generate new link"
              onClick={() => generate(true)}
              className="bg-green-50 hover:bg-green-100 text-green-700 px-3 py-1.5 rounded-md border border-green-200 text-xs font-medium disabled:opacity-50 transition-colors"
              disabled={loading}
            >
              {loading ? <LoadingSpinner className="h-3" /> : "🔄 Regenerate"}
            </button>
          </div>
        )}

        {data && (
          <div className="flex flex-col items-center">
            <p className="text-sm font-medium text-green-700 mb-3">Share your link:</p>
            <SocialShare url={`${window.location.origin}/messages/${data.path}`} />
          </div>
        )}

        {error && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 text-green-800 rounded-lg text-center text-sm">
            Failed to generate link. Please try again.
          </div>
        )}
      </div>
    </div>
  );
};

export default LinkGenerator;
