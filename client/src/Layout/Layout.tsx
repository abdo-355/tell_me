import { Outlet } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

import Navbar from "../components/Navbar/Navbar";
import LoadingSpinner from "../components/UI/LoadingSpinner";

const Layout = () => {
  const { isLoaded } = useAuth();

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner className="h-12 w-12" />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Layout;
