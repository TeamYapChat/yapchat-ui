import NavBar from "./components/NavBar/NavBar";
import { Routes, Route } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import { useAuth } from "@clerk/clerk-react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./features/store";
import { setLogin } from "./features/auth/authSlice";
import { useEffect } from "react";
import InviteHandlerPage from "./pages/InviteHandlerPage";

function App() {
  const location = useLocation();

  // Define routes where NavBar should be hidden
  const hideNavOnRoutes = ["/login", "/signup"];

  const { isLoaded, isSignedIn } = useAuth();

  const dispatch = useDispatch<AppDispatch>();

  dispatch(setLogin(isSignedIn));

  useEffect(() => {
    if (isLoaded) {
      dispatch(setLogin(isSignedIn));
    }
  }, [isLoaded, isSignedIn, dispatch]);

  if (!isLoaded) return null;

  return (
    <div className="flex flex-col overflow-auto">
      <Toaster
        position="top-right"
        richColors
      />
      {!hideNavOnRoutes.includes(location.pathname) && <NavBar />}

      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/invite/:id/:code" element={<InviteHandlerPage />} />
        </Route>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
