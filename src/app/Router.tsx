// Router.tsx
import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "@/components/LoginForm/PrivateRoute";
import Spinner from "@/components/ui/Spinner";

const Login = lazy(() => import("@/components/LoginForm/Login"));
const Signup = lazy(() => import("@/components/LoginForm/Signup"));
const UpdateProfile = lazy(() => import("@/components/LoginForm/UpdateProfile"));
const Dashboard = lazy(() => import("@/components/LoginForm/Dashboard"));
const Rankings = lazy(() => import("@/components/Rankings"));
const AboutPage = lazy(() => import("@/components/AboutPage"));
const NewSession = lazy(() => import("@/components/NewSession"));
const ForgotPassword = lazy(() => import("@/components/LoginForm/ForgotPassword"));
const NotFound = lazy(() => import("@/app/routes/NotFound"));

import Header from "@/components/Header";
import Footer from "@/components/Footer";

const AppRoutes = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-600 text-black dark:text-white">
      <nav aria-label="Main navigation">
        <Header />
      </nav>
      <main className="flex-1 max-w-screen-xl mx-auto pt-16 sm:pt-24 lg:pt-32 bg-gray-100 dark:bg-gray-600">
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/update-profile" element={<PrivateRoute><UpdateProfile /></PrivateRoute>} />
            <Route path="/" element={<Rankings />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/newsession" element={<NewSession />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default AppRoutes;