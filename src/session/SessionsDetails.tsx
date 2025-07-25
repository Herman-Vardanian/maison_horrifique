import  { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SessionCard } from '../composants/sessionCard'
import type { Session } from '../composants/sessionCard'
import './SessionsDetails.css'

export default function SessionsDetails() {
  const [sessions, setSessions] = useState<Session[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/sessions`)
      .then(async (res) => {
        if (!res.ok) throw new Error(`Erreur ${res.status}`)
        const contentType = res.headers.get('content-type')
      console.log('Content-Type:', contentType)
        if (contentType && contentType.includes('application/json')) {
          return res.json() as Promise<Session[]>
        } else {
          throw new Error("La réponse du serveur n'est pas du JSON valide.")
        }
      })
      .then((data) => setSessions(data))
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const handleDelete = (id: string) => {
  setSessions(prev => prev.filter(session => session.id !== id));
  };

  if (loading) return <p>Chargement des sessions…</p>
  if (error) return <p>Erreur : {error}</p>

  return (
    <div className="sessions-page">
      <h1>Sessions Escape Game – Horreur</h1>
      <button onClick={() => navigate('/creer-session')} className="create-session-button">
        Créer une nouvelle session
      </button>
      <div className="sessions-container">
        {sessions.map((session) => (
          <SessionCard key={session.id} session={session} onDelete={handleDelete}/>
        ))}
      </div>
    </div>
  )
}
