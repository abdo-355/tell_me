import { useEffect, useState } from "react";
import io from "socket.io-client";

import Message from "../components/Message/Message";
import styles from "./styles.module.css";
import useAxios from "../hooks/use-axios";
import LoadingSpinner from "../components/UI/LoadingSpinner";

const Messages = () => {
  const { request, data, loading } = useAxios(
    `${process.env.REACT_APP_BACKEND}/api/messages`,
    "get"
  );
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      await request();
    };
    fetchData();
  }, [request]);

  useEffect(() => {
    if (data) {
      setMessages(data.messages);
      const socket = io(process.env.REACT_APP_BACKEND!);
      console.log("connecting socket to", process.env.REACT_APP_BACKEND);
      socket.on("connect", () => console.log("socket connected"));
      socket.on("connect_error", (err) => console.log("socket connect error", err));
      socket.emit("join", data.path);
      console.log("emitted join for", data.path);
      socket.on("newMessage", (message: string) => {
        console.log("received newMessage", message);
        setMessages((prev) => [message, ...prev]);
      });
      return () => {
        socket.disconnect();
      };
    }
  }, [data]);

  return (
    <div
      className={`${styles.background} min-h-[calc(100vh-64px)] flex justify-center items-center`}
    >
      {loading ? (
        <LoadingSpinner />
      ) : messages.length === 0 ? (
        <h1 className="text-3xl sm:text-5xl uppercase font-roboto font-semibold tracking-wider text-green-700 drop-shadow-2xl text-center">
          No messages received
        </h1>
      ) : (
        <div className="max-w-screen-xl w-full mx-5 lg:mx-20 flex flex-wrap justify-center my-24">
          {messages.map((message: string) => (
            <Message key={message} message={message} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Messages;
