import React from "react";
import "./leave.css";

const Leave = () => {
  return (
    <section className="leave ">
      <form action="" className="shadow">
        <h1>Leave application</h1>
        <label htmlFor="leave">Type of leave</label>
        <select name="leave" id="leave">
          <option value="1">Casual Leave</option>
          <option value="2">Earned Leave</option>
        </select>
        <label htmlFor="start">Start Date: </label>
        <input type="date" name="date" id="start" />
        <label htmlFor="end">End Date: </label>
        <input type="date" name="date" id="end" />
        <label htmlFor="end">Reason: </label>
        <textarea name="desc" id="desc" />
        <button type="submit">APPLY LEAVE</button>
      </form>
    </section>
  );
};

export default Leave;
