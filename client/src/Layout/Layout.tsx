import { Outlet, useLocation, Navigate } from "react-router-dom";

import Navbar from "../components/Navbar/Navbar";

const Layout = () => {
  const { pathname } = useLocation();

  return (
    <>
      {!localStorage.getItem("token") && pathname !== "/" ? (
        <Navigate to="/auth/login" />
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
