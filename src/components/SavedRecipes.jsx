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
    <div className="card relative">
      {/* Decorative elements */}
      <div className="absolute -top-16 -right-16 w-48 h-48 bg-coral/10 rounded-full pointer-events-none"></div>
      <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-warm-yellow/15 rounded-full pointer-events-none"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex justify-between items-start gap-4 mb-8">
          <div className="min-w-0">
            <h2 className="text-3xl font-display font-bold text-forest mb-1">Sparade recept</h2>
            <p className="text-warm-gray text-sm">Din samling av svenska recept</p>
          </div>
          <button
            onClick={() => setShowImportExport(!showImportExport)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all flex-shrink-0 ${
              showImportExport
                ? 'bg-forest text-cream'
                : 'bg-cream text-warm-gray hover:bg-cream-dark'
            }`}
          >
            <span>{showImportExport ? '✕' : '⚙️'}</span>
            <span>{showImportExport ? 'Stäng' : 'Hantera'}</span>
          </button>
        </div>

        {showImportExport && (
          <div className="mb-8 p-5 bg-cream rounded-2xl">
            <div className="flex flex-wrap gap-3 mb-3">
              <button onClick={handleExport} className="btn-secondary text-sm">
                <span>📥</span>
                <span>Exportera recept</span>
              </button>
              <label className="btn-secondary text-sm cursor-pointer">
                <span>📤</span>
                <span>Importera recept</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImport}
                  className="hidden"
                />
              </label>
            </div>
            <p className="text-sm text-warm-gray">
              Exportera skapar en JSON-fil med alla recept. Importera lägger till recept från fil.
            </p>
          </div>
        )}

        {/* Search */}
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Sök bland dina recept..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-12"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-warm-gray-light">
              🔍
            </span>
          </div>
        </div>

        {/* Recipe List */}
        {filteredRecipes.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-cream rounded-3xl flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">{searchQuery ? '🔍' : '📚'}</span>
            </div>
            {searchQuery ? (
              <div>
                <p className="text-xl font-display font-bold text-forest mb-2">Inga träffar</p>
                <p className="text-warm-gray">Inga recept hittades för "{searchQuery}"</p>
              </div>
            ) : (
              <div>
                <p className="text-xl font-display font-bold text-forest mb-2">Inga sparade recept ännu</p>
                <p className="text-warm-gray">Konvertera och spara ditt första recept!</p>
              </div>
            )}
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className="group bg-cream/50 hover:bg-cream rounded-2xl p-5 transition-all duration-200 cursor-pointer"
                onClick={() => setSelectedRecipe(recipe)}
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-display font-bold text-forest group-hover:text-forest-light transition-colors mb-1 truncate">
                      {recipe.title}
                    </h3>
                    {recipe.originalTitle && recipe.originalTitle !== recipe.title && (
                      <p className="text-sm text-warm-gray italic mb-3 truncate">
                        {recipe.originalTitle}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {recipe.servings && (
                        <span className="pill-yellow text-xs">🍽️ {recipe.servings}</span>
                      )}
                      {recipe.prepTime && (
                        <span className="pill-yellow text-xs">⏱️ {recipe.prepTime}</span>
                      )}
                      {recipe.cookTime && (
                        <span className="pill-yellow text-xs">🔥 {recipe.cookTime}</span>
                      )}
                    </div>
                    {recipe.savedAt && (
                      <p className="text-xs text-warm-gray-light">
                        Sparat {new Date(recipe.savedAt).toLocaleDateString('sv-SE', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(recipe.id);
                      }}
                      className="w-10 h-10 rounded-full bg-white/50 hover:bg-coral/10 flex items-center justify-center transition-all text-warm-gray hover:text-coral"
                      title="Ta bort"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                    <div className="w-10 h-10 rounded-full bg-forest/10 flex items-center justify-center text-forest group-hover:bg-forest group-hover:text-cream transition-all">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer count */}
        <div className="mt-8 pt-6 border-t-2 border-cream-dark text-center">
          <span className="pill-forest">
            {filteredRecipes.length} {filteredRecipes.length === 1 ? 'recept' : 'recept'}
            {searchQuery && ` för "${searchQuery}"`}
          </span>
        </div>
      </div>
    </div>
  );
}
