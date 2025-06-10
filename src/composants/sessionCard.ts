

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
      <h3>{session.title}</h3>
      <p><strong>Difficulté :</strong> {session.difficulty}</p>
      <p><strong>Joueurs max :</strong> {session.maxPlayers}</p>
      <p><strong>Durée :</strong> {session.duration} min</p>
      <p>{session.description}</p>
      <p><em>Thème : {session.theme}</em></p>
      <p><em>{session.availability ? 'Disponible' : 'Complet'}</em></p>
    </div>
  );
}