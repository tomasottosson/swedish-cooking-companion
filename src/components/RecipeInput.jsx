import { useState } from 'react';
import { imageToBase64 } from '../services/anthropicApi';

export default function RecipeInput({ onConvert, isLoading }) {
  const [inputType, setInputType] = useState('url');
  const [url, setUrl] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [recipeText, setRecipeText] = useState('');
  const [error, setError] = useState('');
  const [isDragging, setIsDragging] = useState(false);

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

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isLoading) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (isLoading) return;

    const file = e.dataTransfer.files[0];
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
          setError('Vänligen ange en URL');
          return;
        }

        // Basic URL validation
        try {
          new URL(url);
        } catch {
          setError('Vänligen ange en giltig URL');
          return;
        }

        onConvert({ type: 'url', url: url.trim() });
      } else if (inputType === 'image') {
        if (!imageFile) {
          setError('Vänligen välj en bild');
          return;
        }

        const base64Data = await imageToBase64(imageFile);
        onConvert({ type: 'image', imageData: base64Data });
      } else if (inputType === 'text') {
        if (!recipeText.trim()) {
          setError('Vänligen klistra in recepttext');
          return;
        }

        if (recipeText.trim().length < 50) {
          setError('Recepttexten är för kort. Klistra in hela receptet.');
          return;
        }

        onConvert({ type: 'text', text: recipeText.trim() });
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
    <div className="card animate-slide-up">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-2 h-12 bg-gradient-to-b from-saffron-500 to-terracotta-500 rounded-full"></div>
        <h2 className="text-4xl font-display font-bold text-charcoal-900">
          Konvertera recept
        </h2>
      </div>

      {/* Input Type Selector */}
      <div className="grid grid-cols-3 gap-4 mb-8 p-1.5 bg-cream-100 rounded-3xl">
        <button
          type="button"
          onClick={() => setInputType('url')}
          className={`py-4 px-6 rounded-2xl font-semibold transition-all duration-300 transform ${
            inputType === 'url'
              ? 'bg-gradient-to-r from-saffron-500 to-terracotta-500 text-white shadow-lg scale-105'
              : 'bg-transparent text-charcoal-600 hover:bg-white/50'
          }`}
        >
          <span className="text-2xl block mb-1">📎</span>
          <span className="text-sm">URL</span>
        </button>
        <button
          type="button"
          onClick={() => setInputType('text')}
          className={`py-4 px-6 rounded-2xl font-semibold transition-all duration-300 transform ${
            inputType === 'text'
              ? 'bg-gradient-to-r from-saffron-500 to-terracotta-500 text-white shadow-lg scale-105'
              : 'bg-transparent text-charcoal-600 hover:bg-white/50'
          }`}
        >
          <span className="text-2xl block mb-1">📝</span>
          <span className="text-sm">Text</span>
        </button>
        <button
          type="button"
          onClick={() => setInputType('image')}
          className={`py-4 px-6 rounded-2xl font-semibold transition-all duration-300 transform ${
            inputType === 'image'
              ? 'bg-gradient-to-r from-saffron-500 to-terracotta-500 text-white shadow-lg scale-105'
              : 'bg-transparent text-charcoal-600 hover:bg-white/50'
          }`}
        >
          <span className="text-2xl block mb-1">📷</span>
          <span className="text-sm">Bild</span>
        </button>
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {inputType === 'url' ? (
          <div>
            <label htmlFor="url" className="block text-base font-semibold text-charcoal-700 mb-3">
              Recept-URL
            </label>
            <input
              type="url"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/recept"
              className="input-field"
              disabled={isLoading}
            />
            <p className="text-sm text-sage-600 mt-2 flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 bg-sage-400 rounded-full"></span>
              Exempel: https://goop.com/recipes/thomas-keller-lemon-tart/
            </p>
          </div>
        ) : inputType === 'text' ? (
          <div>
            <label htmlFor="recipeText" className="block text-base font-semibold text-charcoal-700 mb-3">
              Recepttext
            </label>
            <textarea
              id="recipeText"
              value={recipeText}
              onChange={(e) => setRecipeText(e.target.value)}
              placeholder="Klistra in receptet här... Inkludera titel, ingredienser och instruktioner."
              className="input-field min-h-[300px] resize-y font-mono text-sm"
              disabled={isLoading}
            />
            <p className="text-sm text-sage-600 mt-2 flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 bg-sage-400 rounded-full"></span>
              Tips: Kopiera recepttexten från webbsidan (Ctrl+C) och klistra in här
            </p>
          </div>
        ) : (
          <div>
            <label htmlFor="image" className="block text-base font-semibold text-charcoal-700 mb-3">
              Receptbild
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
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`block w-full border-3 border-dashed rounded-3xl p-12 text-center cursor-pointer transition-all duration-300 ${
                isDragging
                  ? 'border-saffron-500 bg-saffron-50 scale-105 shadow-xl'
                  : 'border-cream-300 hover:border-sage-400 hover:bg-cream-50'
              }`}
            >
              {imagePreview ? (
                <div className="space-y-4">
                  <img
                    src={imagePreview}
                    alt="Recipe preview"
                    className="max-h-80 mx-auto rounded-2xl shadow-lg"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      clearImage();
                    }}
                    className="inline-flex items-center gap-2 px-6 py-2 bg-terracotta-100 text-terracotta-700 rounded-full font-medium hover:bg-terracotta-200 transition-colors"
                  >
                    <span>✕</span> Ta bort bild
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="text-6xl mb-4 animate-float">📷</div>
                  <p className="text-xl font-semibold text-charcoal-700">
                    {isDragging ? 'Släpp bilden här!' : 'Klicka eller dra en bild hit'}
                  </p>
                  <p className="text-sm text-sage-600 flex items-center justify-center gap-2">
                    <span className="inline-block w-1.5 h-1.5 bg-sage-400 rounded-full"></span>
                    Max storlek: 5MB
                  </p>
                </div>
              )}
            </label>
          </div>
        )}

        {error && (
          <div className="bg-terracotta-50 border-2 border-terracotta-300 text-terracotta-800 px-6 py-4 rounded-2xl flex items-start gap-3 animate-slide-up">
            <span className="text-2xl">⚠️</span>
            <p className="font-medium flex-1">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading || (
            inputType === 'url' ? !url.trim() :
            inputType === 'text' ? !recipeText.trim() :
            !imageFile
          )}
          className="btn-primary w-full text-lg"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-3">
              <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
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
              <span className="font-display">Konverterar recept...</span>
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <span className="text-2xl">✨</span>
              <span className="font-display">Konvertera till svenskt recept</span>
            </span>
          )}
        </button>
      </form>
    </div>
  );
}
