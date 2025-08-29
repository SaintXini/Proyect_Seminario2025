import { FaInstagram, FaXTwitter, FaLinkedin } from "react-icons/fa6";
import { Link } from "react-router-dom"; 
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <>
      <header className="navbar">
        <div className="logo">TGOFILMS</div>
        <nav className="nav">
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/portafolio">Videos</Link></li>
            <li><Link to="/foto">Fotos</Link></li>
            <li><Link to="/">Servicios</Link></li>
            <li><Link to="/">Film & TV</Link></li>
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
