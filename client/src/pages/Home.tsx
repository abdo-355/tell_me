 import HeaderText from "../components/Header/HeaderText";
 import HeaderImage from "../components/Header/HeaderImage";

 const Home = () => {
   return (
     <header className="bg-green-500">
       <svg
         className="absolute inset-y-0 h-full w-full sm:w-5/12"
         viewBox="0 0 100 100"
         preserveAspectRatio="none"
       >
         <defs>
           <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
             <stop offset="0%" stopColor="#065f46" />
             <stop offset="100%" stopColor="#22c55e" />
           </linearGradient>
         </defs>
         <path
           d="M0,0 Q30,30 60,20 T100,40 L100,100 L0,100 Z"
           fill="url(#waveGradient)"
         />
       </svg>
      <div className="relative mx-auto flex items-center h-[calc(100vh-64px)] max-w-[110rem]">
        <HeaderText />
        <HeaderImage />
      </div>
      <div className="hidden sm:block absolute inset-x-0 bottom-0 z-10 md:z-0 bg-white h-[26vh] header-triangle"></div>
    </header>
  );
};

export default Home;
