import { useState } from 'react';
import { imageToBase64 } from '../services/anthropicApi';

export default function RecipeInput({ onConvert, isLoading }) {
  const [inputType, setInputType] = useState('url');
  const [url, setUrl] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState('');

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setError('');

    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be smaller than 5MB');
      return;
    }

    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    setImageFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (inputType === 'url') {
        if (!url.trim()) {
          setError('Please enter a URL');
          return;
        }

        // Basic URL validation
        try {
          new URL(url);
        } catch {
          setError('Please enter a valid URL');
          return;
        }

        onConvert({ type: 'url', url: url.trim() });
      } else {
        if (!imageFile) {
          setError('Please select an image');
          return;
        }

        const base64Data = await imageToBase64(imageFile);
        onConvert({ type: 'image', imageData: base64Data });
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const clearImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Convert Recipe</h2>

      {/* Input Type Selector */}
      <div className="flex gap-4 mb-6">
        <button
          type="button"
          onClick={() => setInputType('url')}
          className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
            inputType === 'url'
              ? 'bg-swedish-blue text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          📎 URL
        </button>
        <button
          type="button"
          onClick={() => setInputType('image')}
          className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
            inputType === 'image'
              ? 'bg-swedish-blue text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          📷 Image
        </button>
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {inputType === 'url' ? (
          <div>
            <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
              Recipe URL
            </label>
            <input
              type="url"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/recipe"
              className="input-field"
              disabled={isLoading}
            />
            <p className="text-xs text-gray-500 mt-1">
              Example: https://goop.com/recipes/thomas-keller-lemon-tart/
            </p>
          </div>
        ) : (
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
              Recipe Image
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              disabled={isLoading}
            />
            <label
              htmlFor="image"
              className="block w-full border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-swedish-blue transition-colors"
            >
              {imagePreview ? (
                <div className="space-y-2">
                  <img
                    src={imagePreview}
                    alt="Recipe preview"
                    className="max-h-64 mx-auto rounded"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      clearImage();
                    }}
                    className="text-sm text-red-600 hover:text-red-700"
                  >
                    Remove image
                  </button>
                </div>
              ) : (
                <div>
                  <div className="text-4xl mb-2">📷</div>
                  <p className="text-gray-600">Click to upload an image</p>
                  <p className="text-xs text-gray-500 mt-1">Max size: 5MB</p>
                </div>
              )}
            </label>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading || (inputType === 'url' ? !url.trim() : !imageFile)}
          className="btn-primary w-full"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
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
              Converting...
            </span>
          ) : (
            'Convert to Swedish Recipe'
          )}
        </button>
      </form>
    </div>
  );
}
