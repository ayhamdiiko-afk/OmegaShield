import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import VoiceRoom from './pages/VoiceRoom'
import Profile from './pages/Profile'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} setUser={setUser} />} />
        <Route path="/home" element={isAuthenticated ? <Home user={user} /> : <Login setIsAuthenticated={setIsAuthenticated} setUser={setUser} />} />
        <Route path="/room/:id" element={isAuthenticated ? <VoiceRoom user={user} /> : <Login setIsAuthenticated={setIsAuthenticated} setUser={setUser} />} />
        <Route path="/profile" element={isAuthenticated ? <Profile user={user} setUser={setUser} /> : <Login setIsAuthenticated={setIsAuthenticated} setUser={setUser} />} />
      </Routes>
    </Router>
  )
}

export default App
