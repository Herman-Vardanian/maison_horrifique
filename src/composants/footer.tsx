import React from 'react';
import tiktokLogo from '../img/tiktok.png';
import instagramLogo from '../img/instagram.png';
import './footer.css';

interface FooterProps {
    setPage: (page: 'sessions' | 'contact' | 'mentions') => void;
}

const Footer: React.FC<FooterProps> = ({ setPage }) => {
    return (
        <footer>
            <p>Suivez-nous sur nos Réseaux Sociaux :</p>
            <ul className="social-icons">
                <li>
                    <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
                        <img src={tiktokLogo} alt="TikTok" />
                    </a>
                </li>
                <li>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                        <img src={instagramLogo} alt="Instagram" />
                    </a>
                </li>
            </ul>

            <div className="footer-nav">
                <button onClick={() => setPage('sessions')}>Détails des sessions</button>
                <button onClick={() => setPage('contact')}>Formulaire de contact</button>
                <button onClick={() => setPage('mentions')}>Mentions légales</button>
            </div>

            <p>© {new Date().getFullYear()} Maison horrifique. Tous droits réservés.</p>
        </footer>
    );
};

export default Footer;
