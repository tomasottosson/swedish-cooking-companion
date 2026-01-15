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
    <div className="card max-w-4xl mx-auto">
      <div className="flex justify-between items-start mb-6">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{recipe.title}</h1>
          {recipe.originalTitle && recipe.originalTitle !== recipe.title && (
            <p className="text-gray-500 italic">Original: {recipe.originalTitle}</p>
          )}
        </div>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
          title="Close"
        >
          ×
        </button>
      </div>

      {/* Recipe Meta Info */}
      <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-600">
        {recipe.servings && (
          <div className="flex items-center gap-2">
            <span className="font-medium">🍽️ Portioner:</span>
            <span>{recipe.servings}</span>
          </div>
        )}
        {recipe.prepTime && (
          <div className="flex items-center gap-2">
            <span className="font-medium">⏱️ Förberedelsetid:</span>
            <span>{recipe.prepTime}</span>
          </div>
        )}
        {recipe.cookTime && (
          <div className="flex items-center gap-2">
            <span className="font-medium">🔥 Tillagning:</span>
            <span>{recipe.cookTime}</span>
          </div>
        )}
      </div>

      {recipe.originalUrl && (
        <div className="mb-6 p-3 bg-gray-50 rounded-lg">
          <span className="text-sm text-gray-600">Originalkälla: </span>
          <a
            href={recipe.originalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-swedish-blue hover:underline"
          >
            {recipe.originalUrl}
          </a>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Ingredients */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4 border-b-2 border-swedish-yellow pb-2">
            Ingredienser
          </h2>
          <ul className="space-y-2">
            {recipe.ingredients?.map((ingredient, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-swedish-blue mt-1">•</span>
                <span className="text-gray-700">{ingredient}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Instructions */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4 border-b-2 border-swedish-yellow pb-2">
            Instruktioner
          </h2>
          <ol className="space-y-3">
            {recipe.instructions?.map((instruction, index) => (
              <li key={index} className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-swedish-blue text-white rounded-full flex items-center justify-center text-sm font-medium">
                  {index + 1}
                </span>
                <span className="text-gray-700 flex-1">{instruction}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Swedish Adaptation Notes */}
      {recipe.notes && recipe.notes.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 border-b-2 border-swedish-yellow pb-2">
            Svenska anpassningar
          </h2>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <ul className="space-y-2">
              {recipe.notes.map((note, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-blue-900">
                  <span className="text-blue-500 mt-1">ℹ️</span>
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-4 pt-6 border-t">
        <button onClick={handleSave} disabled={isSaving} className="btn-primary flex-1">
          {isSaving ? 'Sparar...' : saveSuccess ? '✓ Sparat!' : 'Spara recept'}
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
