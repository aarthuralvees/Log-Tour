import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const login = (userData) => {
    setUser(userData)
    setIsAuthenticated(true)
    localStorage.setItem('user', JSON.stringify(userData))
    localStorage.setItem('isAuthenticated', 'true')
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem('user')
    localStorage.removeItem('isAuthenticated')
  }

  const checkAuth = () => {
    const savedUser = localStorage.getItem('user')
    const savedAuth = localStorage.getItem('isAuthenticated')
    
    if (savedUser && savedAuth === 'true') {
      setUser(JSON.parse(savedUser))
      setIsAuthenticated(true)
    }
  }

  React.useEffect(() => {
    checkAuth()
  }, [])

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}