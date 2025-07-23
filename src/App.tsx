import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Home from './Home'
import ReservationForm from './ReservationForm'
import SessionsDetails from './session/SessionsDetails'
import ContactForm from './FormulaireContact'
import MentionsLegales from './MentionsLegales'
import CreateSession from './session/CreateSession';
import EditSession from './session/EditSession';
import Navbar from './composants/navbar'
import Footer from './composants/footer'
import LoginPage from './login'
import RegisterPage from './register'
import GestionEmployes from './GestionEmployes'

interface User {
  username: string
  email?: string
}

// Composant pour les routes (à l'intérieur du Router)
const AppRoutes: React.FC<{ user: User | null; handleLogin: (u: User) => void; handleRegister: (u: User) => void; onLogout: () => void }> = ({ user, handleLogin, handleRegister, onLogout }) => {
  const navigate = useNavigate();

  // Composant de protection des routes
  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    return user ? <>{children}</> : <Navigate to="/login" replace />
  }

  return (
    <>
      <Navbar user={user} onLogout={user ? onLogout : undefined} />
      
      <main>
        <Routes>
          <Route path="/login" element={
            user ? <Navigate to="/" replace /> : <LoginPage onLogin={handleLogin} onSwitchPage={(page) => navigate(`/${page}`)} />
          } />
          <Route path="/register" element={
            user ? <Navigate to="/" replace /> : <RegisterPage onRegister={handleRegister} onSwitchPage={(page) => navigate(`/${page}`)} />
          } />
          
          <Route path="/" element={
            <ProtectedRoute><Home /></ProtectedRoute>
          } />
          <Route path="/reservation" element={
            <ProtectedRoute><ReservationForm /></ProtectedRoute>
          } />
          <Route path="/sessions" element={
            <ProtectedRoute><SessionsDetails /></ProtectedRoute>
          } />
          <Route path="/contact" element={
            <ProtectedRoute><ContactForm /></ProtectedRoute>
          } />
          <Route path="/creer-session" element={
            <ProtectedRoute><CreateSession /></ProtectedRoute>
          } />
          <Route path="/editSession/:id" element={
            <ProtectedRoute><EditSession /></ProtectedRoute>
          } />
          <Route path="/MentionsLegales" element={
            <ProtectedRoute><MentionsLegales /></ProtectedRoute>
          } />
          <Route path="/employees" element={
            <ProtectedRoute><GestionEmployes /></ProtectedRoute>
          } />
        </Routes>
      </main>

      <Footer />
    </>
  )
}

export default function App() {
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
  }

  const handleRegister = (u: User) => {
    setUser(u)
    localStorage.setItem('user', JSON.stringify(u))
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <Router>
      <AppRoutes 
        user={user} 
        handleLogin={handleLogin} 
        handleRegister={handleRegister} 
        onLogout={handleLogout}
      />
    </Router>
  )
}