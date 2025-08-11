import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { ChefHat, Clock, Trash2, Eye, Loader2, ArrowLeft } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils, faUtensilSpoon } from "@fortawesome/free-solid-svg-icons";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";

const SavedRecipes = ({ onNavigate }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [error, setError] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get("http://localhost:8000/recipes");
      setRecipes(response.data);
    } catch (error) {
      setError("Failed to load recipes");
      console.error("Error fetching recipes:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteRecipe = async (recipeId) => {
    if (!window.confirm("Are you sure you want to delete this recipe?")) return;

    try {
      await axios.delete(`http://localhost:8000/recipes/${recipeId}`);
      setRecipes(recipes.filter((recipe) => recipe.id !== recipeId));
      if (selectedRecipe && selectedRecipe.id === recipeId) {
        setSelectedRecipe(null);
      }
    } catch (error) {
      setError("Failed to delete recipe");
      console.error("Error deleting recipe:", error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div
        className="min-h-screen relative bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          backgroundImage: "url('/images/bg-profile.png')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10">
          <Header onNavigate={onNavigate} />
          <div className="min-h-screen flex items-center justify-center p-6">
            <div className="glass-card-nav rounded-3xl p-12 text-center">
              <Loader2 className="h-12 w-12 text-purple-400 animate-spin mx-auto mb-4" />
              <p className="text-white/70">Loading your recipes...</p>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen relative bg-cover bg-center bg-no-repeat bg-fixed"
      style={{
        backgroundImage: "url('/images/bg.png')",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10">
        <Header onNavigate={onNavigate} />
        <main className="min-h-screen p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8 pt-8">
              <button
                onClick={() => onNavigate("home")}
                className="inline-flex items-center space-x-2 text-white hover:text-white transition-colors mb-6 group">
                <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                <span>Back to Home</span>
              </button>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                My Saved Recipes
              </h1>
            </div>

            {error && (
              <div className="mb-6 p-4 glass-card-nav rounded-2xl text-red-200 text-center">
                {error}
              </div>
            )}

            {recipes.length === 0 ? (
              <div className="glass-card-nav rounded-3xl p-12 text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FontAwesomeIcon
                    icon={faUtensils}
                    className="text-purple-300 text-3xl"
                  />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  No Recipes Yet
                </h3>
                <p className="text-white/70 max-w-md mx-auto mb-6">
                  Start generating and saving recipes to build your personal
                  cookbook!
                </p>
                <button
                  onClick={() => onNavigate("home")}
                  className="btn-primary text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center space-x-2 mx-auto"
                >
                  <FontAwesomeIcon icon={faUtensils} className="h-5 w-5" />
                  <span>Generate Your First Recipe</span>
                </button>
              </div>
            ) : (
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Recipes List */}
                <div className="lg:col-span-1 space-y-4">
                  <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                    <ChefHat className="mr-2" />
                    Your Recipes ({recipes.length})
                  </h2>

                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {recipes.map((recipe) => (
                      <div
                        key={recipe.id}
                        className={`glass-card-nav rounded-2xl p-4 cursor-pointer transition-all hover:bg-white/25 ${
                          selectedRecipe?.id === recipe.id
                            ? "ring-2 ring-purple-400"
                            : ""
                        }`}
                        onClick={() => setSelectedRecipe(recipe)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-white text-lg mb-1 capitalize">
                              {recipe.title}
                            </h3>
                            <div className="flex items-center text-white text-sm mb-2">
                              <Clock className="h-4 w-4 mr-1" />
                              {formatDate(recipe.created_at)}
                            </div>
                            <p className="text-white text-sm">
                              {recipe.ingredients.length} ingredients
                            </p>
                          </div>

                          <div className="flex space-x-2 ml-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedRecipe(recipe);
                              }}
                              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                              title="View recipe"
                            >
                              <Eye className="h-4 w-4 text-white" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteRecipe(recipe.id);
                              }}
                              className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                              title="Delete recipe"
                            >
                              <Trash2 className="h-4 w-4 text-red-400" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recipe Details */}
                <div className="lg:col-span-2">
                  {selectedRecipe ? (
                    <div className="glass-card-nav rounded-3xl p-8">
                      <div className="mb-6">
                        <h2 className="text-3xl font-bold text-white mb-2 capitalize">
                          {selectedRecipe.title}
                        </h2>
                        <div className="flex items-center text-white text-sm">
                          <Clock className="h-4 w-4 mr-1" />
                          Saved on {formatDate(selectedRecipe.created_at)}
                        </div>
                      </div>

                      <div className="space-y-6">
                        {/* Ingredients Section */}
                        <div>
                          <h3 className="text-xl font-semibold text-purple-300 mb-3 flex items-center">
                            <FontAwesomeIcon
                              icon={faUtensilSpoon}
                              className="mr-2"
                            />
                            Ingredients
                          </h3>
                          <ul className="space-y-2">
                            {selectedRecipe.ingredients.map(
                              (ingredient, index) => (
                                <li
                                  key={index}
                                  className="text-white flex items-start"
                                >
                                  <span className="text-purple-400 mr-2">
                                    •
                                  </span>
                                  <span className="capitalize">
                                    {ingredient}
                                  </span>
                                </li>
                              )
                            )}
                          </ul>
                        </div>

                        {/* Directions Section */}
                        <div>
                          <h3 className="text-xl font-semibold text-purple-300 mb-3 flex items-center">
                            <ChefHat className="mr-2 h-5 w-5" />
                            Directions
                          </h3>
                          <ol className="space-y-3">
                            {selectedRecipe.directions.map(
                              (direction, index) => (
                                <li
                                  key={index}
                                  className="text-white flex items-start"
                                >
                                  <span className="bg-purple-500 text-white text-sm rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                                    {index + 1}
                                  </span>
                                  <span className="capitalize">
                                    {direction}
                                  </span>
                                </li>
                              )
                            )}
                          </ol>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="glass-card-nav rounded-3xl p-12 text-center">
                      <ChefHat className="h-16 w-16 text-purple-300 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-white mb-2">
                        Select a Recipe
                      </h3>
                      <p className="text-white">
                        Click on any recipe from the list to view its details
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default SavedRecipes;
