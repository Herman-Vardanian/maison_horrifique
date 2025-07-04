import React, { useState, useRef } from 'react';
import './CreateSession.css';

export default function CreateSession() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [maxPlayers, setMaxPlayers] = useState(1);
  const [duration, setDuration] = useState(60);
  const [availability, setAvailability] = useState(true);
  const [image, setImage] = useState('');
  const messageRef = useRef<HTMLParagraphElement | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch(`${import.meta.env.VITE_API_URL}/sessions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, difficulty, maxPlayers, duration, availability, image }),
    });

    const data = await response.json();
    if (response.ok) {
      if (messageRef.current) {
        messageRef.current.textContent = data.message;
      }
      setTitle('');
      setDescription('');
      setDifficulty('');
      setMaxPlayers(1);
      setDuration(60);
      setAvailability(true);
      setImage('');
    } else {
      if (messageRef.current) {
        messageRef.current.textContent = 'Erreur lors de la création de la session.';
      }
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Créer une session</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Titre :</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description :</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="difficulty">Difficulté :</label>
          <select id="difficulty" value={difficulty} onChange={(e) => setDifficulty(e.target.value)} required>
            <option value="">-- Sélectionner --</option>
            <option value="facile">Facile</option>
            <option value="moyen">Moyen</option>
            <option value="difficile">Difficile</option>
          </select>
        </div>
        <div>
          <label htmlFor="maxPlayers">Nombre max de joueurs :</label>
          <input id="maxPlayers" type="number" value={maxPlayers} onChange={(e) => setMaxPlayers(Number(e.target.value))} min="1" required />
        </div>
        <div>
          <label htmlFor="duration">Durée (en minutes) :</label>
          <input id="duration" type="number" value={duration} onChange={(e) => setDuration(Number(e.target.value))} min="1" required />
        </div>
        <div>
          <label htmlFor="availability">Disponible :</label>
          <select
            id="availability"
            value={availability ? 'true' : 'false'}
            onChange={(e) => setAvailability(e.target.value === 'true')}
            required
          >
            <option value="">-- Sélectionner --</option>
            <option value="true">Oui</option>
            <option value="false">Non</option>
          </select>
        </div>
        <div>
          <label htmlFor="image">Lien de l'image :</label>
          <input id="image" type="text" value={image} onChange={(e) => setImage(e.target.value)} required />
        </div>
        <button type="submit">Créer</button>
      </form>
      <p id='message' ref={messageRef}></p>
    </div>
  );
}