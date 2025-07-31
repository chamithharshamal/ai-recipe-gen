import { Heart, LucideHeart } from 'lucide-react';
import React from 'react';

const Footer = () => {
  return (
    <footer className="glass-card border-t mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="text-center">
                <p className="text-gray-600 mb-4">
                  Made with <Heart className="inline h-6 w-6 text-red-500" /> by RecipeCraft AI Team
                </p>
                <div className="flex justify-center space-x-6">
                  <a href="#" className="text-gray-500 hover:text-purple-600 transition-colors">Privacy</a>
                  <a href="#" className="text-gray-500 hover:text-purple-600 transition-colors">Terms</a>
                  <a href="#" className="text-gray-500 hover:text-purple-600 transition-colors">Support</a>
                </div>
              </div>
            </div>
          </footer>
  );
};

export default Footer;