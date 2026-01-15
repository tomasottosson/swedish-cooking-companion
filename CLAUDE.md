# Swedish Cooking Companion - Claude Code Guide

## Project Overview

A React web app that converts international recipes into Swedish-adapted versions. The "Swedification" of recipes is the core feature - intelligent ingredient substitutions, measurement conversions, and full Swedish translation.

**Key value proposition:** Swedish home cooks can paste a recipe URL or upload a recipe image, and get a fully adapted Swedish version with proper ingredients available at Swedish stores (ICA, Coop, Willys).

## Tech Stack

- **React 18** with Vite (fast dev server, HMR)
- **Tailwind CSS** for styling
- **Anthropic Claude API** (claude-3-5-sonnet) for recipe conversion
- **Browser localStorage** for persistence (API key + saved recipes)
- No backend - runs entirely client-side

## Project Structure

```
src/
├── components/
│   ├── ApiKeySetup.jsx     # API key input/management
│   ├── Header.jsx          # App header with Swedish branding
│   ├── RecipeInput.jsx     # URL or image input form
│   ├── RecipeDisplay.jsx   # Formatted recipe output
│   └── SavedRecipes.jsx    # Recipe library with search/export
├── services/
│   └── anthropicApi.js     # Claude API integration + prompts
├── utils/
│   └── storage.js          # localStorage wrapper
├── App.jsx                 # Main app with routing state
├── main.jsx               # React entry point
└── index.css              # Tailwind + custom styles
```

## Development Commands

```bash
npm install    # Install dependencies
npm run dev    # Start dev server (http://localhost:3000)
npm run build  # Production build
npm run preview # Preview production build
```

## Key Patterns & Conventions

### State Management
- React useState/useEffect hooks (no Redux)
- App.jsx manages global state (API key, current view, loading)
- localStorage for persistence via `storage.js` utility

### Component Style
- Functional components only
- Props destructuring in function signature
- Tailwind classes directly in JSX
- Swedish UI text (buttons, labels, messages)

### API Integration
- User provides their own Anthropic API key
- API key stored in localStorage
- `dangerouslyAllowBrowser: true` flag used (client-side calls)
- Structured JSON output from Claude for recipe parsing

### Recipe Data Structure
```javascript
{
  title: "Swedish recipe title",
  originalTitle: "Original name",
  servings: "4 portioner",
  prepTime: "20 min",
  cookTime: "45 min",
  ingredients: ["2 dl vetemjöl", ...],
  instructions: ["Step 1...", ...],
  notes: ["Substitution explanations..."],
  originalUrl: "https://..."
}
```

## Swedish Cooking Context

Important ingredient mappings the AI handles:
- `half and half` → `mellangrädde (10-12% fett)`
- `heavy cream` → `vispgrädde (36-40% fett)`
- `all-purpose flour` → `vetemjöl`
- `chuck roast` → `högrev`
- `buttermilk` → `filmjölk`

Swedish measurements:
- `cup` → `dl` (1 cup = 2.4 dl)
- `tbsp` → `msk` (matsked)
- `tsp` → `tsk` (tesked)
- Temperatures in Celsius
- Oven types: `vanlig ugn` vs `varmluftsugn`

## File-Specific Notes

### `src/services/anthropicApi.js`
Contains the system prompt with all Swedification rules. This is the heart of the app. Modify here to improve recipe conversion quality.

### `src/utils/storage.js`
localStorage wrapper with methods:
- `getApiKey()` / `saveApiKey(key)`
- `getRecipes()` / `saveRecipe(recipe)` / `deleteRecipe(id)`
- `exportRecipes()` / `importRecipes(json)`

### `tailwind.config.js`
Custom colors defined:
- `swedish-blue` - Swedish flag blue
- `swedish-yellow` - Swedish flag yellow

## Important Constraints

- **Image size limit:** 5MB max for uploaded recipe images
- **No backend:** All API calls made directly from browser
- **Privacy-first:** No analytics, no external data storage
- **User pays:** Users use their own API key and pay for usage

## Future Enhancements (Not in Phase 1)

- Recipe scaling (adjust servings)
- Shopping list generation
- Backend proxy for API key
- Multi-language support
