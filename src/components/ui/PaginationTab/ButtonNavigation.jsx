import React from "react";

const PaginationNavigation = ({ direction, onPageChange, isDisabled }) => {
  const baseClasses =
    "flex items-center justify-center px-4 h-10 leading-tight text-gray-500 border border-gray-300 bg-white hover:bg-blue-200 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white shadow-md";

  const additionalClasses =
    direction === "Previous" ? "rounded-s-lg" : "rounded-e-lg";

  return (
    <li>
      <button
        onClick={() => onPageChange(direction)}
        disabled={isDisabled}
        className={`${baseClasses} ${additionalClasses} ${
          isDisabled ? "cursor-not-allowed opacity-50" : ""
        }`}
        aria-label={direction}
      >
        {direction}
      </button>
    </li>
  );
};

export default PaginationNavigation;
