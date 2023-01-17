import { useContext } from "react";
import { Outlet, useLocation, Navigate } from "react-router-dom";

import Header from "../components/Header/Header";
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
          <Header />
          <Outlet />
        </>
      )}
    </>
  );
};

export default Layout;
