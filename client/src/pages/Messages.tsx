import { useEffect, useState, useRef } from "react";
import io, { Socket } from "socket.io-client";

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
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      await request();
    };
    fetchData();
  }, [request]);

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io(process.env.REACT_APP_BACKEND!, {
        withCredentials: true,
        transports: ['websocket', 'polling'],
        upgrade: true,
        rememberUpgrade: true,
        timeout: 20000,
        forceNew: false,
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      });
      const socket = socketRef.current;
      socket.on("connect", () => {
        console.log("Socket connected");
      });
      socket.on("connect_error", (err) => {
        console.error("Socket connection error:", err);
      });
      socket.on("disconnect", (reason) => {
        console.log("Socket disconnected:", reason);
      });
      socket.on("newMessage", (message: string) => {
        console.log("New message received:", message);
        setMessages((prev) => [message, ...prev]);
      });
    }

    if (data && socketRef.current) {
      setMessages(data.messages);
      socketRef.current.emit("join", data.path);
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
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
