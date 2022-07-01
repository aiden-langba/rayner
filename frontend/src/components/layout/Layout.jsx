import React from "react";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import "./layout.css";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Navbar />
      <main className="page">
        <Sidebar />
        <section className="body">{children}</section>
      </main>
    </div>
  );
};

export default Layout;
