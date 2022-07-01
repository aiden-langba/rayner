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

const App = () => {
  return (
    <BrowserRouter>
      <UserContext>
        <Routes>
          <Route element={<PrivateRoute role={["admin", "user"]} />}>
            <Route path="/" element={<Profile />} />
          </Route>
          {/* <Route element={<PrivateRoute user={user} role={["admin"]} />}>
          <Route path="/admin" element={<Profile />} />
        </Route> */}
          <Route element={<PrivateRoute role={["user"]} />}>
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
