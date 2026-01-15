import { useState, useEffect } from 'react';
import { storage } from '../utils/storage';
import RecipeDisplay from './RecipeDisplay';

export default function SavedRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showImportExport, setShowImportExport] = useState(false);

  useEffect(() => {
    loadRecipes();
  }, []);

  const loadRecipes = () => {
    const saved = storage.getRecipes();
    setRecipes(saved);
  };

  const filteredRecipes = searchQuery
    ? storage.searchRecipes(searchQuery)
    : recipes;

  const handleDelete = (id) => {
    if (confirm('Är du säker på att du vill ta bort detta recept?')) {
      storage.deleteRecipe(id);
      loadRecipes();
      if (selectedRecipe?.id === id) {
        setSelectedRecipe(null);
      }
    }
  };

  const handleExport = () => {
    storage.exportRecipes();
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const count = storage.importRecipes(event.target.result);
        alert(`${count} recept importerade!`);
        loadRecipes();
      } catch (error) {
        alert(`Fel vid import: ${error.message}`);
      }
    };
    reader.readAsText(file);
    e.target.value = ''; // Reset file input
  };

  if (selectedRecipe) {
    return (
      <RecipeDisplay
        recipe={selectedRecipe}
        onSave={() => {}}
        onClose={() => setSelectedRecipe(null)}
      />
    );
  }

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Sparade recept</h2>
        <button
          onClick={() => setShowImportExport(!showImportExport)}
          className="text-sm text-swedish-blue hover:text-blue-700"
        >
          {showImportExport ? 'Dölj' : 'Import/Export'}
        </button>
      </div>

      {showImportExport && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg space-y-3">
          <div className="flex gap-3">
            <button onClick={handleExport} className="btn-secondary text-sm">
              📥 Exportera alla recept
            </button>
            <label className="btn-secondary text-sm cursor-pointer">
              📤 Importera recept
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
              />
            </label>
          </div>
          <p className="text-xs text-gray-600">
            Export skapar en JSON-fil med alla dina recept. Import lägger till recept från en JSON-fil.
          </p>
        </div>
      )}

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Sök recept..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input-field"
        />
      </div>

      {/* Recipe List */}
      {filteredRecipes.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          {searchQuery ? (
            <p>Inga recept hittades för "{searchQuery}"</p>
          ) : (
            <div>
              <p className="text-lg mb-2">Inga sparade recept ännu</p>
              <p className="text-sm">Konvertera och spara ditt första recept!</p>
            </div>
          )}
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredRecipes.map((recipe) => (
            <div
              key={recipe.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1 cursor-pointer" onClick={() => setSelectedRecipe(recipe)}>
                  <h3 className="text-lg font-semibold text-gray-800 hover:text-swedish-blue">
                    {recipe.title}
                  </h3>
                  {recipe.originalTitle && (
                    <p className="text-sm text-gray-500 italic mb-2">
                      {recipe.originalTitle}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-3 text-xs text-gray-600 mb-2">
                    {recipe.servings && <span>🍽️ {recipe.servings}</span>}
                    {recipe.prepTime && <span>⏱️ {recipe.prepTime}</span>}
                    {recipe.cookTime && <span>🔥 {recipe.cookTime}</span>}
                  </div>
                  {recipe.savedAt && (
                    <p className="text-xs text-gray-400">
                      Sparat: {new Date(recipe.savedAt).toLocaleDateString('sv-SE')}
                    </p>
                  )}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(recipe.id);
                  }}
                  className="text-red-500 hover:text-red-700 ml-4"
                  title="Ta bort"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 text-sm text-gray-500 text-center">
        {filteredRecipes.length} recept
        {searchQuery && ` hittade för "${searchQuery}"`}
      </div>
    </div>
  );
}
