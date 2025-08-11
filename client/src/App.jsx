import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import Home from './components/Home';
import SavedRecipes from './components/SavedRecipes';
import AuthModal from './components/AuthModal';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  const handleAuthRequired = () => {
    setAuthModalOpen(true);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'recipes':
        return <SavedRecipes onNavigate={handleNavigation} />;
      case 'home':
      default:
        return <Home onAuthRequired={handleAuthRequired} onNavigate={handleNavigation} />;
    }
  };

  return (
    <AuthProvider>
      <div className="app">
        {renderCurrentPage()}
        <AuthModal
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
          initialMode="login"
        />
      </div>
    </AuthProvider>
  );
};

export default App;