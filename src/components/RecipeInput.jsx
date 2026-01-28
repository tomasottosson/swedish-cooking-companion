import { useState } from 'react';
import { imageToBase64, MODELS } from '../services/anthropicApi';

export default function RecipeInput({ onConvert, isLoading }) {
  const [inputType, setInputType] = useState('url');
  const [url, setUrl] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [recipeText, setRecipeText] = useState('');
  const [error, setError] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [useQuickMode, setUseQuickMode] = useState(true);

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

        onConvert({ type: 'url', url: url.trim() }, { useQuickMode });
      } else if (inputType === 'image') {
        if (!imageFile) {
          setError('Vänligen välj en bild');
          return;
        }

        const base64Data = await imageToBase64(imageFile);
        onConvert({ type: 'image', imageData: base64Data }, { useQuickMode });
      } else if (inputType === 'text') {
        if (!recipeText.trim()) {
          setError('Vänligen klistra in recepttext');
          return;
        }

        if (recipeText.trim().length < 50) {
          setError('Recepttexten är för kort. Klistra in hela receptet.');
          return;
        }

        onConvert({ type: 'text', text: recipeText.trim() }, { useQuickMode });
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const clearImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const inputTypes = [
    { id: 'url', icon: '🔗', label: 'URL' },
    { id: 'text', icon: '📝', label: 'Text' },
    { id: 'image', icon: '📷', label: 'Bild' },
  ];

  return (
    <div className="card relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-warm-yellow/20 rounded-full"></div>
      <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-coral/10 rounded-full"></div>

      <div className="relative">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-display font-bold text-forest mb-2">
            Konvertera recept
          </h2>
          <p className="text-warm-gray">
            Klistra in en länk, text eller ladda upp en bild
          </p>
        </div>

        {/* Input Type Selector - Pill style */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-cream rounded-full p-1.5 gap-1">
            {inputTypes.map((type) => (
              <button
                key={type.id}
                type="button"
                onClick={() => setInputType(type.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all duration-200 ${
                  inputType === type.id
                    ? 'bg-forest text-cream shadow-soft'
                    : 'text-warm-gray hover:text-forest'
                }`}
              >
                <span>{type.icon}</span>
                <span>{type.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {inputType === 'url' ? (
            <div className="space-y-3">
              <label htmlFor="url" className="block text-sm font-semibold text-forest">
                Recept-URL
              </label>
              <div className="relative">
                <input
                  type="url"
                  id="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com/recept"
                  className="input-field pl-12"
                  disabled={isLoading}
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-warm-gray-light">
                  🌐
                </span>
              </div>
              <p className="text-sm text-warm-gray">
                Exempel: https://goop.com/recipes/thomas-keller-lemon-tart/
              </p>
            </div>
          ) : inputType === 'text' ? (
            <div className="space-y-3">
              <label htmlFor="recipeText" className="block text-sm font-semibold text-forest">
                Recepttext
              </label>
              <textarea
                id="recipeText"
                value={recipeText}
                onChange={(e) => setRecipeText(e.target.value)}
                placeholder="Klistra in receptet här... Inkludera titel, ingredienser och instruktioner."
                className="input-field min-h-[280px] resize-y text-sm leading-relaxed"
                disabled={isLoading}
                spellCheck={false}
              />
              <p className="text-sm text-warm-gray">
                Tips: Kopiera recepttexten från webbsidan och klistra in här.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <label htmlFor="image" className="block text-sm font-semibold text-forest">
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
                className={`block w-full border-2 border-dashed rounded-3xl p-10 text-center cursor-pointer transition-all duration-200 ${
                  isDragging
                    ? 'border-warm-yellow bg-warm-yellow-light/30 scale-[1.02]'
                    : imagePreview
                    ? 'border-forest/30 bg-cream'
                    : 'border-cream-dark hover:border-forest/50 hover:bg-cream'
                }`}
              >
                {imagePreview ? (
                  <div className="space-y-4">
                    <img
                      src={imagePreview}
                      alt="Recipe preview"
                      className="max-h-64 mx-auto rounded-2xl shadow-soft"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        clearImage();
                      }}
                      className="text-sm text-coral hover:text-coral-dark font-medium"
                    >
                      Ta bort bild
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="w-16 h-16 bg-cream-dark rounded-2xl flex items-center justify-center mx-auto">
                      <span className="text-3xl">📷</span>
                    </div>
                    <p className="text-forest font-medium">
                      {isDragging ? 'Släpp bilden här' : 'Klicka eller dra en bild hit'}
                    </p>
                    <p className="text-sm text-warm-gray">Max storlek: 5MB</p>
                  </div>
                )}
              </label>
            </div>
          )}

          {error && (
            <div className="bg-coral/10 border-2 border-coral/30 text-coral-dark px-5 py-4 rounded-2xl flex items-start gap-3">
              <span className="text-xl">⚠️</span>
              <span className="font-medium">{error}</span>
            </div>
          )}

          {/* Speed Mode Toggle - Card style */}
          <div className="bg-cream rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  useQuickMode ? 'bg-warm-yellow' : 'bg-forest'
                }`}>
                  <span className="text-lg">{useQuickMode ? '⚡' : '✨'}</span>
                </div>
                <div>
                  <span className="font-semibold text-forest block">
                    {useQuickMode ? MODELS.fast.name : MODELS.quality.name}
                  </span>
                  <p className="text-sm text-warm-gray mt-0.5">
                    {useQuickMode ? MODELS.fast.description : MODELS.quality.description}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setUseQuickMode(!useQuickMode)}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-200 ${
                  useQuickMode ? 'bg-warm-yellow' : 'bg-forest'
                }`}
                disabled={isLoading}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-soft transition-transform duration-200 ${
                    useQuickMode ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || (
              inputType === 'url' ? !url.trim() :
              inputType === 'text' ? !recipeText.trim() :
              !imageFile
            )}
            className="btn-primary w-full text-lg py-4"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-3">
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
                Konverterar...
              </span>
            ) : (
              <>
                <span>🍳</span>
                <span>Konvertera till svenskt recept</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
