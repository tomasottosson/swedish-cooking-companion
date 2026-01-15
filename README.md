# Swedish Cooking Companion 🇸🇪

A web application that converts international recipes into Swedish-adapted versions with proper measurements, ingredient substitutions, and cultural context. Perfect for Swedish home cooks who find recipes online but need them adapted to Swedish ingredients, measurements, and terminology.

## Features

- **Smart Ingredient Substitutions**: Converts hard-to-find international ingredients to Swedish equivalents
  - "half and half" → "mellangrädde (10-12% fett)"
  - US meat cuts → Swedish cuts (chuck roast → högrev)
- **Measurement Conversions**: Automatic conversion to Swedish units
  - Fahrenheit → Celsius
  - cups/tablespoons → dl/msk
  - ounces/pounds → grams/kg
- **Full Swedish Translation**: Complete recipe translation with proper cooking terminology
- **Multiple Input Methods**:
  - Paste recipe URLs
  - Upload recipe images/screenshots
- **Recipe Storage**: Save and manage your converted recipes
- **Export/Import**: Backup and restore your recipe collection

## Tech Stack

- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS
- **AI**: Anthropic Claude API (Vision + Text)
- **Storage**: Browser localStorage
- **Deployment Ready**: Vercel/Netlify compatible

## Prerequisites

- Node.js 18+ and npm
- Anthropic API key ([Get one here](https://console.anthropic.com/))

## Installation

1. Clone the repository:
```bash
git clone https://github.com/tomasottosson/swedish-cooking-companion.git
cd swedish-cooking-companion
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:3000`

## Usage

### First Time Setup

1. When you first open the app, you'll be prompted to enter your Anthropic API key
2. Get your API key from [console.anthropic.com](https://console.anthropic.com/)
3. Enter the key - it will be stored securely in your browser's localStorage
4. You only pay for your own API usage

### Converting Recipes

**From URL:**
1. Click the "URL" tab
2. Paste a recipe URL (e.g., https://goop.com/recipes/thomas-keller-lemon-tart/)
3. Click "Convert to Swedish Recipe"
4. Wait for Claude to work its magic!

**From Image:**
1. Click the "Image" tab
2. Upload a screenshot or photo of a recipe (max 5MB)
3. Click "Convert to Swedish Recipe"
4. The AI will extract and convert the recipe

### Managing Recipes

- **Save**: Click "Spara recept" to add to your collection
- **Browse**: Switch to "Sparade recept" tab to view saved recipes
- **Search**: Use the search bar to find recipes by name or ingredient
- **Export**: Download all recipes as JSON for backup
- **Import**: Restore recipes from a JSON backup file
- **Delete**: Remove recipes you no longer need

## Project Structure

```
swedish-cooking-companion/
├── src/
│   ├── components/
│   │   ├── ApiKeySetup.jsx      # API key configuration
│   │   ├── Header.jsx            # App header with branding
│   │   ├── RecipeInput.jsx       # URL/Image input form
│   │   ├── RecipeDisplay.jsx     # Beautiful recipe display
│   │   └── SavedRecipes.jsx      # Recipe library & search
│   ├── services/
│   │   └── anthropicApi.js       # Claude API integration
│   ├── utils/
│   │   └── storage.js            # localStorage management
│   ├── App.jsx                   # Main app component
│   ├── main.jsx                  # React entry point
│   └── index.css                 # Global styles & Tailwind
├── public/                       # Static assets
├── .gitignore                    # Git ignore rules
├── .env.example                  # Environment variable template
├── package.json                  # Dependencies
├── vite.config.js                # Vite configuration
├── tailwind.config.js            # Tailwind configuration
├── postcss.config.js             # PostCSS configuration
├── PROJECT_BRIEF.md              # Detailed project requirements
└── README.md                     # This file
```

## Development Commands

```bash
npm run dev       # Start development server (port 3000)
npm run build     # Build for production
npm run preview   # Preview production build
```

## API Usage & Costs

This app uses the Anthropic Claude API:
- **Model**: Claude 3.5 Sonnet (claude-3-5-sonnet-20241022)
- **Typical cost per recipe**: $0.01-0.05 USD
- **Image processing**: Slightly higher cost for image-based recipes
- **You control costs**: Since you use your own API key, you only pay for what you use

## Key Features in Detail

### Intelligent Ingredient Substitutions

The app doesn't just translate - it understands Swedish cooking culture:
- Replaces specialty ingredients with Swedish alternatives
- Suggests where to buy items (ICA, Coop, Willys, etc.)
- Explains why substitutions were made
- Provides multiple options when available

### Precise Conversions

- Temperature: Exact F° to C° conversion
- Volume: American cups to Swedish deciliters
- Weight: Ounces/pounds to grams/kilograms
- Includes Swedish oven type recommendations (vanlig ugn vs varmluftsugn)

### Cultural Context

- Uses proper Swedish cooking terminology
- Adapts recipes to Swedish kitchen standards
- Notes about ingredient availability in Sweden
- Suggestions for hard-to-find items

## Browser Compatibility

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Responsive design

## Privacy & Security

- **Your API key**: Stored only in your browser's localStorage, never sent to any server except Anthropic
- **Your recipes**: Stored locally in your browser, not on any server
- **No tracking**: No analytics, no cookies, no third-party tracking
- **Export control**: You can export/backup your data anytime

## Troubleshooting

### "Failed to convert recipe"
- Check that your API key is valid
- Ensure you have credits in your Anthropic account
- Try a different recipe URL or image

### Image upload fails
- Ensure image is under 5MB
- Use common formats (JPG, PNG, WebP)
- Make sure the recipe text is clearly visible

### Recipe not found from URL
- Some websites block automated access
- Try taking a screenshot and using image upload instead

## Future Enhancements (Phase 2)

- Recipe scaling (adjust serving sizes)
- Shopping list generation
- Meal planning features
- Recipe ratings and notes
- Backend proxy for easier API key management
- Multi-language support

## Contributing

This is a personal project, but suggestions and feedback are welcome! Feel free to:
- Open issues for bugs or feature requests
- Submit pull requests
- Share your experience

## License

MIT License - feel free to use and modify for your own purposes

## Acknowledgments

- Built with [Claude](https://www.anthropic.com/claude) by Anthropic
- Swedish cooking wisdom from generations of home cooks
- Inspired by the challenge of adapting international recipes to Swedish kitchens

## Author

Created by Tomas Ottosson for Swedish home cooks everywhere 🧑‍🍳

---

**Smaklig måltid!** 🍽️
