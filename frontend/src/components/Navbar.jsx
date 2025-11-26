import { Link } from 'react-router-dom';
import { useState } from 'react';
import './Navbar.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          🌾 Mt-Kenya Agro-Loup
        </Link>
        
        <button className="nav-toggle" onClick={toggleMenu}>
          <span className="hamburger"></span>
          <span className="hamburger"></span>
          <span className="hamburger"></span>
        </button>

        <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={() => setIsOpen(false)}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/products" className="nav-link" onClick={() => setIsOpen(false)}>
              Products
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/farmer-dashboard" className="nav-link" onClick={() => setIsOpen(false)}>
              Farmer Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link" onClick={() => setIsOpen(false)}>
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-link" onClick={() => setIsOpen(false)}>
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
