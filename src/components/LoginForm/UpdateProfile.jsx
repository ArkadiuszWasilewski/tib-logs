import React, { useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../ui/Alerts/Alert";
import LinkSpan from "../ui/LinkSpan";
import LabelDashboard from "../ui/LabelDashboard";
import AlertSuccess from "../ui/Alerts/AlertSuccess";

export default function UpdateProfile() {
  const newPasswordConfirmRef = useRef();
  const newPasswordRef = useRef();
  const { currentUser, handleUpdatePassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    if (newPasswordRef.current.value !== newPasswordConfirmRef.current.value) {
      setError("New password do not match");
      setLoading(false);
      return;
    }

    const promises = [];
    if (newPasswordRef.current.value) {
      promises.push(handleUpdatePassword(newPasswordRef.current.value));
    }

    try {
      await Promise.all(promises);
      navigate("/update-profile");
      setMessage("You updated your password successfully");
    } catch {
      setError("Failed to update account");
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Update your profile
          </h1>
          {error && <Alert>{error}</Alert>}
          {message && <AlertSuccess>{message}</AlertSuccess>}
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <div>
              <LabelDashboard>Email: {currentUser.email} </LabelDashboard>
            </div>
            <div>
              <label
                htmlFor="newPassword"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                id="newPassword"
                ref={newPasswordRef}
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="newPasswordConfirm"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                New password confirm
              </label>
              <input
                type="password"
                name="newPasswordConfirm"
                id="newPasswordConfirm"
                ref={newPasswordConfirmRef}
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Update
            </button>
            <Link to="/dashboard">
              <LinkSpan>Cancel</LinkSpan> updating your profile
            </Link>
          </form>
        </div>
      </div>
    </section>
  );
}
