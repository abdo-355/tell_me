import { Outlet, useLocation, Navigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

import Navbar from "../components/Navbar/Navbar";
import LoadingSpinner from "../components/UI/LoadingSpinner";

const Layout = () => {
  const { pathname } = useLocation();
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded && pathname !== "/") {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner className="h-12 w-12" />
      </div>
    );
  }

  return (
    <>
      {!isSignedIn && pathname !== "/" ? (
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
