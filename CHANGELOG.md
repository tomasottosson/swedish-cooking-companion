# Changelog

All notable changes to Swedish Cooking Companion will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

### Added
- Azure deployment configuration
  - Azure Static Web Apps for frontend hosting (free tier)
  - Azure App Service for proxy server hosting (free tier)
  - GitHub Actions CI/CD workflows for automatic deployment on push to main
  - GitHub OIDC authentication for Static Web Apps (no deployment token needed)
- Environment variable support for proxy URL (`VITE_PROXY_URL`) and CORS origins (`ALLOWED_ORIGINS`)
- `.env.production` for production build configuration
- WCAG 2.1 Level AA accessibility compliance
  - Skip link for keyboard navigation ("Hoppa till huvudinnehåll")
  - ARIA labels on all icon-only buttons for screen readers
  - ARIA tab roles (`role="tab"`, `aria-selected`) for navigation
  - `aria-live` regions for dynamic content (loading states, errors, search results)
  - `aria-describedby` linking form inputs to hint text
  - `aria-pressed` for toggle buttons (show/hide password)
  - `role="switch"` with `aria-checked` for speed mode toggle
  - Focus trap in API key setup modal
  - Screen-reader-only labels (`sr-only`) for emoji-only content context
  - Copy button now announces "Kopierat!" to screen readers via `aria-live`
- `prefers-reduced-motion` media query to disable all animations for users who prefer reduced motion
- Enhanced focus-visible outlines (3px solid forest green) for keyboard navigation
- Semantic HTML improvements (`<article>`, `<section>`, `<dl>` for recipe metadata)
- Minimum 44×44px touch targets on all icon buttons (EU mobile accessibility)

### Changed
- Color contrast improvements for WCAG AA compliance:
  - `warm-gray`: #6B5E50 → #5A4D40 (4.5:1 contrast on cream)
  - `warm-gray-light`: #8A7B6B → #6B5E50
  - `warm-gray-dark`: #4A4035 → #3D3429
  - `coral`: #E07B54 → #C4693F
  - `coral-light`: #F09070 → #D97B50
  - Body text color updated for improved readability
  - Placeholder text darkened for better contrast
- Decorative elements marked with `aria-hidden="true"` to reduce screen reader noise
- Show/hide API key button now exposes text to screen readers (not just aria-label)

### Fixed
- File input now uses `sr-only` class instead of `hidden` for better accessibility
- Recipe list items are now keyboard-navigable with Enter/Space key support
- Skip link CSS now uses proper positioning technique (visible on focus)
- Heading hierarchy corrected: single h1 (site title), h2 for sections, h3 for sub-sections
  - RecipeDisplay: recipe title changed from h1 → h2
  - RecipeDisplay: Ingredienser/Instruktioner/Svenska anpassningar changed from h2 → h3

## [1.0.0] - 2026-01-27

### Added
- Initial release of Swedish Cooking Companion
- Recipe conversion from URL, text paste, or image upload
- Intelligent "Swedification" of recipes:
  - Ingredient substitutions for Swedish market availability
  - Measurement conversions (cups → dl, tbsp → msk, etc.)
  - Temperature conversion to Celsius
  - Full Swedish translation
- Fast mode toggle (Claude Haiku) for quicker conversions
- Recipe saving to browser localStorage
- Recipe search functionality
- Import/export recipes as JSON
- Vibrant cookbook-style UI design
- Swedish language interface
