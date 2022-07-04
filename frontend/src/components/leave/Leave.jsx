import axios from "axios";
import React, { useState } from "react";
import { useAuth } from "../../context/User";
import "./leave.css";

const Leave = () => {
  const { user } = useAuth();
  const [leave, setLeave] = useState({
    leavetype: "Casual leave",
    startdate: "",
    enddate: "",
    reason: "",
    employeeid: user.user.employeeid
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeave({
      ...leave,
      [name]: value
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!leave.enddate || !leave.startdate) return;
    axios.post("http://localhost:4000/employee/leave", leave);
  };
  return (
    <section className="leave ">
      <form action="" className="shadow">
        <h1>Leave application</h1>
        <label htmlFor="leave">Type of leave</label>
        <select
          name="leavetype"
          id="leave"
          value={leave.leavetype}
          onChange={handleChange}
        >
          <option value="Casual leave">Casual Leave</option>
          <option value="Earned leave">Earned Leave</option>
        </select>
        <label htmlFor="start">Start Date: </label>
        <input
          type="date"
          name="startdate"
          id="start"
          value={leave.startdate}
          onChange={handleChange}
          required
        />
        <label htmlFor="end">End Date: </label>
        <input
          type="date"
          name="enddate"
          id="end"
          value={leave.enddate}
          onChange={handleChange}
          required
        />
        <label htmlFor="end">Reason: </label>
        <textarea
          name="reason"
          id="desc"
          value={leave.reason}
          onChange={handleChange}
        />
        <button type="submit" onClick={handleSubmit}>
          APPLY LEAVE
        </button>
      </form>
    </section>
  );
};

export default Leave;
