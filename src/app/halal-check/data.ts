
// ── Types ─────────────────────────────────────────────────────────────────────

export type HalalStatus = "Halal" | "Haram" | "Mashbooh" | "Unknown"

export interface ECode {
  code: string
  name: string
  aliases?: string[]
  status: HalalStatus
  source: string
  description: string
  category: string
  detail: string
}

export interface Product {
  id: string
  barcode: string
  name: string
  brand: string
  category: string
  halalStatus: HalalStatus
  certifications?: { body: string; country: string }[]
  country: string
  ingredients: string
  ingredientAnalysis: { name: string; status: HalalStatus; reason: string }[]
  description: string
  manufacturer: string
  lastVerified: string
  verificationSource: string
  alternatives?: string[]
}

export interface Ingredient {
  name: string
  status: HalalStatus
  reason: string
  alternatives?: string[]
}

// ── Status helpers ─────────────────────────────────────────────────────────────

export const STATUS_CONFIG: Record<HalalStatus, { label: string; color: string; bg: string; border: string; icon: string; explanation: string }> = {
  Halal: {
    label: "Halal",
    color: "text-emerald-700 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-950/40",
    border: "border-emerald-200 dark:border-emerald-800",
    icon: "✓",
    explanation: "This product/ingredient is permissible under Islamic law.",
  },
  Haram: {
    label: "Haram",
    color: "text-red-700 dark:text-red-400",
    bg: "bg-red-50 dark:bg-red-950/40",
    border: "border-red-200 dark:border-red-800",
    icon: "✗",
    explanation: "This product/ingredient is forbidden under Islamic law.",
  },
  Mashbooh: {
    label: "Mashbooh",
    color: "text-amber-700 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-950/40",
    border: "border-amber-200 dark:border-amber-800",
    icon: "?",
    explanation: "This product/ingredient is doubtful. Origin or processing method is unclear.",
  },
  Unknown: {
    label: "Unknown",
    color: "text-slate-600 dark:text-slate-400",
    bg: "bg-slate-50 dark:bg-slate-900/40",
    border: "border-slate-200 dark:border-slate-700",
    icon: "–",
    explanation: "Status could not be determined. Further investigation required.",
  },
}

// ── E-Codes Database ───────────────────────────────────────────────────────────

