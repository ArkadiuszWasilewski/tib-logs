import React from "react";

const Button = ({ onClick, children, custom }) => {
  return (
    <button
      onClick={onClick}
      className={`h-[45px] w-full rounded-[5px] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700}
        ${custom}`}
    >
      {children}
    </button>
  );
};

export default Button;
