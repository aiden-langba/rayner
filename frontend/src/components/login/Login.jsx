import React, { useState } from "react";
import axios from "axios";
import "./login.css";

const Login = () => {
  const [admin, setAdmin] = useState("");
  const [user, setUser] = useState({
    email: "",
    password: ""
  });
  const onClick = (e) => {
    e.preventDefault();
    if (admin)
      axios
        .post("http://localhost:4000/admin/login", user)
        .then((res) => {
          console.log("res hello", res);
          const user = {
            isAuthenticated: true,
            user: "Rayner",
            role: "admin"
          };
          window.localStorage.setItem("user", JSON.stringify(user));
          window.location = "/employees";
        })
        .catch((err) => {
          console.log("err", err);
        });
    else
      axios
        .post("http://localhost:4000/employee/login", user)
        .then((res) => {
          console.log("res hello", res);
          const activeUser = {
            isAuthenticated: true,
            user: res.data.employee,
            role: "employee"
          };
          window.localStorage.setItem("user", JSON.stringify(activeUser));
          window.location = "/";
        })
        .catch((err) => {
          console.log("err", err);
        });
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };
  return (
    <section className={`login ${admin}`}>
      <div className="login-body">
        <h1>Sign in</h1>
        <label>Email:</label>
        <input
          type="text"
          value={user.email}
          onChange={handleChange}
          name="email"
        />
        <label>Password:</label>
        <input
          type="password"
          value={user.password}
          onChange={handleChange}
          name="password"
        />
        <button onClick={onClick}>Login</button>
        {!admin ? (
          <p className="adminbtn" onClick={() => setAdmin("admin")}>
            Admin login
          </p>
        ) : (
          <p className="employee" onClick={() => setAdmin("")}>
            Employee login
          </p>
        )}
      </div>
    </section>
  );
};

export default Login;
