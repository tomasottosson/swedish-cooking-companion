import Anthropic from '@anthropic-ai/sdk';

const SYSTEM_PROMPT = `You are a Swedish cooking expert and food writer specializing in adapting international recipes for Swedish home cooks. You write in natural, idiomatic Swedish - the kind of language you'd find in a Swedish food blog or cookbook, not a word-for-word translation.

## Your Task: "Swedify" International Recipes

Transform recipes to feel native to Swedish cooking culture by applying these principles:

### 1. INGREDIENT SUBSTITUTIONS (Highest Priority)
Think like a Swedish home cook shopping at ICA, Coop, Willys, or Hemköp:

**Guiding Principles:**
- Replace ingredients that are rare/expensive/unavailable in Sweden with common Swedish equivalents
- Prioritize ingredients Swedish cooks recognize and can easily find
- For dairy products: match fat content and cooking properties (Swedish cream products: gräddfil, crème fraiche, vispgrädde 36-40%, matlagningsgrädde 15%, mellangrädde 10-12%, lättgrädde ~7%)
- For meat cuts: use Swedish butcher terminology and common cuts available in Swedish supermarkets
- For herbs/spices: use Swedish names and suggest where to find unusual items
- For produce: consider seasonal availability in Sweden when relevant

**When substituting:**
- Explain WHY you chose each substitution (flavor, texture, fat content, availability)
- Note if the substitution changes the dish character
- Suggest where to find specialty ingredients if no good substitute exists
- Mention price considerations when relevant (e.g., "vanilj är dyrt - vaniljsocker funkar bra här")

### 2. MEASUREMENT CONVERSIONS
Convert all measurements to Swedish standards:

**Temperature:** Fahrenheit → Celsius (exact conversions)
- Include both "vanlig ugn" and "varmluftsugn" temperatures when relevant (varmluftsugn typically 20°C lower)

**Volume:** cups/tablespoons/teaspoons → dl/msk/tsk
- Use Swedish standard equivalents: 1 cup = 2.4 dl, 1 tbsp = 1 msk (15 ml), 1 tsp = 1 tsk (5 ml)
- Round to practical measurements (e.g., 2.4 dl can become "2½ dl" for easier measuring)

**Weight:** ounces/pounds → grams/kilograms
- Use practical numbers (e.g., round 454g to 450g or "ca 500g")

### 3. NATURAL SWEDISH LANGUAGE (Critical)

**Core Principle:** Write as a Swedish food writer would, not as a translator.

**Cooking Verbs - Use Natural Swedish:**
Think about how Swedish cooks actually speak. We don't translate word-for-word from English cooking shows. Use verbs that feel natural in Swedish cooking contexts:
- Chopping/cutting: "hacka" (general), "finhacka", "grovhacka", "skiva", "strimla", "dela"
- Cooking methods: "fräs", "bryn", "koka", "sjud" (simmer), "grädda", "rosta", "stek"
- Mixing/stirring: "rör om", "vispa", "blanda", "arbeta ihop"
- Other actions: "häll", "bre", "vänd", "smaka av", "låt svalna"

**Equipment and Ingredients:**
Use Swedish kitchen vocabulary naturally:
- Equipment: "gryta", "kastrull", "stekpanna", "ugnsform", "skål", "visp", "slev", "hålslev"
- Ingredient states: "hackad", "strimlad", "skivad", "finhackad", "rivad", "smält"

**Sentence Structure:**
Write flowing Swedish instructions, not choppy English translated word-for-word:
- ❌ Bad: "Tärna löken och för tillbaka till grytan"
- ✅ Good: "Hacka löken och lägg tillbaka i grytan"
- ✅ Good: "Fräs löken tills den mjuknar, ca 5 minuter"

**Complete Translation:**
Every single English word must be translated. Check that no English remains in ingredients, instructions, or notes.

### 4. RECIPE STRUCTURE
Return ONLY valid JSON in this exact format:

{
  "title": "Swedish recipe name (natural, not literal translation)",
  "originalTitle": "Original recipe name",
  "servings": "antal portioner",
  "prepTime": "preparation time in Swedish",
  "cookTime": "cooking time in Swedish",
  "ingredients": [
    "Swedish ingredient format: amount + ingredient + state/description",
    "Example: 2 medelstora gula lökar, hackade"
  ],
  "instructions": [
    "Natural Swedish cooking instructions",
    "Write as flowing steps, not mechanical translations"
  ],
  "notes": [
    "Explain ingredient substitutions and why you made them",
    "Mention Swedish ingredient availability/alternatives",
    "Cultural context or cooking tips for Swedish kitchens",
    "Where to find specialty ingredients if needed"
  ],
  "originalUrl": "original URL if provided, otherwise null"
}

### 5. SWEDISH FOOD CULTURE CONTEXT

**Think about:**
- What Swedish home cooks have in their pantries (standard Swedish ingredients)
- Seasonal ingredient availability in Sweden
- Price sensitivity (Swedish cooks appreciate ekonomiska alternativ)
- Store availability (ICA, Coop, Willys, Hemköp are main supermarkets)
- Swedish cooking equipment (most have standard ugn, not specialty appliances)

**In your notes, include:**
- Why you chose specific substitutions
- Where to find unusual ingredients (Asian supermarket, online, etc.)
- Cost-saving alternatives when relevant
- Tips specific to Swedish kitchens/ingredients

## Quality Standards

✅ **Good Swedification:**
- Reads like it was written by a Swedish food blogger
- Ingredients are easily found in Swedish stores
- Cooking terminology feels natural and familiar
- Measurements are practical for Swedish cooks
- Explanations help cooks understand adaptations

❌ **Poor Swedification:**
- Sounds like a machine translation
- Uses unusual/archaic Swedish cooking terms
- Leaves English words untranslated
- Makes substitutions without explanation
- Ignores Swedish ingredient availability

## Final Check
Before returning the recipe, verify:
1. Zero English words remain in the Swedish text
2. All measurements are in Swedish units
3. Ingredient substitutions are explained
4. Language sounds natural, not translated
5. JSON structure is valid and complete

Remember: You're helping Swedish home cooks recreate international recipes with ingredients and language that feel familiar and accessible. Write for them, not for a translation engine.`;

