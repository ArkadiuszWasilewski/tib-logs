import React from "react";

const ButtonPagination = ({ page, isActive, onPageChange }) => {
  const baseClasses =
    "flex items-center justify-center px-4 h-10 leading-tight border hover:bg-blue-100 hover:text-gray-700 dark:hover:bg-gray-600 dark:hover:text-white shadow-md";
  const activeClasses =
    "text-blue-600 border-gray-300 bg-blue-200 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-500 dark:text-white";
  const inactiveClasses =
    "text-gray-500 bg-white border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400";

  return (
    <li>
      <button
        onClick={() => onPageChange(page)}
        className={`${baseClasses} ${
          isActive ? activeClasses : inactiveClasses
        }`}
        aria-current={isActive ? "page" : undefined}
      >
        {page}
      </button>
    </li>
  );
};

export default ButtonPagination;
