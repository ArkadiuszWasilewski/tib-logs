import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ButtonCustom from "./ui/ButtonCustom";
import DropdownNavbar from "./ui/DropdownNavbar";
import ToggleDarkMode from "./ui/ToggleDarkMode";
const Header = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = React.useState("");
  //const { setUserData } = useUserContext();

  const handleLogout = async (e) => {
    setError("");
    e.preventDefault();

    try {
      await logout();
      navigate("/tibialogs/");
    } catch (err) {
      console.log("Error during logging out from header ", err);
      setError("Error during logging out from header");
    }
  };

  return (
    <nav className="bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/tibialogs/">TIBIA LOGS</Link>
        <DropdownNavbar />

        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse gap-x-3">
          <ToggleDarkMode />
          {currentUser ? (
            <Link to="/tibialogs/login">
              <ButtonCustom onClick={handleLogout}>Logout</ButtonCustom>
            </Link>
          ) : (
            <Link to="/tibialogs/login">
              <ButtonCustom>Sign In</ButtonCustom>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
