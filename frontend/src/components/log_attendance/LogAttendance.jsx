import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDate } from "../../hooks/useDate";
import "./log.css";

const LogAttendance = () => {
  const { date, time } = useDate();
  const [btnState, setBtnState] = useState(false);
  return (
    <div className="log-attendance">
      <div className="bg-attendance shadow">
        <h3>Log attendance </h3>
        <p className="date-time">
          <span>{date},</span>&nbsp;
          <span>{time}</span>
        </p>
        <div className="log-btns">
          <button
            className="shadow"
            disabled={btnState}
            onClick={() => {
              if (!btnState) setBtnState(true);
            }}
          >
            Sign in
          </button>
          <button
            className="shadow"
            disabled={!btnState}
            onClick={() => {
              if (btnState) setBtnState(false);
            }}
          >
            Sign out
          </button>
        </div>
        <Link to="/attendance-log">Check attendance</Link>
      </div>
    </div>
  );
};

export default LogAttendance;
