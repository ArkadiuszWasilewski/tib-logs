import React, { useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useUserContext } from "../../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../ui/Alerts/Alert";
import LinkSpan from "../ui/LinkSpan";
import LabelDashboard from "../ui/LabelDashboard";
import ButtonCustom from "../ui/ButtonCustom";

export default function UpdateProfile() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const { userData } = useUserContext();
  const navigate = useNavigate();

  console.log(currentUser);

  const handleLogout = async (e) => {
    setError("");
    e.preventDefault();
    try {
      await logout();
      navigate("/");
    } catch (err) {
      console.log("Error during logging out:  ", err);
      setError("Error during logging out");
    }
  };
  return (
    <section className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Profile
          </h1>
          {error && <Alert>{error}</Alert>}

          <div>
            <LabelDashboard>Email: {currentUser?.email}</LabelDashboard>
            {currentUser ? (
              <LabelDashboard>
                Last login: {currentUser.metadata.lastSignInTime}
              </LabelDashboard>
            ) : (
              ""
            )}
            <LabelDashboard>
              Created at: {currentUser?.metadata.creationTime}
            </LabelDashboard>
          </div>
          <Link to="/update-profile">
            <LinkSpan>Update your profile</LinkSpan>
          </Link>
          <ButtonCustom onClick={handleLogout}>Logout</ButtonCustom>
        </div>
      </div>
    </section>
  );
}
