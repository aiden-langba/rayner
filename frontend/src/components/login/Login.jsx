import React from "react";
import "./login.css";

const Login = () => {
  return (
    <section className="login">
      <div className="login-body">
        <h1>Sign in</h1>
        <label>Email:</label>
        <input type="text" />
        <label>Password:</label>
        <input type="password" />
        <button>Login</button>
      </div>
    </section>
  );
};

export default Login;
