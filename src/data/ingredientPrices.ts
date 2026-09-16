export interface IngredientPriceItem {
  id: string;
  name: string;
  defaultUnitCost: number; // in USD
  unit: string; // e.g. "kg", "lb", "dozen", "liter", "oz"
  approxGramsPerUnit: number;
}

export const defaultIngredientPrices: Record<string, IngredientPriceItem> = {
  cakeFlour: {
    id: "cakeFlour",
    name: "Cake Flour",
    defaultUnitCost: 4.5,
    unit: "kg (2.2 lbs)",
    approxGramsPerUnit: 1000,
  },
  allPurposeFlour: {
    id: "allPurposeFlour",
    name: "All-Purpose Flour",
    defaultUnitCost: 3.5,
    unit: "kg (2.2 lbs)",
    approxGramsPerUnit: 1000,
  },
  unsaltedButter: {
    id: "unsaltedButter",
    name: "European Unsalted Butter",
    defaultUnitCost: 9.0,
    unit: "kg (2.2 lbs)",
    approxGramsPerUnit: 1000,
  },
  granulatedSugar: {
    id: "granulatedSugar",
    name: "Granulated White Sugar",
    defaultUnitCost: 2.8,
    unit: "kg (2.2 lbs)",
    approxGramsPerUnit: 1000,
  },
  powderedSugar: {
    id: "powderedSugar",
    name: "Confectioners' Powdered Sugar",
    defaultUnitCost: 3.2,
    unit: "kg (2.2 lbs)",
    approxGramsPerUnit: 1000,
  },
  largeEggs: {
    id: "largeEggs",
    name: "Farm Fresh Eggs",
    defaultUnitCost: 4.8,
    unit: "dozen (12 eggs)",
    approxGramsPerUnit: 600,
  },
  wholeMilk: {
    id: "wholeMilk",
    name: "Whole Milk",
    defaultUnitCost: 2.5,
    unit: "liter / quart",
    approxGramsPerUnit: 1000,
  },
  heavyCream: {
    id: "heavyCream",
    name: "Heavy Whipping Cream (36%)",
    defaultUnitCost: 5.5,
    unit: "liter / quart",
    approxGramsPerUnit: 1000,
  },
  vanillaBeanPaste: {
    id: "vanillaBeanPaste",
    name: "Pure Vanilla Bean Paste",
    defaultUnitCost: 22.0,
    unit: "4 oz bottle (118ml)",
    approxGramsPerUnit: 120,
  },
  cocoaPowder: {
    id: "cocoaPowder",
    name: "Dutch-Process Cocoa Powder",
    defaultUnitCost: 12.0,
    unit: "kg",
    approxGramsPerUnit: 1000,
  },
  darkChocolate: {
    id: "darkChocolate",
    name: "Couverture Dark Chocolate (60%)",
    defaultUnitCost: 16.0,
    unit: "kg",
    approxGramsPerUnit: 1000,
  },
  creamCheese: {
    id: "creamCheese",
    name: "Full-Fat Brick Cream Cheese",
    defaultUnitCost: 8.5,
    unit: "kg",
    approxGramsPerUnit: 1000,
  },
  freshLemons: {
    id: "freshLemons",
    name: "Fresh Organic Lemons",
    defaultUnitCost: 3.5,
    unit: "bag (4-5 lemons)",
    approxGramsPerUnit: 500,
  },
  elderflowerCordial: {
    id: "elderflowerCordial",
    name: "St-Germain / Elderflower Cordial",
    defaultUnitCost: 18.0,
    unit: "500ml bottle",
    approxGramsPerUnit: 500,
  },
  freshCarrots: {
    id: "freshCarrots",
    name: "Fresh Carrots",
    defaultUnitCost: 2.0,
    unit: "kg",
    approxGramsPerUnit: 1000,
  },
  pecansWalnuts: {
    id: "pecansWalnuts",
    name: "Pecans or Walnuts",
    defaultUnitCost: 18.0,
    unit: "kg",
    approxGramsPerUnit: 1000,
  },
  champagneProsecco: {
    id: "champagneProsecco",
    name: "Champagne / Sparkling Prosecco",
    defaultUnitCost: 24.0,
    unit: "750ml bottle",
    approxGramsPerUnit: 750,
  },
  rainbowSprinkles: {
    id: "rainbowSprinkles",
    name: "Bakery Jimmies Sprinkles",
    defaultUnitCost: 9.0,
    unit: "kg",
    approxGramsPerUnit: 1000,
  },
  almondExtract: {
    id: "almondExtract",
    name: "Pure Almond Extract",
    defaultUnitCost: 14.0,
    unit: "4 oz bottle",
    approxGramsPerUnit: 120,
  },
  raspberryPreserves: {
    id: "raspberryPreserves",
    name: "Seedless Raspberry Puree/Preserves",
    defaultUnitCost: 12.5,
    unit: "kg",
    approxGramsPerUnit: 1000,
  },
};

// Estimates baseline ingredient cost for a standard 8-inch, 16-slice cake
export const baseRecipeIngredientCostUSD: Record<string, number> = {
  "vanilla-bean": 16.5,
  "chocolate-fudge": 18.2,
  "red-velvet": 17.8,
  "lemon-elderflower": 22.4,
  "carrot-cake": 19.5,
  "champagne": 26.8, // Premium flavor
  "funfetti": 16.8,
  "almond-raspberry": 24.5, // Premium flavor
};

export const premiumFlavorsList = ["champagne", "almond-raspberry"];
