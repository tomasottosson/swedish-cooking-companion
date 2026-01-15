# PROJECT BRIEF: Swedish Cooking Companion

## Project Overview
A web application that converts international recipes into Swedish-adapted versions with proper measurements, ingredient substitutions, and cultural context. Built for a Swedish home cook who finds recipes online and in cookbooks but needs them adapted to Swedish ingredients, measurements, and terminology.

## GitHub Repository
- **Owner**: tomasottosson
- **Repo Name**: swedish-cooking-companion
- **URL**: https://github.com/tomasottosson/swedish-cooking-companion

## Core Requirements

### 1. Input Methods (User Choice)
- **URL Input**: Paste recipe link (e.g., https://goop.com/recipes/thomas-keller-lemon-tart/)
- **Image Upload**: Upload screenshot or photo of recipe

### 2. "Swedification" Features (ALL required)

**Priority areas (most important):**
- **Ingredient Substitutions**: Smart replacements for Swedish context
  - Example: "half and half" → "mellangrädde (10-12% fett)" or "mjölk + grädde mix"
  - Example: US meat cuts → Swedish equivalents (chuck roast → högrev)
- **Cooking Terminology**: Translate to Swedish cooking terms

**Standard conversions:**
- Temperature: Fahrenheit → Celsius
- Volume: cups/tablespoons → dl/msk
- Weight: ounces/pounds → grams/kg

### 3. Output
- Beautiful formatted Swedish recipe displayed on screen
- Full translation to Swedish language
- All measurements and ingredients adapted

### 4. Storage
- Save converted recipes for future reference
- Browse/search saved recipes

## Technical Architecture

### Tech Stack
- **Framework**: React with Vite
- **Styling**: Tailwind CSS
- **API**: Anthropic Claude API (for intelligent recipe conversion)
- **Storage**: Browser persistent storage API
- **Deployment Target**: Vercel/Netlify (future)

### API Key Management
- User provides their own Anthropic API key
- Stored in browser localStorage
- User pays for their own API usage

### Key Features
- Export/import functionality for recipe backups (JSON)
- 5MB image size limit
- Structured recipe format (JSON: title, ingredients, instructions, original URL, date saved)

## Project Structure
```
swedish-cooking-companion/
├── src/
│   ├── components/
│   ├── services/
│   ├── utils/
│   ├── App.jsx
│   └── main.jsx
├── public/
├── .gitignore
├── .env.example
├── package.json
├── vite.config.js
├── tailwind.config.js
├── README.md
└── PROJECT_BRIEF.md
```

## User Flow
1. User chooses input method (URL or image)
2. User provides recipe source
3. App extracts recipe content (fetch URL or process image)
4. App sends to Claude API with specialized "Swedification" prompt
5. App displays converted Swedish recipe
6. User can save recipe to their collection
7. User can browse/search saved recipes later

## Claude API Integration

### Recipe Conversion Prompt Strategy
The prompt to Claude API should include:
- Swedish cooking context and cultural adaptations
- Specific focus on ingredient substitutions (Swedish equivalents)
- Meat cuts translation (US/UK → Swedish)
- Measurement conversions with Swedish units
- Swedish cooking terminology
- Preserve recipe structure and formatting

### Image Processing
- Convert uploaded images to base64
- Send to Claude API with vision capabilities
- Extract recipe text from image

## Environment Variables
```env
VITE_ANTHROPIC_API_KEY=user_provided_in_ui
```

## Development Commands
```bash
npm install          # Install dependencies
npm run dev         # Start development server
npm run build       # Build for production
npm run preview     # Preview production build
```

## Git Setup
- Initialize git repository
- Create .gitignore (node_modules, .env, dist, etc.)
- Initial commit with project structure
- Ready to push to GitHub

## Future Enhancements (Phase 2 - not now)
- Backend proxy for API key (better UX)
- Recipe scaling (adjust serving sizes)
- Meal planning features
- Shopping list generation
- Recipe ratings/notes

## Example Recipe to Test
https://goop.com/recipes/thomas-keller-lemon-tart/

## Notes
- This is Phase 1: Core functionality only
- Focus on quality of "Swedification" - this is the killer feature
- Keep UI clean and simple
- Prioritize ingredient substitution intelligence

---

## Instructions for Claude Code
Create the complete project structure for this application with all necessary files, configurations, and a working React application that implements these requirements. Include a comprehensive README.md with setup instructions. Also create a CLAUDE.md file as needed.