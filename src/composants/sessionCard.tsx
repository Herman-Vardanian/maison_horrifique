import React from 'react';

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
        <p><strong>Difficulté :</strong> {session.difficulty}</p>
        <p><strong>Joueurs max :</strong> {session.maxPlayers}</p>
        <p><strong>Durée :</strong> {session.duration} minutes</p>
        <p><strong>Description :</strong> {session.description}</p>
        <p><strong>Thème :</strong> {session.theme}</p>
        <p><strong>Disponibilité :</strong> {session.availability ? 'Disponible' : 'Indisponible'}</p>
        </div>
    );
    };