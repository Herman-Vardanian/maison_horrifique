import { useEffect, useState } from 'react';

type Session = {
  id: string;
  title: string;
  availability: boolean;
  maxPlayers: number;
  duration: number
};

function ReservationForm() {
  const [name, setName] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [players, setPlayers] = useState<number | undefined>();
  const [sessions, setSessions] = useState<Session[]>([]);

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/sessions`)
      .then(res => res.json())
      .then(data => setSessions(data));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, sessionId, date, time, players});
  };
  const selectedSession = sessions.find(session => session.id === sessionId);
  const maxPlayersAllowed = selectedSession?.maxPlayers ?? 8;
  const duration = selectedSession?.duration 

  return (
    <form onSubmit={handleSubmit}>
      <h2>Formulaire de Réservation</h2>
      <label htmlFor="name">Nom</label>
      <input
        type="text"
        placeholder="Nom"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <label htmlFor="session">Session</label>
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
      <label htmlFor="date">Date</label>
      <input
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
        min={today}
        required
      />
      <label htmlFor="time">Heure</label>
      <input
        type="time"
        value={time}
        onChange={e => setTime(e.target.value)}
        required
      />
      {duration && (<p>Durée de la session : {duration} minutes</p>)}
      <label htmlFor="players">Nombre de joueurs (max {maxPlayersAllowed})</label>
      <input
        type="number"
        placeholder="nombre de joueurs"
        min={2}
        max={maxPlayersAllowed}
        value={players}
        onChange={e => setPlayers(Number(e.target.value))}
        required
      />

      <button type="submit">Réserver</button>
    </form>
  );
}

export default ReservationForm;
