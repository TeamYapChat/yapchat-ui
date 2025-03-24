import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import PrivateRoute from "./components/PrivateRoute";
import { useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import { useAuth } from "@clerk/clerk-react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./features/store";
import { setLogin, setToken } from "./features/auth/authSlice";
import { useEffect } from "react";

function App() {
  const location = useLocation(); 

  // Define routes where NavBar should be hidden
  const hideNavOnRoutes = ["/login", "/signup"];

  const { getToken ,isLoaded, isSignedIn } = useAuth();

  const dispatch = useDispatch<AppDispatch>();
  dispatch(setLogin(isSignedIn));

  useEffect(() => {
    if (isLoaded) {
      dispatch(setLogin(isSignedIn));

      const fetchToken = async () => {
        const token = await getToken();
        dispatch(setToken(token));
      };

      fetchToken();
    }
  }, [isLoaded, isSignedIn, getToken, dispatch]);

  if (!isLoaded) return null;

  return (
    <div className="flex flex-col overflow-auto">
      <Toaster position="top-right" richColors />
      {!hideNavOnRoutes.includes(location.pathname) && <NavBar />}

      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<HomePage />} />
        </Route>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
