import { useState } from 'react';

// Parse simple markdown: **bold** and *italic*
function parseMarkdown(text) {
  const parts = [];
  let remaining = text;
  let key = 0;

  while (remaining) {
    // Match **bold** first
    const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
    if (boldMatch) {
      const before = remaining.slice(0, boldMatch.index);
      if (before) parts.push(<span key={key++}>{before}</span>);
      parts.push(<strong key={key++} className="font-semibold text-forest">{boldMatch[1]}</strong>);
      remaining = remaining.slice(boldMatch.index + boldMatch[0].length);
      continue;
    }

    // No more matches, push the rest
    parts.push(<span key={key++}>{remaining}</span>);
    break;
  }

  return parts.length > 0 ? parts : text;
}

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
    <div className="card max-w-4xl mx-auto relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-warm-yellow/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-coral/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>

      <div className="relative">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <span className="pill-yellow">Svenskt recept</span>
            </div>
            <h1 className="text-4xl font-display font-bold text-forest mb-2">{recipe.title}</h1>
            {recipe.originalTitle && recipe.originalTitle !== recipe.title && (
              <p className="text-warm-gray italic">Original: {recipe.originalTitle}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-cream hover:bg-cream-dark flex items-center justify-center transition-colors text-warm-gray hover:text-forest"
            title="Stäng"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Recipe Meta Info - Card style */}
        <div className="flex flex-wrap gap-3 mb-8">
          {recipe.servings && (
            <div className="flex items-center gap-2 bg-cream rounded-full px-4 py-2">
              <span className="text-lg">🍽️</span>
              <span className="text-forest font-medium">{recipe.servings}</span>
            </div>
          )}
          {recipe.prepTime && (
            <div className="flex items-center gap-2 bg-cream rounded-full px-4 py-2">
              <span className="text-lg">⏱️</span>
              <span className="text-forest font-medium">{recipe.prepTime}</span>
            </div>
          )}
          {recipe.cookTime && (
            <div className="flex items-center gap-2 bg-cream rounded-full px-4 py-2">
              <span className="text-lg">🔥</span>
              <span className="text-forest font-medium">{recipe.cookTime}</span>
            </div>
          )}
        </div>

        {recipe.originalUrl && (
          <div className="mb-8 p-4 bg-cream rounded-2xl flex items-center gap-3">
            <span className="text-warm-gray">🔗</span>
            <span className="text-sm text-warm-gray">Originalkälla: </span>
            <a
              href={recipe.originalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-forest hover:text-forest-light underline underline-offset-2"
            >
              {recipe.originalUrl.length > 50 ? recipe.originalUrl.substring(0, 50) + '...' : recipe.originalUrl}
            </a>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Ingredients */}
          <div className="bg-warm-yellow/30 rounded-3xl p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-warm-yellow rounded-xl flex items-center justify-center">
                <span className="text-xl">🥕</span>
              </div>
              <h2 className="text-2xl font-display font-bold text-forest">
                Ingredienser
              </h2>
            </div>
            <ul className="space-y-3">
              {recipe.ingredients?.map((ingredient, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-forest rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-warm-gray-dark break-words">{parseMarkdown(ingredient)}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Instructions */}
          <div className="bg-forest/5 rounded-3xl p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-forest rounded-xl flex items-center justify-center">
                <span className="text-xl">👨‍🍳</span>
              </div>
              <h2 className="text-2xl font-display font-bold text-forest">
                Instruktioner
              </h2>
            </div>
            <ol className="space-y-4">
              {recipe.instructions?.map((instruction, index) => (
                <li key={index} className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-forest text-cream rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </span>
                  <span className="text-warm-gray-dark flex-1 pt-1 break-words whitespace-normal">{parseMarkdown(instruction)}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Swedish Adaptation Notes */}
        {recipe.notes && recipe.notes.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-coral rounded-xl flex items-center justify-center">
                <span className="text-xl">💡</span>
              </div>
              <h2 className="text-2xl font-display font-bold text-forest">
                Svenska anpassningar
              </h2>
            </div>
            <div className="bg-coral/10 border-2 border-coral/20 rounded-2xl p-5">
              <ul className="space-y-3">
                {recipe.notes.map((note, index) => (
                  <li key={index} className="flex items-start gap-3 text-warm-gray-dark">
                    <span className="text-coral mt-0.5">→</span>
                    <span>{parseMarkdown(note)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4 pt-6 border-t-2 border-cream-dark">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`flex-1 ${saveSuccess ? 'bg-forest text-cream' : 'btn-primary'} rounded-full py-4 font-semibold transition-all`}
          >
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
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Sparat!
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <span>💾</span>
                Spara recept
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
            className="btn-secondary px-8"
          >
            <span>📋</span>
            <span>Kopiera</span>
          </button>
        </div>
      </div>
    </div>
  );
}
