import Image from "../../assets/header-image.png";

const HeaderImage = () => {
  return (
    <>
      <img
        className="flex-1 hidden z-10 md:w-3/5 md:block lg:w-3/6 aspect-auto rounded-3xl shadow-2xl mr-10"
        src={Image}
        alt="a guy checking messages"
      />
      <div className="block absolute right-0 md:hidden w-full rounded-3xl shadow-2xl overflow-hidden sm:-mr-20 -mb-36 scale-y-150 sm:-scale-x-100 sm:scale-y-100 -scale-x-150">
        <img src={Image} alt="a guy checking messages" />
        <div className="absolute inset-0 bg-green-700 z-[5] bg-opacity-60" />
      </div>
    </>
  );
};

export default HeaderImage;
