import { useEffect } from "react";

import Message from "../components/Message/Message";
import useAxios from "../hooks/use-axios";

const Messages = () => {
  const { request, data } = useAxios("http://localhost:8080/messages", "get");

  useEffect(() => {
    const fetchData = async () => {
      await request();
    };

    fetchData();
  }, [request]);

  if (!data || data.messages.length === 0) {
    return <h1>No messages sent</h1>;
  }

  return (
    <div>
      {data.messages.map((message: string) => (
        <Message key={message} message={message} />
      ))}
    </div>
  );
};

export default Messages;
