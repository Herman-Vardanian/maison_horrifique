import { useEffect, useState } from 'react';

type Session = {
  id: string;
  title: string;
  availability: boolean;
};

function ReservationForm() {
  const [name, setName] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [date, setDate] = useState('');
  const [players, setPlayers] = useState<number | undefined>();
  const [sessions, setSessions] = useState<Session[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/sessions`)
      .then(res => res.json())
      .then(data => setSessions(data));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, sessionId, date, players});
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Formulaire de Réservation</h2>

      <input
        type="text"
        placeholder="Nom"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />

      <select
        value={sessionId}
        onChange={e => setSessionId(e.target.value)}
        required
      >
        <option value="">Choisir une session</option>
        {sessions
          .filter(session => session.availability)
          .map(session => (
            <option key={session.id} value={session.id}>
              {session.title}
            </option>
          ))}
      </select>

      <input
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
        required
      />

      <input
        type="number"
        placeholder="nombre de joueur"
        min={2}
        max={8}
        value={players}
        onChange={e => setPlayers(Number(e.target.value))}
        required
      />

      <button type="submit">Réserver</button>
    </form>
  );
}

export default ReservationForm;
