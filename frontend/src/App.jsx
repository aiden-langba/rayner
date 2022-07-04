import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import "./App.css";
import LogAttendance from "./components/log_attendance/LogAttendance";
import Profile from "./components/profile/Profile";
import PrivateRoute from "./components/private/PrivateRoute";
import Login from "./components/login/Login";
import Summary from "./components/summary/Summary";
import Leave from "./components/leave/Leave";
import UserContext from "./context/User";
import NotFound from "./components/404/404";
import AddEmployee from "./components/addEmployees/AddEmployee";
import Employees from "./components/employees/Employees";
import ApproveLeave from "./components/approveLeave/ApproveLeave";

const App = () => {
  return (
    <BrowserRouter>
      <UserContext>
        <Routes>
          <Route element={<PrivateRoute role={["admin", "employee"]} />}>
            <Route path="/employees" element={<Employees />} />
            <Route path="/add-employees" element={<AddEmployee />} />
            <Route path="/approve-leave" element={<ApproveLeave />} />
          </Route>
          {/* <Route element={<PrivateRoute user={user} role={["admin"]} />}>
          <Route path="/admin" element={<Profile />} />
        </Route> */}
          <Route element={<PrivateRoute role={["employee"]} />}>
            <Route path="/" element={<Profile />} />
            <Route path="attendance" element={<LogAttendance />} />
            <Route path="attendance-log" element={<Summary />} />
            <Route path="leave-application" element={<Leave />} />
          </Route>
          <Route path="*" element={<NotFound />} />

          <Route path="/login" element={<Login />} />
        </Routes>
      </UserContext>
    </BrowserRouter>
  );
};

export default App;
