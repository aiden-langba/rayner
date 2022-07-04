import React, { createContext, useContext, useState } from "react";

const ctx = createContext({});
export const useAuth = () => useContext(ctx);

const UserContext = ({ children }) => {
  const activeUser = JSON.parse(window.localStorage.getItem("user"));
  const [user, setUser] = useState({
    isAuthenticated: activeUser?.isAuthenticated || false,
    role: activeUser?.role || "",
    user: activeUser?.user || ""
  });
  console.log("user", user);
  const updateUser = (newUser) => {
    setUser(newUser);
  };
  return <ctx.Provider value={{ user, updateUser }}>{children}</ctx.Provider>;
};

export default UserContext;
