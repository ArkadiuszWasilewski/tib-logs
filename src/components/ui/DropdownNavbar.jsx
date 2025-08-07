import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import ButtonCustom from "./ButtonCustom";
import { Link } from "react-router-dom";
import ButtonNavigation from "./ButtonNavigation";

export default function DropdownNavbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { currentUser, logout } = useAuth();
  const [error, setError] = React.useState("");

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleLogout = async (e) => {
    setError("");
    e.preventDefault();

    try {
      await logout();
      navigate("/");
    } catch (err) {
      console.log("Error during logging out from header ", err);
      setError("Error during logging out from header");
    }
  };

  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <nav className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      {/* Dropdown menu */}
      <div ref={dropdownRef} className="relative">
        <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0">
          {/* Navigation Links */}
          <li>
            <ButtonNavigation>
              <Link to="/">Rankings</Link>
            </ButtonNavigation>
          </li>
          <li>
            <ButtonNavigation>
              <Link to="/newsession">New session</Link>
            </ButtonNavigation>
          </li>
          <li>
            <ButtonNavigation>
              <Link to="/about">About</Link>
            </ButtonNavigation>
          </li>
          {/* Dropdown Menu */}
          {currentUser ? (
            <li className="relative">
              <ButtonNavigation onClick={toggleDropdown}>
                Settings{" "}
                <svg
                  className="w-2.5 h-2.5 ms-2.5 inline"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </ButtonNavigation>
              {/* Dropdown Items */}
              <div
                className={`absolute left-0 z-10 mt-2 w-44 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-700 ${
                  isDropdownOpen ? "block" : "hidden"
                }`}
              >
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-400">
                  <li>
                    <Link to="/dashboard">
                      <button className="w-full block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        Dashboard
                      </button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/update-profile">
                      <button className="w-full block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        Change password
                      </button>
                    </Link>
                  </li>
                </ul>
                <div className="py-1">
                  <ButtonCustom onClick={handleLogout}>Log out</ButtonCustom>
                </div>
              </div>
            </li>
          ) : (
            ""
          )}
        </ul>
      </div>
    </nav>
  );
}
