import { Heart, X } from "lucide-react";
import React, { useState } from "react";

const Footer = () => {
  const [activePopup, setActivePopup] = useState(null);

  const popupContent = {
    privacy: {
      title: "Privacy Policy",
      content: `At RecipeCraft, we take your privacy seriously. We collect minimal data necessary to provide our services:

• Account Information: Username, email, and encrypted password
• Recipe Data: Your saved recipes and ingredients for personalization
• Usage Analytics: Anonymous data to improve our AI recommendations

We never share your personal information with third parties and use industry-standard encryption to protect your data. You can delete your account and all associated data at any time.`
    },
    terms: {
      title: "Terms of Service",
      content: `By using RecipeCraft, you agree to these terms:

• Service Usage: Use our platform responsibly and don't attempt to harm our systems
• Content Ownership: You own your recipes, we provide the AI generation service
• Account Responsibility: Keep your login credentials secure and notify us of any unauthorized access
• Service Availability: We strive for 99% uptime but cannot guarantee uninterrupted service

We reserve the right to suspend accounts that violate these terms. These terms may be updated periodically with notice to users.`
    },
    support: {
      title: "Support & Help",
      content: `Need help with RecipeCraft? We're here to assist you:

• Email Support: support@recipecraft-ai.com
• Response Time: Within 24 hours for all inquiries
• Common Issues: Check our FAQ section for quick solutions
• Feature Requests: We love hearing your ideas for improvements

For technical issues, please include:
- Your browser and version
- Steps to reproduce the problem
- Any error messages you see

Our support team is dedicated to making your recipe generation experience smooth and enjoyable!`
    }
  };

  const openPopup = (type) => {
    setActivePopup(type);
  };

  const closePopup = () => {
    setActivePopup(null);
  };

  return (
    <>
      <footer className="glass-card-nav border-t mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="text-center">
            <p className="text-white mb-4">
              Made with <Heart className="inline h-6 w-6 text-red-500" /> by
              RecipeCraft Team
            </p>
            <div className="flex justify-center space-x-6">
              <button
                onClick={() => openPopup('privacy')}
                className="text-white hover:text-purple-400 transition-colors"
              >
                Privacy
              </button>
              <button
                onClick={() => openPopup('terms')}
                className="text-white hover:text-purple-400 transition-colors"
              >
                Terms
              </button>
              <button
                onClick={() => openPopup('support')}
                className="text-white hover:text-purple-400 transition-colors"
              >
                Support
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Popup Modal */}
      {activePopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={closePopup}
          />
          
          {/* Modal Content */}
          <div className="relative z-10 w-full max-w-2xl animate-modalSlideIn">
            <div className="glass-card rounded-3xl p-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">
                  {popupContent[activePopup].title}
                </h2>
                <button
                  onClick={closePopup}
                  className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                >
                  <X className="h-5 w-5 text-white" />
                </button>
              </div>
              
              {/* Content */}
              <div className="text-white text-base leading-relaxed whitespace-pre-line max-h-96 overflow-y-auto">
                {popupContent[activePopup].content}
              </div>
              
              {/* Footer */}
              <div className="mt-6 pt-4 border-t border-white/20">
                <button
                  onClick={closePopup}
                  className="btn-primary text-white font-semibold py-2 px-6 rounded-xl transition-all"
                >
                  Got it
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;
