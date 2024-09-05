import React, { useContext, createContext } from "react";
import { useDarkMode } from "../hooks/useDarkMode";

const DarkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {
  const [darkMode, toggleDarkMode] = useDarkMode();

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkModeContext = () => useContext(DarkModeContext);
