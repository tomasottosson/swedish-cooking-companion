# System Prompt Research: Swedification Recipe Converter

This document contains research findings to optimize a system prompt for a recipe converter app that adapts international recipes for Swedish home cooks.

---

## 1. Swedish Grocery Landscape

### Major Chains and Their Profiles

| Chain | Store Types | Product Range | Price Point | Notes |
|-------|-------------|---------------|-------------|-------|
| **ICA** | ICA Nära, ICA Supermarket, ICA Kvantum, MAXI | 7,000-19,000 items | Mid-high | Market leader, widest selection |
| **Coop** | Coop Nära, Coop Forum | Similar to ICA | Mid-high | Strong organic/eco-friendly focus |
| **Willys** | Standard format | 5,000-12,000 items | Budget | Best value, student-friendly |
| **Hemköp** | Standard format | 10,000-15,000 items | Mid | Good quality produce |
| **Lidl** | Discount format | Limited | Budget | Smaller selection, mostly own brands |

### Prompt Recommendations

```
When suggesting ingredients, prioritize items available at ICA, Coop, and Willys as these are the most accessible chains for Swedish home cooks. Avoid suggesting specialty items that would require visiting international food stores unless absolutely necessary.
```

### Commonly Available vs Hard to Find

**Readily Available:**
- All standard Swedish dairy products
- Swedish meat cuts from domestic suppliers
- Swedish flour types (Kungsörnen, Möllarens brands)
- Basic spices and seasonings
- Scandinavian specialty items (lingonberries, cloudberries, etc.)

**Harder to Find (may need specialty stores):**
- Specific American/British cheese varieties
- Authentic Mexican chiles
- Asian specialty ingredients (varies by store size)
- American buttermilk (kärnmjölk - mostly discontinued)
- American-style shortening

---

## 2. Swedish Dairy Products

### Complete Mapping Guide

#### Cream Types (Grädde)

| Swedish Name | Fat Content | English Equivalent | Whippable | Cooking Use |
|--------------|-------------|-------------------|-----------|-------------|
| **Vispgrädde** | 36-40% | Heavy/whipping cream | Yes | Desserts, whipped cream |
| **Mellangrädde** | 27-30% | Light whipping cream | Yes (when cold) | Less common nowadays |
| **Matlagningsgrädde** | 13-15% | Cooking cream | No | Sauces, soups |
| **Kaffegrädde** | 10-12% | Half-and-half | No | Coffee, light sauces |

#### Cultured Dairy Products

