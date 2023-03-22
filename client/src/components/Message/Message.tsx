interface Props {
  message: string;
}

const Message: React.FC<Props> = ({ message }) => {
  return (
    <div className="w-full sm:w-60 md:w-64 m-2 border-[10px] border-green-700 rounded-lg min-h-[8rem] h-fit sm:h-32 md:h-40 bg-green-100 bg-opacity-70 p-2 overflow-y-auto overflow-x-clip text-2xl font-roboto text-center">
      {message}
    </div>
  );
};

export default Message;
