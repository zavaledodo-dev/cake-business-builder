import { recipes } from "../data/recipes";
import { achievements } from "../data/achievements";

export interface GameState {
  xp: number;
  level: number;
  completedRecipes: string[];
  unlockedAchievements: string[];
  orderCount: number;
  calculatorUseCount: number;
  bakerName: string;
}

export const LEVELS = [
  { level: 1, name: "Aprendiz", minXp: 0, maxXp: 99 },
  { level: 2, name: "Ajudante de Baker", minXp: 100, maxXp: 199 },
  { level: 3, name: "Baker Iniciante", minXp: 200, maxXp: 299 },
  { level: 4, name: "Baker Confiante", minXp: 300, maxXp: 399 },
  { level: 5, name: "Baker Profissional", minXp: 400, maxXp: 499 },
  { level: 6, name: "Baker Especialista", minXp: 500, maxXp: 649 },
  { level: 7, name: "Confeiteira", minXp: 650, maxXp: 799 },
  { level: 8, name: "Confeiteira Sénior", minXp: 800, maxXp: 999 },
  { level: 9, name: "Mestre Baker", minXp: 1000, maxXp: 1249 },
  { level: 10, name: "Mestre Confeiteira", minXp: 1250, maxXp: Infinity },
];

const STORAGE_KEY = "cake-builder-game-state";

const defaultState: GameState = {
  xp: 0,
  level: 1,
  completedRecipes: [],
  unlockedAchievements: [],
  orderCount: 0,
  calculatorUseCount: 0,
  bakerName: "Baker",
};

export function getGameState(): GameState {
  if (typeof window === "undefined") return defaultState;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return { ...defaultState, ...JSON.parse(stored) };
  } catch {}
  return { ...defaultState };
}

export function saveGameState(state: GameState): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    window.dispatchEvent(new Event("xp-updated"));
  } catch {}
}

export function getLevelForXp(xp: number) {
  return [...LEVELS].reverse().find((l) => xp >= l.minXp) ?? LEVELS[0];
}

export function getXpProgressPercent(xp: number): number {
  const levelInfo = getLevelForXp(xp);
  if (levelInfo.maxXp === Infinity) return 100;
  const range = levelInfo.maxXp - levelInfo.minXp + 1;
  const progress = xp - levelInfo.minXp;
  return Math.min(100, Math.round((progress / range) * 100));
}

export function addXp(amount: number): { newState: GameState; leveledUp: boolean; newAchievements: string[] } {
  const state = getGameState();
  const oldLevel = state.level;
  const newXp = state.xp + amount;
  const newLevelInfo = getLevelForXp(newXp);

  const updatedState: GameState = {
    ...state,
    xp: newXp,
    level: newLevelInfo.level,
  };

  const newAchievements = checkAndUnlockAchievements(updatedState);
  updatedState.unlockedAchievements = [
    ...new Set([...updatedState.unlockedAchievements, ...newAchievements]),
  ];

  saveGameState(updatedState);
  return {
    newState: updatedState,
    leveledUp: newLevelInfo.level > oldLevel,
    newAchievements,
  };
}

export function completeRecipe(recipeId: string): { newState: GameState; xpGained: number; leveledUp: boolean; newAchievements: string[] } {
  const state = getGameState();
  if (state.completedRecipes.includes(recipeId)) {
    return { newState: state, xpGained: 0, leveledUp: false, newAchievements: [] };
  }

  const recipe = recipes.find((r) => r.id === recipeId);
  const xpGained = recipe?.xpReward ?? 50;

  const newCompleted = [...state.completedRecipes, recipeId];
  const bonusXp = newCompleted.length === 8 ? 200 : 0;
  const totalXp = xpGained + bonusXp;

  const newXp = state.xp + totalXp;
  const newLevelInfo = getLevelForXp(newXp);
  const leveledUp = newLevelInfo.level > state.level;

  const updatedState: GameState = {
    ...state,
    xp: newXp,
    level: newLevelInfo.level,
    completedRecipes: newCompleted,
  };

  const newAchievements = checkAndUnlockAchievements(updatedState);
  updatedState.unlockedAchievements = [
    ...new Set([...updatedState.unlockedAchievements, ...newAchievements]),
  ];

  saveGameState(updatedState);
  return { newState: updatedState, xpGained: totalXp, leveledUp, newAchievements };
}

export function registerOrderAdded(): void {
  const state = getGameState();
  const updated = { ...state, orderCount: state.orderCount + 1 };
  const newAchievements = checkAndUnlockAchievements(updated);
  updated.unlockedAchievements = [...new Set([...updated.unlockedAchievements, ...newAchievements])];
  if (updated.orderCount === 1) {
    const result = addXp(30);
    saveGameState({ ...result.newState, orderCount: updated.orderCount });
  } else {
    saveGameState(updated);
  }
}

export function registerCalculatorUse(): void {
  const state = getGameState();
  if (state.calculatorUseCount === 0) {
    const updated = { ...state, calculatorUseCount: 1 };
    const result = addXp(10);
    const newAchievements = checkAndUnlockAchievements({ ...result.newState, calculatorUseCount: 1 });
    saveGameState({
      ...result.newState,
      calculatorUseCount: 1,
      unlockedAchievements: [...new Set([...result.newState.unlockedAchievements, ...newAchievements])],
    });
  } else {
    saveGameState({ ...state, calculatorUseCount: state.calculatorUseCount + 1 });
  }
}

function checkAndUnlockAchievements(state: GameState): string[] {
  const newlyUnlocked: string[] = [];

  for (const ach of achievements) {
    if (state.unlockedAchievements.includes(ach.id)) continue;

    let unlocked = false;
    switch (ach.condition) {
      case "recipe_count":
        unlocked = state.completedRecipes.length >= Number(ach.conditionValue);
        break;
      case "specific_recipe":
        unlocked = state.completedRecipes.includes(String(ach.conditionValue));
        break;
      case "xp_total":
        unlocked = state.xp >= Number(ach.conditionValue);
        break;
      case "order_count":
        unlocked = state.orderCount >= Number(ach.conditionValue);
        break;
      case "calculator_use":
        unlocked = state.calculatorUseCount >= Number(ach.conditionValue);
        break;
    }

    if (unlocked) newlyUnlocked.push(ach.id);
  }
  return newlyUnlocked;
}

export function setBakerName(name: string): void {
  const state = getGameState();
  saveGameState({ ...state, bakerName: name });
}
