interface Props {
  message: string;
}

const Message: React.FC<Props> = ({ message }) => {
  return (
    <div className="border-[10px] border-green-700 rounded-lg h-32 bg-green-100 bg-opacity-70 p-2 overflow-auto text-xl font-roboto">
      {message}
    </div>
  );
};

export default Message;
