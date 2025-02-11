import NavBar from './components/NavBar'
import { Routes, Route } from 'react-router-dom'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import SettingsPage from './pages/SettingsPage'
import ProfilePage from './pages/ProfilePage'
import HomePage from './pages/HomePage'
import PrivateRoute from './components/PrivateRoute'
import { useLocation } from 'react-router-dom'
import { Toaster} from 'sonner'

function App() {

  const location = useLocation(); // Get current route path

  // Define routes where NavBar should be hidden
  const hideNavOnRoutes = ["/login", "/signup"];

  return (
    <>
      <Toaster position="top-right" richColors/>
       {!hideNavOnRoutes.includes(location.pathname) && <NavBar />}

      <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<HomePage />} /> 
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  )
}

export default App
