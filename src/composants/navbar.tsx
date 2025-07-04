import React from 'react';
import './navbar.css';
import logo from '../img/logo_2.png';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar" style={{ display: 'flex', alignItems: 'center', padding: '1rem' }}>
      <img 
        src={logo}
        alt="Logo" 
        className="navbar-logo" 
        onClick={() => navigate('/')} 
        style={{ cursor: 'pointer', maxWidth: '100px', maxHeight: '100px' }} 
      />
      <div style={{ marginLeft: 'auto', display: 'flex', gap: '1rem' }}>
        <button onClick={() => navigate('/reservation')}>Réservation</button>
        <button onClick={() => navigate('/sessions')}>Sessions</button>
        <button onClick={() => navigate('/contact')}>Contact</button>
      </div>
    </nav>
  );
};

export default Navbar;