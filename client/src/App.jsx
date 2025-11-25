import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './App/Home';
import HomeLogado from './App/Home_logado';
import Chatbot from './App/chatbot';
import { AuthProvider, useAuth } from './contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? children : <Navigate to="/" replace />
}

const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth()
  return !isAuthenticated ? children : <Navigate to="/home-logado" replace />
}

function AppRoutes() {
  return (
    <Routes>
      <Route 
        path="/" 
        element={
          <PublicRoute>
            <Home />
          </PublicRoute>
        } 
      />
      <Route 
        path="/home-logado" 
        element={
          <ProtectedRoute>
            <HomeLogado />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/chatbot" 
        element={
            <Chatbot />
        } 
      />
      <Route 
        path="/historico" 
        element={
          <ProtectedRoute>
            <div>Histórico de Viagens (em construção)</div>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/trip/:id" 
        element={
          <ProtectedRoute>
            <div>Detalhes da Viagem (em construção)</div>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/profile" 
        element={
          <ProtectedRoute>
            <div>Perfil do Usuário (em construção)</div>
          </ProtectedRoute>
        } 
      />
    </Routes>
  )
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  )
}

export default App