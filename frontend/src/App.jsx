import React, { useState } from 'react';
import LandingPage from './pages/LandingPage';
import ProfileSetupPage from './pages/ProfileSetupPage';
import DashboardPage from './pages/DashboardPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [token, setToken] = useState(null);
  const [userProfile, setUserProfile] = useState({ gender: '', ageGroup: '' });

  const handleLoginSuccess = (jwtToken) => {
    setToken(jwtToken);
    setCurrentPage('profile');
  };

  const handleProfileComplete = (profileData) => {
    setUserProfile(profileData);
    setCurrentPage('dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
      {currentPage === 'landing' && (
        <LandingPage onAuthenticate={handleLoginSuccess} />
      )}
      {currentPage === 'profile' && (
        <ProfileSetupPage token={token} onComplete={handleProfileComplete} />
      )}
      {currentPage === 'dashboard' && (
        <DashboardPage token={token} userProfile={userProfile} />
      )}
    </div>
  );
}