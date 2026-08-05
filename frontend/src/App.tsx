import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { LandingPage } from './pages/LandingPage';
import { DriverDashboard } from './pages/DriverDashboard';
import { ShipperDashboard } from './pages/ShipperDashboard';
import { FleetDashboard } from './pages/FleetDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { MapViewPage } from './pages/MapViewPage';
import { AuthPage } from './pages/AuthPage';

const AppContent: React.FC = () => {
  const { role } = useApp();
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Default logged in for instant demo
  const navigate = useNavigate();

  const handleGetStarted = () => {
    setIsAuthenticated(true);
    navigate('/dashboard');
  };

  const renderDashboardByRole = () => {
    switch (role) {
      case 'driver':
        return <DriverDashboard />;
      case 'shipper':
        return <ShipperDashboard />;
      case 'fleet_owner':
        return <FleetDashboard />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <DriverDashboard />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 text-slate-900">
      <Navbar onNavigateToDashboard={() => navigate('/dashboard')} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-6">
        <Routes>
          <Route 
            path="/" 
            element={
              <LandingPage 
                onGetStarted={handleGetStarted} 
              />
            } 
          />
          <Route 
            path="/dashboard" 
            element={isAuthenticated ? renderDashboardByRole() : <Navigate to="/auth" replace />} 
          />
          <Route 
            path="/map" 
            element={<MapViewPage />} 
          />
          <Route 
            path="/auth" 
            element={<AuthPage onAuthSuccess={handleGetStarted} />} 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <Router>
        <AppContent />
      </Router>
    </AppProvider>
  );
}

export default App;
