import { useEffect } from "react";

import Message from "../components/Message/Message";
import styles from "./styles.module.css";
import useAxios from "../hooks/use-axios";
import LoadingSpinner from "../components/UI/LoadingSpinner";

const Messages = () => {
  const { request, data, loading } = useAxios(
    `${process.env.REACT_APP_BACKEND}/messages`,
    "get"
  );
  useEffect(() => {
    const fetchData = async () => {
      await request();
    };
    fetchData();
  }, [request]);

  return (
    <div
      className={`${styles.background} min-h-[calc(100vh-64px)] flex justify-center items-center`}
    >
      {loading ? (
        <LoadingSpinner />
      ) : !data || data.messages.length === 0 ? (
        <h1 className="text-3xl sm:text-5xl uppercase font-roboto font-semibold tracking-wider text-green-700 drop-shadow-2xl text-center">
          No messages sent
        </h1>
      ) : (
        <div className="max-w-screen-xl w-full mx-5 lg:mx-20 flex flex-wrap justify-center my-24">
          {data.messages.map((message: string) => (
            <Message key={message} message={message} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Messages;
