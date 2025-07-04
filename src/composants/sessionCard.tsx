import React from 'react';
import './sessionCard.css';
import { useNavigate } from 'react-router-dom';

const getFlameCount = (difficulty: string): number => {
  const difficultyMap: Record<string, number> = {
    facile: 1,
    moyen: 2,
    difficile: 3,
  };

  return difficultyMap[difficulty.toLowerCase()] || 0;
};

export type Session = {
  id: string;
  title: string;
  difficulty: string;
  maxPlayers: number;
  duration: number;
  description: string;
  image: string;
  availability: boolean;
};

interface SessionCardProps {
  session: Session;
}

export const SessionCard: React.FC<SessionCardProps> = ({ session }) => {
    const navigate = useNavigate();

    return (
        <div className="session-card">
        <img
          src={session.image}
          alt={session.title}
          className="session-image"
        />
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
        <p><strong>Disponibilité :</strong> {session.availability ? 'Disponible' : 'Indisponible'}</p>
        <button onClick={() => navigate(`/EditSession/${session.id}`)}>
          Modifier la session
        </button>
        </div>
    );
    };