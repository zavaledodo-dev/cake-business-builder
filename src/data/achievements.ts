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
    name: "Primeira Fornada",
    description: "Completaste a tua primeira receita!",
    emoji: "🎂",
    condition: "recipe_count",
    conditionValue: 1,
    color: "#f59e0b",
  },
  {
    id: "chocolate-master",
    name: "Mestre do Chocolate",
    description: "Completaste o Bolo de Chocolate Intenso.",
    emoji: "🍫",
    condition: "specific_recipe",
    conditionValue: "chocolate-fudge",
    color: "#92400e",
  },
  {
    id: "red-artist",
    name: "Artista Vermelho",
    description: "Completaste o Red Velvet do Sul.",
    emoji: "❤️",
    condition: "specific_recipe",
    conditionValue: "red-velvet",
    color: "#dc2626",
  },
  {
    id: "champagne-baker",
    name: "Baker de Champanhe",
    description: "Completaste o requintado Bolo de Champanhe.",
    emoji: "🥂",
    condition: "specific_recipe",
    conditionValue: "champagne",
    color: "#7c3aed",
  },
  {
    id: "half-collection",
    name: "A Meio Caminho",
    description: "Completaste 4 das 8 receitas da coleção.",
    emoji: "⭐",
    condition: "recipe_count",
    conditionValue: 4,
    color: "#0ea5e9",
  },
  {
    id: "full-collection",
    name: "Coleção Completa",
    description: "Completaste todas as 8 receitas! És uma Baker profissional.",
    emoji: "👑",
    condition: "recipe_count",
    conditionValue: 8,
    color: "#d97706",
  },
  {
    id: "first-order",
    name: "Primeira Encomenda",
    description: "Registaste a tua primeira encomenda no gestor.",
    emoji: "📦",
    condition: "order_count",
    conditionValue: 1,
    color: "#16a34a",
  },
  {
    id: "business-savvy",
    name: "Mente de Negócio",
    description: "Usaste a calculadora de preços pela primeira vez.",
    emoji: "💰",
    condition: "calculator_use",
    conditionValue: 1,
    color: "#0891b2",
  },
  {
    id: "xp-100",
    name: "Centenária",
    description: "Acumulaste 100 pontos de XP.",
    emoji: "💫",
    condition: "xp_total",
    conditionValue: 100,
    color: "#db2777",
  },
  {
    id: "xp-300",
    name: "Veterana",
    description: "Acumulaste 300 pontos de XP.",
    emoji: "🌟",
    condition: "xp_total",
    conditionValue: 300,
    color: "#9333ea",
  },
  {
    id: "xp-500",
    name: "Mestre Confeiteira",
    description: "Acumulaste 500 pontos de XP. Atingiste o patamar máximo!",
    emoji: "🏆",
    condition: "xp_total",
    conditionValue: 500,
    color: "#f59e0b",
  },
];