export const E_CODES: ECode[] = [
  // Colours (E1xx)
  { code: "E100", name: "Curcumin", aliases: ["Turmeric yellow"], status: "Halal", source: "Plant (turmeric root)", description: "Natural yellow pigment", category: "Colours", detail: "Extracted from the rhizomes of Curcuma longa (turmeric). Entirely plant-based and widely considered Halal by all major certification bodies." },
  { code: "E101", name: "Riboflavin (Vitamin B2)", status: "Halal", source: "Fermentation or synthetic", description: "Yellow vitamin used as a colourant", category: "Colours", detail: "Produced by microbial fermentation or synthesised chemically. No animal-derived components in the final product. Halal." },
  { code: "E102", name: "Tartrazine", status: "Halal", source: "Synthetic", description: "Artificial lemon-yellow colour", category: "Colours", detail: "Synthetic azo dye. No animal components. Halal, though may cause sensitivity in some individuals." },
  { code: "E104", name: "Quinoline Yellow", status: "Halal", source: "Synthetic", description: "Synthetic greenish-yellow dye", category: "Colours", detail: "Fully synthetic dye. No animal-derived components." },
  { code: "E110", name: "Sunset Yellow FCF", status: "Halal", source: "Synthetic", description: "Orange-yellow synthetic colour", category: "Colours", detail: "Synthetic azo dye. No animal components. Halal." },
  { code: "E120", name: "Cochineal / Carminic Acid / Carmines", aliases: ["Natural Red 4"], status: "Haram", source: "Insect (Dactylopius coccus)", description: "Red colour from dried insects", category: "Colours", detail: "Extracted from dried female cochineal insects. Forbidden as it is derived from insects, which are impermissible in Islam. Found in many red-coloured yogurts, juices, cosmetics, and sweets. Always check for E120 on labels of red-coloured products." },
  { code: "E122", name: "Azorubine / Carmoisine", status: "Halal", source: "Synthetic", description: "Red synthetic dye", category: "Colours", detail: "Fully synthetic azo dye. No animal components. Halal." },
  { code: "E124", name: "Ponceau 4R", status: "Halal", source: "Synthetic", description: "Red synthetic colour", category: "Colours", detail: "Synthetic azo dye. No animal-derived ingredients. Halal." },
  { code: "E127", name: "Erythrosine", status: "Halal", source: "Synthetic", description: "Synthetic cherry-pink colour", category: "Colours", detail: "Synthetic dye. No animal components. Halal." },
  { code: "E129", name: "Allura Red AC", status: "Halal", source: "Synthetic", description: "Red-orange synthetic colour", category: "Colours", detail: "Synthetic azo dye. No animal-derived components. Widely used in the US. Halal." },
  { code: "E133", name: "Brilliant Blue FCF", status: "Halal", source: "Synthetic", description: "Bright blue synthetic dye", category: "Colours", detail: "Synthetic dye. No animal components. Halal." },
  { code: "E140", name: "Chlorophylls", status: "Halal", source: "Plant", description: "Green colour from plant chlorophyll", category: "Colours", detail: "Extracted from green plants such as grass, alfalfa, and nettles. Entirely plant-based. Halal." },
  { code: "E150a", name: "Plain Caramel", status: "Halal", source: "Sugar (plant)", description: "Brown caramel colour from heated sugar", category: "Colours", detail: "Produced by heating sugar without any animal-derived catalysts. Plant-based. Halal." },
  { code: "E160a", name: "Beta-carotene", status: "Halal", source: "Plant or synthetic", description: "Orange-yellow colour, provitamin A", category: "Colours", detail: "Extracted from carrots and other plant sources, or synthetically produced. No animal-derived components. Halal." },
  { code: "E162", name: "Beetroot Red / Betanin", status: "Halal", source: "Plant (beetroot)", description: "Natural red-purple from beetroot", category: "Colours", detail: "Extracted from red beetroot. Entirely plant-based. Halal." },
  { code: "E171", name: "Titanium Dioxide", status: "Halal", source: "Mineral/Synthetic", description: "White colour and opacity agent", category: "Colours", detail: "Inorganic mineral pigment. Not derived from animals. Halal. Subject to ongoing safety reviews by food authorities." },
  { code: "E172", name: "Iron Oxides and Hydroxides", status: "Halal", source: "Mineral/Synthetic", description: "Red, yellow, black iron pigments", category: "Colours", detail: "Inorganic synthetic pigments. Not animal-derived. Halal." },

  // Preservatives (E2xx)
  { code: "E200", name: "Sorbic Acid", status: "Halal", source: "Synthetic or plant", description: "Mould and yeast inhibitor", category: "Preservatives", detail: "Originally isolated from rowan berries, now produced synthetically. No animal components. Halal." },
  { code: "E202", name: "Potassium Sorbate", status: "Halal", source: "Synthetic", description: "Common food preservative", category: "Preservatives", detail: "Salt of sorbic acid. Synthetically produced. No animal components. Widely used and Halal." },
  { code: "E210", name: "Benzoic Acid", status: "Halal", source: "Synthetic or plant", description: "Preservative for beverages and sauces", category: "Preservatives", detail: "Occurs naturally in some berries; commercially produced synthetically. No animal components. Halal." },
  { code: "E211", name: "Sodium Benzoate", status: "Halal", source: "Synthetic", description: "Soft drink preservative", category: "Preservatives", detail: "Sodium salt of benzoic acid. Synthetic. No animal-derived components. Halal." },
  { code: "E220", name: "Sulfur Dioxide", status: "Halal", source: "Synthetic/Mineral", description: "Preservative and antioxidant in wine, dried fruit", category: "Preservatives", detail: "Inorganic preservative. No animal-derived components. Note: commonly used in wine production — the wine itself would be Haram." },
  { code: "E250", name: "Sodium Nitrite", status: "Halal", source: "Synthetic", description: "Preservative in cured meats, colour fixative", category: "Preservatives", detail: "Synthetic preservative. Not derived from animals. Halal in itself; however, commonly used in pork products — the overall product may be Haram." },
  { code: "E260", name: "Acetic Acid (Vinegar)", status: "Halal", source: "Plant fermentation or synthetic", description: "Vinegar, acidity regulator and preservative", category: "Acidity Regulators", detail: "The primary component of vinegar, produced by fermentation of ethanol by bacteria. The acetic acid itself is permissible. Vinegar (khall) is explicitly Halal in Islamic jurisprudence regardless of its source alcohol, as the transformation is complete." },
  { code: "E270", name: "Lactic Acid", status: "Mashbooh", source: "Bacterial fermentation (medium may vary)", description: "Acid found in sour milk, fermented foods", category: "Acidity Regulators", detail: "Produced by bacterial fermentation of carbohydrates. The culture medium used may sometimes include animal-derived components. When plant-based media are confirmed, it is Halal. Without source verification, it is Mashbooh." },
  { code: "E280", name: "Propionic Acid", status: "Halal", source: "Synthetic or fermentation", description: "Mould inhibitor mainly used in bread", category: "Preservatives", detail: "Occurs naturally in some foods; commercially produced by fermentation or synthetically. Generally considered Halal." },
  { code: "E282", name: "Calcium Propanoate", status: "Halal", source: "Synthetic", description: "Common bread preservative", category: "Preservatives", detail: "Calcium salt of propionic acid. Synthetic. Halal." },

  // Antioxidants (E3xx)
  { code: "E300", name: "Ascorbic Acid (Vitamin C)", status: "Halal", source: "Synthetic or plant", description: "Antioxidant, nutrient, flour treatment", category: "Antioxidants", detail: "Vitamin C. Synthetically produced from glucose or from plant sources. No animal components. Halal." },
  { code: "E301", name: "Sodium Ascorbate", status: "Halal", source: "Synthetic", description: "Sodium salt of Vitamin C", category: "Antioxidants", detail: "Synthetic antioxidant. No animal components. Halal." },
  { code: "E306", name: "Tocopherol-rich Extract (Vitamin E)", status: "Halal", source: "Plant (vegetable oils)", description: "Natural antioxidant, Vitamin E", category: "Antioxidants", detail: "Extracted from plant oils such as soybean, sunflower, or wheat germ. Plant-based. Halal." },
  { code: "E322", name: "Lecithins", status: "Mashbooh", source: "Soya bean (plant) or egg (animal)", description: "Emulsifier in chocolate and baked goods", category: "Emulsifiers", detail: "Can be derived from soya beans (plant-based — Halal) or egg yolk (animal — Halal if from permissible source). Soya lecithin is the most common form and is Halal. Egg lecithin depends on confirmation. Verify source on label; 'soya lecithin' is clearly Halal." },
  { code: "E330", name: "Citric Acid", status: "Halal", source: "Fermentation (from citrus or sugar)", description: "Natural sour flavour, preservative", category: "Acidity Regulators", detail: "Produced by fermentation of sugars (molasses, dextrose) using Aspergillus niger mould. No animal components. Halal." },
  { code: "E331", name: "Sodium Citrates", status: "Halal", source: "Synthetic (from citric acid)", description: "Acidity regulator, emulsifier in cheese", category: "Acidity Regulators", detail: "Derived from citric acid. Halal." },

  // Emulsifiers, thickeners (E4xx)
  { code: "E400", name: "Alginic Acid", status: "Halal", source: "Brown seaweed", description: "Thickener and stabilizer", category: "Thickeners", detail: "Extracted from brown seaweed. Plant-based. Halal." },
  { code: "E406", name: "Agar", status: "Halal", source: "Red algae", description: "Gelling agent, vegetarian gelatin alternative", category: "Gelling Agents", detail: "Extracted from red seaweed. A plant-based alternative to gelatin. Widely used in Asian cuisines. Halal." },
  { code: "E407", name: "Carrageenan", status: "Halal", source: "Red seaweed", description: "Thickener and stabilizer", category: "Thickeners", detail: "Extracted from red seaweed. Plant-based. Halal." },
  { code: "E410", name: "Locust Bean Gum", aliases: ["Carob Gum"], status: "Halal", source: "Plant (carob tree seeds)", description: "Thickener, ice cream stabilizer", category: "Thickeners", detail: "Derived from seeds of the carob tree. Plant-based. Halal." },
  { code: "E412", name: "Guar Gum", status: "Halal", source: "Plant (guar bean)", description: "Thickener and stabilizer", category: "Thickeners", detail: "Derived from guar beans. Plant-based. Halal. Often used as a gluten-free thickener." },
  { code: "E415", name: "Xanthan Gum", status: "Halal", source: "Bacterial fermentation", description: "Versatile thickener and stabilizer", category: "Thickeners", detail: "Produced by fermentation of carbohydrates by Xanthomonas campestris bacteria. The fermentation medium should be verified; plant-based media are standard. Generally considered Halal." },
  { code: "E440", name: "Pectins", status: "Halal", source: "Plant (citrus peel, apple pomace)", description: "Natural gelling agent in jams and jellies", category: "Gelling Agents", detail: "Extracted from citrus peel, apple pomace, or other plant materials. The ideal Halal alternative to gelatin in confectionery and preserves. Entirely plant-based. Halal." },
  { code: "E441", name: "Gelatine", status: "Haram", source: "Animal (usually pork or non-Halal bovine)", description: "Gelling agent from animal collagen", category: "Gelling Agents", detail: "Extracted from collagen in animal bones, skins, and cartilage — most commonly from pigs. This makes it Haram by default. Halal-certified bovine gelatin exists but must be explicitly certified. Check for 'Halal gelatine' or 'bovine gelatine (Halal certified)' on labels. Found in gummies, marshmallows, jelly, cream cheese, and many supplements." },
  { code: "E442", name: "Ammonium Phosphatides", status: "Mashbooh", source: "Rapeseed or animal fat", description: "Emulsifier in chocolate", category: "Emulsifiers", detail: "Can be derived from rapeseed oil (plant — Halal) or from animal fats. The source determines its permissibility. Without clear labeling, it is Mashbooh." },
  { code: "E471", name: "Mono- and Diglycerides of Fatty Acids", status: "Mashbooh", source: "Animal or vegetable fat", description: "Common emulsifier in bread, margarine, baked goods", category: "Emulsifiers", detail: "One of the most frequently encountered Mashbooh ingredients. Can be derived from lard (pork fat — Haram), tallow (bovine fat — Haram if not Halal slaughtered), or vegetable oils (Halal). Without a clear source statement or Halal certification, it should be treated as Mashbooh. Commonly found in virtually all commercially produced bread and baked goods." },
  { code: "E472a", name: "Acetic Acid Esters of Mono- and Diglycerides", status: "Mashbooh", source: "Animal or vegetable fat", description: "Emulsifier in baked goods", category: "Emulsifiers", detail: "Derived from fatty acids which can be of animal or plant origin. Mushbooh without source verification." },
  { code: "E472b", name: "Lactic Acid Esters of Mono- and Diglycerides", status: "Mashbooh", source: "Animal or vegetable fat", description: "Emulsifier in baked goods", category: "Emulsifiers", detail: "Derived from fatty acids. Animal or plant origin possible. Mashbooh." },
  { code: "E472e", name: "DATEM", aliases: ["Diacetyl tartaric acid esters of mono- and diglycerides"], status: "Mashbooh", source: "Animal or vegetable fat", description: "Bread emulsifier for volume and texture", category: "Emulsifiers", detail: "Commonly used in commercial bread. Fatty acid source can be animal or vegetable. Mashbooh without Halal certification." },
  { code: "E481", name: "Sodium Stearoyl-2-lactylate (SSL)", status: "Mashbooh", source: "Animal or vegetable stearic acid", description: "Emulsifier in bread and cream fillings", category: "Emulsifiers", detail: "Contains stearic acid which can originate from pork fat (Haram), non-Halal bovine fat (Haram), or vegetable fat (Halal). Without a certified Halal label, considered Mashbooh. Very common in commercial baked goods." },
  { code: "E491", name: "Sorbitan Monostearate", status: "Mashbooh", source: "Animal or vegetable stearic acid", description: "Emulsifier in yeast foods and cake mixes", category: "Emulsifiers", detail: "Contains stearic acid. Animal or vegetable source possible. Mashbooh." },

  // pH Regulators (E5xx)
  { code: "E500", name: "Sodium Carbonates", aliases: ["Baking soda (E500ii)"], status: "Halal", source: "Mineral/Synthetic", description: "Leavening agent, acidity regulator", category: "pH Regulators", detail: "Inorganic mineral. Not derived from animals. Halal." },
  { code: "E501", name: "Potassium Carbonates", status: "Halal", source: "Mineral/Synthetic", description: "Leavening agent", category: "pH Regulators", detail: "Inorganic mineral. Halal." },
  { code: "E503", name: "Ammonium Carbonates", status: "Halal", source: "Synthetic", description: "Leavening agent", category: "pH Regulators", detail: "Synthetic compound. No animal components. Halal." },
  { code: "E551", name: "Silicon Dioxide", aliases: ["Silica"], status: "Halal", source: "Mineral", description: "Anti-caking agent", category: "Anti-caking Agents", detail: "Inorganic mineral. Not animal-derived. Halal." },
  { code: "E552", name: "Calcium Silicate", status: "Halal", source: "Mineral/Synthetic", description: "Anti-caking agent in table salt", category: "Anti-caking Agents", detail: "Inorganic compound. Not animal-derived. Halal." },

  // Flavour Enhancers (E6xx)
  { code: "E620", name: "Glutamic Acid", status: "Halal", source: "Fermentation or synthetic", description: "Naturally occurring amino acid, umami flavour", category: "Flavour Enhancers", detail: "Amino acid produced by bacterial fermentation of carbohydrates. No animal-derived components in the standard production process. Halal." },
  { code: "E621", name: "Monosodium Glutamate (MSG)", status: "Halal", source: "Bacterial fermentation", description: "Umami flavour enhancer", category: "Flavour Enhancers", detail: "Produced by fermentation using bacteria on sugar or starch. No animal components in the production. Generally considered Halal by Islamic scholars and certification bodies. Health concerns around MSG are unrelated to Halal status." },
  { code: "E627", name: "Disodium Guanylate", status: "Mashbooh", source: "Fish, yeast, or animal-derived", description: "Flavour enhancer, used with MSG", category: "Flavour Enhancers", detail: "Can be derived from fish (sardines), yeast, or animal sources. If from fish, it is Halal; if from pork-derived sources, it is Haram. Mashbooh without verified source." },
  { code: "E631", name: "Disodium Inosinate", status: "Mashbooh", source: "Pork, fish, or yeast", description: "Potent flavour enhancer, synergistic with MSG", category: "Flavour Enhancers", detail: "Can be derived from pork (Haram), fish (Halal), or produced by fermentation from yeast. Commonly found in crisps, instant noodles, and snacks alongside E621. Without certified Halal source, treat as Mashbooh." },
  { code: "E635", name: "Disodium Ribonucleotides", status: "Mashbooh", source: "Pork or yeast origin", description: "Combination flavour enhancer (E627 + E631)", category: "Flavour Enhancers", detail: "A mixture of disodium guanylate and disodium inosinate. Can be from pork origin. Mashbooh without certified Halal source. Very common in savoury snacks and instant foods." },

  // Glazing Agents, surface treatments (E9xx)
  { code: "E900", name: "Dimethylpolysiloxane", status: "Halal", source: "Synthetic (silicone)", description: "Anti-foaming agent in cooking oils and fats", category: "Others", detail: "Synthetic silicone polymer. No animal components. Halal." },
  { code: "E901", name: "Beeswax", status: "Mashbooh", source: "Honeybee (insect)", description: "Glazing agent for confectionery, fruits", category: "Glazing Agents", detail: "Produced by honeybees. Islamic scholars differ on its permissibility. Many Halal certifiers consider it permissible as it is a secretion and not derived from the bee's body tissue. However, some consider insects wholly impermissible. Most mainstream Halal certifiers permit beeswax." },
  { code: "E904", name: "Shellac", status: "Haram", source: "Lac insect (Kerria lacca)", description: "Glazing agent for sweets and pill coatings", category: "Glazing Agents", detail: "A resinous secretion of the female lac bug, scraped from tree bark. Derived from insects which are forbidden in Islam. Found as a glaze on some candies, pill coatings, chocolate raisins, and as a fruit wax. Look for it listed as 'confectioner's glaze' or 'pharmaceutical glaze' on supplements." },
  { code: "E920", name: "L-cysteine", status: "Mashbooh", source: "Human hair, poultry feathers, or synthetic", description: "Flour treatment agent, bread improver", category: "Flour Treatment Agents", detail: "Historically derived from human hair or duck/chicken feathers. If from human hair, considered Haram or Najis by many scholars. If from non-Halal slaughtered animal feathers, it is Haram. Synthetic L-cysteine exists and would be Halal. Without source information from the manufacturer, it must be treated as Mashbooh." },
  { code: "E925", name: "Chlorine", status: "Halal", source: "Synthetic/Mineral", description: "Flour bleaching agent", category: "Flour Treatment Agents", detail: "Inorganic gas used for flour treatment. No animal-derived components. Halal." },

  // Sweeteners
  { code: "E950", name: "Acesulfame K", status: "Halal", source: "Synthetic", description: "Artificial sweetener, much sweeter than sugar", category: "Sweeteners", detail: "Fully synthetic sweetener. No animal-derived components. Halal." },
  { code: "E951", name: "Aspartame", status: "Halal", source: "Synthetic", description: "Artificial sweetener in diet products", category: "Sweeteners", detail: "Synthetically produced from phenylalanine and aspartic acid (amino acids). No animal components in standard production. Halal. Note: unsuitable for people with phenylketonuria (PKU)." },
  { code: "E953", name: "Isomalt", status: "Halal", source: "Plant (sucrose)", description: "Sugar alcohol sweetener, used in diabetic foods", category: "Sweeteners", detail: "Derived from sucrose (beet or cane sugar). Plant-based. Halal." },
  { code: "E954", name: "Saccharin", status: "Halal", source: "Synthetic", description: "Oldest artificial sweetener", category: "Sweeteners", detail: "Fully synthetic. No animal-derived components. Halal." },
  { code: "E955", name: "Sucralose", status: "Halal", source: "Synthetic (from sucrose)", description: "Artificial sweetener, used in Splenda", category: "Sweeteners", detail: "Made by selective chlorination of sucrose. No animal-derived components. Halal." },
  { code: "E960", name: "Steviol Glycosides (Stevia)", status: "Halal", source: "Plant (Stevia rebaudiana leaf)", description: "Natural sweetener from stevia plant", category: "Sweeteners", detail: "Extracted from the leaves of the Stevia plant. Entirely plant-based. Halal." },
  { code: "E965", name: "Maltitol", status: "Halal", source: "Plant (starch)", description: "Sugar alcohol sweetener", category: "Sweeteners", detail: "Produced by hydrogenation of maltose from starch. Plant-based. Halal." },
  { code: "E967", name: "Xylitol", status: "Halal", source: "Plant (birchwood, corn cobs)", description: "Sugar alcohol in sugar-free gum", category: "Sweeteners", detail: "Derived from plant materials. Plant-based. Halal." },
]

