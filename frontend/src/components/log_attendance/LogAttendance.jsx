import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDate } from "../../hooks/useDate";
import axios from "axios";
import dayjs from "dayjs";
import "./log.css";
import { useAuth } from "../../context/User";

const LogAttendance = () => {
  const { user } = useAuth();
  const { date, time } = useDate();
  const [btnState, setBtnState] = useState(false);
  const [offBtn, setOffBtn] = useState(false);
  const getAttendance = () => {
    axios
      .get(`http://localhost:4000/employee/${user.user.employeeid}/logs`)
      .then((res) => {
        console.log("ressajd", res);
        if (
          res.data[res.data.length - 1].checkin &&
          !res.data[res.data.length - 1].checkout &&
          dayjs(res.data[res.data.length - 1].date).format("DD/MM/YYYY") ===
            dayjs(Date.now()).format("DD/MM/YYYY")
        )
          setBtnState(true);
        if (
          res.data[res.data.length - 1].checkin &&
          res.data[res.data.length - 1].checkout &&
          dayjs(res.data[res.data.length - 1].date).format("DD/MM/YYYY") ===
            dayjs(Date.now()).format("DD/MM/YYYY")
        ) {
          setOffBtn(true);
          setBtnState(true);
        }
      });
  };
  useEffect(() => {
    getAttendance();
  }, []);

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
            disabled={btnState || offBtn}
            onClick={() => {
              if (!btnState) setBtnState(true);
              console.log("time", time, date);
              axios
                .post(
                  `http://localhost:4000/employee/${user.user.employeeid}/logs`,
                  {
                    checkin: time,
                    attendancedate: dayjs(Date.now()).format(),
                    employeeid: user.user.employeeid
                  }
                )
                .then((res) => console.log("res", res));
            }}
          >
            Sign in
          </button>
          <button
            className="shadow"
            disabled={!btnState || offBtn}
            onClick={() => {
              if (btnState) setBtnState(false);
              console.log("time", time, date);
              axios
                .put(
                  `http://localhost:4000/employee/${user.user.employeeid}/logs`,
                  {
                    checkout: time
                  }
                )
                .then((res) => getAttendance());
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
