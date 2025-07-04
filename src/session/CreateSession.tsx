

import React, { useState } from 'react';

export default function CreateSession() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/v1/sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description }),
    });

    const data = await response.json();
    if (response.ok) {
      setMessage(data.message);
      setTitle('');
      setDescription('');
    } else {
      setMessage('Erreur lors de la création de la session.');
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
        <button type="submit">Créer</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}