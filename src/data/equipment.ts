export interface EquipmentItem {
  id: string;
  name: string;
  importance: "Essential" | "Recommended" | "Pro Level";
  emoji: string;
  description: string;
  practicalTip: string;
}

export interface KitchenHabit {
  id: string;
  title: string;
  emoji: string;
  description: string;
}

export const equipmentList: EquipmentItem[] = [
  {
    id: "stand-mixer",
    name: "Heavy-Duty Stand Mixer",
    importance: "Essential",
    emoji: "🥣",
    description: "A hand mixer can handle single batches, but a 5-quart or 6-quart stand mixer saves hours on tiered wedding cakes and thick Italian or American buttercreams.",
    practicalTip: "Use the paddle attachment for creaming butter and sugar to incorporate micro-air pockets without over-whipping."
  },
  {
    id: "cake-pans",
    name: "Round Cake Pans (6\", 8\", and 10\")",
    importance: "Essential",
    emoji: "🥧",
    description: "Straight-sided, anodized aluminum pans in at least 3 sizes to produce proportional, level tiered cakes.",
    practicalTip: "Choose straight 2-inch or 3-inch deep pans with no slope for sharp 90-degree corners."
  },
  {
    id: "digital-scale",
    name: "Digital Kitchen Gram Scale",
    importance: "Essential",
    emoji: "⚖️",
    description: "Weighing in grams delivers 100% consistent flavor, crumb, and rise from tier to tier, unlike measuring cups.",
    practicalTip: "Weigh your filled pans before baking to make sure both layers bake at the exact same rate."
  },
  {
    id: "spatula-scraper",
    name: "Offset Spatula & Bench Scraper",
    importance: "Essential",
    emoji: "📐",
    description: "The dynamic duo required for pristine crumb coats and laser-straight buttercream edges.",
    practicalTip: "Warm your stainless steel bench scraper under hot water and wipe dry right before the final spin for a flawless glass finish."
  },
  {
    id: "turntable",
    name: "Cast Aluminum Revolving Turntable",
    importance: "Essential",
    emoji: "🔄",
    description: "A heavy-bearing turntable provides continuous smooth spin without wobbling while piping and smoothing.",
    practicalTip: "Place a silicone non-slip mat underneath your cake board so it never slides during piping."
  },
  {
    id: "dowels-boards",
    name: "Cardboard Cake Drums & Wooden/Plastic Dowels",
    importance: "Essential",
    emoji: "🏗️",
    description: "The internal engineering framework that supports hundreds of ounces without compressing the bottom sponge.",
    practicalTip: "Insert at least 4 dowels inside the perimeter of the tier above, cut flush with the top surface."
  },
  {
    id: "oven-thermometer",
    name: "Independent Oven Thermometer",
    importance: "Recommended",
    emoji: "🌡️",
    description: "Most household ovens drift between 15°F and 35°F away from their dial settings.",
    practicalTip: "Hang the thermometer right in the center of the middle rack where your cake pans sit."
  }
];

export const kitchenHabits: KitchenHabit[] = [
  {
    id: "habit-weight",
    title: "Always Weigh by Grams",
    emoji: "⚖️",
    description: "Wedding tiers must have identical density. A single cup of flour can swing by 30 grams depending on humidity and scooping technique."
  },
  {
    id: "habit-test",
    title: "Bake a Full Test Cake First",
    emoji: "🔬",
    description: "Never test a new flavor on a paying couple. Bake, fill, chill, and stack a prototype before adding it to your contract menu."
  },
  {
    id: "habit-cards",
    title: "Maintain Standard Recipe Cards",
    emoji: "📋",
    description: "Keep written records of exact gram weights, bake times, internal cake temperatures, and notes on how flavors hold up in heat."
  },
  {
    id: "habit-legal",
    title: "Check Cottage Food Regulations",
    emoji: "📜",
    description: "Review local cottage food guidelines regarding shelf-stable frostings (cream cheese vs. meringue buttercream) and label disclosures."
  }
];
