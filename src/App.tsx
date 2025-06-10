import { useState } from 'react';
import Home from './Home';
import ReservationForm from './ReservationForm';
import SessionsDetails from './SessionsDetails';
import ContactForm from './FormulaireContact';
import MentionsLegales from './MentionsLegales';
import Navbar from './composants/navbar';
import Footer from './composants/footer';

type Page = 'home' | 'reservation' | 'sessions' | 'contact' | 'mentions';

export default function App() {
  const [page, setPage] = useState<Page>('home');

  return (
    <>
      {/* <nav>
        <button onClick={() => setPage('home')}>Accueil</button>
        <button onClick={() => setPage('reservation')}>Réservation</button>
        <button onClick={() => setPage('sessions')}>Sessions</button>
        <button onClick={() => setPage('contact')}>Contact</button>
      </nav> */}
      <Navbar setPage={setPage} />

      <main>
        {page === 'home' && <Home />}
        {page === 'reservation' && <ReservationForm />}
        {page === 'sessions' && <SessionsDetails />}
        {page === 'contact' && <ContactForm />}
        {page === 'mentions' && <MentionsLegales />}

      </main>

      <Footer setPage={setPage} />      

    </>
  );
}
