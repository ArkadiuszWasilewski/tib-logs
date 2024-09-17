import React, { useContext, useState } from "react";

const UserContext = React.createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserContextProvider = ({ children }) => {
  const [userName, setUserName] = useState("Placeholder");
  const [userCreatedAt, setUserCreatedAt] = useState(
    new Date(8.64e15).toString()
  );

  const value = {
    userName,
    userCreatedAt,
  };

  return (
    <UserContext.Provider value={value}> {children} </UserContext.Provider>
  );
};
