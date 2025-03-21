import { Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "sonner";

import NavBar from "./components/NavBar";
import ProtectedLayout from "./components/ProtectedLayout";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";

function App() {
  const location = useLocation(); // Get current route path

  // Define routes where NavBar should be hidden
  const hideNavOnRoutes = [
    "/sign-in",
    "/sign-in/factor-one",
    "/sign-up",
    "/sign-up/verify-email-address",
  ];

  return (
    <div className="flex flex-col overflow-auto">
      <Toaster position="top-right" richColors />
      {!hideNavOnRoutes.includes(location.pathname) && <NavBar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/sign-in/*" element={<SignInPage />} />
        <Route path="/sign-up/*" element={<SignUpPage />} />

        {/* Protected Routes */}
        <Route element={<ProtectedLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
