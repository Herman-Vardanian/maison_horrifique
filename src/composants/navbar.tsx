import React from 'react';
import './navbar.css';
import logo from '../img/logo_2.png';

type Page = 'home' | 'reservation' | 'sessions' | 'contact';

interface NavbarProps {
  setPage: (page: Page) => void;
}

const Navbar: React.FC<NavbarProps> = ({ setPage }) => {
  return (
    <nav className="navbar">
      <img 
        src={logo}
        alt="Logo" 
        className="navbar-logo" 
        onClick={() => setPage('home')} 
        style={{ cursor: 'pointer', maxWidth: '100px', maxHeight: '100px' }} 
      />
      <button onClick={() => setPage('reservation')}>Réservation</button>
      <button onClick={() => setPage('sessions')}>Sessions</button>
      <button onClick={() => setPage('contact')}>Contact</button>
    </nav>
  );
};

export default Navbar;