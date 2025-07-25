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
  onDelete: (id: string) => void;
}

export const SessionCard: React.FC<SessionCardProps> = ({ session, onDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Supprimer cette session ?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/sessions/${session.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert("Session supprimée !");
        onDelete(session.id);
      } else {
        alert("Erreur lors de la suppression.");
      }
    } catch (err) {
      console.error(err);
      alert("Erreur de l'API");
    }
  };


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
        <button className="delete-button" onClick={handleDelete}>Supprimer la session</button>
        </div>
    );
    };