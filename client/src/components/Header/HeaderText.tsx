import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/outline";

import authContext from "../../context/auth-context";

const HeaderText = () => {
  const { isLoggedIn } = useContext(authContext);

  return (
    <div className="tall:absolute md:relative sm:top-[15%] tall:top-1/4 md:top-0 flex flex-1 flex-col justify-around pt-16 tall:pt-0 pb-28 h-full md:justify-center tall:justify-between tall:h-1/4 sm:py-0 sm:h-96 md:h-auto z-10 items-center md:items-start xsm:ml-10 xsm:mr-10">
      <h1 className="text-4xl sm:text-5xl md:text-4xl tall:text-5xl lg:text-5xl text-center md:text-left flex-initial flex-row font-semibold font-roboto tracking-wide z-10 drop-shadow-lg text-green-50 uppercase">
        Let them tell you
      </h1>
      <h3 className="flex-initial my-5 text-white font-semibold md:font-extrabold tall:font-semibold font-roboto text-xl md:text-base tall:text-lg text-center md:text-left drop-shadow-lg tracking-wider w-auto sm:w-2/3 md:w-auto tall:w-3/4">
        Create your Profile Link and Send it to all your contacts to check what
        do your friends and family think about you. With the help of TellMe, you
        can recieve anonymous compliments, recommendations and constructive
        criticism easily for free!
      </h3>
      {isLoggedIn ? (
        <NavLink
          to="/messages"
          className="text-green-800 hover:text-white bg-white hover:bg-green-900 text-xl tall:text-2xl hover:scale-105 font-semibold transition-all duration-200 z-10 py-2 px-5 rounded-2xl border-green-700 hover:border-white border-4 shadow-xl ml-2 translate"
        >
          Check Messages{" "}
          <ChatBubbleLeftEllipsisIcon className="pl-1 h-7 inline-block" />
        </NavLink>
      ) : (
        <NavLink
          to="/auth/signup"
          className="text-green-800 hover:text-white bg-white hover:bg-green-900 text-xl tall:text-2xl hover:scale-105 font-semibold transition-all duration-200 z-10 py-2 px-5 rounded-2xl border-green-700 hover:border-white border-4 shadow-xl ml-2 translate"
        >
          Get Started &rarr;
        </NavLink>
      )}
    </div>
  );
};

export default HeaderText;
