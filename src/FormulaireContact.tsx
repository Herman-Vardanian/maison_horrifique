import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './FormulaireContact.css';

function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, email, message });
    toast.success('Message envoyé avec succès !');
  };

  return (
    
    <form onSubmit={handleSubmit}>
      <h2>Contact :</h2>
      <p>Email : contact@maisonhorrifique.com</p>
      <p>Téléphone : 01 23 45 67 89</p>
      <h2>Formulaire de Contact</h2>
      <label htmlFor="name">Nom</label>
      <input
        type="text"
        placeholder="Nom"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <label htmlFor="email">Email</label>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <label htmlFor="message">Message</label>
      <textarea
        placeholder="Message"
        value={message}
        onChange={e => setMessage(e.target.value)}
        required
      />
      <button type="submit">Envoyer</button>
      <ToastContainer position="top-center" />
    </form>
  );
}

export default ContactForm;
