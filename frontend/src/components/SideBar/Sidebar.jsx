import React from "react";
import { FaInstagram, FaXTwitter, FaLinkedin } from "react-icons/fa6";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <>
      <header className="navbar">
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
      </header>

      {/* Redes sociales separadas */}
      <div className="socials-fixed">
        <a href="#"><FaInstagram /></a>
        <a href="#"><FaXTwitter /></a>
        <a href="#"><FaLinkedin /></a>
      </div>
    </>
  );
};

export default Sidebar;
