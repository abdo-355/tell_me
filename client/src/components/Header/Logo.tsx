import logo from "../../assets/logo-text.png";

const Logo = () => {
  return (
    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
      <div className="flex flex-shrink-0 items-center bg-white px-3 py-2 rounded-full shadow-md hover:shadow-green-700 hover:scale-105 transition-all my-2">
        <img className="block h-9 w-auto" src={logo} alt="website logo" />
      </div>
    </div>
  );
};

export default Logo;
