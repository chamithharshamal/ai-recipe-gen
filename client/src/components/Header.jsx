import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faBars } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  return (
    <nav className="glass-card-nav sticky top-0 z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <FontAwesomeIcon icon={faUtensils} className="text-white text-lg" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">RecipeCraft AI</h1>
          </div>
          <div className="md:flex space-x-8">
            <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors font-medium">Home</a>
            <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors font-medium">Recipes</a>
            <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors font-medium">About</a>
            <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors font-medium">Contact</a>
          </div>
          <button className="md:hidden">
            <FontAwesomeIcon icon={faBars} className="text-gray-600" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;