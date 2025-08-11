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

  const value = {
    userData,
    setUserData,
  };

  return (
    <UserContext.Provider value={value}> {children} </UserContext.Provider>
  );
};
