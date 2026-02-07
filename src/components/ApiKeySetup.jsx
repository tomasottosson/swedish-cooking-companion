import { useState, useEffect, useRef } from 'react';

export default function ApiKeySetup({ onApiKeySubmit, existingApiKey, onClose }) {
  const [apiKey, setApiKey] = useState(existingApiKey || '');
  const [showKey, setShowKey] = useState(false);
  const containerRef = useRef(null);
  const closeButtonRef = useRef(null);

  // Handle Escape key to close and focus trap
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && existingApiKey && onClose) {
        onClose();
      }

      // Focus trap for modal-like behavior
      if (e.key === 'Tab' && containerRef.current) {
        const focusableElements = containerRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [existingApiKey, onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (apiKey.trim()) {
      onApiKeySubmit(apiKey.trim());
    }
  };

  return (
    <div
      ref={containerRef}
      className="card max-w-2xl mx-auto relative overflow-hidden"
      role="region"
      aria-labelledby="api-key-heading"
    >
      {/* Decorative elements */}
      <div className="absolute -top-16 -right-16 w-48 h-48 bg-coral/15 rounded-full" aria-hidden="true"></div>
      <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-teal/10 rounded-full" aria-hidden="true"></div>

      {/* Close button - only show if user already has an API key */}
      {existingApiKey && onClose && (
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="absolute top-4 right-4 w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-sand/50 hover:bg-sand flex items-center justify-center transition-colors text-earth hover:text-teal z-10"
          aria-label="Stäng inställningar (Esc)"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}

      <div className="relative">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-coral/20 rounded-2xl flex items-center justify-center mx-auto mb-4 rotate-3" aria-hidden="true">
            <span className="text-3xl">🔑</span>
          </div>
          <h2 id="api-key-heading" className="text-3xl font-display font-bold text-teal mb-2">API-nyckel</h2>
          <p className="text-earth">
            Anslut din Anthropic API-nyckel för att börja konvertera recept
          </p>
        </div>

        {/* Info card */}
        <div className="bg-teal/5 border-2 border-teal/10 rounded-2xl p-5 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-teal/15 rounded-xl flex items-center justify-center flex-shrink-0" aria-hidden="true">
              <span className="text-lg">💡</span>
            </div>
            <div>
              <h3 className="font-semibold text-teal mb-3">Så här får du din API-nyckel:</h3>
              <ol className="space-y-2 text-sm text-earth-dark" aria-label="Steg för att få API-nyckel">
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 bg-coral/20 rounded-full flex items-center justify-center text-xs font-bold text-coral-dark flex-shrink-0" aria-hidden="true">1</span>
                  <span>Besök <a href="https://console.anthropic.com/" target="_blank" rel="noopener noreferrer" className="text-teal underline underline-offset-2 hover:text-teal-light">console.anthropic.com</a></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 bg-coral/20 rounded-full flex items-center justify-center text-xs font-bold text-coral-dark flex-shrink-0" aria-hidden="true">2</span>
                  <span>Registrera dig eller logga in</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 bg-coral/20 rounded-full flex items-center justify-center text-xs font-bold text-coral-dark flex-shrink-0" aria-hidden="true">3</span>
                  <span>Navigera till API Keys-sektionen</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 bg-coral/20 rounded-full flex items-center justify-center text-xs font-bold text-coral-dark flex-shrink-0" aria-hidden="true">4</span>
                  <span>Skapa en ny API-nyckel och klistra in den nedan</span>
                </li>
              </ol>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="apiKey" className="block text-sm font-semibold text-teal mb-2">
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
                aria-describedby="api-key-security-note"
                autoComplete="off"
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-full bg-sand/50 text-sm text-teal font-medium hover:bg-sand transition-colors"
                aria-pressed={showKey}
              >
                <span aria-hidden="true">{showKey ? '🙈' : '👁️'}</span>
                <span className="ml-1">{showKey ? 'Dölj' : 'Visa'}</span>
                <span className="sr-only"> API-nyckel</span>
              </button>
            </div>
          </div>

          {/* Security note */}
          <div className="flex items-start gap-3 bg-sand/30 rounded-2xl p-4" id="api-key-security-note">
            <span className="text-lg" aria-hidden="true">🔒</span>
            <p className="text-sm text-earth">
              Din API-nyckel lagras endast lokalt i din webbläsare och skickas aldrig någon annanstans än direkt till Anthropic.
            </p>
          </div>

          <button type="submit" className="btn-primary w-full text-lg py-4">
            <span aria-hidden="true">✨</span>
            <span>Spara och börja</span>
          </button>
        </form>
      </div>
    </div>
  );
}
