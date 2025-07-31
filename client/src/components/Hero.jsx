import React, { useState } from 'react';
import { X, Sparkles, Loader2, PlusCircle, Copy, ChefHat, PlusIcon, ChefHatIcon } from 'lucide-react';
import  { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faUtensilSpoon } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const Hero = () => {
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

  const addIngredient = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !ingredients.includes(trimmed)) {
      setIngredients((prev) => [...prev, trimmed]);
      setInputValue('');
    }
    setError('');
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

  const clearAll = () => {
    setIngredients([]);
    setRecipe('');
    setInputValue('');
    setError('');
  };

  return (
    <section className="min-h-screen flex mt-2 justify-center p-6">
      <div className="max-w-7xl w-full mx-auto">
        {/* Hero Header */}
         <div className="text-center mb-8 animate-fadeIn">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
                Turn Your Ingredients Into
                <span className="block text-transparent bg-clip-text bg-gradient-to-b from-blue-500 to-purple-600">Culinary Masterpieces</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Powered by advanced AI, RecipeCraft transforms your available ingredients into personalized, delicious recipes in seconds.
              </p>
            </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Form */}
          <div className="space-y-4">
                <div className="glass-card rounded-3xl p-8 animate-slideIn">
                  <div className="flex items-center mb-6">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-3">
                     <FontAwesomeIcon icon={faUtensilSpoon} className="text-white text-lg" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Add Your Ingredients</h2>
                  </div>
                  
                  {/* Input Field */}
                  <div className="relative mb-6">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={handleInputChange}
                      onKeyDown={handleKeyDown}
                      placeholder="e.g., chicken, tomatoes, basil..."
                      className="w-full p-4 pr-12 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 text-gray-900 text-lg transition-all"
                    />
                    <button
                      onClick={addIngredient}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-purple-500 hover:bg-purple-600 rounded-lg flex items-center justify-center transition-colors"
                    >
                      <PlusIcon className="h-5 w-5 text-white" />
                    </button>
                  </div>

                  {/* Ingredients Display */}
                  {ingredients.length > 0 && (
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-sm font-semibold text-gray-700">
                          Ingredients ({ingredients.length})
                        </p>
                        <button
                          onClick={clearAll}
                          className="text-sm text-red-500 hover:text-red-600 transition-colors"
                        >
                          Clear All
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        {ingredients.map((ingredient, index) => (
                          <span
                            key={index}
                            className="ingredient-chip text-white px-4 py-2 rounded-full text-sm font-medium flex items-center"
                          >
                            {ingredient}
                            <button
                              onClick={() => removeIngredient(ingredient)}
                              className="ml-2 w-8 h-5 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                            >
                              <X className="h-4 w-4 text-white" />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Generate Button */}
                  <button
                    onClick={generateRecipe}
                    disabled={ingredients.length === 0 || isLoading}
                    className={`btn-primary w-full text-white font-semibold py-4 px-6 rounded-2xl flex items-center justify-center space-x-3 text-lg ${
                      ingredients.length === 0 || isLoading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {isLoading ? (
                      <React.Fragment>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Cooking Up Your Recipe...</span>
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <Sparkles className="h-5 w-5 text-white" />
                        <span>Generate Recipe</span>
                      </React.Fragment>
                    )}
                  </button>

                  {/* Error Alert */}
                  {error && (
                    <div className="mt-6 p-4 bg-red-50 border-2 border-red-200 rounded-2xl text-red-700 text-sm leading-relaxed animate-fade-in">
                      <strong className="font-bold">🔥 Oops!</strong> {error}
                    </div>
                  )}
                </div>
              </div>

          {/* Right Side*/}
            <div className="lg:sticky lg:top-8">
                {recipe ? (
                  <div className="glass-card rounded-3xl p-8 animate-fadeIn">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                        <ChefHatIcon  className="h-8 w-8 mr-2 text-purple-500" />
                        Your Delicious Recipe
                      </h2>
                      <button
                        onClick={copyToClipboard}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Copy recipe"
                      >
                        {copied ? (
                          <span className="text-green-600 text-sm font-medium">Copied!</span>
                        ) : (
                          <Copy className="h-5 w-5 text-gray-600 hover:text-purple-600 transition-colors" />
                        )}
                      </button>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-2xl text-gray-800 text-base leading-relaxed whitespace-pre-wrap max-h-96 overflow-y-auto border-2 border-gray-100">
                      {recipe}
                    </div>
                  </div>
                ) : (
                  <div className="glass-card rounded-3xl p-12 text-center">
                    <div className="w-24 h-24 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-custom">
                       <FontAwesomeIcon icon={faUtensils} className="text-purple-500 text-3xl" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Ready to Cook Something Amazing?</h3>
                    <p className="text-gray-600 max-w-sm mx-auto">
                      Add your ingredients and let our AI chef create a personalized recipe just for you.
                    </p>
                  </div>
                )}
              </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;