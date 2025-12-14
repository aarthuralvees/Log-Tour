import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './App/Home';
import HomeLogado from './App/Home_logado';
import Chatbot from './App/chatbot';
import TripDetails from './App/TripDetails';
import Roteiro from './App/Roteiro'; // <--- IMPORT THIS

// Helper function to check auth status directly from storage
const checkAuth = () => {
  return !!localStorage.getItem('token');
};

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = checkAuth();
  return isAuthenticated ? children : <Navigate to="/" replace />
}

const PublicRoute = ({ children }) => {
  const isAuthenticated = checkAuth();
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

      {/* --- ADDED ROUTE FOR GENERATED TRIP --- */}
      <Route 
        path="/roteiro" 
        element={
          <ProtectedRoute>
            <Roteiro />
          </ProtectedRoute>
        } 
      />
      {/* -------------------------------------- */}
      
      {/* ROUTE FOR SAVED TRIP DETAILS */}
      <Route 
        path="/trip/:id" 
        element={
          <ProtectedRoute>
            <TripDetails />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/historico" 
        element={
          <ProtectedRoute>
            <div className="p-8 text-center text-xl font-rokkitt">Histórico de Viagens (em construção)</div>
          </ProtectedRoute>
        } 
      />
      
      {/* Profile Route REMOVED */}
    </Routes>
  )
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  )
}

export default App;