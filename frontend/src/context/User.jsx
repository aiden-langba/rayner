import React, { createContext, useContext, useState } from "react";

const ctx = createContext({});
export const useAuth = () => useContext(ctx);

const UserContext = ({ children }) => {
  const [user, setUser] = useState({
    isAuthenticated: true,
    role: "user",
    name: "Batista"
  });
  const updateUser = (newUser) => {
    setUser(newUser);
  };
  return <ctx.Provider value={{ user, updateUser }}>{children}</ctx.Provider>;
};

export default UserContext;
