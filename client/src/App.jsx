import React, { useState } from 'react';
import { X, Sparkles, Loader2, PlusCircle, Copy } from 'lucide-react';
import axios from 'axios';

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [recipe, setRecipe] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleInputChange = (e) => setInputValue(e.target.value);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const trimmed = inputValue.trim();
      if (trimmed && !ingredients.includes(trimmed)) {
        setIngredients((prev) => [...prev, trimmed]);
        setInputValue('');
      }
      setError('');
    }
  };

  const removeIngredient = (toRemove) => {
    setIngredients(ingredients.filter((i) => i !== toRemove));
  };

  const generateRecipe = async () => {
    if (ingredients.length === 0) {
      setError('Add at least one ingredient to start!');
      return;
    }
    setIsLoading(true);
    setError('');
    setRecipe('');

    try {
      const response = await axios.post('http://localhost:8000/generate', {
        ingredients: ingredients.join(', '),
      });
      setRecipe(response.data.recipe || 'No recipe generated. Try again.');
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Failed to connect to the AI chef. Try again later.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(recipe);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden relative p-4">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-ping"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center p-4 pt-8 md:pt-0">
        <div className="max-w-lg w-full mx-auto">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="flex justify-center mb-3">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl shadow-lg">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Culinary AI
            </h1>
            <p className="text-gray-300 mt-2 text-sm md:text-base">
              Turn ingredients into magic. Powered by AI.
            </p>
          </div>

          {/* Input + Tags */}
          <div className="mb-6">
            <div className="relative group">
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="e.g., eggs, cheese, spinach"
                className="w-full p-4 pl-5 pr-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-500/50 focus:border-purple-400 placeholder-gray-300 text-black text-sm transition-all duration-300 shadow-lg"
              />
              <button
                onClick={handleKeyDown}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-300 hover:text-purple-100 transition-colors"
              >
                <PlusCircle size={24} />
              </button>
            </div>

           {/* Ingredients Chips */}
<div className="flex flex-wrap gap-2 mt-4">
  {ingredients.map((ing, idx) => (
    <div
      key={idx}
      className="flex items-center bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium border border-purple-400/30 shadow-sm hover:scale-105 hover:shadow-md transition-all duration-200 text-black group/chip"
    >
      {ing}
      <button
        onClick={() => removeIngredient(ing)}
        className="ml-2 w-4 h-4 flex items-center justify-center rounded-full bg-black/20 hover:bg-black/40 transition-all"
        aria-label={`Remove ${ing}`}
      >
        <X className="w-3 h-3 text-#cf5176 opacity-70 hover:opacity-100" />
      </button>
    </div>
  ))}
</div>
          </div>

          {/* Generate Button */}
          <button
            onClick={generateRecipe}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-4 rounded-2xl hover:from-purple-500 hover:to-blue-500 focus:outline-none focus:ring-4 focus:ring-purple-400 disabled:opacity-60 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-xl hover:shadow-2xl"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Cooking Up Your Dish...
              </>
            ) : (
              <>
                <Sparkles size={18} />
                Generate Recipe with AI
              </>
            )}
          </button>

          {/* Error Alert */}
          {error && (
            <div className="mt-6 p-4 bg-red-500/20 border border-red-500/30 rounded-2xl text-red-200 text-sm leading-relaxed backdrop-blur-sm animate-fade-in">
              <strong className="font-bold">🔥 Oops!</strong> {error}
            </div>
          )}

          {/* Recipe Output Card */}
          {recipe && (
            <div className="mt-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 shadow-2xl animate-fade-in">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-xl font-bold bg-gradient-to-r from-yellow-200 to-orange-200 bg-clip-text text-transparent">
                  🍳 Your AI Recipe
                </h2>
                <button
                  onClick={copyToClipboard}
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all"
                  title="Copy recipe"
                >
                  {copied ? (
                    <span className="text-green-300 text-xs">Copied!</span>
                  ) : (
                    <Copy className="w-4 h-4 text-gray-300" />
                  )}
                </button>
              </div>
              <div className="bg-black/30 p-4 rounded-xl text-black text-sm leading-relaxed font-light whitespace-pre-wrap border border-white/10 max-h-96 overflow-y-auto scroll-smooth">
                {recipe}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Floating Corner Accent */}
      <div className="absolute bottom-4 right-4 text-xs text-gray-500 opacity-60">
        ✨ AI-Powered Kitchen
      </div>
    </div>
  );
};

export default App;