import { useState } from 'react';
import Home from './Home';
import ReservationForm from './ReservationForm';
import SessionsDetails from './SessionsDetails';
import ContactForm from './FormulaireContact';

type Page = 'home' | 'reservation' | 'sessions' | 'contact';

export default function App() {
  const [page, setPage] = useState<Page>('home');

  return (
    <>
      <nav>
        <button onClick={() => setPage('home')}>Accueil</button>
        <button onClick={() => setPage('reservation')}>Réservation</button>
        <button onClick={() => setPage('sessions')}>Sessions</button>
        <button onClick={() => setPage('contact')}>Contact</button>
      </nav>

      <main>
        {page === 'home' && <Home />}
        {page === 'reservation' && <ReservationForm />}
        {page === 'sessions' && <SessionsDetails />}
        {page === 'contact' && <ContactForm />}
      </main>
    </>
  );
}
