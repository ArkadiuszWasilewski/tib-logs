import React, { useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../ui/Alert";
import LinkSpan from "../ui/LinkSpan";
import LabelDashboard from "../ui/LabelDashboard";
import Button from "../ui/Button";

export default function UpdateProfile() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    setError("");
    e.preventDefault();

    try {
      await logout();
      navigate("/pokedex-tailwind/");
    } catch (err) {
      console.log("Error during logging out:  ", err);
      setError("Error during logging out");
    }
  };
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Profile
            </h1>
            {error && <Alert>{error}</Alert>}

            <div>
              <LabelDashboard>Email: {currentUser.email}</LabelDashboard>
              <LabelDashboard>Name: </LabelDashboard>
            </div>
            <Link to="/pokedex-tailwind/update-profile">
              <LinkSpan>Update your profile</LinkSpan>
            </Link>
            <Button onClick={handleLogout}>Logout</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
