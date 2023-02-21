import wave from "../assets/wave.png";
import HeaderText from "../components/Header/HeaderText";
import HeaderImage from "../components/Header/HeaderImage";

const Home = () => {
  return (
    <header className="relative flex items-center bg-green-500 h-[calc(100vh-64px)] overflow-hidden">
      <img
        className="absolute inset-y-0 h-full w-5/12"
        src={wave}
        alt="wave background"
      />
      <HeaderText />
      <HeaderImage />
      <div className="hidden sm:block absolute inset-x-0 bottom-0 z-10 md:z-0 bg-white h-[26vh] header-triangle"></div>
    </header>
  );
};

export default Home;
