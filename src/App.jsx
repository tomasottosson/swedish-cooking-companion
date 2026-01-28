import { useState, useEffect } from 'react';
import Header from './components/Header';
import ApiKeySetup from './components/ApiKeySetup';
import RecipeInput from './components/RecipeInput';
import RecipeDisplay from './components/RecipeDisplay';
import SavedRecipes from './components/SavedRecipes';
import { storage } from './utils/storage';
import { convertRecipe } from './services/anthropicApi';

function App() {
  const [apiKey, setApiKey] = useState(null);
  const [showApiKeySetup, setShowApiKeySetup] = useState(false);
  const [currentView, setCurrentView] = useState('input'); // 'input' | 'display' | 'saved'
  const [convertedRecipe, setConvertedRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [progressMessage, setProgressMessage] = useState('');

  useEffect(() => {
    // Load API key from storage on mount
    const savedApiKey = storage.getApiKey();
    if (savedApiKey) {
      setApiKey(savedApiKey);
    } else {
      setShowApiKeySetup(true);
    }
  }, []);

  const handleApiKeySubmit = (key) => {
    storage.saveApiKey(key);
    setApiKey(key);
    setShowApiKeySetup(false);
  };

  const handleManageApiKey = () => {
    setShowApiKeySetup(true);
    setCurrentView('input');
  };

  const handleConvert = async (input, options = {}) => {
    setIsLoading(true);
    setError(null);
    setProgressMessage('Starting conversion...');

    try {
      const recipe = await convertRecipe(input, apiKey, (message) => {
        setProgressMessage(message);
      }, options);

      setConvertedRecipe(recipe);
      setCurrentView('display');
    } catch (err) {
      console.error('Conversion error:', err);
      setError(err.message || 'Failed to convert recipe');
    } finally {
      setIsLoading(false);
      setProgressMessage('');
    }
  };

  const handleSaveRecipe = (recipe) => {
    storage.saveRecipe(recipe);
  };

  const handleCloseRecipe = () => {
    setConvertedRecipe(null);
    setCurrentView('input');
  };

  const savedRecipesCount = storage.getRecipes().length;

  if (showApiKeySetup) {
    return (
      <div className="min-h-screen bg-cream">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-forest focus:text-cream focus:px-4 focus:py-2 focus:rounded-lg">
          Hoppa till huvudinnehåll
        </a>
        <Header apiKey={apiKey} onManageApiKey={handleManageApiKey} />
        <main id="main-content" className="container mx-auto px-4 py-8">
          <ApiKeySetup
            onApiKeySubmit={handleApiKeySubmit}
            existingApiKey={apiKey}
            onClose={apiKey ? () => setShowApiKeySetup(false) : null}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream relative overflow-hidden">
      {/* Skip link for keyboard navigation */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-forest focus:text-cream focus:px-4 focus:py-2 focus:rounded-lg">
        Hoppa till huvudinnehåll
      </a>

      {/* Background decorative elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-warm-yellow/20 rounded-full blur-3xl"></div>
        <div className="absolute top-3/4 -right-32 w-80 h-80 bg-coral/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-forest/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative">
        <Header apiKey={apiKey} onManageApiKey={handleManageApiKey} />

        {/* Navigation Tabs */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-cream-dark sticky top-0 z-10">
          <div className="container mx-auto px-6">
            <nav className="flex items-center justify-center gap-2 py-4" aria-label="Huvudnavigering">
              <div className="inline-flex bg-cream rounded-full p-1.5" role="tablist" aria-label="Applikationsvyer">
                <button
                  role="tab"
                  aria-selected={currentView === 'input' || currentView === 'display'}
                  aria-controls="main-content"
                  onClick={() => setCurrentView('input')}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-medium transition-all duration-200 ${
                    currentView === 'input' || currentView === 'display'
                      ? 'bg-forest text-cream shadow-soft'
                      : 'text-warm-gray hover:text-forest'
                  }`}
                >
                  <span aria-hidden="true">🍳</span>
                  <span>Konvertera</span>
                </button>
                <button
                  role="tab"
                  aria-selected={currentView === 'saved'}
                  aria-controls="main-content"
                  onClick={() => setCurrentView('saved')}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-medium transition-all duration-200 ${
                    currentView === 'saved'
                      ? 'bg-forest text-cream shadow-soft'
                      : 'text-warm-gray hover:text-forest'
                  }`}
                >
                  <span aria-hidden="true">📚</span>
                  <span>Sparade</span>
                  {savedRecipesCount > 0 && (
                    <span className="bg-warm-yellow text-forest text-xs font-bold px-2 py-0.5 rounded-full" aria-label={`${savedRecipesCount} sparade recept`}>
                      {savedRecipesCount}
                    </span>
                  )}
                </button>
              </div>
            </nav>
          </div>
        </div>

        <main id="main-content" className="container mx-auto px-6 py-10" role="tabpanel">
          {/* Loading State */}
          {isLoading && (
            <div className="card max-w-lg mx-auto text-center relative overflow-hidden" role="status" aria-busy="true" aria-live="polite">
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-br from-warm-yellow/20 via-transparent to-coral/10" aria-hidden="true"></div>

              <div className="relative flex flex-col items-center gap-6 py-8">
                {/* Cooking animation */}
                <div className="relative" aria-hidden="true">
                  <div className="w-20 h-20 bg-warm-yellow rounded-3xl flex items-center justify-center animate-float">
                    <span className="text-4xl">🍳</span>
                  </div>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 h-3 bg-forest/10 rounded-full blur-sm"></div>
                </div>

                <div className="space-y-2">
                  <p className="text-2xl font-display font-bold text-forest">Konverterar...</p>
                  {progressMessage && (
                    <p className="text-warm-gray" aria-live="polite">{progressMessage}</p>
                  )}
                </div>

                {/* Progress dots */}
                <div className="flex gap-2" aria-hidden="true">
                  <span className="w-3 h-3 bg-forest rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-3 h-3 bg-forest rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-3 h-3 bg-forest rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && !isLoading && (
            <div className="card max-w-lg mx-auto relative overflow-hidden" role="alert" aria-live="assertive">
              <div className="absolute top-0 right-0 w-32 h-32 bg-coral/10 rounded-full -translate-y-1/2 translate-x-1/2" aria-hidden="true"></div>

              <div className="relative">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 bg-coral/20 rounded-2xl flex items-center justify-center flex-shrink-0" aria-hidden="true">
                    <span className="text-3xl">😕</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-bold text-forest mb-2">Något gick fel</h3>
                    <p className="text-warm-gray">{error}</p>
                  </div>
                </div>
                <button
                  onClick={() => setError(null)}
                  className="btn-primary w-full"
                >
                  <span aria-hidden="true">🔄</span>
                  <span>Försök igen</span>
                </button>
              </div>
            </div>
          )}

          {/* Main Content */}
          {!isLoading && !error && (
            <>
              {currentView === 'input' && (
                <div className="max-w-2xl mx-auto">
                  <RecipeInput onConvert={handleConvert} isLoading={isLoading} />
                </div>
              )}

              {currentView === 'display' && convertedRecipe && (
                <RecipeDisplay
                  recipe={convertedRecipe}
                  onSave={handleSaveRecipe}
                  onClose={handleCloseRecipe}
                />
              )}

              {currentView === 'saved' && (
                <div className="max-w-4xl mx-auto">
                  <SavedRecipes />
                </div>
              )}
            </>
          )}
        </main>

        {/* Footer */}
        <footer className="relative mt-16 py-10 border-t border-cream-dark" role="contentinfo">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-forest rounded-xl flex items-center justify-center" aria-hidden="true">
                  <span className="text-lg">🍳</span>
                </div>
                <div>
                  <p className="font-display font-bold text-forest">Swedish Cooking Companion.</p>
                  <p className="text-sm text-warm-gray">Powered by Claude AI</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-warm-gray">
                <span className="w-2 h-2 bg-forest rounded-full" aria-hidden="true"></span>
                <span>Din data lagras lokalt i din webbläsare</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
