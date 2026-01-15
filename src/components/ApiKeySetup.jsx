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
      <h2 className="text-2xl font-bold mb-4 text-gray-800">API Key Setup</h2>
      <p className="text-gray-600 mb-6">
        This app uses the Anthropic Claude API to convert recipes. You'll need your own API key to use the app.
      </p>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-blue-900 mb-2">How to get your API key:</h3>
        <ol className="list-decimal list-inside space-y-1 text-sm text-blue-800">
          <li>Visit <a href="https://console.anthropic.com/" target="_blank" rel="noopener noreferrer" className="underline">console.anthropic.com</a></li>
          <li>Sign up or log in to your account</li>
          <li>Navigate to API Keys section</li>
          <li>Create a new API key</li>
          <li>Copy and paste it below</li>
        </ol>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-2">
            Anthropic API Key
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
              {showKey ? 'Hide' : 'Show'}
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Your API key is stored locally in your browser and never sent anywhere except to Anthropic.
          </p>
        </div>

        <button type="submit" className="btn-primary w-full">
          Save API Key
        </button>
      </form>
    </div>
  );
}
