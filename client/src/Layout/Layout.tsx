import { useContext } from "react";
import { Outlet, useLocation, Navigate } from "react-router-dom";

import Navbar from "../components/Navbar/Navbar";
import authContext from "../context/auth-context";

const Layout = () => {
  const { pathname } = useLocation();

  const { token } = useContext(authContext);

  return (
    <>
      {token === "" && pathname !== "/" ? (
        <Navigate to="/auth/signup" />
      ) : (
        <>
          <Navbar />
          <Outlet />
        </>
      )}
    </>
  );
};

export default Layout;
