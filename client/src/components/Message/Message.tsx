interface Props {
  message: string;
}

const Message: React.FC<Props> = ({ message }) => {
  return <h1>{message}</h1>;
};

export default Message;
