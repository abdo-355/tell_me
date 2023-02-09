import { Link } from "react-router-dom";

import logo from "../../assets/logo-text.png";
import logoOnly from "../../assets/logo-only.png";

const Logo = () => {
  return (
    <Link
      to="/"
      className="flex items-center justify-center sm:items-stretch sm:justify-start"
    >
      <div className="flex flex-shrink-0 items-center bg-white px-2 sm:px-3 py-2 rounded-full shadow-md hover:shadow-green-700 hover:scale-105 transition-all my-2">
        <img
          className="hidden h-9 w-auto sm:block"
          src={logo}
          alt="website logo"
        />
        {/* for mobile devices */}
        <img
          className="block h-9 w-9 scale-125 rounded-full sm:hidden"
          src={logoOnly}
          alt="website logo"
        />
      </div>
    </Link>
  );
};

export default Logo;
