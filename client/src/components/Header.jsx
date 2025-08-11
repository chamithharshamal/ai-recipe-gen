import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils, faBars } from "@fortawesome/free-solid-svg-icons";
import { User, LogOut, BookOpen, LogIn, UserPlus } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import AuthModal from "./AuthModal";

const Header = ({ onNavigate }) => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();

  const handleAuthClick = (mode) => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    onNavigate("home");
  };

  const handleNavigation = (page) => {
    onNavigate(page);
    setUserMenuOpen(false);
  };

  return (
    <>
      <nav className="glass-card-nav sticky top-0 z-50 border-b">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => handleNavigation("home")}
            >
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faUtensils}
                  className="text-white text-lg"
                />
              </div>
              <h1 className="text-2xl font-bold text-white">RecipeCraft</h1>
            </div>

            {/* Auth Section */}
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center space-x-2 text-white hover:text-purple-400 transition-colors"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <span className="hidden sm:block font-medium">
                      {user?.username}
                    </span>
                  </button>

                  {/* User Dropdown Menu */}
                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-white/20 z-50">
                      <div className="py-2">
                        <div className="px-4 py-2 border-b border-white/10">
                          <p className="text-sm text-black">Signed in as</p>
                          <p className="text-md font-medium text-purple-900">
                            {user?.username}
                          </p>
                        </div>
                        <button
                          onClick={() => handleNavigation("recipes")}
                          className="w-full text-left px-4 py-2 text-sm text-black hover:bg-white/10 transition-colors flex items-center"
                        >
                          <BookOpen className="h-4 w-4 mr-2" />
                          My Recipes
                        </button>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-sm text-black hover:bg-white/10 transition-colors flex items-center"
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleAuthClick("register")}
                    className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all font-medium"
                  >
                    <UserPlus className="h-4 w-4" />
                    <span className="hidden sm:block">Sign In</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
      />

      {/* Click outside to close user menu */}
      {userMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setUserMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Header;
