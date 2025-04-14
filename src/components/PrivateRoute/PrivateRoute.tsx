import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../features/store";

const PrivateRoute = () => {
  const location = useLocation();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  
  const redirectPath = location.pathname && location.search ? location.pathname + location.search : "/";

  return isAuthenticated ? <Outlet /> : <Navigate to={`/login?redirect=${encodeURIComponent(redirectPath)}`} />;
};

export default PrivateRoute;
