import React, { useState } from 'react';
import { X } from 'lucide-react';
import Login from './Login';
import Register from './Register';

const AuthModal = ({ isOpen, onClose, initialMode = 'login' }) => {
  const [mode, setMode] = useState(initialMode);

  if (!isOpen) return null;

  const handleSwitchToRegister = () => setMode('register');
  const handleSwitchToLogin = () => setMode('login');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Multi-layered backdrop effect */}
      <div 
        className="absolute inset-0 animate-backdropFadeIn"
        onClick={onClose}
        style={{
          background: 'linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(20,20,40,0.9) 50%, rgba(0,0,0,0.85) 100%)',
          backdropFilter: 'blur(15px) saturate(120%) contrast(110%) brightness(70%)',
          WebkitBackdropFilter: 'blur(15px) saturate(120%) contrast(110%) brightness(70%)'
        }}
      />
      
      {/* Animated gradient overlay */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(147, 51, 234, 0.4) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(59, 130, 246, 0.4) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.3) 0%, transparent 70%)
          `,
          animation: 'pulse 6s ease-in-out infinite alternate'
        }}
      />
      
      {/* Subtle pattern overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 2px,
            rgba(255,255,255,0.1) 2px,
            rgba(255,255,255,0.1) 4px
          )`
        }}
      />
      
      {/* Modal Content */}
      <div className="relative z-10 w-full max-w-md animate-modalSlideIn">
        {/* Enhanced Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-6 -right-6 z-20 w-12 h-12 bg-gradient-to-r from-red-500/20 to-pink-500/20 hover:from-red-500/30 hover:to-pink-500/30 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-white/40 hover:scale-110 hover:rotate-90 group"
        >
          <X className="h-6 w-6 text-white group-hover:text-red-200 transition-colors" />
        </button>

        {/* Auth Forms with enhanced styling */}
        <div className="transform transition-all duration-500 ease-out hover:scale-[1.02]">
          {mode === 'login' ? (
            <Login 
              onSwitchToRegister={handleSwitchToRegister}
              onClose={onClose}
            />
          ) : (
            <Register 
              onSwitchToLogin={handleSwitchToLogin}
              onClose={onClose}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;