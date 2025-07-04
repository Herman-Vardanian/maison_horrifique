import React, { useState } from 'react'

interface User {
  username: string
  email: string
}

interface RegisterResponse {
  user: User
  message: string
  error?: string
}

interface RegisterPageProps {
  onRegister: (user: User) => void
  onSwitchPage: (page: 'login' | 'register') => void
}

const RegisterPage: React.FC<RegisterPageProps> = ({ onRegister, onSwitchPage }) => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
      const res = await fetch('/api/v1/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, email }),
      })
      const data = (await res.json()) as RegisterResponse

      if (res.ok) {
        localStorage.setItem('user', JSON.stringify(data.user))
        onRegister(data.user)
      } else {
        setError(data.error || 'Un problème est survenu.')
      }
    } catch {
      setError('Une erreur est survenue. Veuillez réessayer.')
    }
  }

  return (
    <div className="auth-page">
      <h1>Inscription</h1>
      <form onSubmit={handleRegister}>
        <div>
          <label htmlFor="reg-username">Nom d’utilisateur</label>
          <input
            id="reg-username"
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="reg-email">Email</label>
          <input
            id="reg-email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="reg-password">Mot de passe</label>
          <input
            id="reg-password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">S’inscrire</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <p>
        Déjà un compte ?{' '}
        <button
          onClick={() => onSwitchPage('login')}
          style={{
            background: 'none',
            border: 'none',
            color: 'blue',
            textDecoration: 'underline',
            cursor: 'pointer',
          }}
        >
          Connectez-vous
        </button>
      </p>
    </div>
  )
}

export default RegisterPage
