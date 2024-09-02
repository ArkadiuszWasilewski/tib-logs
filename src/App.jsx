import Footer from "./components/Footer";
import Header from "./components/Header";
import HeroSection from "./components/MainContent/HeroSection";
import PokemonCardContainer from "./components/MainContent/PokemonCardContainer";
import { AuthProvider } from "./context/AuthContext";
import "./output.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/LoginForm/Login";
import Signup from "./components/LoginForm/Signup";
import MainContent from "./components/MainContent/MainContent";
import ForgotPassword from "./components/LoginForm/ForgotPassword";
import UpdateProfile from "./components/LoginForm/UpdateProfile";
import PrivateRoute from "./components/LoginForm/PrivateRoute";
import Dashboard from "./components/LoginForm/Dashboard";
import { useAuth } from "./context/AuthContext";

function App() {
  return (
    <div className="flex flex-col bg-gray-600 text-white min-h-screen">
      <Router>
        <AuthProvider>
          <Header />
          <Routes>
            <Route
              path="/pokedex-tailwind/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/pokedex-tailwind/update-profile"
              element={
                <PrivateRoute>
                  <UpdateProfile />
                </PrivateRoute>
              }
            />
            <Route path="/pokedex-tailwind/" element={<MainContent />} />
            <Route path="/pokedex-tailwind/login" element={<Login />}></Route>
            <Route path="/pokedex-tailwind/signup" element={<Signup />}></Route>
            <Route
              path="/pokedex-tailwind/forgot-password"
              element={<ForgotPassword />}
            ></Route>
            {/* Catch-all route for 404 errors */}
            <Route path="*" element={<Navigate to="/pokedex-tailwind/" />} />
          </Routes>
          <Footer />
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
