export interface Achievement {
  id: string;
  name: string;
  description: string;
  emoji: string;
  xpRequired?: number;
  condition: "recipe_count" | "specific_recipe" | "xp_total" | "order_count" | "calculator_use";
  conditionValue: string | number;
  color: string;
}

export const achievements: Achievement[] = [
  {
    id: "first-bake",
    name: "First Oven Batch",
    description: "Successfully prepared your first wedding cake recipe!",
    emoji: "🎂",
    condition: "recipe_count",
    conditionValue: 1,
    color: "#f59e0b",
  },
  {
    id: "chocolate-master",
    name: "Chocolate Master",
    description: "Completed the Rich Chocolate Fudge Cake.",
    emoji: "🍫",
    condition: "specific_recipe",
    conditionValue: "chocolate-fudge",
    color: "#92400e",
  },
  {
    id: "red-artist",
    name: "Velvet Artist",
    description: "Completed the Southern Red Velvet Cake.",
    emoji: "❤️",
    condition: "specific_recipe",
    conditionValue: "red-velvet",
    color: "#dc2626",
  },
  {
    id: "champagne-baker",
    name: "Champagne Virtuoso",
    description: "Prepared the luxurious Sparkling Champagne Cake.",
    emoji: "🥂",
    condition: "specific_recipe",
    conditionValue: "champagne",
    color: "#7c3aed",
  },
  {
    id: "half-collection",
    name: "Halfway There",
    description: "Completed 4 of the 8 wedding recipes in the collection.",
    emoji: "⭐",
    condition: "recipe_count",
    conditionValue: 4,
    color: "#0ea5e9",
  },
  {
    id: "full-collection",
    name: "Master Collection",
    description: "Baked all 8 wedding flavors! You're ready to take commercial bookings.",
    emoji: "👑",
    condition: "recipe_count",
    conditionValue: 8,
    color: "#d97706",
  },
  {
    id: "first-order",
    name: "First Wedding Booking",
    description: "Logged your first real client order into the system.",
    emoji: "📦",
    condition: "order_count",
    conditionValue: 1,
    color: "#16a34a",
  },
  {
    id: "business-savvy",
    name: "Pricing Strategist",
    description: "Calculated wedding pricing using the per-slice & cost engine.",
    emoji: "💰",
    condition: "calculator_use",
    conditionValue: 1,
    color: "#0891b2",
  },
  {
    id: "xp-100",
    name: "Rising Talent",
    description: "Earned your first 100 XP points.",
    emoji: "💫",
    condition: "xp_total",
    conditionValue: 100,
    color: "#db2777",
  },
  {
    id: "xp-300",
    name: "Experienced Baker",
    description: "Crossed 300 XP points with consistent practice.",
    emoji: "🌟",
    condition: "xp_total",
    conditionValue: 300,
    color: "#9333ea",
  },
  {
    id: "xp-500",
    name: "Master Wedding Cake Artist",
    description: "Reached 500+ XP points. Highest tier attained!",
    emoji: "🏆",
    condition: "xp_total",
    conditionValue: 500,
    color: "#f59e0b",
  },
];
