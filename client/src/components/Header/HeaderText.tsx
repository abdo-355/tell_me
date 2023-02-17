import { NavLink } from "react-router-dom";

const HeaderText = () => {
  return (
    <div className="flex flex-1 flex-col justify-center z-10 items-start mx-10">
      <h1 className="text-5xl flex-initial flex-row font-semibold font-roboto tracking-wide z-10 drop-shadow-lg text-green-50 uppercase">
        Let them tell you
      </h1>
      <h3 className="flex-initial my-5 text-white font-extrabold font-roboto w-4/5 drop-shadow-lg tracking-wider">
        Create your Profile Link and Send it to all your contacts to check what
        do your friends and family think about you. With the help of TellMe, you
        can recieve anonymous compliments, recommendations and criticism easily
        for free!
      </h3>
      <NavLink
        to="/auth/signup"
        className="text-green-800 hover:text-white bg-white hover:bg-green-900 text-2xl hover:scale-105 hover:tr font-semibold transition-all duration-200 z-10 py-2 px-5 rounded-2xl border-green-700 hover:border-white border-4 remove-shake shadow-xl ml-2 translate"
      >
        Get Started &rarr;
      </NavLink>
    </div>
  );
};

export default HeaderText;
