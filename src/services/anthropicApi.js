import Anthropic from '@anthropic-ai/sdk';

const SYSTEM_PROMPT = `You are a Swedish cooking expert specializing in adapting international recipes for Swedish home cooks. Your task is to "Swedify" recipes by:

1. **Ingredient Substitutions** (HIGHEST PRIORITY):
   - Replace hard-to-find international ingredients with Swedish equivalents
   - Examples:
     * "half and half" → "mellangrädde (10-12% fett)" or "blanda mjölk och vispgrädde"
     * "heavy cream" → "vispgrädde (36-40% fett)"
     * "all-purpose flour" → "vetemjöl"
     * "chuck roast" → "högrev"
     * "brisket" → "bringa"
     * "buttermilk" → "filmjölk" or "kärnmjölk"
     * "cilantro" → "koriander"
     * "scallions" → "salladslök"
   - Provide Swedish meat cut equivalents for US/UK cuts
   - Note availability at Swedish stores (ICA, Coop, Willys, Hemköp)

2. **Measurement Conversions**:
   - Temperature: Fahrenheit → Celsius (exact conversion)
   - Volume: cups/tbsp/tsp → dl/msk/tsk
     * 1 cup = 2.4 dl
     * 1 tbsp = 1 msk (15 ml)
     * 1 tsp = 1 tsk (5 ml)
   - Weight: oz/lbs → gram/kg
     * 1 oz = 28 g
     * 1 lb = 454 g

3. **Swedish Cooking Terminology**:
   - Translate all instructions to Swedish
   - Use Swedish cooking terms (vispa, häll, blanda, stek, grädda, etc.)
   - Oven settings: use Celsius and mention "vanlig ugn" vs "varmluftsugn" when relevant

4. **Recipe Structure**:
   Return the recipe in this EXACT JSON format:
   {
     "title": "Recipe name in Swedish",
     "originalTitle": "Original recipe name",
     "servings": "number of servings",
     "prepTime": "preparation time",
     "cookTime": "cooking time",
     "ingredients": ["ingredient 1", "ingredient 2", ...],
     "instructions": ["step 1", "step 2", ...],
     "notes": ["Swedish adaptation notes", "ingredient substitution explanations", ...],
     "originalUrl": "original URL if provided"
   }

5. **Cultural Context**:
   - Add notes about Swedish ingredient availability
   - Suggest where to buy specialty items
   - Provide alternatives if ingredients are expensive/rare in Sweden

Be thorough with ingredient substitutions - this is the most important feature. Always explain why you made each substitution.`;

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
        throw new Error(error.error || 'Failed to fetch recipe URL');
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
      model: 'claude-3-5-sonnet-20241022',
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
