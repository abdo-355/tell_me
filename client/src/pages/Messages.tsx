import { useEffect, useState, useContext } from "react";
import { io } from "socket.io-client";

import Message from "../components/Message/Message";
import styles from "./styles.module.css";
import authContext from "../context/auth-context";

let isInitial = true

const Messages = () => {
  const { token } = useContext(authContext)
  const [messages, setMessages] = useState<string[]>([])

  useEffect(() => {
    const socket = io(process.env.REACT_APP_BACKEND!, {
      transportOptions: {
        polling: {
          extraHeaders: {
            Authorization: `Bearer ${token}`
          }
        }
      }
    })

    socket.on("load-messages", (recievedMessages: string[]) => {

      // comparee if there is no new messages
      if (isInitial) {
        const isEqual = recievedMessages.length === messages.length &&
          recievedMessages.every((value, index) => value === messages[index]);

        if (!isEqual) {
          setMessages(recievedMessages)
        }
        isInitial = false
      }
    })

    socket.on("new-message", (message) => {
      setMessages([message, ...messages])
    })


    return () => {
      socket.disconnect()
    }
  }, [messages, token])

  return (
    <div
      className={`${styles.background} min-h-[calc(100vh-64px)] flex justify-center items-center`}
    >
      {!messages || messages.length === 0 ? (
        <h1 className="text-3xl sm:text-5xl uppercase font-roboto font-semibold tracking-wider text-green-700 drop-shadow-2xl text-center">
          No messages sent
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
