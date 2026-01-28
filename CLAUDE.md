# Swedish Cooking Companion - Claude Code Guide

## Project Overview

A React web app that converts international recipes into Swedish-adapted versions. The "Swedification" of recipes is the core feature - intelligent ingredient substitutions, measurement conversions, and full Swedish translation.

**Key value proposition:** Swedish home cooks can paste a recipe URL or upload a recipe image, and get a fully adapted Swedish version with proper ingredients available at Swedish stores (ICA, Coop, Willys).

## Tech Stack

- **React 18** with Vite (fast dev server, HMR)
- **Tailwind CSS** for styling
- **Anthropic Claude API** (Claude Sonnet 4.5) for recipe conversion
- **Browser localStorage** for persistence (API key + saved recipes)
- **Express.js proxy server** for CORS-free URL fetching

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
npm install       # Install dependencies
npm run dev:all   # Start BOTH proxy server (3001) and dev server (3000) - RECOMMENDED
npm run server    # Start proxy server only (port 3001)
npm run dev       # Start dev server only (http://localhost:3000)
npm run build     # Production build
npm run preview   # Preview production build
```

**IMPORTANT**: For URL recipe conversion to work, you MUST run the proxy server. Use `npm run dev:all` to start both servers at once.

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

**Current model**: `claude-sonnet-4-5-20250929` (line 126) - Claude Sonnet 4.5, the latest recommended model with enhanced intelligence and coding capabilities

### `server.js`
Express.js proxy server that bypasses CORS restrictions when fetching recipe URLs. Must be running for URL-based recipe conversion.

**Endpoints**:
- `POST /api/fetch-recipe` - Fetches HTML from recipe URLs
- `GET /health` - Health check endpoint
- `GET /` - Server info

### `src/utils/storage.js`
localStorage wrapper with methods:
- `getApiKey()` / `saveApiKey(key)`
- `getRecipes()` / `saveRecipe(recipe)` / `deleteRecipe(id)`
- `exportRecipes()` / `importRecipes(json)`

### `tailwind.config.js`
Custom colors defined (WCAG AA compliant):
- `cream` - Background (#F5F0E8)
- `forest` - Primary green (#1B4D3E)
- `warm-yellow` - Accent (#F7D547)
- `coral` - Secondary accent (#C4693F)
- `warm-gray` - Body text (#5A4D40) - 4.5:1 contrast on cream
- `swedish-blue` - Swedish flag blue (#006AA7)
- `swedish-yellow` - Swedish flag yellow (#FECC00)

### `src/index.css`
Contains accessibility-critical styles:
- `prefers-reduced-motion` media query - disables all animations
- `:focus-visible` outline styles - 3px solid forest green
- Skip link styling for keyboard navigation

## Accessibility (WCAG 2.1 Level AA)

The app follows WCAG 2.1 Level AA guidelines:

### Keyboard Navigation
- Skip link to bypass navigation ("Hoppa till huvudinnehåll")
- All interactive elements focusable with visible focus indicators
- Focus trap in modal dialogs (API key setup)
- Enter/Space key support on recipe cards

### Screen Reader Support
- `aria-label` on all icon-only buttons
- `aria-live` regions for dynamic content (loading, errors, search)
- `aria-describedby` linking inputs to hints
- `aria-hidden="true"` on decorative elements
- Semantic HTML (`<article>`, `<section>`, `<nav>`, `<dl>`)
- `sr-only` class for visually hidden but accessible text

### Color & Motion
- All text meets 4.5:1 contrast ratio minimum
- `prefers-reduced-motion` respected - all animations disabled
- Status indicators use text + color (not color alone)

## Important Constraints

- **Image size limit:** 5MB max for uploaded recipe images
- **Proxy server required:** URL conversion requires proxy server on port 3001
- **Privacy-first:** No analytics, no external data storage
- **User pays:** Users use their own API key and pay for usage

## Future Enhancements (Not in Phase 1)

- Recipe scaling (adjust servings)
- Shopping list generation
- Backend proxy for API key
- Multi-language support
