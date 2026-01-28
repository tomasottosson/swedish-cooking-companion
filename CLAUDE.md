# Swedish Cooking Companion - Claude Code Guide

## Project Overview

A React web app that converts international recipes into Swedish-adapted versions. The "Swedification" of recipes is the core feature - intelligent ingredient substitutions, measurement conversions, and full Swedish translation.

**Key value proposition:** Swedish home cooks can paste a recipe URL or upload a recipe image, and get a fully adapted Swedish version with proper ingredients available at Swedish stores (ICA, Coop, Willys).

## Tech Stack

- **React 18** with Vite (fast dev server, HMR)
- **Tailwind CSS** for styling
- **Anthropic Claude API** with dual model support:
  - Claude Haiku 4.5 (fast mode) - quicker conversions, lower cost
  - Claude Sonnet 4.5 (quality mode) - best results
- **Browser localStorage** for persistence (API key + saved recipes)
- **Express.js proxy server** for CORS-free URL fetching

## Project Structure

```
src/
├── components/
│   ├── ApiKeySetup.jsx     # API key input/management with focus trap
│   ├── Header.jsx          # App header with Swedish branding
│   ├── RecipeInput.jsx     # URL, text, or image input with speed mode toggle
│   ├── RecipeDisplay.jsx   # Formatted recipe output with copy/save
│   └── SavedRecipes.jsx    # Recipe library with search/export
├── services/
│   └── anthropicApi.js     # Claude API integration + prompts
├── utils/
│   └── storage.js          # localStorage wrapper
├── App.jsx                 # Main app with routing state
├── main.jsx               # React entry point
└── index.css              # Tailwind + custom styles + accessibility
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
- Speed mode toggle: Haiku (fast) vs Sonnet (quality)
- Three input types: URL, pasted text, and image upload

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

**Models** (defined at lines 132-143):
- Fast mode: `claude-haiku-4-5-20251001` - Claude Haiku 4.5, faster and lower cost
- Quality mode: `claude-sonnet-4-5-20250929` - Claude Sonnet 4.5, best quality results

**Exports**:
- `MODELS` - Object with model configurations
- `convertRecipe(input, apiKey, onProgress, options)` - Main conversion function
- `imageToBase64(file)` - Helper for image uploads (5MB limit)

### `server.js`
Express.js proxy server that bypasses CORS restrictions when fetching recipe URLs. Must be running for URL-based recipe conversion.

**Endpoints**:
- `POST /api/fetch-recipe` - Fetches HTML from recipe URLs
- `GET /health` - Health check endpoint
- `GET /` - Server info

### `src/utils/storage.js`
localStorage wrapper with methods:

**API Key**:
- `getApiKey()` / `saveApiKey(key)` / `clearApiKey()`

**Recipe CRUD**:
- `getRecipes()` / `getRecipeById(id)` / `saveRecipe(recipe)`
- `updateRecipe(id, updates)` / `deleteRecipe(id)` / `clearAllRecipes()`
- `searchRecipes(query)` - searches title, ingredients, instructions, notes

**Import/Export**:
- `exportRecipes()` - downloads JSON file
- `importRecipes(json)` - merges imported recipes with existing

### `tailwind.config.js`
Custom colors defined (all WCAG AA compliant):

**Primary palette**:
- `cream` (#F5F0E8) / `cream-dark` (#E8E0D0) - backgrounds
- `warm-yellow` (#F7D547) / `warm-yellow-light` / `warm-yellow-dark` - primary accent
- `forest` (#1B4D3E) / `forest-light` / `forest-dark` - primary green

**Secondary palette**:
- `coral` (#C4693F) / `coral-light` / `coral-dark` - accent (darkened for WCAG AA)
- `warm-gray` (#5A4D40) - body text (4.5:1 contrast on cream)
- `warm-gray-light` / `warm-gray-dark` - text variants

**Special accents**:
- `swedish-blue` (#006AA7) / `swedish-yellow` (#FECC00) - Swedish flag colors

**Custom fonts**: `display` (Playfair Display), `body` (Inter)
**Custom shadows**: `soft`, `soft-lg`, `warm` (yellow glow)

### `src/index.css`
Contains component classes and accessibility-critical styles:

**Component Classes**:
- `.btn-primary` / `.btn-secondary` / `.btn-accent` / `.btn-ghost` - button variants
- `.input-field` - styled form inputs
- `.card` / `.card-yellow` / `.card-forest` / `.card-cream` - card variants
- `.pill` / `.pill-yellow` / `.pill-forest` / `.pill-coral` - tag/pill components

**Accessibility Styles**:
- `prefers-reduced-motion` media query - disables all animations
- `:focus-visible` outline styles - 3px solid forest green with 2px offset
- `.skip-link` class - positioned off-screen, visible on focus
- `.sr-only` class - visually hidden but accessible to screen readers
- `.icon-btn` / `.icon-btn-coral` - minimum 44×44px touch targets

**Custom Animations** (disabled with prefers-reduced-motion):
- `@keyframes float` - gentle floating animation for loading icon
- `@keyframes pulse-soft` - subtle opacity pulsing

## Accessibility (WCAG 2.1 Level AA)

The app follows WCAG 2.1 Level AA guidelines:

### Keyboard Navigation
- Skip link to bypass navigation ("Hoppa till huvudinnehåll")
- All interactive elements focusable with visible focus indicators
- Focus trap in modal dialogs (API key setup)
- Enter/Space key support on recipe cards

### Screen Reader Support
- `aria-label` on all icon-only buttons
- `aria-live` regions for dynamic content (loading, errors, search, copy confirmation)
- `aria-describedby` linking inputs to hints
- `aria-hidden="true"` on decorative elements
- Semantic HTML (`<article>`, `<section>`, `<nav>`, `<dl>`)
- `sr-only` class for visually hidden but accessible text

### Heading Hierarchy
Maintain proper heading structure for screen reader navigation:
- **h1**: Site title in Header.jsx only (one per page)
- **h2**: Main section headings (recipe title, "Konvertera recept", "Sparade recept", "API-nyckel")
- **h3**: Sub-sections within h2 (Ingredienser, Instruktioner, Svenska anpassningar, recipe cards)

### Color & Motion
- All text meets 4.5:1 contrast ratio minimum
- `prefers-reduced-motion` respected - all animations disabled
- Status indicators use text + color (not color alone)

### Touch Targets
- All icon-only buttons must be minimum 44×44px (use `min-w-[44px] min-h-[44px]`)
- Use `.icon-btn` or `.icon-btn-coral` classes which include minimum sizing
- Required for EU Accessibility Directive compliance on mobile devices

## Important Constraints

- **Image size limit:** 5MB max for uploaded recipe images
- **Proxy server required:** URL conversion requires proxy server on port 3001
- **Privacy-first:** No analytics, no external data storage
- **User pays:** Users use their own API key and pay for usage
- **CORS origins:** Proxy server allows localhost:3000 and localhost:5173

## Additional Documentation

- **CHANGELOG.md** - Version history and accessibility improvements
- **README.md** - User-facing documentation
- **PROJECT_BRIEF.MD** - Original project requirements

## Future Enhancements

- Recipe scaling (adjust servings)
- Shopping list generation
- Backend proxy for API key
- Multi-language support
