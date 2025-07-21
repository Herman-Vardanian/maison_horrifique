import React from 'react';
import './navbar.css';
import logo from '../img/logo_2.png';
import { useNavigate } from 'react-router-dom';

interface User {
  username: string;
  email?: string;
}

interface NavbarProps {
  user: User | null;
  onLogout?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const isAdmin = user?.username === 'admin';

  return (
    <nav className="navbar">
      <img
        src={logo}
        alt="Logo" 
        className="navbar-logo" 
        onClick={() => navigate('/')} 
        style={{ cursor: 'pointer', maxWidth: '100px', maxHeight: '100px' }} 
      />

      <div className="navbar-links">
        {user ? (
          <>
            <button onClick={() => navigate('/reservation')}>Réservation</button>
            <button onClick={() => navigate('/sessions')}>Sessions</button>
            <button onClick={() => navigate('/contact')}>Contact</button>
            {isAdmin && (
              <button onClick={() => navigate('/employees')}>
                Employés
              </button>
            )}
            <button onClick={onLogout}>
              Se déconnecter
            </button>
          </>
        ) : (
          <>
            <button onClick={() => navigate('/login')}>Connexion</button>
            <button onClick={() => navigate('/register')}>Inscription</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
