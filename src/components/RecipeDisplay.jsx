import { useState, useRef } from 'react';

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
      parts.push(<strong key={key++} className="font-semibold text-teal">{boldMatch[1]}</strong>);
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
  const [copySuccess, setCopySuccess] = useState(false);

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
    <article className="card max-w-4xl mx-auto relative overflow-hidden" aria-labelledby="recipe-title">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-coral/10 rounded-full -translate-y-1/2 translate-x-1/2" aria-hidden="true"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-terracotta/10 rounded-full translate-y-1/2 -translate-x-1/2" aria-hidden="true"></div>

      <div className="relative">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <span className="pill-coral">Svenskt recept</span>
            </div>
            <h2 id="recipe-title" className="text-4xl font-display font-bold text-teal mb-2">{recipe.title}</h2>
            {recipe.originalTitle && recipe.originalTitle !== recipe.title && (
              <p className="text-earth italic">Original: {recipe.originalTitle}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-sand/50 hover:bg-sand flex items-center justify-center transition-colors text-earth hover:text-teal"
            aria-label="Stäng recept"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Recipe Meta Info - Card style */}
        <dl className="flex flex-wrap gap-3 mb-8">
          {recipe.servings && (
            <div className="flex items-center gap-2 bg-sand/40 rounded-full px-4 py-2">
              <span className="text-lg" aria-hidden="true">🍽️</span>
              <dt className="sr-only">Portioner</dt>
              <dd className="text-teal font-medium">{recipe.servings}</dd>
            </div>
          )}
          {recipe.prepTime && (
            <div className="flex items-center gap-2 bg-sand/40 rounded-full px-4 py-2">
              <span className="text-lg" aria-hidden="true">⏱️</span>
              <dt className="sr-only">Förberedelsetid</dt>
              <dd className="text-teal font-medium">{recipe.prepTime}</dd>
            </div>
          )}
          {recipe.cookTime && (
            <div className="flex items-center gap-2 bg-sand/40 rounded-full px-4 py-2">
              <span className="text-lg" aria-hidden="true">🔥</span>
              <dt className="sr-only">Tillagningstid</dt>
              <dd className="text-teal font-medium">{recipe.cookTime}</dd>
            </div>
          )}
        </dl>

        {recipe.originalUrl && (
          <div className="mb-8 p-4 bg-sand/30 rounded-2xl flex items-center gap-3">
            <span className="text-earth" aria-hidden="true">🔗</span>
            <span className="text-sm text-earth">Originalkälla: </span>
            <a
              href={recipe.originalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-teal hover:text-teal-light underline underline-offset-2"
              aria-label={`Originalrecept (öppnas i ny flik): ${recipe.originalUrl}`}
            >
              {recipe.originalUrl.length > 50 ? recipe.originalUrl.substring(0, 50) + '...' : recipe.originalUrl}
            </a>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Ingredients */}
          <section className="bg-coral/10 rounded-3xl p-6" aria-labelledby="ingredients-heading">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-coral/20 rounded-xl flex items-center justify-center" aria-hidden="true">
                <span className="text-xl">🥕</span>
              </div>
              <h3 id="ingredients-heading" className="text-2xl font-display font-bold text-teal">
                Ingredienser
              </h3>
            </div>
            <ul className="space-y-3" aria-label="Lista med ingredienser">
              {recipe.ingredients?.map((ingredient, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-coral rounded-full mt-2 flex-shrink-0" aria-hidden="true"></span>
                  <span className="text-earth-dark break-words">{parseMarkdown(ingredient)}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Instructions */}
          <section className="bg-teal/5 rounded-3xl p-6" aria-labelledby="instructions-heading">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-teal/15 rounded-xl flex items-center justify-center" aria-hidden="true">
                <span className="text-xl">👨‍🍳</span>
              </div>
              <h3 id="instructions-heading" className="text-2xl font-display font-bold text-teal">
                Instruktioner
              </h3>
            </div>
            <ol className="space-y-4" aria-label="Steg-för-steg instruktioner">
              {recipe.instructions?.map((instruction, index) => (
                <li key={index} className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-teal text-cream rounded-full flex items-center justify-center text-sm font-bold" aria-hidden="true">
                    {index + 1}
                  </span>
                  <span className="text-earth-dark flex-1 pt-1 break-words whitespace-normal">{parseMarkdown(instruction)}</span>
                </li>
              ))}
            </ol>
          </section>
        </div>

        {/* Swedish Adaptation Notes */}
        {recipe.notes && recipe.notes.length > 0 && (
          <section className="mb-8" aria-labelledby="notes-heading">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-olive/20 rounded-xl flex items-center justify-center" aria-hidden="true">
                <span className="text-xl">💡</span>
              </div>
              <h3 id="notes-heading" className="text-2xl font-display font-bold text-teal">
                Svenska anpassningar
              </h3>
            </div>
            <div className="bg-olive/10 border-2 border-olive/20 rounded-2xl p-5">
              <ul className="space-y-3" aria-label="Tips om svenska anpassningar">
                {recipe.notes.map((note, index) => (
                  <li key={index} className="flex items-start gap-3 text-earth-dark">
                    <span className="text-olive mt-0.5" aria-hidden="true">→</span>
                    <span>{parseMarkdown(note)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4 pt-6 border-t-2 border-sand">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`flex-1 ${saveSuccess ? 'bg-teal text-cream' : 'btn-primary'} rounded-full py-4 font-semibold transition-all`}
            aria-busy={isSaving}
            aria-live="polite"
          >
            {isSaving ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Sparar...
              </span>
            ) : saveSuccess ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Sparat!
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <span aria-hidden="true">💾</span>
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
              setCopySuccess(true);
              setTimeout(() => setCopySuccess(false), 2000);
            }}
            className={`px-8 ${copySuccess ? 'bg-teal text-cream' : 'btn-secondary'} rounded-full py-4 font-semibold transition-all flex items-center gap-2 justify-center`}
            aria-label="Kopiera recept till urklipp"
          >
            {copySuccess ? (
              <span className="flex items-center gap-2" role="status" aria-live="polite">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Kopierat!
              </span>
            ) : (
              <>
                <span aria-hidden="true">📋</span>
                <span>Kopiera</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
