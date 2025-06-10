import { useState } from 'react';
import Home from './Home';
import ReservationForm from './ReservationForm';
import SessionsDetails from './SessionsDetails';
import ContactForm from './FormulaireContact';
import MentionsLegales from './MentionsLegales';

type Page = 'home' | 'reservation' | 'sessions' | 'contact' | 'mentions';

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
        {page === 'mentions' && <MentionsLegales />}

      </main>

      <footer>
        <p>Suivez-nous sur nos Réseaux Sociaux :</p>
        <ul>
          <li><a href="https://tiktok.com">Tiktok</a></li>
          <li><a href="https://instagram.com">Instagram</a></li>
        </ul>

        <p><button onClick={() => setPage('sessions')}>Détails des sessions</button></p>
        <p><button onClick={() => setPage('contact')}>Formulaire de contact</button></p>
        <p><button onClick={() => setPage('mentions')}>Mentions légales</button></p>
    </footer>

    </>
  );
}
