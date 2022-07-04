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
        {user.role === "admin" && (
          <>
            <Link
              to="/employees"
              className={`${pathname === "/employees" ? "active" : ""}`}
            >
              Employees
            </Link>
            <Link
              to="/add-employees"
              className={`${pathname === "/add-employees" ? "active" : ""}`}
            >
              Add Employees
            </Link>
            <Link
              to="/approve-leave"
              className={`${pathname === "/approve-leave" ? "active" : ""}`}
            >
              Approve Leave
            </Link>
          </>
        )}
        {user.role === "employee" && (
          <>
            <Link to="/" className={`${pathname === "/" ? "active" : ""}`}>
              Profile
            </Link>
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
