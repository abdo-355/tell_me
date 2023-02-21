import Image from "../../assets/header-image.png";

const HeaderImage = () => {
  return (
    <>
      <img
        className="tall:absolute tall:bottom-[2%] tall:right-5 md:bottom-0 flex-1 hidden z-10 md:w-3/5 tall:w-4/5 md:block lg:w-3/6 aspect-auto rounded-3xl shadow-2xl mr-5"
        src={Image}
        alt="a guy checking messages"
      />
      <div className="block absolute right-0 bottom-0 sm:bottom-auto md:hidden w-full rounded-3xl shadow-2xl overflow-hidden sm:-mr-20 mb-0 sm:-mb-36 scale-y-150 sm:-scale-x-100 sm:scale-y-100 -scale-x-150">
        <img src={Image} alt="a guy checking messages" />
        <div className="absolute inset-0 bg-green-700 z-[5] bg-opacity-60" />
      </div>
    </>
  );
};

export default HeaderImage;
