import React from "react";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="logo">TGOFILMS</div>
      <nav className="nav">
        <ul>
          <li><a href="#">Commercial</a></li>
          <li><a href="#">Music Video</a></li>
          <li><a href="#">Film & TV</a></li>
          <li><a href="#">Work</a></li>
          <li><a href="#">About</a></li>
        </ul>
      </nav>
      <div className="socials">
        <a href="#">Instagram</a>
        <a href="#">X</a>
        <a href="#">LinkedIn</a>
      </div>
    </aside>
  );
};

export default Sidebar;
