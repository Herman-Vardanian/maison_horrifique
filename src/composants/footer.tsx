import React from 'react';
import tiktokLogo from '../img/tiktok.png'; // Import du logo TikTok
import instagramLogo from '../img/instagram.png'; // Import du logo Instagram

interface FooterProps {
    setPage: (page: 'sessions' | 'contact' | 'mentions') => void;
}

const Footer: React.FC<FooterProps> = ({ setPage }) => {
    return (
        <footer style={{ backgroundColor: 'black', color: 'white', padding: '1rem' }}>
            <p>Suivez-nous sur nos Réseaux Sociaux :</p>
            <ul style={{ display: 'flex', justifyContent: 'center', gap: '1rem', listStyle: 'none', padding: 0 }}>
                <li>
                    <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
                        <img src={tiktokLogo} alt="TikTok" style={{ width: '40px', height: '40px' }} />
                    </a>
                </li>
                <li>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                        <img src={instagramLogo} alt="Instagram" style={{ width: '40px', height: '40px' }} />
                    </a>
                </li>
            </ul>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1rem' }}>
                <button onClick={() => setPage('sessions')}>Détails des sessions</button>
                <button onClick={() => setPage('contact')}>Formulaire de contact</button>
                <button onClick={() => setPage('mentions')}>Mentions légales</button>
            </div>

            <p style={{ textAlign: 'center', marginTop: '1rem' }}>
                © {new Date().getFullYear()} Maison horrifique Tous droits réservés.
            </p>
        </footer>
    );
};

export default Footer;