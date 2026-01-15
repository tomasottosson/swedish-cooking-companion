import { useState } from 'react';

export default function ApiKeySetup({ onApiKeySubmit, existingApiKey }) {
  const [apiKey, setApiKey] = useState(existingApiKey || '');
  const [showKey, setShowKey] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (apiKey.trim()) {
      onApiKeySubmit(apiKey.trim());
    }
  };

  return (
    <div className="card max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">API-nyckel inställning</h2>
      <p className="text-gray-600 mb-6">
        Denna app använder Anthropic Claude API för att konvertera recept. Du behöver din egen API-nyckel för att använda appen.
      </p>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-blue-900 mb-2">Så här får du din API-nyckel:</h3>
        <ol className="list-decimal list-inside space-y-1 text-sm text-blue-800">
          <li>Besök <a href="https://console.anthropic.com/" target="_blank" rel="noopener noreferrer" className="underline">console.anthropic.com</a></li>
          <li>Registrera dig eller logga in</li>
          <li>Navigera till API Keys-sektionen</li>
          <li>Skapa en ny API-nyckel</li>
          <li>Kopiera och klistra in den nedan</li>
        </ol>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-2">
            Anthropic API-nyckel
          </label>
          <div className="relative">
            <input
              type={showKey ? 'text' : 'password'}
              id="apiKey"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-ant-..."
              className="input-field pr-24"
              required
            />
            <button
              type="button"
              onClick={() => setShowKey(!showKey)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-swedish-blue hover:text-blue-700"
            >
              {showKey ? 'Dölj' : 'Visa'}
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Din API-nyckel lagras lokalt i din webbläsare och skickas aldrig någon annanstans än till Anthropic.
          </p>
        </div>

        <button type="submit" className="btn-primary w-full">
          Spara API-nyckel
        </button>
      </form>
    </div>
  );
}
