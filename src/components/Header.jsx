import React from "react";
import PokemonLogo from "../assets/pokemon_logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "./ui/Button";
import DropdownNavbar from "./ui/DropdownNavbar";

const Header = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = React.useState("");

  const handleLogout = async (e) => {
    setError("");
    e.preventDefault();

    try {
      await logout();
      navigate("/pokedex-tailwind/");
    } catch (err) {
      console.log("Error during logging out from header ", err);
      setError("Error during logging out from header");
    }
  };

  return (
    <nav className="bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/pokedex-tailwind/">
          <img src={PokemonLogo} className="h-10" alt="Pokemon Logo" />
        </Link>
        <DropdownNavbar />
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {currentUser ? (
            <Link to="/pokedex-tailwind/login">
              <Button onClick={handleLogout}>Logout</Button>
            </Link>
          ) : (
            <Link to="/pokedex-tailwind/login">
              <Button>Sign In</Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