// ── INS Codes (same numbering as E-codes, international designation) ───────────

export const INS_CODES = E_CODES.map(e => ({
  ...e,
  code: `INS ${e.code.replace("E", "")}`,
}))

// ── Common Ingredients Dictionary ─────────────────────────────────────────────

export const COMMON_INGREDIENTS: Ingredient[] = [
  { name: "Gelatin", status: "Mashbooh", reason: "Often from pork. Look for 'Halal certified' or 'bovine gelatin (Halal)' on the label.", alternatives: ["Agar-agar", "Pectin", "Carrageenan", "Guar gum"] },
  { name: "Gelatine", status: "Mashbooh", reason: "Often from pork. Look for 'Halal certified' or 'bovine gelatin (Halal)' on the label.", alternatives: ["Agar-agar", "Pectin"] },
  { name: "Lard", status: "Haram", reason: "Pig fat. Absolutely forbidden." },
  { name: "Pork", status: "Haram", reason: "Pig-derived. Absolutely forbidden in Islam." },
  { name: "Ham", status: "Haram", reason: "Pork product. Absolutely forbidden." },
  { name: "Bacon", status: "Haram", reason: "Pork product. Absolutely forbidden." },
  { name: "Alcohol", status: "Haram", reason: "Intoxicating substance. Forbidden for consumption.", alternatives: ["Fruit juice", "Non-alcoholic vanilla"] },
  { name: "Wine", status: "Haram", reason: "Alcoholic beverage. Forbidden." },
  { name: "Ethanol", status: "Mashbooh", reason: "When used as a processing agent in tiny amounts (e.g. in vanilla extract), scholars differ. For direct consumption it is Haram." },
  { name: "Vanilla Extract", status: "Mashbooh", reason: "Traditional vanilla extract contains alcohol. Halal vanilla flavour (non-alcoholic) is available and permissible.", alternatives: ["Halal vanilla flavour", "Vanilla powder"] },
  { name: "Carmine", status: "Haram", reason: "Red dye from cochineal insects. Forbidden." },
  { name: "Cochineal", status: "Haram", reason: "Derived from insects. Forbidden." },
  { name: "Rennet", status: "Mashbooh", reason: "Animal rennet from non-Halal slaughtered animals is Haram. Microbial or Halal-certified bovine rennet is permissible.", alternatives: ["Microbial rennet", "Halal-certified rennet"] },
  { name: "Shellac", status: "Haram", reason: "From lac insects. Forbidden." },
  { name: "L-cysteine", status: "Mashbooh", reason: "Can be from human hair or feathers. Source must be verified.", alternatives: ["Synthetic L-cysteine"] },
  { name: "Pepsin", status: "Mashbooh", reason: "Digestive enzyme often from pork stomach. Halal-certified bovine pepsin exists.", alternatives: ["Plant-based enzyme"] },
  { name: "Lipase", status: "Mashbooh", reason: "Enzyme that can be from pork pancreas. Source must be verified.", alternatives: ["Microbial lipase", "Halal-certified lipase"] },
  { name: "Whey", status: "Halal", reason: "Dairy by-product. Halal as long as rennet used in cheese production was Halal." },
  { name: "Casein", status: "Halal", reason: "Milk protein. Halal." },
  { name: "Lactose", status: "Halal", reason: "Milk sugar. Halal." },
  { name: "Butter", status: "Halal", reason: "Dairy product. Halal." },
  { name: "Cream", status: "Halal", reason: "Dairy product. Halal." },
  { name: "Yeast", status: "Halal", reason: "Fungi used in fermentation. Halal." },
  { name: "Yeast Extract", status: "Halal", reason: "From yeast cells. Halal." },
  { name: "Monosodium Glutamate", status: "Halal", reason: "Umami flavour enhancer produced by fermentation. Halal." },
  { name: "MSG", status: "Halal", reason: "Produced by bacterial fermentation of carbohydrates. Halal." },
  { name: "Pectin", status: "Halal", reason: "Plant-based gelling agent from fruit peel. Halal." },
  { name: "Carrageenan", status: "Halal", reason: "Extracted from red seaweed. Halal." },
  { name: "Guar Gum", status: "Halal", reason: "From guar beans. Plant-based. Halal." },
  { name: "Xanthan Gum", status: "Halal", reason: "From bacterial fermentation on plant media. Halal." },
  { name: "Soy Lecithin", status: "Halal", reason: "Emulsifier from soybeans. Plant-based. Halal." },
  { name: "Sunflower Oil", status: "Halal", reason: "Vegetable oil. Halal." },
  { name: "Palm Oil", status: "Halal", reason: "Vegetable oil. Halal." },
  { name: "Cocoa Butter", status: "Halal", reason: "Fat extracted from cocoa beans. Plant-based. Halal." },
  { name: "Stearic Acid", status: "Mashbooh", reason: "Fatty acid that can come from animal fat (including pork) or vegetable oil. Source determines permissibility." },
  { name: "Glycerine", status: "Mashbooh", reason: "Can be derived from animal fats or plant oils. Source must be verified.", alternatives: ["Plant-based glycerine"] },
  { name: "Glycerol", status: "Mashbooh", reason: "Can be derived from animal fats or plant oils. Source must be verified.", alternatives: ["Vegetable glycerol"] },
  { name: "Natural Flavours", status: "Mashbooh", reason: "Broad category. Can include animal-derived flavourings. Manufacturer must be contacted for clarification." },
  { name: "Natural Flavoring", status: "Mashbooh", reason: "Broad category. Can include animal-derived flavourings. Manufacturer must be contacted for clarification." },
  { name: "Artificial Flavors", status: "Halal", reason: "Typically synthetic. Generally Halal unless derived from Haram sources." },
  { name: "Mono and Diglycerides", status: "Mashbooh", reason: "Emulsifier that can be from animal or plant fat. Common in bread and baked goods." },
  { name: "Monoglycerides", status: "Mashbooh", reason: "Can be from animal fat (lard/tallow) or vegetable oil. Mashbooh without verified source." },
  { name: "Diglycerides", status: "Mashbooh", reason: "Can be from animal fat or vegetable oil. Mashbooh without verified source." },
  { name: "Sodium Stearoyl Lactylate", status: "Mashbooh", reason: "SSL — common bread emulsifier. Stearic acid source can be animal or vegetable." },
  { name: "DATEM", status: "Mashbooh", reason: "Common bread emulsifier. Fatty acid source can be animal or vegetable." },
  { name: "Calcium Carbonate", status: "Halal", reason: "Mineral. Not animal-derived. Halal." },
  { name: "Sodium Bicarbonate", status: "Halal", reason: "Baking soda. Mineral/synthetic. Halal." },
  { name: "Baking Soda", status: "Halal", reason: "Mineral/synthetic. Halal." },
  { name: "Citric Acid", status: "Halal", reason: "From fermentation of sugars. No animal components. Halal." },
  { name: "Ascorbic Acid", status: "Halal", reason: "Vitamin C. Synthetic or plant-based. Halal." },
  { name: "Tocopherol", status: "Halal", reason: "Vitamin E from plant oils. Halal." },
  { name: "Beta-Carotene", status: "Halal", reason: "Natural pigment from plant sources. Halal." },
  { name: "Curcumin", status: "Halal", reason: "Natural yellow pigment from turmeric. Halal." },
  { name: "Turmeric", status: "Halal", reason: "Spice and natural colourant. Halal." },
]

