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
import Rankings from "./components/Rankings";
import AboutPage from "./components/AboutPage";
import NewSession from "./components/NewSession";

function App() {
  return (
    <DarkModeProvider>
      <div className="flex flex-col text-white dark:text-white min-h-screen bg-gray-100 dark:bg-gray-600">
        <Router>
          <UserContextProvider>
            <AuthProvider>
              <Header />
              <main className="flex flex-col  dark:bg-gray-600 text-white dark:text-white min-h-screen max-w-screen-xl mx-auto pt-32">
                <Routes>
                  <Route
                    path="/dashboard"
                    element={
                      <PrivateRoute>
                        <Dashboard />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/update-profile"
                    element={
                      <PrivateRoute>
                        <UpdateProfile />
                      </PrivateRoute>
                    }
                  />
                  <Route path="/" element={<Rankings />} />
                  <Route path="/login" element={<Login />}></Route>
                  <Route path="/signup" element={<Signup />}></Route>
                  <Route
                    path="/forgot-password"
                    element={<ForgotPassword />}
                  ></Route>
                  {/* Catch-all route for 404 errors */}
                  <Route path="*" element={<Navigate to="/" />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/newsession" element={<NewSession />} />
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
