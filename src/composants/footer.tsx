import React from 'react';
import { useNavigate } from 'react-router-dom';
import tiktokLogo from '../img/tiktok.png';
import instagramLogo from '../img/instagram.png';
import './footer.css';

const Footer: React.FC = () => {
    const navigate = useNavigate();

    return (
        <footer className="footer">
        <p className="footer-title">Suivez-nous sur nos Réseaux Sociaux :</p>
        <ul className="social-links">
            <li>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
                <img src={tiktokLogo} alt="TikTok" className="social-logo" />
            </a>
            </li>
            <li>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <img src={instagramLogo} alt="Instagram" className="social-logo" />
            </a>
            </li>
        </ul>

        <div className="footer-buttons">
            <button onClick={() => navigate('/sessions')}>Détails des sessions</button>
            <button onClick={() => navigate('/contact')}>Formulaire de contact</button>
            <button onClick={() => navigate('/MentionsLegales')}>Mentions légales</button>
        </div>

        <p className="footer-copy">
            © {new Date().getFullYear()} Maison horrifique Tous droits réservés.
        </p>
        </footer>
  );
};

export default Footer;
