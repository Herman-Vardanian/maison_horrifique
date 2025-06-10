

import React, { useEffect, useState } from 'react'
import { SessionCard } from './composants/sessionCard'
import type { Session } from './composants/sessionCard'


export const SessionsPage: React.FC = () => {
  const [sessions, setSessions] = useState<Session[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('https://api/v1/sessions')
      .then((res) => {
        if (!res.ok) throw new Error(`Erreur ${res.status}`)
        return res.json() as Promise<Session[]>
      })
      .then((data) => setSessions(data))
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p>Chargement des sessions…</p>
  if (error) return <p>Erreur : {error}</p>

  return (
    <div className="sessions-page">
      <h1>Sessions Escape Game – Horreur</h1>
      <div className="sessions-container">
        {sessions.map((session) => (
          <SessionCard key={session.id} session={session} />
        ))}
      </div>
    </div>
  )
}
