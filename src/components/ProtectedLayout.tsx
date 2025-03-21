import { useAuth } from "@clerk/clerk-react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedLayout = () => {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (!isSignedIn) {
    return <Navigate to="/sign-in" />;
  }

  return <Outlet />;
};

export default ProtectedLayout;