| Swedish Name | Description | Closest International Equivalent | Use Cases |
|--------------|-------------|----------------------------------|-----------|
| **Filmjölk** | Fermented milk, pourable, mild tang | Buttermilk (for baking), kefir | Breakfast, baking, marinades |
| **Lättfil** | Low-fat filmjölk | Low-fat buttermilk | Best substitute for American buttermilk in baking |
| **Gräddfil** | Soured cream, 12% fat | UK soured cream | Cold sauces, herring dishes, dips |
| **Crème fraiche** | Less sour than gräddfil, 34% fat | French crème fraîche | Cooking (won't curdle), sauces |
| **Kvarg/Kesella** | Fresh acid-set cheese, high protein | Quark, thick Greek yogurt | Baking, desserts, cold sauces |

### Critical Conversions for the System Prompt

```
DAIRY CONVERSIONS:
- "heavy cream" / "whipping cream" → vispgrädde (36-40% fett)
- "light cream" → mellangrädde (27%) or matlagningsgrädde (15%)
- "half and half" → kaffegrädde (10-12%) or mix mjölk + matlagningsgrädde
- "buttermilk" → filmjölk or lättfil (best for baking)
- "sour cream" → gräddfil (for cold use) or crème fraiche (for cooking)

IMPORTANT: Gräddfil curdles when heated. For hot dishes requiring sour cream, use crème fraiche instead.
```

---

## 3. Swedish Measurements

### Primary Measurement System

| Swedish | Full Name | Metric | US Equivalent |
|---------|-----------|--------|---------------|
| **dl** | deciliter | 100 ml | ~0.42 cups |
| **msk** | matsked (tablespoon) | 15 ml | 1 tablespoon |
| **tsk** | tesked (teaspoon) | 5 ml | 1 teaspoon |
| **krm** | kryddmått (spice measure) | 1 ml | ~1/5 teaspoon |

### Common Conversion Reference

```
CUP TO DECILITER:
- 1/4 cup = 0.6 dl (or 4 msk)
- 1/3 cup = 0.8 dl
- 1/2 cup = 1.2 dl
- 2/3 cup = 1.6 dl
- 3/4 cup = 1.8 dl
- 1 cup = 2.4 dl

DECILITER TO CUP:
- 1 dl = ~0.4 cups
- 2 dl = ~0.85 cups
- 2.5 dl = ~1 cup
- 5 dl = ~2 cups
```

### Prompt Recommendations

```
MEASUREMENT GUIDELINES:
- Always convert to metric: dl, msk, tsk, krm
- For dry ingredients over 1 dl, consider also providing weight in grams
- Round to practical measurements (use 2.5 dl instead of 2.37 dl)
- Swedish cooks prefer volume measurements (dl) over weight for liquids
- Use "krm" for very small amounts of spices (1 krm = 1 ml)

PRACTICAL ROUNDING:
- 1 cup → 2.5 dl (not 2.4 dl)
- 1/3 cup → 0.75 dl or 5 msk
- 1 tablespoon → 1 msk (exact)
- 1 teaspoon → 1 tsk (exact)
```

---

## 4. Swedish Meat Cuts

### Beef (Nötkött)

| American/British | Swedish | Notes |
|-----------------|---------|-------|
| Chuck roast / Chuck roll | **Högrev** | Coarse-fibered, marbled, great for slow cooking |
| Rib eye / Prime rib | **Entrecôte** | Premium steak cut |
| Sirloin | **Ryggbiff** | Back portion above fillet |
| Beef tenderloin / Fillet | **Oxfilé** | Most tender cut |
| Flank steak | **Flankstek** | Lean, needs marinating |
| Brisket | **Bringa** | Different cut location than US brisket |
| Topside | **Innanlår** | Inner thigh, lean roast |
| Beef stew meat | **Grytbitar** | Pre-cut for stews |

### Pork (Fläsk)

| American/British | Swedish | Notes |
|-----------------|---------|-------|
| Pork loin | **Fläskkarré** | Boneless loin roast |
| Pork tenderloin | **Fläskfilé** | Lean, tender |
| Pork chop | **Fläskkotlett** | Bone-in slice from karré |
| Pork belly / Side bacon | **Sidfläsk** | Unsmoked, often salted |
| Bacon | **Bacon** | Smoked, sliced (same word) |
| Pork shoulder | **Bog** / **Fläskbog** | For pulled pork |
| Ham | **Skinka** | Cured or fresh leg |

### Prompt Recommendations

```
MEAT CUT CONVERSIONS:
- "chuck roast" → högrev (utmärkt för långkok)
- "pork shoulder" / "Boston butt" → fläskbog or fläskkarré (for pulled pork)
- "bacon" in American recipes often means thicker cuts → Swedish bacon or sidfläsk
- "ground beef" → nötfärs
- "ground pork" → fläskfärs
- "mixed ground meat" (common in Swedish recipes) → blandfärs (50/50 nöt/fläsk)

NOTE: Swedish butchering follows different traditions. When in doubt, describe the cooking method and let the butcher (köttdisken) recommend the appropriate cut.
```

---

## 5. Swedish Flour Types

### Common Flour Types

| Swedish | English Equivalent | Protein Content | Best For |
|---------|-------------------|-----------------|----------|
| **Vetemjöl** | All-purpose flour | Standard | General baking, sauces |
| **Vetemjöl Special** | Bread flour | Higher protein | Bread, pizza dough, bullar |
| **Grahamsmjöl** | Whole wheat flour | Whole grain | Coarse breads, crispbread |
| **Rågsikt** | Sifted rye flour | Medium | Bread with milder rye flavor |
| **Rågmjöl (finmalt)** | Fine rye flour | Whole grain | Dark breads, sourdough |
| **Dinkelmjöl** | Spelt flour | Ancient grain | Flavorful breads, alternative to wheat |
| **Fullkornsmjöl** | Whole grain flour | Whole grain | Fiber-rich baking |
| **Potatismjöl** | Potato starch | Starch | Thickening, certain cakes |
| **Maizena** | Cornstarch | Starch | Thickening sauces |

### Prompt Recommendations

```
FLOUR CONVERSIONS:
- "all-purpose flour" → vetemjöl
- "bread flour" → vetemjöl special (högre proteinhalt)
- "whole wheat flour" → grahamsmjöl
- "cake flour" → vetemjöl (Swedish cake flour is rare; use regular)
- "self-rising flour" → vetemjöl + bakpulver (1 dl mjöl + 1.5 tsk bakpulver)
- "rye flour" → rågmjöl or rågsikt (specify if light or dark)

COMMON BRANDS: Kungsörnen, Möllarens (widely available at all grocery chains)
```

---

## 6. Oven Conventions

### Temperature System

Swedish ovens use **Celsius only**. All recipes should convert Fahrenheit to Celsius.

### Oven Types

| Swedish | English | Description |
|---------|---------|-------------|
| **Vanlig ugn** | Conventional oven | Heat from top and bottom elements |
| **Varmluftsugn** | Convection/fan oven | Fan circulates hot air evenly |
| **Grill** | Broiler | Top element only, high heat |
| **Varmluft med grill** | Convection + broiler | Combination setting |

### Temperature Conversion Table

| Conventional (vanlig ugn) | Convection (varmluft) | Description |
|---------------------------|----------------------|-------------|
| 150°C | 130-140°C | Low |
| 175°C | 155-160°C | Moderate-low |
| 200°C | 175-180°C | Moderate |
| 225°C | 200-205°C | Moderate-high |
| 250°C | 225-230°C | High |

### Prompt Recommendations

```
OVEN GUIDELINES:
- Always provide temperatures in Celsius
- Specify oven type: "vanlig ugn" or "varmluft"
- When converting from US recipes: reduce by 20-25°C for convection ovens
- Most Swedish recipes assume conventional oven unless stated

EXAMPLE FORMAT:
"Sätt ugnen på 200°C (vanlig ugn) eller 175°C (varmluft)"

COMMON TEMPERATURES:
- Cookies/småkakor: 175-200°C
- Cakes/kakor: 175°C
- Bread/bröd: 200-225°C
- Roasts/stekar: 150-175°C (slow), 200-225°C (hot)
- Pizza: 250°C or max temperature
```

---

## 7. Natural Swedish Cooking Language

### Essential Cooking Verbs

| Swedish Verb | English | Technical Definition |
|--------------|---------|---------------------|
| **Koka** | Boil | Heat liquid to 100°C with large bubbles |
| **Sjuda** | Simmer | Heat to just below boiling (~98°C), small bubbles |
| **Steka** | Fry/Pan-fry | Heat surface to 125-175°C for browning |
| **Fräsa** | Sauté (without browning) | Fry on low-medium heat WITHOUT letting food color |
| **Bryna** | Sear/Brown | Fry on HIGH heat to develop color and flavor |
| **Fritera** | Deep-fry | Cook in oil at 150-180°C |
| **Gratinera** | Gratinate/Broil | Brown the top under grill element |
| **Blanda** | Mix | Combine ingredients |
| **Vispa** | Whisk/Whip | Beat with whisk or electric mixer |
| **Röra** | Stir | Mix with spoon or spatula |
| **Hacka** | Chop | Cut into small pieces |
| **Skiva** | Slice | Cut into thin slices |
| **Tärna** | Dice | Cut into cubes |

### Natural Phrasing Examples

**Avoid awkward literal translations. Use natural Swedish cooking language:**

| Awkward | Natural Swedish |
|---------|-----------------|
| "Sauté the onions until translucent" | "Fräs löken tills den blir mjuk och glasig" |
| "Brown the meat on all sides" | "Bryn köttet på alla sidor" |
| "Bring to a boil, then reduce heat" | "Koka upp och sänk sedan värmen" |
| "Simmer for 30 minutes" | "Låt sjuda i 30 minuter" |
| "Add and stir until combined" | "Tillsätt och rör om" |
| "Season to taste" | "Smaka av med salt och peppar" |
| "Let rest for 10 minutes" | "Låt vila i 10 minuter" |
| "Preheat the oven" | "Sätt ugnen på..." |
| "Grease the pan" | "Smörj formen" |
| "Line with parchment paper" | "Klä med bakplåtspapper" |

### Prompt Recommendations

```
LANGUAGE GUIDELINES:
- Use active, direct Swedish cooking verbs
- "Fräs" = sauté without browning (for aromatics, onions)
- "Bryn" = sear/brown with color development (for meat)
- Prefer "sjuda" over "koka på låg värme" for simmering
- Use "smaka av" for "season to taste"
- Write in imperative form: "Tillsätt mjölet" not "Mjölet tillsätts"

AVOID:
- Direct translations of English idioms
- Overly formal or technical language
- Restaurant/professional kitchen jargon in home cooking context
```

---

## 8. Swedish Pantry Staples

### What Swedish Home Cooks Typically Have

#### Baking Essentials
- Vetemjöl (all-purpose flour)
- Strösocker (granulated sugar)
- Vaniljsocker (vanilla sugar - synthetic vanillin, NOT American vanilla sugar)
- Bakpulver (baking powder)
- Bikarbonat (baking soda - sold in small packets in spice aisle)
- Jäst (fresh yeast) - more common than dried in Sweden
- Kakao
- Kardemumma (cardamom) - essential for Swedish baking

#### Oils & Fats
- Smör (butter) - salted and unsalted
- Rapsolja (canola/rapeseed oil) - standard cooking oil
- Olivolja (olive oil)

#### Dairy (Refrigerated)
- Mjölk (milk)
- Filmjölk
- Smör (butter)
- Grädde (some type of cream)
- Crème fraiche

#### Syrups & Sweeteners
- Ljus sirap (light syrup) - for baking
- Mörk sirap (dark syrup) - for gingerbread, dark breads
- Honung (honey)

#### Seasonings & Spices
- Salt, peppar
- Kryddpeppar (allspice)
- Kanel (cinnamon)
- Kardemumma (cardamom)
- Ingefära (ginger)
- Muskot (nutmeg)
- Vitlök (garlic)
- Lök (onion)
- Dill (very common)
- Persilja (parsley)

#### Condiments & Preserves
- Lingonsylt (lingonberry jam) - served with meat dishes
- Senap (mustard) - Swedish style is sweeter
- Ketchup
- Soja (soy sauce)
- Ättika (vinegar) - often ättikssprit 12%

#### Pantry Items
- Ris (rice)
- Pasta
- Potatis (potatoes) - staple carb
- Knäckebröd (crispbread)
- Konserver (canned tomatoes, beans, etc.)
- Buljongtärningar (stock cubes) - very common

### Ingredient Substitutions for Swedish Cooks

| International Ingredient | Swedish Substitute | Notes |
|-------------------------|-------------------|-------|
| Corn syrup | Ljus sirap | Similar sweetness, different flavor |
| Molasses | Mörk sirap (or 75% mörk sirap + 25% ljus sirap) | Swedish version is milder |
| Golden syrup | Ljus sirap | Direct substitute |
| Shortening | Margarin or smör | Swedish cooking rarely uses shortening |
| Vanilla extract | Vaniljsocker (2 tsk per 1 tsk extract) | Different flavor profile |
| Pumpkin puree | Butternutpumpa (roast and purée) | Canned pumpkin rarely available |
| Canned evaporated milk | Reducera mjölk på spisen | Not commonly sold |

### Prompt Recommendations

```
PANTRY ASSUMPTIONS:
- Assume Swedish home cooks have: vetemjöl, strösocker, vaniljsocker, bakpulver, smör, rapsolja, standard spices, filmjölk, lingonsylt
- Don't assume they have: molasses (suggest mörk sirap), shortening (suggest smör/margarin), buttermilk (suggest filmjölk), vanilla extract (suggest vaniljsocker)

SYRUP CONVERSIONS:
- "corn syrup" → ljus sirap
- "molasses" → mörk sirap
- "maple syrup" → lönnsirap (available but expensive) or ljus sirap + lite mörk sirap

VANILLA NOTE:
Swedish "vaniljsocker" uses synthetic vanillin and has a distinct flavor different from real vanilla. Many Swedish bakers prefer this familiar taste. If a recipe needs real vanilla flavor, specify "äkta vanilj" or "vaniljstång."
```

---

## Summary: Key System Prompt Inclusions

### High-Priority Conversions

1. **Dairy products** - especially cream fat percentages and buttermilk → filmjölk
2. **Measurements** - cups to dl, with practical rounding
3. **Oven temperatures** - Fahrenheit to Celsius, note oven type
4. **Meat cuts** - use Swedish butcher terminology

### Language & Tone

- Write in natural Swedish cooking language
- Use proper cooking verbs (fräsa, bryna, sjuda)
- Imperative form for instructions
- Avoid literal translations of English cooking idioms

### Cultural Context

- Assume access to standard Swedish grocery stores
- Suggest commonly available substitutes
- Note when ingredients require specialty stores
- Reference familiar Swedish products and brands

---

## Sources

### Swedish Grocery Stores
- [ICA tops YouGov's 2025 grocery store brand rankings](https://yougov.com/articles/51804-ica-tops-yougovs-2025-grocery-store-brand-rankings-in-sweden)
- [Swedish supermarket comparison](https://medium.com/sleepless-in-sweden/slife-in-sweden-living-cost-survival-tips-and-supermarket-comparison-ica-willys-coop-9db8802aa3e5)
- [Grocery Shopping in Stockholm 2025](https://www.kth.se/blogs/studentblog/2019/07/grocery-shopping-in-stockholm/)

### Dairy Products
- [The ultimate guide to dairy products in Sweden](https://www.richfulthinker.com/2020/07/02/the-ultimate-guide-to-dairy-products-in-sweden/)
- [Gräddfil - Swedish food](https://www.swedishfood.com/graddfil)
- [Filmjölk - Wikipedia](https://en.wikipedia.org/wiki/Filmj%C3%B6lk)
- [Swedish cream types - Kunskapskokboken](http://www.kunskapskokboken.se/3.11847/varufakta/om-gradde/)

### Measurements
- [Metric to US Cooking Conversions](https://jormfredrik.se/metric-to-us-cooking-conversions/)
- [Conversion charts - American International Club Malmö](https://www.aicmalmo.com/sweden/conversion_cooking.php)
- [Swedish measurement units - Talkpal](https://talkpal.ai/culture/what-are-the-measurement-units-used-in-swedish-cooking/)

### Meat Cuts
- [Amerikanska styckningsdetaljer på svenska - Svenskt Kött](https://svensktkott.se/om-kott/styckdetaljer/amerikanska-styckningsdetaljer-pa-svenska/)
- [Cuts of meat - American International Club Malmö](https://www.aicmalmo.com/sweden/meat.php)
- [Swedish pork terminology - bab.la](https://en.bab.la/dictionary/swedish-english/fl%C3%A4skkarr%C3%A9)

### Flour Types
- [Olika mjölsorter - ICA](https://www.ica.se/artikel/mjolsorter/)
- [English to Swedish Baking Terminology](https://internationalwives.wixsite.com/wivesofsweden/single-post/2019/06/11/english-to-swedish-baking-terminology)
- [Vetemjöl Special - Skåne Möllan](https://www.skane-mollan.se/en/products/vetemjol-special/)

### Oven Conventions
- [Temperaturer varmluftsugn och vanlig ugn](https://www.landleyskok.se/tips-trix/temperaturer-varmluftsugn-och-vanlig-ugn)
- [Swedish Baking Temperatures](https://www.klefstadpublishing.com/temperatures.asp)
- [International differences: units and ingredients](https://www.swedishfood.com/units)

### Cooking Verbs
- [Vad är vad i köket - Receptfavoriter](https://receptfavoriter.se/matartiklar/vad-ar-vad-i-koket)
- [Swedish: bryna vs steka - WordReference](https://forum.wordreference.com/threads/swedish-bryna-vs-steka.3512438/)

### Pantry Staples
- [Pantry - Swedish Family Kitchen](https://www.swedishfamilykitchen.com/pantry)
- [Scandinavian Ingredients - Daytona Danielsen](https://daytonadanielsen.com/scandinavian-ingredients/)
- [Syrups in Sweden - Swedish food](https://www.swedishfood.com/syrups)

### Substitutions
- [Kitchen substitutions - American International Club Malmö](https://www.aicmalmo.com/sweden/substitutions.php)
- [Buttermilk substitute in Sweden](https://www.tiktok.com/@cecilia.tolone/video/7354092931600387360)
