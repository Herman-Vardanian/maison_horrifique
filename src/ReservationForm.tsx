import { useEffect, useState } from 'react';

type Session = {
  id: string;
  title: string;
  available: boolean;
  price: number;
};

function ReservationForm() {
  const [name, setName] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [date, setDate] = useState('');
  const [players, setPlayers] = useState<number | undefined>();
  const [sessions, setSessions] = useState<Session[]>([]);

  type Slot = {
    sessionId: string;
    start: string;
    end: string;
    available: boolean;
  };

  const [slots, setSlots] = useState<Slot[]>([]);
  const [slotStart, setSlotStart] = useState('');

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/sessions`)
      .then(res => res.json())
      .then(data => setSessions(data));
  }, []);

  const selectedSession = sessions.find(s => s.id === sessionId);

useEffect(() => {
  if (sessionId && date) {
    fetch(`${import.meta.env.VITE_API_URL}/sessions/${sessionId}/slots`)
      .then(res => res.json())
      .then((data: Slot[]) =>
        setSlots(
          data.filter(
            slot =>
              slot.available &&
              slot.start.startsWith(date)
          )
        )
      );
  } else {
    setSlots([]);
  }
}, [sessionId, date]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, sessionId, date, players, slotStart });
  };

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
          .filter(session => session.available)
          .map(session => (
            <option key={session.id} value={session.id}>
              {session.title}
            </option>
          ))}
      </select>
      {selectedSession && (
        <p>Prix par personne&nbsp;: {selectedSession.price}€</p>
      )}
      <label htmlFor="date">Date</label>
      <input
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
        min={today}
        required
      />
      <label htmlFor="players">Nombre de joueurs</label>
      <input
        type="number"
        placeholder="nombre de joueurs"
        min={2}
        max={8}
        value={players}
        onChange={e => setPlayers(Number(e.target.value))}
        required
      />
      {slots.length > 0 && (
        <>
          <label htmlFor="slot">Créneau horaire</label>
          <select
            id="slot"
            value={slotStart}
            onChange={e => setSlotStart(e.target.value)}
            required
          >
            <option value="">Choisir un créneau</option>
            {slots.map(slot => (
              <option key={slot.start} value={slot.start}>
                {new Date(slot.start).toLocaleString()}
              </option>
            ))}
          </select>
        </>
      )}
      <div style={{ marginTop: '1rem' }} />
      <button type="submit">Réserver</button>
    </form>
  );
}

export default ReservationForm;
