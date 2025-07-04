type Session = {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  maxPlayers: number;
  duration: number;
  theme: string;
  availability: boolean;
  image: string;
};

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditSession.css'; 

export default function EditSession() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [maxPlayers, setMaxPlayers] = useState(1);
  const [duration, setDuration] = useState(60);
  const [theme, setTheme] = useState('');
  const [availability, setAvailability] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    const fetchSession = async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/sessions/${id}`);
      const data = await response.json();
      setSession(data);
      setTitle(data.title);
      setDescription(data.description);
      setDifficulty(data.difficulty.toLowerCase());
      setMaxPlayers(data.maxPlayers);
      setDuration(data.duration);
      setTheme(data.theme);
      setAvailability(data.availability ? 'true' : 'false');
      setImage(data.image);
    };

    fetchSession();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    alert('Session modifiée (simulation)');
  };

  if (!session) return <p>Chargement...</p>;

  return (
    <div id="edit-session-page">
      <button type="button" onClick={() => navigate(-1)} style={{ marginBottom: '1rem' }}>
        ← Retour
      </button>
      <h1 id='titre'>Modifier la session</h1>
      <form id="edit-session-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Titre :</label>
          <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description :</label>
          <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="difficulty">Difficulté :</label>
          <select id="difficulty" value={difficulty} onChange={(e) => setDifficulty(e.target.value)} required>
            <option value="">-- Sélectionner --</option>
            <option value="facile">Facile</option>
            <option value="moyen">Moyen</option>
            <option value="difficile">Difficile</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="maxPlayers">Nombre max de joueurs :</label>
          <input id="maxPlayers" type="number" value={maxPlayers} onChange={(e) => setMaxPlayers(Number(e.target.value))} required />
        </div>
        <div className="form-group">
          <label htmlFor="duration">Durée (en minutes) :</label>
          <input id="duration" type="number" value={duration} onChange={(e) => setDuration(Number(e.target.value))} required />
        </div>
        <div className="form-group">
          <label htmlFor="theme">Thème :</label>
          <input id="theme" type="text" value={theme} onChange={(e) => setTheme(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="availability">Disponible :</label>
          <select id="availability" value={availability} onChange={(e) => setAvailability(e.target.value)} required>
            <option value="">-- Sélectionner --</option>
            <option value="true">Oui</option>
            <option value="false">Non</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="image">Image (URL) :</label>
          <input id="image" type="text" value={image} onChange={(e) => setImage(e.target.value)} required />
        </div>
        <button type="submit">Enregistrer</button>
      </form>
    </div>
  );
}