// Storage utility for managing recipes in browser localStorage

const STORAGE_KEY = 'swedish-cooking-companion-recipes';
const API_KEY_STORAGE = 'swedish-cooking-companion-api-key';

export const storage = {
  // Recipe management
  saveRecipe(recipe) {
    const recipes = this.getRecipes();
    const newRecipe = {
      ...recipe,
      id: Date.now().toString(),
      savedAt: new Date().toISOString(),
    };
    recipes.push(newRecipe);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
    return newRecipe;
  },

  getRecipes() {
    try {
      const recipes = localStorage.getItem(STORAGE_KEY);
      return recipes ? JSON.parse(recipes) : [];
    } catch (error) {
      console.error('Error loading recipes:', error);
      return [];
    }
  },

  getRecipeById(id) {
    const recipes = this.getRecipes();
    return recipes.find(recipe => recipe.id === id);
  },

  deleteRecipe(id) {
    const recipes = this.getRecipes();
    const filtered = recipes.filter(recipe => recipe.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  },

  updateRecipe(id, updates) {
    const recipes = this.getRecipes();
    const index = recipes.findIndex(recipe => recipe.id === id);
    if (index !== -1) {
      recipes[index] = { ...recipes[index], ...updates };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
      return recipes[index];
    }
    return null;
  },

  searchRecipes(query) {
    const recipes = this.getRecipes();
    const lowerQuery = query.toLowerCase();
    return recipes.filter(recipe =>
      recipe.title?.toLowerCase().includes(lowerQuery) ||
      recipe.originalTitle?.toLowerCase().includes(lowerQuery) ||
      recipe.ingredients?.some(ing => ing.toLowerCase().includes(lowerQuery)) ||
      recipe.instructions?.some(inst => inst.toLowerCase().includes(lowerQuery)) ||
      recipe.notes?.some(note => note.toLowerCase().includes(lowerQuery))
    );
  },

  // Export/Import functionality
  exportRecipes() {
    const recipes = this.getRecipes();
    const dataStr = JSON.stringify(recipes, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `swedish-recipes-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  },

  importRecipes(jsonData) {
    try {
      const importedRecipes = JSON.parse(jsonData);
      if (!Array.isArray(importedRecipes)) {
        throw new Error('Invalid format: expected an array of recipes');
      }
      const existingRecipes = this.getRecipes();
      const mergedRecipes = [...existingRecipes, ...importedRecipes];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mergedRecipes));
      return importedRecipes.length;
    } catch (error) {
      console.error('Error importing recipes:', error);
      throw error;
    }
  },

  clearAllRecipes() {
    localStorage.removeItem(STORAGE_KEY);
  },

  // API Key management
  saveApiKey(apiKey) {
    localStorage.setItem(API_KEY_STORAGE, apiKey);
  },

  getApiKey() {
    return localStorage.getItem(API_KEY_STORAGE);
  },

  clearApiKey() {
    localStorage.removeItem(API_KEY_STORAGE);
  },
};
