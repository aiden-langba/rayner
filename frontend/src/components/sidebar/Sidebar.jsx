import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/User";
import "./sidebar.css";

const Sidebar = () => {
  const { pathname } = useLocation();
  const { user } = useAuth();
  console.log("pathname", pathname);
  return (
    <section className="sidebar">
      <ul>
        <Link to="/" className={`${pathname === "/" ? "active" : ""}`}>
          Profile
        </Link>
        {user.role === "user" && (
          <>
            <Link
              to="/attendance"
              className={`${pathname === "/attendance" ? "active" : ""}`}
            >
              Attendance
            </Link>
            <Link
              to="/attendance-log"
              className={`${pathname === "/attendance-log" ? "active" : ""}`}
            >
              Attendance summary
            </Link>
            <Link
              to="/leave-application"
              className={`${pathname === "/leave-application" ? "active" : ""}`}
            >
              Leave application
            </Link>
          </>
        )}
      </ul>
    </section>
  );
};

export default Sidebar;
