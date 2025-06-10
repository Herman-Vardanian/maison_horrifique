import React from 'react';

interface FooterProps {
    setPage: (page: 'sessions' | 'contact' | 'mentions') => void;
}

const Footer: React.FC<FooterProps> = ({ setPage }) => {
    return (
        <footer style={{ backgroundColor: 'black', color: 'white', padding: '1rem' }}>
            <p>Suivez-nous sur nos Réseaux Sociaux :</p>
            <ul>
                <li><a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" style={{ color: 'white' }}>Tiktok</a></li>
                <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: 'white' }}>Instagram</a></li>
            </ul>

            <p><button onClick={() => setPage('sessions')}>Détails des sessions</button></p>
            <p><button onClick={() => setPage('contact')}>Formulaire de contact</button></p>
            <p><button onClick={() => setPage('mentions')}>Mentions légales</button></p>
        </footer>
    );
};

export default Footer;