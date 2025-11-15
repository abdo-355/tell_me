import { useCallback, useEffect, useRef, useState } from "react";
import GeneratedLink from "../components/Link/GeneratedLink";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import SocialShare from "../components/UI/SocialShare";
import Modal from "../components/UI/Modal/Modal";
import useAxios from "../hooks/use-axios";
import styles from "./styles.module.css";

const LinkGenerator = () => {
  const regenerateRef = useRef(false);
  const [showRegenerateModal, setShowRegenerateModal] = useState(false);
  const { request, data, loading, error } = useAxios(
    () => `${process.env.REACT_APP_BACKEND}/api/messages/path${regenerateRef.current ? '?regenerate=true' : ''}`,
    "get"
  );

  useEffect(() => {
    if (!data && !loading) {
      request();
    }
  }, [data, loading, request]);

  const generate = useCallback(async (regen = false) => {
    if (loading) return;

    regenerateRef.current = regen;
    await request();
  }, [loading, request]);

  const handleRegenerateClick = () => {
    setShowRegenerateModal(true);
  };

  const confirmRegenerate = () => {
    setShowRegenerateModal(false);
    generate(true);
  };

  return (
    <div
      className={`${styles.background} h-[calc(100vh-64px)] flex justify-center items-center`}
    >
      <div className="flex flex-col items-center max-w-screen-xl w-full px-4">
        <div className="flex items-center justify-center bg-green-400 h-48 tall:h-52 md:h-40 w-full rounded-3xl border-black border-2 shadow-xl mb-6">
          {/* to display the link and the copy button */}
          <GeneratedLink data={data} />
        </div>

        {data && (
          <div className="flex flex-col items-center mb-6">
            <button
              title="Generate new link"
              onClick={handleRegenerateClick}
              className="bg-green-50 hover:bg-green-100 text-green-700 px-3 py-1.5 rounded-md border border-green-200 text-xs font-medium disabled:opacity-50 transition-colors"
              disabled={loading}
            >
              {loading ? <LoadingSpinner className="h-3" /> : "🔄 Regenerate"}
            </button>
          </div>
        )}

        {data && (
          <div className="flex flex-col items-center mb-6">
            <p className="text-sm font-medium text-green-700 mb-3">Share your link:</p>
            <SocialShare url={`${window.location.origin}/messages/${data.path}`} />
          </div>
        )}

        {error && (
          <div className="p-3 bg-green-50 border border-green-200 text-green-800 rounded-lg text-center text-sm">
            Failed to generate link. Please try again.
          </div>
        )}
      </div>
      <Modal
        open={showRegenerateModal}
        onClose={() => setShowRegenerateModal(false)}
      >
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Confirm Regenerate</h3>
          <p className="text-sm text-gray-600 mb-6">
            Regenerating will create a new link. The old link will become invalid and any messages sent to it will no longer be received.
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setShowRegenerateModal(false)}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={confirmRegenerate}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Regenerate
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default LinkGenerator;
