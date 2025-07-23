import React, { useState } from 'react'

interface User {
  username: string
}

interface LoginResponse {
  user: User
  message: string
  error?: string
}

interface LoginPageProps {
  onLogin: (user: User) => void
  onSwitchPage: (page: 'login' | 'register') => void
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onSwitchPage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
      const res = await fetch('/api/v1/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      const data = (await res.json()) as LoginResponse

      if (res.ok) {
        localStorage.setItem('user', JSON.stringify(data.user))
        onLogin(data.user)
      } else {
        setError(data.error || 'Identifiants incorrects.')
      }
    } catch {
      setError('Une erreur est survenue. Veuillez réessayer.')
    }
  }

  return (
    <div className="auth-page">
      <h1>Connexion</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Nom d’utilisateur</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Mot de passe</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Se connecter</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <p>
        Pas encore de compte ?{' '}
        <button
          onClick={() => onSwitchPage('register')}
          style={{
            background: 'none',
            border: 'none',
            color: 'blue',
            textDecoration: 'underline',
            cursor: 'pointer',
          }}
        >
          Inscrivez-vous
        </button>
      </p>
    </div>
  )
}

export default LoginPage
