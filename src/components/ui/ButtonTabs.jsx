import React from "react";

const ButtonTabs = ({ label, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`inline-block p-4 ${
        isActive
          ? "text-blue-600 border-b-2 border-blue-600 dark:text-blue-400"
          : "border-transparent hover:text-gray-200 hover:border-gray-300 dark:hover:text-gray-400"
      } rounded-t-lg font-bold`}
    >
      {label}
    </button>
  );
};

export default ButtonTabs;
