import Image from "../../assets/header-image.png";

const HeaderImage = () => {
  return (
    <img
      className="flex-1 z-10 h-3/4 aspect-auto rounded-3xl shadow-2xl mr-10"
      src={Image}
      alt="a guy checking messages"
    />
  );
};

export default HeaderImage;
