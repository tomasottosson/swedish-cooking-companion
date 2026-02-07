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
    <div className="card relative" role="region" aria-labelledby="saved-recipes-heading">
      {/* Decorative elements */}
      <div className="absolute -top-16 -right-16 w-48 h-48 bg-coral/10 rounded-full pointer-events-none" aria-hidden="true"></div>
      <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-terracotta/10 rounded-full pointer-events-none" aria-hidden="true"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex justify-between items-start gap-4 mb-8">
          <div className="min-w-0">
            <h2 id="saved-recipes-heading" className="text-3xl font-display font-bold text-teal mb-1">Sparade recept</h2>
            <p className="text-earth text-sm">Din samling av svenska recept</p>
          </div>
          <button
            onClick={() => setShowImportExport(!showImportExport)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all flex-shrink-0 ${
              showImportExport
                ? 'bg-teal text-cream'
                : 'bg-sand/50 text-earth hover:bg-sand'
            }`}
            aria-expanded={showImportExport}
            aria-controls="import-export-panel"
            aria-label={showImportExport ? 'Stäng hantering av recept' : 'Öppna hantering av recept'}
          >
            <span aria-hidden="true">{showImportExport ? '✕' : '⚙️'}</span>
            <span>{showImportExport ? 'Stäng' : 'Hantera'}</span>
          </button>
        </div>

        {showImportExport && (
          <div id="import-export-panel" className="mb-8 p-5 bg-sand/30 rounded-2xl">
            <div className="flex flex-wrap gap-3 mb-3">
              <button onClick={handleExport} className="btn-secondary text-sm">
                <span aria-hidden="true">📥</span>
                <span>Exportera recept</span>
              </button>
              <label className="btn-secondary text-sm cursor-pointer">
                <span aria-hidden="true">📤</span>
                <span>Importera recept</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImport}
                  className="sr-only"
                  aria-label="Välj JSON-fil att importera"
                />
              </label>
            </div>
            <p className="text-sm text-earth">
              Exportera skapar en JSON-fil med alla recept. Importera lägger till recept från fil.
            </p>
          </div>
        )}

        {/* Search */}
        <div className="mb-8">
          <label htmlFor="recipe-search" className="sr-only">Sök bland dina recept</label>
          <div className="relative">
            <input
              type="search"
              id="recipe-search"
              placeholder="Sök bland dina recept..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-12"
              aria-describedby="search-results-count"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-earth-light" aria-hidden="true">
              🔍
            </span>
          </div>
        </div>

        {/* Recipe List */}
        {filteredRecipes.length === 0 ? (
          <div className="text-center py-16" role="status" aria-live="polite">
            <div className="w-20 h-20 bg-sand/50 rounded-3xl flex items-center justify-center mx-auto mb-6" aria-hidden="true">
              <span className="text-4xl">{searchQuery ? '🔍' : '📚'}</span>
            </div>
            {searchQuery ? (
              <div>
                <p className="text-xl font-display font-bold text-teal mb-2">Inga träffar</p>
                <p className="text-earth">Inga recept hittades för "{searchQuery}"</p>
              </div>
            ) : (
              <div>
                <p className="text-xl font-display font-bold text-teal mb-2">Inga sparade recept ännu</p>
                <p className="text-earth">Konvertera och spara ditt första recept!</p>
              </div>
            )}
          </div>
        ) : (
          <ul className="grid gap-4" aria-label="Lista med sparade recept" role="list">
            {filteredRecipes.map((recipe) => (
              <li key={recipe.id}>
                <article
                  className="group bg-sand/20 hover:bg-sand/40 rounded-2xl p-5 transition-all duration-200 cursor-pointer"
                  onClick={() => setSelectedRecipe(recipe)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedRecipe(recipe);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={`Öppna recept: ${recipe.title}`}
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-display font-bold text-teal group-hover:text-teal-light transition-colors mb-1 truncate">
                        {recipe.title}
                      </h3>
                      {recipe.originalTitle && recipe.originalTitle !== recipe.title && (
                        <p className="text-sm text-earth italic mb-3 truncate">
                          {recipe.originalTitle}
                        </p>
                      )}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {recipe.servings && (
                          <span className="pill-sand text-xs"><span aria-hidden="true">🍽️</span> <span className="sr-only">Portioner: </span>{recipe.servings}</span>
                        )}
                        {recipe.prepTime && (
                          <span className="pill-sand text-xs"><span aria-hidden="true">⏱️</span> <span className="sr-only">Förberedelsetid: </span>{recipe.prepTime}</span>
                        )}
                        {recipe.cookTime && (
                          <span className="pill-sand text-xs"><span aria-hidden="true">🔥</span> <span className="sr-only">Tillagningstid: </span>{recipe.cookTime}</span>
                        )}
                      </div>
                      {recipe.savedAt && (
                        <p className="text-xs text-earth-light">
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
                        className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-white/50 hover:bg-coral/10 flex items-center justify-center transition-all text-earth hover:text-coral"
                        aria-label={`Ta bort recept: ${recipe.title}`}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                      <div className="w-11 h-11 rounded-full bg-teal/10 flex items-center justify-center text-teal group-hover:bg-teal group-hover:text-cream transition-all" aria-hidden="true">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        )}

        {/* Footer count */}
        <div className="mt-8 pt-6 border-t-2 border-sand text-center">
          <span id="search-results-count" className="pill-teal" role="status" aria-live="polite">
            {filteredRecipes.length} {filteredRecipes.length === 1 ? 'recept' : 'recept'}
            {searchQuery && ` för "${searchQuery}"`}
          </span>
        </div>
      </div>
    </div>
  );
}
