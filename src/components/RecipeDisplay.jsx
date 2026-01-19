import { useState } from 'react';

export default function RecipeDisplay({ recipe, onSave, onClose }) {
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave(recipe);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error('Error saving recipe:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="card max-w-5xl mx-auto animate-slide-up">
      <div className="flex justify-between items-start mb-8">
        <div className="flex-1">
          <div className="inline-block">
            <h1 className="text-5xl font-display font-bold text-charcoal-900 mb-3 leading-tight">
              {recipe.title}
            </h1>
            <div className="h-1 bg-gradient-to-r from-saffron-500 to-terracotta-500 rounded-full w-3/4"></div>
          </div>
          {recipe.originalTitle && recipe.originalTitle !== recipe.title && (
            <p className="text-sage-600 italic mt-3 font-medium">
              Original: {recipe.originalTitle}
            </p>
          )}
        </div>
        <button
          onClick={onClose}
          className="text-charcoal-400 hover:text-charcoal-700 text-3xl leading-none w-10 h-10 flex items-center justify-center rounded-full hover:bg-cream-100 transition-all"
          title="Close"
        >
          ×
        </button>
      </div>

      {/* Recipe Meta Info */}
      <div className="flex flex-wrap gap-6 mb-8">
        {recipe.servings && (
          <div className="flex items-center gap-3 bg-cream-50 px-6 py-4 rounded-2xl border border-cream-200">
            <span className="text-3xl">🍽️</span>
            <div>
              <p className="text-xs font-semibold text-sage-600 uppercase tracking-wide">Portioner</p>
              <p className="text-lg font-bold text-charcoal-900">{recipe.servings}</p>
            </div>
          </div>
        )}
        {recipe.prepTime && (
          <div className="flex items-center gap-3 bg-saffron-50 px-6 py-4 rounded-2xl border border-saffron-200">
            <span className="text-3xl">⏱️</span>
            <div>
              <p className="text-xs font-semibold text-saffron-700 uppercase tracking-wide">Förberedelse</p>
              <p className="text-lg font-bold text-charcoal-900">{recipe.prepTime}</p>
            </div>
          </div>
        )}
        {recipe.cookTime && (
          <div className="flex items-center gap-3 bg-terracotta-50 px-6 py-4 rounded-2xl border border-terracotta-200">
            <span className="text-3xl">🔥</span>
            <div>
              <p className="text-xs font-semibold text-terracotta-700 uppercase tracking-wide">Tillagning</p>
              <p className="text-lg font-bold text-charcoal-900">{recipe.cookTime}</p>
            </div>
          </div>
        )}
      </div>

      {recipe.originalUrl && (
        <div className="mb-8 p-5 bg-sage-50 rounded-2xl border border-sage-200">
          <span className="text-sm font-semibold text-sage-700">Originalkälla: </span>
          <a
            href={recipe.originalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-saffron-600 hover:text-saffron-700 font-medium underline decoration-2 decoration-saffron-300 hover:decoration-saffron-500 transition-colors"
          >
            {recipe.originalUrl}
          </a>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-10 mb-10">
        {/* Ingredients */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <span className="text-4xl">🥘</span>
            <h2 className="text-3xl font-display font-bold text-charcoal-900">
              Ingredienser
            </h2>
          </div>
          <div className="bg-cream-50/50 rounded-2xl p-6 border border-cream-200">
            <ul className="space-y-3">
              {recipe.ingredients?.map((ingredient, index) => (
                <li key={index} className="flex items-start gap-3 group">
                  <span className="flex-shrink-0 w-2 h-2 bg-saffron-500 rounded-full mt-2.5 group-hover:scale-150 transition-transform"></span>
                  <span className="text-charcoal-700 leading-relaxed font-medium">{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Instructions */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <span className="text-4xl">👨‍🍳</span>
            <h2 className="text-3xl font-display font-bold text-charcoal-900">
              Instruktioner
            </h2>
          </div>
          <ol className="space-y-5">
            {recipe.instructions?.map((instruction, index) => (
              <li key={index} className="flex gap-4 group">
                <span className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-terracotta-500 to-terracotta-600 text-white rounded-full flex items-center justify-center text-lg font-bold shadow-lg group-hover:scale-110 transition-transform">
                  {index + 1}
                </span>
                <span className="text-charcoal-700 flex-1 leading-relaxed pt-1.5">{instruction}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Swedish Adaptation Notes */}
      {recipe.notes && recipe.notes.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-4xl">🇸🇪</span>
            <h2 className="text-3xl font-display font-bold text-charcoal-900">
              Svenska anpassningar
            </h2>
          </div>
          <div className="bg-gradient-to-br from-sage-50 to-sage-100 border-2 border-sage-300 rounded-3xl p-6 shadow-lg">
            <ul className="space-y-4">
              {recipe.notes.map((note, index) => (
                <li key={index} className="flex items-start gap-4 p-4 bg-white/60 rounded-2xl backdrop-blur-sm">
                  <span className="flex-shrink-0 text-3xl">💡</span>
                  <span className="text-sage-900 leading-relaxed font-medium">{note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-5 pt-8 border-t-2 border-cream-200">
        <button onClick={handleSave} disabled={isSaving} className="btn-primary flex-1">
          {isSaving ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Sparar...
            </span>
          ) : saveSuccess ? (
            <span className="flex items-center justify-center gap-2">
              <span className="text-2xl">✓</span> Sparat!
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <span className="text-2xl">💾</span> Spara recept
            </span>
          )}
        </button>
        <button
          onClick={() => {
            const recipeText = `${recipe.title}\n\n${
              recipe.originalTitle ? `Original: ${recipe.originalTitle}\n\n` : ''
            }Ingredienser:\n${recipe.ingredients?.join('\n')}\n\nInstruktioner:\n${recipe.instructions
              ?.map((i, idx) => `${idx + 1}. ${i}`)
              .join('\n')}`;
            navigator.clipboard.writeText(recipeText);
          }}
          className="btn-secondary"
        >
          📋 Kopiera
        </button>
      </div>
    </div>
  );
}