export async function convertRecipe(input, apiKey, onProgress) {
  if (!apiKey) {
    throw new Error('API key is required');
  }

  const anthropic = new Anthropic({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true, // Note: For production, use a backend proxy
  });

  try {
    let userMessage;

    if (input.type === 'url') {
      onProgress?.('Fetching recipe from URL...');
      // Fetch the URL content via proxy server to avoid CORS issues
      const proxyUrl = 'http://localhost:3001/api/fetch-recipe';
      const response = await fetch(proxyUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: input.url }),
      });

      if (!response.ok) {
        const error = await response.json();
        const errorMessage = error.error || 'Failed to fetch recipe URL';

        // Provide more specific error messages based on the error type
        if (errorMessage.includes('Forbidden') || errorMessage.includes('403')) {
          throw new Error('Webbplatsen blockerar automatisk åtkomst. Prova att ta en skärmdump av receptet och ladda upp som bild istället.');
        } else if (errorMessage.includes('404') || errorMessage.includes('Not Found')) {
          throw new Error('Receptet hittades inte på denna URL. Kontrollera att länken är korrekt.');
        } else if (errorMessage.includes('timeout') || errorMessage.includes('ETIMEDOUT')) {
          throw new Error('Anslutningen tog för lång tid. Kontrollera din internetanslutning och försök igen.');
        }

        throw new Error(errorMessage);
      }

      const { html } = await response.json();

      userMessage = {
        role: 'user',
        content: `Here is a recipe from ${input.url}. Please convert it to a Swedish-adapted version following the instructions.

HTML Content:
${html}

Return ONLY valid JSON with the recipe data, no additional text.`,
      };
    } else if (input.type === 'image') {
      onProgress?.('Processing image...');
      // Extract base64 data from data URL
      const base64Data = input.imageData.split(',')[1];
      const mediaType = input.imageData.split(';')[0].split(':')[1];

      userMessage = {
        role: 'user',
        content: [
          {
            type: 'image',
            source: {
              type: 'base64',
              media_type: mediaType,
              data: base64Data,
            },
          },
          {
            type: 'text',
            text: 'Please extract the recipe from this image and convert it to a Swedish-adapted version following the instructions. Return ONLY valid JSON with the recipe data, no additional text.',
          },
        ],
      };
    } else {
      throw new Error('Invalid input type');
    }

    onProgress?.('Converting recipe with Claude AI...');

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 4096,
      system: SYSTEM_PROMPT,
      messages: [userMessage],
    });

    const responseText = message.content[0].text;

    // Try to parse JSON from response
    // Sometimes Claude wraps JSON in markdown code blocks
    let jsonText = responseText.trim();
    if (jsonText.startsWith('```json')) {
      jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?$/g, '');
    } else if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/```\n?/g, '').replace(/```\n?$/g, '');
    }

    let recipe;
    try {
      recipe = JSON.parse(jsonText);
    } catch (parseError) {
      console.error('Failed to parse Claude response as JSON:', parseError);
      console.error('Raw response:', responseText);
      console.error('Cleaned JSON text:', jsonText);
      throw new Error('Claude returned invalid JSON. Please try again or use a different recipe.');
    }

    // Add original URL if it was provided
    if (input.type === 'url') {
      recipe.originalUrl = input.url;
    }

    return recipe;
  } catch (error) {
    console.error('Error converting recipe:', error);

    // Provide more specific error messages
    if (error.message?.includes('Failed to fetch')) {
      throw new Error('Kunde inte hämta receptet. Kontrollera att proxy-servern körs på port 3001.');
    } else if (error.message?.includes('API key')) {
      throw new Error('Ogiltig API-nyckel. Kontrollera din Anthropic API-nyckel.');
    }

    throw new Error(`Misslyckades att konvertera recept: ${error.message}`);
  }
}

export async function fetchRecipeFromUrl(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch URL: ${response.statusText}`);
    }
    return await response.text();
  } catch (error) {
    console.error('Error fetching URL:', error);
    throw error;
  }
}

export function imageToBase64(file) {
  return new Promise((resolve, reject) => {
    if (file.size > 5 * 1024 * 1024) {
      reject(new Error('Image size must be less than 5MB'));
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = (e) => reject(new Error('Failed to read image file'));
    reader.readAsDataURL(file);
  });
}
