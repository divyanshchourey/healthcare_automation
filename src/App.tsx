import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Header from './components/Layout/Header';
import LandingPage from './components/Pages/LandingPage';
import LoginPage from './components/Pages/LoginPage';
import ClinicsPage from './components/Pages/ClinicsPage';
import DoctorsPage from './components/Pages/DoctorsPage';
import BookingPage from './components/Pages/BookingPage';
import Dashboard from './components/Pages/Dashboard';

function AppContent() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedClinicId, setSelectedClinicId] = useState<string | undefined>();
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | undefined>();
  const { isAuthenticated } = useAuth();

  const handleNavigate = (page: string, id?: string) => {
    if (page === 'doctors') {
      setSelectedClinicId(id);
      setSelectedDoctorId(undefined);
    } else if (page === 'booking') {
      setSelectedDoctorId(id);
    } else {
      setSelectedClinicId(undefined);
      setSelectedDoctorId(undefined);
    }
    setCurrentPage(page);
  };

  const renderPage = () => {
    if (!isAuthenticated && (currentPage === 'dashboard' || currentPage === 'booking')) {
      return <LoginPage onNavigate={handleNavigate} />;
    }

    switch (currentPage) {
      case 'home':
        return <LandingPage onNavigate={handleNavigate} />;
      case 'login':
        return <LoginPage onNavigate={handleNavigate} />;
      case 'clinics':
        return <ClinicsPage onNavigate={handleNavigate} />;
      case 'doctors':
        return <DoctorsPage clinicId={selectedClinicId} onNavigate={handleNavigate} />;
      case 'booking':
        return <BookingPage doctorId={selectedDoctorId} onNavigate={handleNavigate} />;
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigate} />;
      default:
        return <LandingPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage={currentPage} onNavigate={handleNavigate} />
      <main>
        {renderPage()}
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;