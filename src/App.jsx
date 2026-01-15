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

  const handleConvert = async (input) => {
    setIsLoading(true);
    setError(null);
    setProgressMessage('Starting conversion...');

    try {
      const recipe = await convertRecipe(input, apiKey, (message) => {
        setProgressMessage(message);
      });

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

  if (showApiKeySetup) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header apiKey={apiKey} onManageApiKey={handleManageApiKey} />
        <main className="container mx-auto px-4 py-8">
          <ApiKeySetup onApiKeySubmit={handleApiKeySubmit} existingApiKey={apiKey} />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header apiKey={apiKey} onManageApiKey={handleManageApiKey} />

      {/* Navigation Tabs */}
      <div className="bg-white shadow">
        <div className="container mx-auto px-4">
          <nav className="flex gap-4">
            <button
              onClick={() => setCurrentView('input')}
              className={`px-6 py-4 font-medium transition-colors ${
                currentView === 'input'
                  ? 'text-swedish-blue border-b-2 border-swedish-blue'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Konvertera recept
            </button>
            <button
              onClick={() => setCurrentView('saved')}
              className={`px-6 py-4 font-medium transition-colors ${
                currentView === 'saved'
                  ? 'text-swedish-blue border-b-2 border-swedish-blue'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Sparade recept ({storage.getRecipes().length})
            </button>
          </nav>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        {/* Loading State */}
        {isLoading && (
          <div className="card max-w-2xl mx-auto text-center">
            <div className="flex flex-col items-center gap-4">
              <svg className="animate-spin h-12 w-12 text-swedish-blue" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <div>
                <p className="text-lg font-medium text-gray-800">Konverterar recept...</p>
                {progressMessage && (
                  <p className="text-sm text-gray-600 mt-2">{progressMessage}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="card max-w-2xl mx-auto">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h3 className="text-red-800 font-semibold mb-2">Ett fel uppstod</h3>
              <p className="text-red-700">{error}</p>
              <button
                onClick={() => setError(null)}
                className="mt-4 btn-secondary text-sm"
              >
                Försök igen
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
      <footer className="bg-white border-t mt-12 py-6">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          <p>Swedish Cooking Companion - Powered by Claude AI</p>
          <p className="mt-1 text-xs">
            Your API key and recipes are stored locally in your browser
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
