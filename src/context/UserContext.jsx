import React, { useContext, useState, useEffect } from "react";

const UserContext = React.createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserContextProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  // retrieve user data from localStorage on initial load - persistance across reload
  useEffect(() => {
    const savedUserData = localStorage.getItem("userData");
    if (savedUserData) {
      setUserData(JSON.parse(savedUserData));
    }
  }, []);

  // update localStorage whenever userData changes
  useEffect(() => {
    if (userData) {
      localStorage.setItem("userData", JSON.stringify(userData));
    } else {
      localStorage.removeItem("userData"); // Clean up if no user data is available
    }
  }, [userData]);

  const value = {
    userData,
    setUserData,
  };

  return (
    <UserContext.Provider value={value}> {children} </UserContext.Provider>
  );
};
