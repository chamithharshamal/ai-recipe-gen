import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, Mail, Lock, LogIn, Loader2 } from 'lucide-react';

const Login = ({ onSwitchToRegister, onClose }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      onClose();
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  return (
    <div className="auth rounded-3xl p-8 w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <LogIn className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-l from-blue-500 to-purple-600 mb-2">Welcome Back</h2>
        <p className="text-white/70">Sign in to save your favorite recipes</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Field */}
        <div>
          <label className="block text-sm font-medium text-white/90 mb-1">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black placeholder-white/50"
              placeholder="Enter your email"
            />
          </div>
        </div>

        {/* Password Field */}
        <div>
          <label className="block text-sm font-medium text-white/90 mb-1">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black placeholder-white/50"
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/70"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-3 bg-red-500/20 border border-red-400/30 rounded-xl text-red-200 text-sm">
            {error}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full btn-primary text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Signing In...</span>
            </>
          ) : (
            <>
              <LogIn className="h-5 w-5" />
              <span>Sign In</span>
            </>
          )}
        </button>
      </form>

      {/* Switch to Register */}
      <div className="mt-6 text-center">
        <p className="text-white/70">
          Don't have an account?{' '}
          <button
            onClick={onSwitchToRegister}
            className="text-purple-400 hover:text-purple-500 font-medium transition-colors"
          >
            Sign up here
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;