import Footer from "./components/Footer";
import Header from "./components/Header";
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
import ForgotPassword from "./components/LoginForm/ForgotPassword";
import UpdateProfile from "./components/LoginForm/UpdateProfile";
import PrivateRoute from "./components/LoginForm/PrivateRoute";
import Dashboard from "./components/LoginForm/Dashboard";
import { DarkModeProvider } from "./context/DarkModeContext";
import { UserContextProvider } from "./context/UserContext";
import MainContent from "./components/MainContent";

function App() {
  return (
    <DarkModeProvider>
      <div className="flex flex-col bg-gray-300 dark:bg-gray-700 text-white dark:text-white min-h-screen">
        <Router>
          <UserContextProvider>
            <AuthProvider>
              <Header />
              <main className="pt-32">
                <Routes>
                  <Route
                    path="/tibialogs/dashboard"
                    element={
                      <PrivateRoute>
                        <Dashboard />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/tibialogs/update-profile"
                    element={
                      <PrivateRoute>
                        <UpdateProfile />
                      </PrivateRoute>
                    }
                  />
                  <Route path="/tibialogs/" element={<MainContent />} />
                  <Route path="/tibialogs/login" element={<Login />}></Route>
                  <Route path="/tibialogs/signup" element={<Signup />}></Route>
                  <Route
                    path="/tibialogs/forgot-password"
                    element={<ForgotPassword />}
                  ></Route>
                  {/* Catch-all route for 404 errors */}
                  <Route path="*" element={<Navigate to="/tibialogs/" />} />
                </Routes>
              </main>
              <Footer />
            </AuthProvider>
          </UserContextProvider>
        </Router>
      </div>
    </DarkModeProvider>
  );
}

export default App;
