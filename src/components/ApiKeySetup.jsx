import { useState, useEffect } from 'react';

export default function ApiKeySetup({ onApiKeySubmit, existingApiKey, onClose }) {
  const [apiKey, setApiKey] = useState(existingApiKey || '');
  const [showKey, setShowKey] = useState(false);

  // Handle Escape key to close
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && existingApiKey && onClose) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [existingApiKey, onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (apiKey.trim()) {
      onApiKeySubmit(apiKey.trim());
    }
  };

  return (
    <div className="card max-w-2xl mx-auto relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -top-16 -right-16 w-48 h-48 bg-warm-yellow/20 rounded-full"></div>
      <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-forest/10 rounded-full"></div>

      {/* Close button - only show if user already has an API key */}
      {existingApiKey && onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-cream hover:bg-cream-dark flex items-center justify-center transition-colors text-warm-gray hover:text-forest z-10"
          title="Stäng (Esc)"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}

      <div className="relative">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-warm-yellow rounded-2xl flex items-center justify-center mx-auto mb-4 rotate-3">
            <span className="text-3xl">🔑</span>
          </div>
          <h2 className="text-3xl font-display font-bold text-forest mb-2">API-nyckel</h2>
          <p className="text-warm-gray">
            Anslut din Anthropic API-nyckel för att börja konvertera recept
          </p>
        </div>

        {/* Info card */}
        <div className="bg-forest/5 border-2 border-forest/10 rounded-2xl p-5 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-forest rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-lg">💡</span>
            </div>
            <div>
              <h3 className="font-semibold text-forest mb-3">Så här får du din API-nyckel:</h3>
              <ol className="space-y-2 text-sm text-warm-gray-dark">
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 bg-warm-yellow rounded-full flex items-center justify-center text-xs font-bold text-forest flex-shrink-0">1</span>
                  <span>Besök <a href="https://console.anthropic.com/" target="_blank" rel="noopener noreferrer" className="text-forest underline underline-offset-2 hover:text-forest-light">console.anthropic.com</a></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 bg-warm-yellow rounded-full flex items-center justify-center text-xs font-bold text-forest flex-shrink-0">2</span>
                  <span>Registrera dig eller logga in</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 bg-warm-yellow rounded-full flex items-center justify-center text-xs font-bold text-forest flex-shrink-0">3</span>
                  <span>Navigera till API Keys-sektionen</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 bg-warm-yellow rounded-full flex items-center justify-center text-xs font-bold text-forest flex-shrink-0">4</span>
                  <span>Skapa en ny API-nyckel och klistra in den nedan</span>
                </li>
              </ol>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="apiKey" className="block text-sm font-semibold text-forest mb-2">
              Anthropic API-nyckel
            </label>
            <div className="relative">
              <input
                type={showKey ? 'text' : 'password'}
                id="apiKey"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-ant-..."
                className="input-field pr-24 font-mono"
                required
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-full bg-cream text-sm text-forest font-medium hover:bg-cream-dark transition-colors"
              >
                {showKey ? '🙈 Dölj' : '👁️ Visa'}
              </button>
            </div>
          </div>

          {/* Security note */}
          <div className="flex items-start gap-3 bg-cream rounded-2xl p-4">
            <span className="text-lg">🔒</span>
            <p className="text-sm text-warm-gray">
              Din API-nyckel lagras endast lokalt i din webbläsare och skickas aldrig någon annanstans än direkt till Anthropic.
            </p>
          </div>

          <button type="submit" className="btn-primary w-full text-lg py-4">
            <span>✨</span>
            <span>Spara och börja</span>
          </button>
        </form>
      </div>
    </div>
  );
}