// ── Product Database ───────────────────────────────────────────────────────────

export const PRODUCTS: Product[] = [
  {
    id: "haribo-goldbears",
    barcode: "4001686325773",
    name: "Gold Bears Gummy Candy",
    brand: "Haribo",
    category: "Confectionery",
    halalStatus: "Haram",
    country: "Germany",
    ingredients: "Glucose syrup, sugar, gelatine, dextrose, citric acid, fruit & plant concentrates (apple, blackcurrant, lemon, mandarin, orange, strawberry), flavourings, glazing agent: beeswax; colour: curcumin (E100)",
    ingredientAnalysis: [
      { name: "Gelatine", status: "Haram", reason: "Pork-derived gelatin confirmed by manufacturer" },
      { name: "Beeswax", status: "Mashbooh", reason: "Insect-derived glazing agent — scholars differ" },
      { name: "E100 (Curcumin)", status: "Halal", reason: "Plant-based natural colour from turmeric" },
    ],
    description: "The iconic Haribo Gold Bears contain pork gelatin, making them Haram for Muslims. Haribo does produce Halal-certified versions in some markets (look for the Halal label). Always check the specific product packaging.",
    manufacturer: "Haribo GmbH & Co. KG",
    lastVerified: "2025-11-01",
    verificationSource: "Manufacturer ingredient disclosure",
    alternatives: ["halal-gummy-bears", "roudnah-gummies"],
  },
  {
    id: "lays-classic",
    barcode: "0028400090148",
    name: "Classic Potato Chips",
    brand: "Lay's",
    category: "Snacks",
    halalStatus: "Halal",
    certifications: [{ body: "IFANCA", country: "USA" }],
    country: "USA",
    ingredients: "Potatoes, Vegetable Oil (Sunflower, Corn, and/or Canola Oil), Salt.",
    ingredientAnalysis: [
      { name: "Potatoes", status: "Halal", reason: "Plant-based vegetable" },
      { name: "Vegetable Oil", status: "Halal", reason: "Sunflower, corn, or canola — plant-based" },
      { name: "Salt", status: "Halal", reason: "Mineral, not animal-derived" },
    ],
    description: "Lay's Classic chips have minimal ingredients — all plant-based or mineral. The classic variety is considered Halal.",
    manufacturer: "Frito-Lay (PepsiCo)",
    lastVerified: "2025-10-15",
    verificationSource: "IFANCA certification + ingredient analysis",
  },
  {
    id: "pringles-original",
    barcode: "0038000183348",
    name: "Original Potato Crisps",
    brand: "Pringles",
    category: "Snacks",
    halalStatus: "Halal",
    country: "USA",
    ingredients: "Dried Potatoes, Vegetable Oil (Corn, Cottonseed, High Oleic Soybean, and/or Sunflower Oil), Degerminated Yellow Corn Flour, Cornstarch, Rice Flour, Maltodextrin, Mono and Diglycerides, Salt, and Wheat Starch.",
    ingredientAnalysis: [
      { name: "Dried Potatoes", status: "Halal", reason: "Plant-based" },
      { name: "Vegetable Oil", status: "Halal", reason: "Plant-based oils" },
      { name: "Mono and Diglycerides", status: "Mashbooh", reason: "Can be from animal or plant fat — verify source" },
      { name: "Maltodextrin", status: "Halal", reason: "Derived from starch (plant)" },
    ],
    description: "Pringles Original contains mono and diglycerides which can be of animal or plant origin. The manufacturer lists vegetable-sourced ingredients. Generally considered Halal.",
    manufacturer: "Kellogg's",
    lastVerified: "2025-09-20",
    verificationSource: "Ingredient analysis + manufacturer response",
  },
  {
    id: "kitkat-milk-chocolate",
    barcode: "7622300467401",
    name: "KitKat Milk Chocolate Bar",
    brand: "Kit Kat",
    category: "Confectionery",
    halalStatus: "Halal",
    certifications: [{ body: "Nestle Halal Certification", country: "Multiple" }],
    country: "UK",
    ingredients: "Sugar, Wheat Flour, Cocoa Butter, Skimmed Milk Powder, Cocoa Mass, Lactose, Palm Oil, Whey Powder, Yeast, Raising Agent (Sodium Bicarbonate), Emulsifier (Soya Lecithin), Natural Flavouring, Salt.",
    ingredientAnalysis: [
      { name: "Soya Lecithin", status: "Halal", reason: "Soy-derived emulsifier — plant-based" },
      { name: "Natural Flavouring", status: "Mashbooh", reason: "Vanilla flavouring — confirm non-alcoholic source" },
      { name: "Whey Powder", status: "Halal", reason: "Dairy by-product — Halal" },
      { name: "Palm Oil", status: "Halal", reason: "Vegetable oil — Halal" },
      { name: "Sodium Bicarbonate", status: "Halal", reason: "Mineral/synthetic raising agent — Halal" },
    ],
    description: "Kit Kat is produced with Nestle's Halal certification in most markets. The soya lecithin used is plant-based. Confirm the specific country of manufacture as formulations differ.",
    manufacturer: "Nestlé",
    lastVerified: "2025-10-01",
    verificationSource: "Nestlé Halal certification",
  },
  {
    id: "oreo-original",
    barcode: "0044000030278",
    name: "Original Chocolate Sandwich Cookies",
    brand: "Oreo",
    category: "Biscuits",
    halalStatus: "Halal",
    country: "USA",
    ingredients: "Unbleached Enriched Flour (Wheat Flour, Niacin, Reduced Iron, Thiamine Mononitrate, Riboflavin, Folic Acid), Sugar, Palm and/or Canola Oil, Cocoa (Processed with Alkali), High Fructose Corn Syrup, Leavening (Baking Soda and/or Calcium Phosphate), Salt, Soy Lecithin, Chocolate, Artificial Flavor.",
    ingredientAnalysis: [
      { name: "Soy Lecithin", status: "Halal", reason: "Plant-based emulsifier from soy" },
      { name: "Palm and/or Canola Oil", status: "Halal", reason: "Vegetable oils — plant-based" },
      { name: "Artificial Flavor", status: "Halal", reason: "Synthetic flavouring — Halal" },
      { name: "Cocoa", status: "Halal", reason: "Plant-based. Alkalised cocoa is Halal" },
      { name: "High Fructose Corn Syrup", status: "Halal", reason: "Derived from corn — plant-based" },
    ],
    description: "US Oreos are made with vegetable-based ingredients. They do not contain gelatin or pork-derived ingredients. Generally considered Halal though they are not officially certified.",
    manufacturer: "Mondelēz International",
    lastVerified: "2025-10-20",
    verificationSource: "Ingredient analysis",
  },
  {
    id: "coca-cola-original",
    barcode: "5000112548167",
    name: "Coca-Cola Original Taste",
    brand: "Coca-Cola",
    category: "Beverages",
    halalStatus: "Halal",
    certifications: [{ body: "Multiple regional Halal bodies", country: "Global" }],
    country: "UK",
    ingredients: "Carbonated water, sugar, colour (caramel E150d), phosphoric acid, natural flavourings including caffeine.",
    ingredientAnalysis: [
      { name: "Carbonated Water", status: "Halal", reason: "Water with CO2 gas" },
      { name: "Sugar", status: "Halal", reason: "Plant-based sweetener" },
      { name: "E150d (Caramel colour)", status: "Halal", reason: "Caramel produced from sugar" },
      { name: "Phosphoric Acid", status: "Halal", reason: "Mineral acid — not animal-derived" },
      { name: "Natural Flavourings", status: "Halal", reason: "Coca-Cola confirms no animal or alcohol-based flavourings" },
      { name: "Caffeine", status: "Halal", reason: "Plant-derived stimulant" },
    ],
    description: "Coca-Cola is certified Halal in most markets. The company has confirmed that their beverages do not contain alcohol or animal-derived ingredients.",
    manufacturer: "The Coca-Cola Company",
    lastVerified: "2025-11-05",
    verificationSource: "Manufacturer statement + regional Halal certifications",
  },
  {
    id: "snickers-original",
    barcode: "0040000046233",
    name: "Snickers Chocolate Bar",
    brand: "Snickers",
    category: "Confectionery",
    halalStatus: "Halal",
    certifications: [{ body: "IFANCA", country: "USA" }],
    country: "USA",
    ingredients: "Milk Chocolate (Sugar, Cocoa Butter, Chocolate, Skim Milk, Lactose, Milkfat, Soy Lecithin, Artificial Flavor), Peanuts, Corn Syrup, Sugar, Skim Milk, Butter, Salt, Egg Whites, Artificial Flavor.",
    ingredientAnalysis: [
      { name: "Soy Lecithin", status: "Halal", reason: "Plant-based emulsifier" },
      { name: "Butter", status: "Halal", reason: "Dairy fat — Halal" },
      { name: "Egg Whites", status: "Halal", reason: "Chicken eggs — Halal" },
      { name: "Artificial Flavor", status: "Halal", reason: "Synthetic — Halal" },
    ],
    description: "Snickers bars are IFANCA certified Halal in the US market. They do not contain pork-derived gelatin.",
    manufacturer: "Mars, Incorporated",
    lastVerified: "2025-09-10",
    verificationSource: "IFANCA certification",
  },
  {
    id: "nutella-spread",
    barcode: "3014920029395",
    name: "Hazelnut Cocoa Spread",
    brand: "Nutella",
    category: "Spreads",
    halalStatus: "Halal",
    certifications: [{ body: "Multiple regional Halal bodies", country: "Global" }],
    country: "Italy",
    ingredients: "Sugar, Palm Oil, Hazelnuts 13%, Skim Milk Powder 8.7%, Fat-Reduced Cocoa 7.4%, Emulsifier: Lecithins (Soya); Vanillin.",
    ingredientAnalysis: [
      { name: "Palm Oil", status: "Halal", reason: "Vegetable oil — Halal" },
      { name: "Soya Lecithin", status: "Halal", reason: "Plant-based emulsifier" },
      { name: "Vanillin", status: "Halal", reason: "Synthetic vanilla flavour — Halal (not vanilla extract)" },
      { name: "Skim Milk Powder", status: "Halal", reason: "Dairy product — Halal" },
    ],
    description: "Nutella is certified Halal in most markets. It uses vanillin (synthetic, Halal) rather than vanilla extract. The soya lecithin is plant-based. Certified by regional Halal bodies.",
    manufacturer: "Ferrero SpA",
    lastVerified: "2025-10-30",
    verificationSource: "Ferrero official statement + regional Halal certifications",
  },
  {
    id: "mms-milk-chocolate",
    barcode: "0040000052890",
    name: "Milk Chocolate M&Ms",
    brand: "M&M's",
    category: "Confectionery",
    halalStatus: "Mashbooh",
    country: "USA",
    ingredients: "Milk Chocolate (Sugar, Chocolate, Skim Milk, Cocoa Butter, Lactose, Milkfat, Soy Lecithin, Salt, Artificial Flavors), Sugar, Cornstarch, Less than 1%: Corn Syrup, Dextrin, Coloring (Blue 1 Lake, Red 40 Lake, Yellow 6, Yellow 5, Blue 1, Red 40, Yellow 6 Lake, Yellow 5 Lake, Blue 2 Lake), Carnauba Wax, Gum Acacia.",
    ingredientAnalysis: [
      { name: "Soy Lecithin", status: "Halal", reason: "Plant-based emulsifier" },
      { name: "Carnauba Wax", status: "Halal", reason: "Plant wax from palm leaves — Halal" },
      { name: "Gum Acacia", status: "Halal", reason: "Plant-based gum — Halal" },
      { name: "Artificial Flavors", status: "Mashbooh", reason: "Source not specified — contact manufacturer" },
      { name: "Blue 1, Red 40 etc.", status: "Halal", reason: "Synthetic food colours — Halal" },
    ],
    description: "M&Ms plain milk chocolate are generally considered Halal based on ingredient analysis. Some markets have different formulations. The artificial flavors have not been fully disclosed. Mars has confirmed no pork gelatin in plain M&Ms.",
    manufacturer: "Mars, Incorporated",
    lastVerified: "2025-09-05",
    verificationSource: "Ingredient analysis + Mars consumer response",
  },
  {
    id: "heinz-ketchup",
    barcode: "0013000006262",
    name: "Tomato Ketchup",
    brand: "Heinz",
    category: "Condiments",
    halalStatus: "Halal",
    certifications: [{ body: "Multiple regional Halal bodies", country: "Global" }],
    country: "USA",
    ingredients: "Tomato Concentrate from Red Ripe Tomatoes, Distilled Vinegar, High Fructose Corn Syrup, Corn Syrup, Salt, Spice, Onion Powder, Natural Flavoring.",
    ingredientAnalysis: [
      { name: "Tomato Concentrate", status: "Halal", reason: "Plant-based — Halal" },
      { name: "Distilled Vinegar", status: "Halal", reason: "Acetic acid — Halal (vinegar is permissible in Islamic law)" },
      { name: "High Fructose Corn Syrup", status: "Halal", reason: "Corn-derived sweetener — Halal" },
      { name: "Natural Flavoring", status: "Halal", reason: "Heinz confirmed plant-based natural flavourings" },
    ],
    description: "Heinz Ketchup is Halal certified in most markets. The distilled vinegar is permissible in Islamic jurisprudence as the alcohol is fully converted to acetic acid.",
    manufacturer: "H.J. Heinz Company",
    lastVerified: "2025-10-10",
    verificationSource: "Halal certification + ingredient analysis",
  },
  {
    id: "activia-strawberry",
    barcode: "3033490008506",
    name: "Strawberry Probiotic Yogurt",
    brand: "Activia",
    category: "Dairy",
    halalStatus: "Halal",
    certifications: [{ body: "Various regional bodies", country: "Global" }],
    country: "France",
    ingredients: "Skimmed milk, strawberry preparation 11% (strawberry purée, sugar, modified maize starch, gelling agent: pectin, colour: anthocyanins), sugar, skimmed milk powder, cream, modified maize starch, live yogurt cultures.",
    ingredientAnalysis: [
      { name: "Skimmed Milk", status: "Halal", reason: "Dairy — Halal" },
      { name: "Pectin", status: "Halal", reason: "Plant-based gelling agent — Halal" },
      { name: "Anthocyanins", status: "Halal", reason: "Natural pigment from plants — Halal" },
      { name: "Modified Maize Starch", status: "Halal", reason: "Corn-derived starch — Halal" },
      { name: "Live Yogurt Cultures", status: "Halal", reason: "Beneficial bacteria for fermentation — Halal" },
    ],
    description: "Activia yogurt uses plant-based gelling agents (pectin, not gelatin) and is Halal in most markets. No pork-derived ingredients. Certified Halal in many regions.",
    manufacturer: "Danone",
    lastVerified: "2025-10-25",
    verificationSource: "Ingredient analysis + Halal certification",
  },
  {
    id: "red-bull-original",
    barcode: "9002490100070",
    name: "Energy Drink Original",
    brand: "Red Bull",
    category: "Beverages",
    halalStatus: "Mashbooh",
    country: "Austria",
    ingredients: "Carbonated water, sucrose, glucose, citric acid, taurine 0.4%, sodium bicarbonate, magnesium carbonate, niacinamide, calcium pantothenate, pyridoxine HCl, vitamin B12, natural and artificial flavours, colours.",
    ingredientAnalysis: [
      { name: "Taurine", status: "Mashbooh", reason: "Amino acid — Red Bull states it is synthetically produced, which would be Halal. Verify with manufacturer." },
      { name: "Natural Flavours", status: "Mashbooh", reason: "Source not specified. Red Bull has not fully disclosed natural flavour origins." },
      { name: "Sucrose/Glucose", status: "Halal", reason: "Plant-derived sugars — Halal" },
      { name: "B vitamins", status: "Halal", reason: "Synthetic vitamins — Halal" },
    ],
    description: "Red Bull's Halal status is debated. The taurine is stated to be synthetic. However, natural flavours are undisclosed. Red Bull is Halal certified in some markets (UAE, Malaysia). Check local packaging for certification.",
    manufacturer: "Red Bull GmbH",
    lastVerified: "2025-09-15",
    verificationSource: "Ingredient analysis + manufacturer response",
  },
  {
    id: "ferrero-rocher",
    barcode: "8000500131329",
    name: "Rocher Milk Chocolate",
    brand: "Ferrero Rocher",
    category: "Confectionery",
    halalStatus: "Halal",
    certifications: [{ body: "Multiple regional Halal bodies", country: "Multiple" }],
    country: "Italy",
    ingredients: "Sugar, palm oil, wheat flour, hazelnuts 13%, skimmed milk powder, fat-reduced cocoa, whey powder, lecithin (sunflower, soya), vanillin.",
    ingredientAnalysis: [
      { name: "Palm Oil", status: "Halal", reason: "Vegetable oil — Halal" },
      { name: "Sunflower/Soya Lecithin", status: "Halal", reason: "Plant-based emulsifiers — Halal" },
      { name: "Vanillin", status: "Halal", reason: "Synthetic vanilla flavour — Halal" },
      { name: "Whey Powder", status: "Halal", reason: "Dairy by-product — Halal" },
    ],
    description: "Ferrero Rocher is Halal certified in many markets. Uses vanillin (not vanilla extract) and plant-based lecithins. Check your regional packaging for the Halal certification mark.",
    manufacturer: "Ferrero SpA",
    lastVerified: "2025-10-28",
    verificationSource: "Ferrero Halal certification",
  },
  {
    id: "tropicana-oj",
    barcode: "0048500003244",
    name: "Pure Premium Orange Juice",
    brand: "Tropicana",
    category: "Beverages",
    halalStatus: "Halal",
    country: "USA",
    ingredients: "Pure pasteurised orange juice.",
    ingredientAnalysis: [
      { name: "Orange Juice", status: "Halal", reason: "100% plant-based fruit juice — Halal" },
    ],
    description: "Tropicana Pure Premium is simply 100% orange juice with no additives. Completely Halal.",
    manufacturer: "PepsiCo",
    lastVerified: "2025-11-01",
    verificationSource: "Ingredient analysis",
  },
  {
    id: "kellogs-cornflakes",
    barcode: "5010029517201",
    name: "Original Corn Flakes",
    brand: "Kellogg's",
    category: "Cereals",
    halalStatus: "Halal",
    certifications: [{ body: "Kellogg's Halal assurance", country: "Multiple" }],
    country: "UK",
    ingredients: "Maize (Corn), Sugar, Salt, Niacinamide, Iron, Vitamin B6 (Pyridoxine Hydrochloride), Vitamin B2 (Riboflavin), Vitamin B1 (Thiamin Hydrochloride), Folic Acid, Vitamin D, Vitamin B12.",
    ingredientAnalysis: [
      { name: "Maize (Corn)", status: "Halal", reason: "Plant-based grain — Halal" },
      { name: "Sugar", status: "Halal", reason: "Plant-derived — Halal" },
      { name: "Vitamins (B group, D, Folic acid)", status: "Halal", reason: "Synthetic vitamins — Halal" },
      { name: "Iron", status: "Halal", reason: "Mineral — not animal-derived" },
    ],
    description: "Kellogg's Corn Flakes contain only plant-based and synthetic ingredients. Halal in most markets.",
    manufacturer: "Kellogg Company",
    lastVerified: "2025-11-02",
    verificationSource: "Kellogg's Halal confirmation",
  },
]

