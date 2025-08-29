import { FaInstagram, FaXTwitter, FaLinkedin } from "react-icons/fa6";
import { Link } from "react-router-dom"; // 👈 Importa Link
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <>
      <header className="navbar">
        <div className="logo">TGOFILMS</div>
        <nav className="nav">
          <ul>
            <li><Link to="/">Commercial</Link></li>
            <li><Link to="/">Music Video</Link></li>
            <li><Link to="/">Film & TV</Link></li>
            <li><Link to="/portafolio">Portafolio</Link></li>
            <li><Link to="/">About</Link></li>
          </ul>
        </nav>
      </header>

      {/* Redes sociales */}
      <div className="socials-fixed">
        <a href="#"><FaInstagram /></a>
        <a href="#"><FaXTwitter /></a>
        <a href="#"><FaLinkedin /></a>
      </div>
    </>
  );
};

export default Sidebar;
