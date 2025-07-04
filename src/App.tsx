import React, { useState, useEffect } from 'react'
import Home from './Home'
import ReservationForm from './ReservationForm'
import SessionsDetails from './SessionsDetails'
import ContactForm from './FormulaireContact'
import MentionsLegales from './MentionsLegales'
import Navbar from './composants/navbar'
import Footer from './composants/footer'
import LoginPage from './login'
import RegisterPage from './register'
import GestionEmployes from './GestionEmployes'

type Page =
  | 'home'
  | 'reservation'
  | 'sessions'
  | 'contact'
  | 'mentions'
  | 'login'
  | 'register'
  | 'employees'

interface User {
  username: string
  email?: string
}

export default function App() {
  const [page, setPage] = useState<Page>('home')
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (stored) {
      setUser(JSON.parse(stored))
    }
  }, [])

  const handleLogin = (u: User) => {
    setUser(u)
    localStorage.setItem('user', JSON.stringify(u))
    setPage('home')
  }

  const handleRegister = (u: User) => {
    setUser(u)
    localStorage.setItem('user', JSON.stringify(u))
    setPage('home')
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('user')
    setPage('login')
  }

  return (
    <>
      <Navbar setPage={setPage} user={user} onLogout={user ? handleLogout : undefined} />

      <main>
        {user === null ? (
          page === 'register' ? (
            <RegisterPage onRegister={handleRegister} onSwitchPage={setPage} />
          ) : (
            <LoginPage onLogin={handleLogin} onSwitchPage={setPage} />
          )
        ) : (
          <>
            {page === 'home' && <Home />}
            {page === 'reservation' && <ReservationForm />}
            {page === 'sessions' && <SessionsDetails />}
            {page === 'contact' && <ContactForm />}
            {page === 'mentions' && <MentionsLegales />}
            {page === 'employees' && <GestionEmployes />}
          </>
        )}
      </main>

      <Footer setPage={setPage} />
    </>
  )
}