// ── Lookup helpers ─────────────────────────────────────────────────────────────

export function findProductByBarcode(barcode: string): Product | undefined {
  return PRODUCTS.find(p => p.barcode === barcode)
}

export function findProductById(id: string): Product | undefined {
  return PRODUCTS.find(p => p.id === id)
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase().trim()
  if (!q) return PRODUCTS
  return PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.brand.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q) ||
    p.country.toLowerCase().includes(q) ||
    p.ingredients.toLowerCase().includes(q)
  )
}

export function findECode(code: string): ECode | undefined {
  const normalised = code.toUpperCase().replace(/\s+/g, "")
  return E_CODES.find(e => e.code.replace(/\s+/g, "") === normalised)
}

export function analyseIngredients(text: string): { ingredient: string; result: Ingredient | null }[] {
  const words = text.split(/,|;|\n/).map(s => s.trim()).filter(Boolean)
  return words.map(ingredient => {
    const lower = ingredient.toLowerCase()
    const found = COMMON_INGREDIENTS.find(ci =>
      lower.includes(ci.name.toLowerCase()) ||
      ci.name.toLowerCase().includes(lower.split(" ").slice(0, 2).join(" "))
    )
    // also check E-codes in the text
    const eMatch = ingredient.match(/E\d+[a-z]?/i)
    if (eMatch && !found) {
      const eCode = findECode(eMatch[0])
      if (eCode) {
        return {
          ingredient,
          result: {
            name: `${eCode.code} (${eCode.name})`,
            status: eCode.status,
            reason: eCode.detail,
          },
        }
      }
    }
    return { ingredient, result: found ?? null }
  })
}

export const PRODUCT_CATEGORIES = [
  { name: "Food & Snacks", icon: "🍔", count: 420 },
  { name: "Beverages", icon: "🥤", count: 180 },
  { name: "Confectionery", icon: "🍬", count: 340 },
  { name: "Dairy", icon: "🥛", count: 95 },
  { name: "Baked Goods", icon: "🥖", count: 215 },
  { name: "Cereals", icon: "🌾", count: 88 },
  { name: "Condiments", icon: "🧂", count: 120 },
  { name: "Cosmetics", icon: "💄", count: 60 },
  { name: "Supplements", icon: "💊", count: 45 },
  { name: "Spreads", icon: "🫙", count: 72 },
  { name: "Frozen Foods", icon: "🧊", count: 130 },
  { name: "Meat Products", icon: "🥩", count: 95 },
]
