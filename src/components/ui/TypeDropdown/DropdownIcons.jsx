import React, { useState, useEffect, useRef } from "react";
import icons from "../../../assets/types/icons";
import ButtonClose from "../ButtonClose";
import { usePokemonContext } from "../../../context/PokemonContext";

const DropdownIcons = ({ dropdownName }) => {
  const { selectedType, setSelectedType } = usePokemonContext();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeIconKey, setActiveIconKey] = useState(selectedType);
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Keep the internal state in sync with the context
    setActiveIconKey(selectedType);
  }, [selectedType, activeIconKey]);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

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

  const handleButtonClick = (key) => {
    setActiveIconKey(key);
    setSelectedType(key);
  };
  const handleClear = () => {
    setActiveIconKey(null);
    setSelectedType(null);
  };

  return (
    <div ref={dropdownRef} className="flex justify-center mt-3">
      <button
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        onClick={toggleDropdown}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        {activeIconKey ? (
          <img
            src={icons[activeIconKey]}
            className="min-w-6 min-h-6 mr-5"
            alt="active-type"
          />
        ) : (
          ""
        )}
        Types
        <svg
          className="min-w-2.5 min-h-2.5 ms-3"
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
      </button>

      <div
        className={`absolute z-10 mt-12 p-2 min-w-[300px] rounded-md shadow-lg bg-white/50 ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-700/70 ${
          isDropdownOpen ? "block" : "hidden"
        }`}
      >
        <ul className="py-3 px-3 text-sm text-gray-700 dark:text-gray-400 grid grid-cols-6 sm:grid-cols-6 lg:grid-cols-4 gap-3">
          {Object.entries(icons).map(([key, src]) => (
            <li key={key} className="flex items-center justify-center">
              <button
                onClick={() => handleButtonClick(key)}
                className="flex flex-col items-center dark:hover:bg-gray-600 dark:hover:text-white hover:saturate-100"
              >
                <img
                  className={
                    activeIconKey === key
                      ? "min-w-[60px] min-h-[60px] m-[2px] "
                      : "min-w-[50px] min-h-[50px] m-[8px] saturate-0 hover:saturate-100"
                  }
                  src={src}
                  alt={key}
                />
                <span className="mt-1 text-xs">{key}</span>
              </button>
            </li>
          ))}
          <li className="flex items-center justify-center">
            <ButtonClose onClick={handleClear}></ButtonClose>
            <span className="mt-1 text-xs">{"clear"}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DropdownIcons;
