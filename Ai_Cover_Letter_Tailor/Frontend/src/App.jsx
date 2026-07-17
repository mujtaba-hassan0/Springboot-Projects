import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthGateway from './components/auth/AuthGateway';
import Navbar from './components/navigation/Navbar';
import Profile from './components/profile/Profile';
import TailorWorkspace from './components/dashboard/TailorWorkspace';
import HistoryList from './components/history/HistoryList';

// Route Guard Component
const ProtectedRoute = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');

  // Auto-login session hydration
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('username');
    if (savedToken && savedUser) {
      setIsAuthenticated(true);
      setUserName(savedUser);
    }
  }, []);

  const handleLoginSuccess = (username) => {
    setIsAuthenticated(true);
    setUserName(username);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setIsAuthenticated(false);
    setUserName('');
  };

  return (
    <Router>
      <div className="min-h-screen bg-brand-light flex flex-col">
        {isAuthenticated && (
          <Navbar userName={userName} onLogout={handleLogout} />
        )}

        <Routes>
          {/* Public Auth Endpoint Gateway */}
          <Route 
            path="/login" 
            element={
              isAuthenticated ? <Navigate to="/dashboard" replace /> : <AuthGateway onLoginSuccess={handleLoginSuccess} />
            } 
          />

          {/* Protected Routes */}
        <Route path="/dashboard" element={
  <ProtectedRoute isAuthenticated={isAuthenticated}>
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 w-full">
      <TailorWorkspace />
    </div>
  </ProtectedRoute>
} />

          {/* Mount our beautiful Profile component here! */}
          <Route path="/profile" element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <div className="max-w-7xl mx-auto p-6 w-full">
                <Profile />
              </div>
            </ProtectedRoute>
          } />

        <Route path="/history" element={
    <ProtectedRoute isAuthenticated={isAuthenticated}>
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 w-full">
      <HistoryList />
      </div>
    </ProtectedRoute>
} />  

          {/* Redirect rule */}
          <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;