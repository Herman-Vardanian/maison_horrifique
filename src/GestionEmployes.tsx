import React, { useEffect, useState } from 'react';
import './GestionEmployes.css';

interface Employe {
  id: number;
  nom: string;
  email: string;
  role: string;
}

export default function GestionEmployes() {
  const [employes, setEmployes] = useState<Employe[]>([]);
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    fetch('/api/v1/employees')
      .then(res => res.json())
      .then((data: Employe[]) => setEmployes(data))
      .catch(console.error);
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const newEmp = { nom, email, role };
    const res = await fetch('/api/v1/employees', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEmp),
    });
    if (res.ok) {
      const created: Employe = await res.json();
      setEmployes(prev => [...prev, created]);
      setNom(''); setEmail(''); setRole('');
    }
  };

  const handleDelete = async (id: number) => {
    const res = await fetch(`/api/v1/employees/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setEmployes(prev => prev.filter(e => e.id !== id));
    }
  };

  return (
    <div className="gestion-employes-container">
      <h2 className="gestion-employes-header">Gestion des comptes employés</h2>

      <div className="gestion-employes-card">
        <form className="gestion-employes-form" onSubmit={handleAdd}>
          <input
            type="text"
            placeholder="Nom"
            value={nom}
            onChange={e => setNom(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Rôle"
            value={role}
            onChange={e => setRole(e.target.value)}
            required
          />
          <button type="submit">Ajouter</button>
        </form>
      </div>

      <div className="table-container">
        <table className="gestion-employes-table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Email</th>
              <th>Rôle</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employes.map(emp => (
              <tr key={emp.id}>
                <td>{emp.nom}</td>
                <td>{emp.email}</td>
                <td>{emp.role}</td>
                <td className="actions">
                  <button
                    className="delete"
                    onClick={() => handleDelete(emp.id)}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
