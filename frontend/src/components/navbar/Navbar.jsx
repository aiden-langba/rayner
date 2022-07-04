import React from "react";
import "./Navbar.css";
import logo from "../../assets/sb_logo_s2.png";
import logosmall from "../../assets/logo_light.png";
import { useAuth } from "../../context/User";
const Navbar = () => {
  const { user } = useAuth();
  const logout = () => {
    window.localStorage.removeItem("user");
    window.location = "/login";
  };
  return (
    <nav className="shadow">
      <img id="logo" src={logosmall} alt="logo_small"></img>
      <img src={logo} alt="logo_full" />
      <div className="user">
        <div>Welcome {user?.user.firstname || "Guest"}!</div>
        <button onClick={logout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
