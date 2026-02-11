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
      <div className="min-h-screen bg-terracotta">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-teal focus:text-cream focus:px-4 focus:py-2 focus:rounded-lg">
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
    <div className="min-h-screen bg-terracotta relative overflow-hidden">
      {/* Skip link for keyboard navigation */}
      <a href="#main-content" className="skip-link">
        Hoppa till huvudinnehåll
      </a>

      {/* Background food-inspired decorative elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Gentle steam waves rising from bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 320" className="w-full opacity-15" preserveAspectRatio="none">
            <path fill="#C4693F" d="M0,256L40,250.7C80,245,160,235,240,218.7C320,203,400,181,480,186.7C560,192,640,224,720,234.7C800,245,880,235,960,218.7C1040,203,1120,181,1200,186.7C1280,192,1360,224,1400,240L1440,256L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z" />
          </svg>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 320" className="w-full opacity-10" preserveAspectRatio="none">
            <path fill="#B5C9A0" d="M0,288L60,272C120,256,240,224,360,229.3C480,235,600,267,720,272C840,277,960,256,1080,240C1200,224,1320,213,1380,208L1440,203L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z" />
          </svg>
        </div>
        {/* Whisk silhouette */}
        <svg className="absolute bottom-16 left-10 w-10 h-36 opacity-10" viewBox="0 0 40 140">
          <rect x="17" y="70" width="6" height="60" rx="3" fill="#5A4D40" />
          <ellipse cx="20" cy="40" rx="12" ry="38" fill="none" stroke="#5A4D40" strokeWidth="3" />
          <line x1="20" y1="4" x2="20" y2="76" stroke="#5A4D40" strokeWidth="2" />
          <path d="M12,8 Q20,45 28,8" fill="none" stroke="#5A4D40" strokeWidth="2" />
          <path d="M10,15 Q20,55 30,15" fill="none" stroke="#5A4D40" strokeWidth="2" />
        </svg>
        {/* Rolling pin silhouette */}
        <svg className="absolute bottom-24 right-8 w-48 h-16 opacity-10" viewBox="0 0 200 60">
          <rect x="40" y="18" width="120" height="24" rx="12" fill="#5A4D40" />
          <rect x="10" y="24" width="35" height="12" rx="6" fill="#5A4D40" />
          <rect x="155" y="24" width="35" height="12" rx="6" fill="#5A4D40" />
        </svg>
        {/* Herb sprig (dill) */}
        <svg className="absolute bottom-32 left-1/4 w-14 h-28 opacity-10" viewBox="0 0 50 100">
          <path d="M25,95 Q25,50 25,10" fill="none" stroke="#5A8042" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M25,30 Q10,18 8,8" fill="none" stroke="#5A8042" strokeWidth="2" strokeLinecap="round" />
          <path d="M25,30 Q40,18 42,8" fill="none" stroke="#5A8042" strokeWidth="2" strokeLinecap="round" />
          <path d="M25,50 Q12,40 7,30" fill="none" stroke="#5A8042" strokeWidth="2" strokeLinecap="round" />
          <path d="M25,50 Q38,40 43,30" fill="none" stroke="#5A8042" strokeWidth="2" strokeLinecap="round" />
          <path d="M25,70 Q14,62 10,52" fill="none" stroke="#5A8042" strokeWidth="2" strokeLinecap="round" />
          <path d="M25,70 Q36,62 40,52" fill="none" stroke="#5A8042" strokeWidth="2" strokeLinecap="round" />
        </svg>
        {/* Cooking pot silhouette */}
        <svg className="absolute bottom-12 right-1/4 w-20 h-20 opacity-8" viewBox="0 0 80 80">
          <rect x="8" y="25" width="64" height="45" rx="6" fill="#5A4D40" />
          <rect x="4" y="22" width="72" height="8" rx="4" fill="#5A4D40" />
          <rect x="0" y="32" width="10" height="6" rx="3" fill="#5A4D40" />
          <rect x="70" y="32" width="10" height="6" rx="3" fill="#5A4D40" />
          <path d="M28,18 Q30,6 32,14" fill="none" stroke="#5A4D40" strokeWidth="2" strokeLinecap="round" />
          <path d="M40,16 Q42,4 44,12" fill="none" stroke="#5A4D40" strokeWidth="2" strokeLinecap="round" />
          <path d="M52,18 Q54,6 56,14" fill="none" stroke="#5A4D40" strokeWidth="2" strokeLinecap="round" />
        </svg>
        {/* Wooden spoon silhouette */}
        <svg className="absolute top-1/3 right-6 w-8 h-32 opacity-8" viewBox="0 0 30 120">
          <ellipse cx="15" cy="18" rx="12" ry="16" fill="#5A4D40" />
          <ellipse cx="15" cy="18" rx="6" ry="9" fill="#C4693F" opacity="0.3" />
          <rect x="12" y="32" width="6" height="78" rx="3" fill="#5A4D40" />
        </svg>
      </div>

      <div className="relative">
        <Header apiKey={apiKey} onManageApiKey={handleManageApiKey} />

        {/* Navigation Tabs */}
        <div className="bg-cream/90 backdrop-blur-sm border-b border-sand sticky top-0 z-10">
          <div className="container mx-auto px-6">
            <nav className="flex items-center justify-center gap-2 py-4" aria-label="Huvudnavigering">
              <div className="inline-flex bg-sand/50 rounded-full p-1.5" role="tablist" aria-label="Applikationsvyer">
                <button
                  role="tab"
                  aria-selected={currentView === 'input' || currentView === 'display'}
                  aria-controls="main-content"
                  onClick={() => setCurrentView('input')}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-medium transition-all duration-200 ${
                    currentView === 'input' || currentView === 'display'
                      ? 'bg-teal text-cream shadow-soft'
                      : 'text-earth hover:text-teal'
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
                      ? 'bg-teal text-cream shadow-soft'
                      : 'text-earth hover:text-teal'
                  }`}
                >
                  <span aria-hidden="true">📚</span>
                  <span>Sparade</span>
                  {savedRecipesCount > 0 && (
                    <span className="bg-coral text-white text-xs font-bold px-2 py-0.5 rounded-full" aria-label={`${savedRecipesCount} sparade recept`}>
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
              <div className="absolute inset-0 bg-gradient-to-br from-coral/10 via-transparent to-terracotta/5" aria-hidden="true"></div>

              <div className="relative flex flex-col items-center gap-6 py-8">
                {/* Cooking animation */}
                <div className="relative" aria-hidden="true">
                  <div className="w-20 h-20 bg-coral/20 rounded-3xl flex items-center justify-center animate-float">
                    <span className="text-4xl">🍳</span>
                  </div>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 h-3 bg-earth/10 rounded-full blur-sm"></div>
                </div>

                <div className="space-y-2">
                  <p className="text-2xl font-display font-bold text-teal">Konverterar...</p>
                  {progressMessage && (
                    <p className="text-earth" aria-live="polite">{progressMessage}</p>
                  )}
                </div>

                {/* Progress dots */}
                <div className="flex gap-2" aria-hidden="true">
                  <span className="w-3 h-3 bg-coral rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-3 h-3 bg-coral rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-3 h-3 bg-coral rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
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
                    <h3 className="text-xl font-display font-bold text-teal mb-2">Något gick fel</h3>
                    <p className="text-earth">{error}</p>
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
        <footer className="relative mt-16 py-10 border-t border-sand" role="contentinfo">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-teal/10 rounded-xl flex items-center justify-center" aria-hidden="true">
                  <span className="text-lg">🍳</span>
                </div>
                <div>
                  <p className="font-display font-bold text-teal">Swedish Cooking Companion.</p>
                  <p className="text-sm text-earth-light">Powered by Claude AI</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-earth-light">
                <span className="w-2 h-2 bg-olive rounded-full" aria-hidden="true"></span>
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
