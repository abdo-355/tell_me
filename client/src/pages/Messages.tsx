import { useEffect } from "react";

import Message from "../components/Message/Message";
import useAxios from "../hooks/use-axios";
import styles from "./styles.module.css";

const Messages = () => {
  const { request, data } = useAxios("http://localhost:8080/messages", "get");

  useEffect(() => {
    const fetchData = async () => {
      await request();
    };

    fetchData();
  }, [request]);

  return (
    <div
      className={`${styles.background} h-[calc(100vh-64px)] flex justify-center items-center`}
    >
      {!data || data.messages.length === 0 ? (
        <h1 className="text-5xl uppercase font-roboto font-semibold tracking-wider text-green-700 drop-shadow-2xl ">
          No messages sent
        </h1>
      ) : (
        <div className="w-4/5 grid grid-cols-3 gap-3">
          {data.messages.map((message: string) => (
            <Message key={message} message={message} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Messages;
