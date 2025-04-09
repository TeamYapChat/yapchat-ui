import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../features/store";

const PrivateRoute = () => {
  const location = useLocation();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  
  return isAuthenticated ? <Outlet /> : <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} />;
};

export default PrivateRoute;
