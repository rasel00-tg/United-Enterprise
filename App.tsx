import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from '@contexts/store'
import AuthPage from '@pages/AuthPage'
import HomePage from '@pages/HomePage'
import AdminPage from '@pages/AdminPage'
import UserPage from '@pages/UserPage'
import '@styles/globals.css'

function App() {
  const { isAuthenticated, user } = useAuthStore()

  return (
    <Router>
      <Routes>
        {!isAuthenticated ? (
          <>
            <Route path="/auth" element={<AuthPage />} />
            <Route path="*" element={<Navigate to="/auth" />} />
          </>
        ) : (
          <>
            <Route path="/dashboard" element={<UserPage />} />
            {user?.role === 'admin' && (
              <Route path="/admin" element={<AdminPage />} />
            )}
            <Route path="*" element={<Navigate to={user?.role === 'admin' ? '/admin' : '/dashboard'} />} />
          </>
        )}
      </Routes>
    </Router>
  )
}

export default App
