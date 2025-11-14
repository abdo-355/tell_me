import wave from "../assets/wave.png";
import HeaderText from "../components/Header/HeaderText";
import HeaderImage from "../components/Header/HeaderImage";

const Home = () => {
  return (
    <header className="bg-green-500">
      <img
        className="absolute inset-y-0 h-full w-5/12"
        src={wave}
        alt="wave background"
      />
      <div className="relative mx-auto flex items-center h-[calc(100vh-64px)] max-w-[110rem]">
        <HeaderText />
        <HeaderImage />
      </div>
      <div className="hidden sm:block absolute inset-x-0 bottom-0 z-10 md:z-0 bg-white h-[26vh] header-triangle"></div>
    </header>
  );
};

export default Home;
