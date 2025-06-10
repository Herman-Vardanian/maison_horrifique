import React, { useState } from 'react';

function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, email, message });
  };

  return (
    
    <form onSubmit={handleSubmit}>
      <h2>Contact :</h2>
      <p>Email : contact@maisonhorrifique.com</p>
      <p>Téléphone : 01 23 45 67 89</p>
      <h2>Formulaire de Contact</h2>
      <input
        type="text"
        placeholder="Nom"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <textarea
        placeholder="Message"
        value={message}
        onChange={e => setMessage(e.target.value)}
        required
      />
      <button type="submit">Envoyer</button>
    </form>
  );
}

export default ContactForm;
