import NavBar from './components/NavBar'
import { Routes, Route } from 'react-router-dom'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import SettingsPage from './pages/SettingsPage'
import ProfilePage from './pages/ProfilePage'
import HomePage from './pages/HomePage'
import PrivateRoute from './components/PrivateRoute'

function App() {
  return (
    <>
      <NavBar/>
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
