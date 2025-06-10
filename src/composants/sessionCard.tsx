import React from 'react';
import './sessionCard.css';

const getFlameCount = (difficulty: string): number => {
  switch (difficulty.toLowerCase()) {
    case 'facile':
    case 'easy':
      return 1;
    case 'moyen':
    case 'medium':
      return 2;
    case 'difficile':
    case 'hard':
      return 3;
    default:
      return 0;
  }
};

export type Session = {
  id: string;
  title: string;
  difficulty: string;
  maxPlayers: number;
  duration: number;
  description: string;
  theme: string;
  availability: boolean;
};

interface SessionCardProps {
  session: Session;
}

export const SessionCard: React.FC<SessionCardProps> = ({ session }) => {
    return (
        <div className="session-card">
        <h2>{session.title}</h2>
        <p>
          <strong>Difficulté :</strong>
          {Array.from({ length: getFlameCount(session.difficulty) }).map((_, idx) => (
            <span key={idx} className="flame">🔥</span>
          ))}
        </p>
        <p><strong>Joueurs max :</strong> {session.maxPlayers}</p>
        <p><strong>Durée :</strong> {session.duration} minutes</p>
        <p><strong>Description :</strong> {session.description}</p>
        <p><strong>Thème :</strong> {session.theme}</p>
        <p><strong>Disponibilité :</strong> {session.availability ? 'Disponible' : 'Indisponible'}</p>
        </div>
    );
    };