import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './composants/navbar';
import Home from './Home';
import Reservation from './ReservationForm';
import SessionsDetails from './session/SessionsDetails';
import Contact from './FormulaireContact';
import CreateSession from './session/CreateSession';
import EditSession from './session/EditSession';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/sessions" element={<SessionsDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/creer-session" element={<CreateSession />} />
        <Route path="/editSession/:id" element={<EditSession />} />
      </Routes>
    </Router>
  );
}

export default App;