import React from "react";

export default function Alert({ children }) {
  return (
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-3"
      role="alert"
    >
      <strong className="font-bold">Error! </strong>
      <span className="block sm:inline">{children}</span>
      <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
        <title>Close</title>
      </span>
    </div>
  );
}
