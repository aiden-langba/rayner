import React, { useState } from "react";
import axios from "axios";
import "./add.css";
const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    gender: "",
    dob: "",
    phoneno: "",
    address: ""
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setEmployee({
      ...employee,
      [name]: value
    });
  };

  const onClick = (e) => {
    e.preventDefault();
    const {
      address,
      dob,
      email,
      firstname,
      gender,
      lastname,
      password,
      phoneno
    } = employee;
    if (
      !address ||
      !dob ||
      !email ||
      !firstname ||
      !gender ||
      !lastname ||
      !password ||
      !phoneno
    )
      return alert("Enter all fields!");
    axios
      .post("http://localhost:4000/admin/employees", employee)
      .then((res) => {
        alert(res.data);
      });
  };
  return (
    <section className="leave ">
      <form action="" className="shadow">
        <h1>Add employee</h1>
        <div className="form-body">
          <label htmlFor="fname">First name</label>
          <input
            type="text"
            name="firstname"
            id="fname"
            value={employee.firstname}
            onChange={handleChange}
          />
          <label htmlFor="lname">Last name </label>
          <input
            type="text"
            name="lastname"
            id="lname"
            value={employee.lastname}
            onChange={handleChange}
          />
          <label htmlFor="email">Email </label>
          <input
            type="email"
            name="email"
            id="email"
            value={employee.email}
            onChange={handleChange}
          />
          <label htmlFor="pwd">Password </label>
          <input
            type="password"
            name="password"
            id="pwd"
            value={employee.password}
            onChange={handleChange}
          />
          <label htmlFor="gender">Gender </label>
          <input
            type="text"
            name="gender"
            id="gender"
            value={employee.gender}
            onChange={handleChange}
          />
          <label htmlFor="dob">Date of birth </label>
          <input
            type="date"
            name="dob"
            id="dob"
            value={employee.dob}
            onChange={handleChange}
          />
          <label htmlFor="pno">Phone number </label>
          <input
            type="text"
            name="phoneno"
            id="pno"
            value={employee.phoneno}
            onChange={handleChange}
          />
          <label htmlFor="addr">Address </label>
          <textarea
            name="address"
            id="addr"
            value={employee.address}
            onChange={handleChange}
          />
        </div>
        <button type="submit" onClick={onClick}>
          + ADD
        </button>
      </form>
    </section>
  );
};

export default AddEmployee;
