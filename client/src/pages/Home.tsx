import wave from "../assets/wave.png";

const Home = () => {
  return (
    <header className="relative flex bg-green-500 h-[calc(100vh-64px)] ">
      <img
        className="absolute inset-y-0 h-full"
        src={wave}
        alt="wave background"
      />
      <div className="flex flex-1 flex-col justify-center items-start mx-10">
        <h1 className="text-5xl flex-initial flex-row font-semibold font-roboto tracking-wide drop-shadow-xl text-outline text-green-100 uppercase">
          Let them tell you
        </h1>
        <h3 className="flex-initial my-5 text-white font-extrabold font-roboto w-4/5 drop-shadow-lg">
          Create your Profile Link and Send it to all your contacts to check
          what do your friends think about you. With the help of TellMe, you can
          send and recieve anonymous compliments, recommendations and criticism
          easily for free!
        </h3>
      </div>
      <div className="flex-1"></div>
    </header>
  );
};

export default Home;
