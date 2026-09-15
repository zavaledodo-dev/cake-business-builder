export interface RecipeIngredient {
  name: string;
  amount: string;
  weightGrams?: number;
}

export interface RecipeSection {
  title: string;
  ingredients: RecipeIngredient[];
}

export interface Recipe {
  id: string;
  name: string;
  emoji: string;
  color: string;
  colorLight: string;
  tagline: string;
  description: string;
  yieldInfo: string;
  servings: number;
  prepTime: string;
  bakeTime: string;
  ovenTemp: string;
  panSize: string;
  difficulty: "Easy" | "Easy to Moderate" | "Moderate";
  difficultyStars: 1 | 2 | 3;
  sections: RecipeSection[];
  steps: {
    phase: "Prep & Dry Mix" | "Batter Mixing" | "Baking & Cooling" | "Frosting & Assembling";
    instruction: string;
    proTip?: string;
  }[];
  businessTip: string;
  tieredAdvice: string;
  pairingSuggestions: string[];
  xpReward: number;
}

export const recipes: Recipe[] = [
  {
    id: "vanilla-bean",
    name: "Classic Vanilla Bean Wedding Cake",
    emoji: "🍰",
    color: "#f59e0b",
    colorLight: "#fef3c7",
    tagline: "The #1 Most Requested Wedding Cake Flavor",
    description: "Light, tender, moist, and the most versatile foundation for any filling or tier combination.",
    yieldInfo: "One 8-inch, 2-layer cake (approx. 16 wedding servings)",
    servings: 16,
    prepTime: "20 mins",
    bakeTime: "30–35 mins",
    ovenTemp: "350°F (175°C)",
    panSize: "Two 8-inch round cake pans",
    difficulty: "Easy",
    difficultyStars: 1,
    sections: [
      {
        title: "Cake Batter",
        ingredients: [
          { name: "Cake flour (sifted)", amount: "3 cups", weightGrams: 375 },
          { name: "Baking powder", amount: "1 tbsp", weightGrams: 14 },
          { name: "Fine sea salt", amount: "1/2 tsp", weightGrams: 3 },
          { name: "Unsalted butter (softened at room temp)", amount: "1 cup", weightGrams: 225 },
          { name: "Granulated white sugar", amount: "2 cups", weightGrams: 400 },
          { name: "Large eggs (room temperature)", amount: "4 whole eggs" },
          { name: "Pure vanilla bean paste (or pure vanilla extract)", amount: "1 tbsp", weightGrams: 15 },
          { name: "Whole milk (room temperature)", amount: "1 cup", weightGrams: 240 },
        ],
      },
      {
        title: "Silky Vanilla Buttercream",
        ingredients: [
          { name: "Unsalted butter (softened)", amount: "1 1/2 cups", weightGrams: 340 },
          { name: "Confectioners' powdered sugar", amount: "5 cups", weightGrams: 600 },
          { name: "Heavy whipping cream", amount: "2 tbsp", weightGrams: 30 },
          { name: "Pure vanilla extract", amount: "1 tsp", weightGrams: 5 },
          { name: "Fine salt", amount: "Pinch to balance sweetness" },
        ],
      },
    ],
    steps: [
      {
        phase: "Prep & Dry Mix",
        instruction: "Preheat oven to 350°F (175°C). Grease two 8-inch round cake pans and line bottoms with parchment paper circles.",
        proTip: "Parchment guarantees your cake releases without tearing."
      },
      {
        phase: "Prep & Dry Mix",
        instruction: "In a medium bowl, whisk together sifted cake flour, baking powder, and salt. Set aside.",
      },
      {
        phase: "Batter Mixing",
        instruction: "In your stand mixer bowl fitted with the paddle attachment, beat butter and sugar on medium-high speed for 3–4 minutes until pale, fluffy, and increased in volume.",
        proTip: "Don't rush this step: incorporating air here gives the cake its velvet crumb."
      },
      {
        phase: "Batter Mixing",
        instruction: "Add eggs one at a time, beating for 30 seconds after each addition. Mix in the vanilla bean paste.",
      },
      {
        phase: "Batter Mixing",
        instruction: "Reduce mixer speed to lowest setting. Add flour mixture in 3 parts, alternating with milk in 2 parts (Flour -> Milk -> Flour -> Milk -> Flour). Mix only until just combined.",
        proTip: "Stop mixing as soon as streaks disappear to keep the cake tender."
      },
      {
        phase: "Baking & Cooling",
        instruction: "Divide batter evenly between pans (use digital scale: ~575g batter per pan). Bake 30–35 minutes until a toothpick inserted into center comes out clean.",
      },
      {
        phase: "Baking & Cooling",
        instruction: "Cool in pans on a wire rack for 10 minutes. Invert onto wire rack, peel off parchment, and cool completely to room temperature before frosting.",
        proTip: "Wrap layers in plastic wrap while slightly warm and chill overnight: texture improves and leveling is much easier!"
      },
      {
        phase: "Frosting & Assembling",
        instruction: "For buttercream: beat butter until completely smooth and creamy (3 mins). Gradually add powdered sugar, cream, vanilla, and salt on low speed, then whip on medium for 2 minutes.",
      },
      {
        phase: "Frosting & Assembling",
        instruction: "Level cooled layers with a serrated knife. Pipe a dam of buttercream, fill center, stack second layer, apply a thin crumb coat, chill for 20 minutes, then apply smooth final coat.",
      },
    ],
    businessTip: "Vanilla is the safest default flavor for wedding tastings. Always pair it with an elevated filling (such as raspberry coulis, salted caramel, or lemon curd) so a familiar classic feels custom-made for the bride and groom.",
    tieredAdvice: "Excellent structural stability. Can serve as either a bottom base tier (with dowels) or top tier.",
    pairingSuggestions: ["Raspberry Coulis", "Salted Caramel", "Lemon Curd", "White Chocolate Ganache"],
    xpReward: 50,
  },
  {
    id: "chocolate-fudge",
    name: "Rich Chocolate Fudge Cake",
    emoji: "🍫",
    color: "#92400e",
    colorLight: "#fef3c7",
    tagline: "Ultra-Moist & Reliable For Make-Ahead Wedding Week Prep",
    description: "Deeply chocolatey, exceptionally moist crumb that stays fresh for days without drying out.",
    yieldInfo: "One 8-inch, 2-layer cake (approx. 16 wedding servings)",
    servings: 16,
    prepTime: "20 mins",
    bakeTime: "32–35 mins",
    ovenTemp: "350°F (175°C)",
    panSize: "Two 8-inch round cake pans",
    difficulty: "Easy",
    difficultyStars: 1,
    sections: [
      {
        title: "Chocolate Batter",
        ingredients: [
          { name: "All-purpose flour", amount: "2 cups", weightGrams: 250 },
          { name: "Unsweetened Dutch-process cocoa powder", amount: "3/4 cup", weightGrams: 75 },
          { name: "Baking soda", amount: "2 tsp", weightGrams: 10 },
          { name: "Baking powder", amount: "1/2 tsp", weightGrams: 2.5 },
          { name: "Fine salt", amount: "1 tsp", weightGrams: 6 },
          { name: "Granulated sugar", amount: "2 cups", weightGrams: 400 },
          { name: "Large eggs", amount: "2 whole eggs" },
          { name: "Buttermilk (room temperature)", amount: "1 cup", weightGrams: 240 },
          { name: "Fresh hot brewed coffee (or boiling water)", amount: "1 cup", weightGrams: 240 },
          { name: "Vegetable oil (or canola oil)", amount: "1/2 cup", weightGrams: 120 },
          { name: "Pure vanilla extract", amount: "1 tsp", weightGrams: 5 },
        ],
      },
      {
        title: "Decadent Chocolate Ganache Filling",
        ingredients: [
          { name: "Semi-sweet chocolate (55-65% cocoa, finely chopped)", amount: "8 oz", weightGrams: 225 },
          { name: "Heavy whipping cream", amount: "1 cup", weightGrams: 240 },
        ],
      },
    ],
    steps: [
      {
        phase: "Prep & Dry Mix",
        instruction: "Preheat oven to 350°F (175°C). Grease two 8-inch round cake pans, line with parchment, and dust lightly with cocoa powder.",
      },
      {
        phase: "Prep & Dry Mix",
        instruction: "Whisk together flour, sifted cocoa powder, baking soda, baking powder, and salt in a large bowl.",
      },
      {
        phase: "Batter Mixing",
        instruction: "In a separate bowl, whisk granulated sugar, eggs, buttermilk, oil, and vanilla until thoroughly emulsified.",
      },
      {
        phase: "Batter Mixing",
        instruction: "Add wet ingredients to dry ingredients. Whisk just until combined. Slowly pour in hot coffee while stirring.",
        proTip: "The batter will be quite thin and watery — this is 100% intentional and ensures supreme moisture!"
      },
      {
        phase: "Baking & Cooling",
        instruction: "Divide batter evenly between pans. Bake 32–35 minutes until a skewer inserted in center comes out with a few moist crumbs (not wet batter).",
      },
      {
        phase: "Baking & Cooling",
        instruction: "Cool in pans 15 minutes, then turn out onto wire racks to cool completely.",
      },
      {
        phase: "Frosting & Assembling",
        instruction: "Make ganache: heat cream until gently steaming (do not boil). Pour over chopped chocolate, let stand undisturbed 2 minutes, then gently whisk from center outwards until glossy. Chill until spreadable.",
      },
      {
        phase: "Frosting & Assembling",
        instruction: "Sandwich layers with luscious ganache. Coat the exterior in chocolate or contrast with vanilla bean Swiss/American buttercream.",
      },
    ],
    businessTip: "Chocolate is the flavor couples pick as one tier on mixed-flavor cakes 80% of the time. Always keep this on your core tasting menu; couples will notice if it's missing.",
    tieredAdvice: "Very sturdy and forgiving. Perfect bottom or middle tier.",
    pairingSuggestions: ["Espresso Buttercream", "Strawberry Jam", "Peanut Butter Mousse", "Vanilla Bean"],
    xpReward: 50,
  },
  {
    id: "red-velvet",
    name: "Southern Red Velvet Cake",
    emoji: "❤️",
    color: "#dc2626",
    colorLight: "#fee2e2",
    tagline: "Striking Ruby Color With Tangy Cream Cheese Finish",
    description: "A show-stopping crimson crumb with a subtle hint of cocoa and that signature melt-in-the-mouth texture.",
    yieldInfo: "One 8-inch, 2-layer cake (approx. 16 wedding servings)",
    servings: 16,
    prepTime: "25 mins",
    bakeTime: "28–30 mins",
    ovenTemp: "350°F (175°C)",
    panSize: "Two 8-inch round cake pans",
    difficulty: "Easy",
    difficultyStars: 1,
    sections: [
      {
        title: "Red Velvet Batter",
        ingredients: [
          { name: "All-purpose flour", amount: "2 1/2 cups", weightGrams: 315 },
          { name: "Granulated sugar", amount: "1 1/2 cups", weightGrams: 300 },
          { name: "Baking soda", amount: "1 tsp", weightGrams: 5 },
          { name: "Unsweetened cocoa powder", amount: "1 tbsp", weightGrams: 8 },
          { name: "Fine salt", amount: "1 tsp", weightGrams: 6 },
          { name: "Vegetable oil", amount: "1 1/2 cups", weightGrams: 355 },
          { name: "Buttermilk (room temperature)", amount: "1 cup", weightGrams: 240 },
          { name: "Large eggs", amount: "2 whole eggs" },
          { name: "Red food coloring gel", amount: "2 tbsp", weightGrams: 30 },
          { name: "Distilled white vinegar", amount: "1 tsp", weightGrams: 5 },
          { name: "Pure vanilla extract", amount: "1 tsp", weightGrams: 5 },
        ],
      },
      {
        title: "Classic Cream Cheese Frosting",
        ingredients: [
          { name: "Full-fat brick cream cheese (softened)", amount: "16 oz (2 bricks)", weightGrams: 450 },
          { name: "Unsalted butter (softened)", amount: "1/2 cup", weightGrams: 115 },
          { name: "Confectioners' powdered sugar", amount: "4 cups", weightGrams: 480 },
          { name: "Pure vanilla extract", amount: "1 tsp", weightGrams: 5 },
        ],
      },
    ],
    steps: [
      {
        phase: "Prep & Dry Mix",
        instruction: "Preheat oven to 350°F (175°C). Grease and line two 8-inch cake pans with parchment paper.",
      },
      {
        phase: "Prep & Dry Mix",
        instruction: "Whisk flour, sugar, baking soda, cocoa powder, and salt together in a bowl.",
      },
      {
        phase: "Batter Mixing",
        instruction: "In another bowl, whisk oil, buttermilk, eggs, red gel food coloring, vinegar, and vanilla until smooth and vivid red.",
      },
      {
        phase: "Batter Mixing",
        instruction: "Pour wet ingredients into dry ingredients. Stir just until blended and smooth — do not overmix.",
      },
      {
        phase: "Baking & Cooling",
        instruction: "Divide batter evenly between pans. Bake 28–30 minutes until a toothpick inserted in the center comes out clean.",
      },
      {
        phase: "Baking & Cooling",
        instruction: "Cool completely before frosting. Chill layers in fridge for 1 hour to prevent red crumbs from pulling into the white frosting.",
      },
      {
        phase: "Frosting & Assembling",
        instruction: "Beat cream cheese and butter together until completely smooth and free of lumps. Slowly add powdered sugar and vanilla, whipping until light and fluffy.",
      },
      {
        phase: "Frosting & Assembling",
        instruction: "Fill and frost cake. Red velvet is gorgeous with a semi-naked crumb-coat finish that allows the dramatic red sponge to peek through.",
      },
    ],
    businessTip: "Cream cheese frosting is softer than buttercream and will soften in warm weather. For outdoor or summer weddings, either stabilize it with extra powdered sugar/meringue powder or reserve this flavor strictly for indoor, climate-controlled wedding venues.",
    tieredAdvice: "Soft texture — if using in a tiered cake, always reinforce with cardboard cake rounds and rigid dowels.",
    pairingSuggestions: ["White Chocolate", "Toasted Pecans", "Dark Chocolate Shavings"],
    xpReward: 50,
  },
  {
    id: "lemon-elderflower",
    name: "Lemon Elderflower Cake",
    emoji: "🍋",
    color: "#16a34a",
    colorLight: "#dcfce7",
    tagline: "The Royal Wedding Inspired Spring & Summer Favorite",
    description: "Bright, zesty lemon sponge infused with delicate floral elderflower liqueur and zesty buttercream.",
    yieldInfo: "One 8-inch, 2-layer cake (approx. 16 wedding servings)",
    servings: 16,
    prepTime: "25 mins",
    bakeTime: "28–32 mins",
    ovenTemp: "350°F (175°C)",
    panSize: "Two 8-inch round cake pans",
    difficulty: "Easy to Moderate",
    difficultyStars: 2,
    sections: [
      {
        title: "Citrus Sponge",
        ingredients: [
          { name: "Cake flour", amount: "3 cups", weightGrams: 375 },
          { name: "Baking powder", amount: "1 tbsp", weightGrams: 14 },
          { name: "Fine salt", amount: "1/2 tsp", weightGrams: 3 },
          { name: "Unsalted butter (softened)", amount: "1 cup", weightGrams: 225 },
          { name: "Granulated sugar", amount: "1 3/4 cups", weightGrams: 350 },
          { name: "Large eggs", amount: "4 whole eggs" },
          { name: "Fresh lemon zest", amount: "Grated zest of 2 large lemons" },
          { name: "Freshly squeezed lemon juice", amount: "1/4 cup", weightGrams: 60 },
          { name: "Elderflower cordial (or St-Germain liqueur)", amount: "2 tbsp", weightGrams: 30 },
          { name: "Whole milk", amount: "3/4 cup", weightGrams: 180 },
        ],
      },
      {
        title: "Elderflower & Lemon Buttercream",
        ingredients: [
          { name: "Unsalted butter (softened)", amount: "1 1/2 cups", weightGrams: 340 },
          { name: "Confectioners' powdered sugar", amount: "5 cups", weightGrams: 600 },
          { name: "Elderflower cordial", amount: "2 tbsp", weightGrams: 30 },
          { name: "Fresh lemon juice", amount: "1 tbsp", weightGrams: 15 },
        ],
      },
    ],
    steps: [
      {
        phase: "Prep & Dry Mix",
        instruction: "Preheat oven to 350°F (175°C). Line two 8-inch round pans with parchment.",
      },
      {
        phase: "Prep & Dry Mix",
        instruction: "Whisk cake flour, baking powder, and salt together in a bowl.",
      },
      {
        phase: "Batter Mixing",
        instruction: "Rub fresh lemon zest into granulated sugar with your fingertips until fragrant, releasing lemon oils.",
        proTip: "This aromatic step infuses natural citrus oils deep into the cake crumb."
      },
      {
        phase: "Batter Mixing",
        instruction: "Beat butter and citrus sugar until pale and fluffy (3 mins). Add eggs one at a time, then blend in lemon juice and elderflower cordial.",
      },
      {
        phase: "Batter Mixing",
        instruction: "Alternate adding flour mixture and milk in 3 batches, mixing gently until smooth.",
      },
      {
        phase: "Baking & Cooling",
        instruction: "Divide into pans and bake 28–32 minutes until cake springs back lightly when pressed in center.",
      },
      {
        phase: "Frosting & Assembling",
        instruction: "Beat butter smooth, add powdered sugar, elderflower cordial, and lemon juice until silky. Brush layers with extra elderflower cordial, spread a center layer of tart lemon curd, and frost with elderflower buttercream.",
      },
    ],
    businessTip: "Floral and citrus notes photograph beautifully when styled with pressed edible pansies or candied lemon slices. This is one of the easiest upsells for outdoor and botanical garden weddings.",
    tieredAdvice: "Tender but holds shape well. Excellent top or middle tier.",
    pairingSuggestions: ["Tart Lemon Curd", "Blueberry Preserves", "Edible Pressed Flowers"],
    xpReward: 60,
  },
  {
    id: "carrot-cake",
    name: "Spiced Carrot Cake with Cream Cheese Frosting",
    emoji: "🥕",
    color: "#ea580c",
    colorLight: "#ffedd5",
    tagline: "Warmly Spiced, Naturally Moist & Loved By Grown-Ups",
    description: "Packed with finely grated carrots, aromatic cinnamon, and nutmeg, offering a comforting, less-sweet wedding choice.",
    yieldInfo: "One 8-inch, 2-layer cake (approx. 16 wedding servings)",
    servings: 16,
    prepTime: "25 mins",
    bakeTime: "35–40 mins",
    ovenTemp: "350°F (175°C)",
    panSize: "Two 8-inch round cake pans",
    difficulty: "Easy",
    difficultyStars: 1,
    sections: [
      {
        title: "Spiced Carrot Batter",
        ingredients: [
          { name: "All-purpose flour", amount: "2 1/2 cups", weightGrams: 315 },
          { name: "Baking powder", amount: "2 tsp", weightGrams: 10 },
          { name: "Baking soda", amount: "1 tsp", weightGrams: 5 },
          { name: "Ground cinnamon", amount: "1 tbsp", weightGrams: 8 },
          { name: "Ground nutmeg", amount: "1/2 tsp", weightGrams: 1.5 },
          { name: "Fine salt", amount: "1/2 tsp", weightGrams: 3 },
          { name: "Vegetable oil", amount: "1 1/2 cups", weightGrams: 355 },
          { name: "Light brown sugar (packed)", amount: "1 1/2 cups", weightGrams: 300 },
          { name: "Large eggs", amount: "4 whole eggs" },
          { name: "Finely grated fresh carrots", amount: "3 cups", weightGrams: 300 },
          { name: "Chopped toasted pecans or walnuts (optional)", amount: "1 cup", weightGrams: 100 },
        ],
      },
      {
        title: "Silky Cream Cheese Frosting",
        ingredients: [
          { name: "Cream cheese (softened)", amount: "16 oz (450g)", weightGrams: 450 },
          { name: "Unsalted butter (softened)", amount: "1/2 cup", weightGrams: 115 },
          { name: "Confectioners' powdered sugar", amount: "4 cups", weightGrams: 480 },
          { name: "Pure vanilla extract", amount: "1 tsp", weightGrams: 5 },
        ],
      },
    ],
    steps: [
      {
        phase: "Prep & Dry Mix",
        instruction: "Preheat oven to 350°F (175°C). Grease and line two 8-inch round cake pans.",
      },
      {
        phase: "Prep & Dry Mix",
        instruction: "In a medium bowl, whisk together flour, baking powder, baking soda, cinnamon, nutmeg, and salt.",
      },
      {
        phase: "Batter Mixing",
        instruction: "In another bowl, whisk oil, light brown sugar, and eggs until emulsified and smooth.",
      },
      {
        phase: "Batter Mixing",
        instruction: "Fold dry ingredients into the wet mixture. Gently fold in the finely grated carrots and nuts (if using).",
        proTip: "Finely grating carrots creates a moist, tender sponge without coarse shreds."
      },
      {
        phase: "Baking & Cooling",
        instruction: "Divide batter between pans and bake 35–40 minutes until center is springy and tester comes clean.",
      },
      {
        phase: "Frosting & Assembling",
        instruction: "Cool completely. Beat cream cheese, butter, sugar, and vanilla until fluffy. Fill layers and frost exterior with a modern rustic textured spatula technique.",
      },
    ],
    businessTip: "Market this as the 'Sophisticated Alternative' on your menu. Many couples desire one non-chocolate, non-vanilla tier specifically for guests who prefer deeper spice flavors over pure sweetness.",
    tieredAdvice: "Dense and heavy. Always position as the bottom tier or support with extra doweling.",
    pairingSuggestions: ["Salted Caramel Drizzle", "Candied Pecans", "Orange Zest Cream"],
    xpReward: 50,
  },
  {
    id: "champagne",
    name: "Sparkling Champagne Cake",
    emoji: "🥂",
    color: "#7c3aed",
    colorLight: "#ede9fe",
    tagline: "Delicate, Luxurious & Infused With Real Sparkling Wine",
    description: "An elegant white sponge made with egg whites and reduced champagne, delivering an unforgettable celebratory aroma.",
    yieldInfo: "One 8-inch, 2-layer cake (approx. 16 wedding servings)",
    servings: 16,
    prepTime: "25 mins",
    bakeTime: "28–30 mins",
    ovenTemp: "350°F (175°C)",
    panSize: "Two 8-inch round cake pans",
    difficulty: "Moderate",
    difficultyStars: 3,
    sections: [
      {
        title: "Champagne White Sponge",
        ingredients: [
          { name: "Cake flour (sifted)", amount: "3 cups", weightGrams: 375 },
          { name: "Baking powder", amount: "1 tbsp", weightGrams: 14 },
          { name: "Fine salt", amount: "1/2 tsp", weightGrams: 3 },
          { name: "Unsalted butter (softened)", amount: "1 cup", weightGrams: 225 },
          { name: "Granulated white sugar", amount: "1 3/4 cups", weightGrams: 350 },
          { name: "Egg whites (room temperature)", amount: "4 large egg whites" },
          { name: "Brut Champagne or Prosecco (room temp)", amount: "1 cup", weightGrams: 240 },
          { name: "Whole milk", amount: "1/4 cup", weightGrams: 60 },
          { name: "Pure vanilla extract", amount: "1 tsp", weightGrams: 5 },
        ],
      },
      {
        title: "Reduced Champagne Buttercream",
        ingredients: [
          { name: "Unsalted butter (softened)", amount: "1 1/2 cups", weightGrams: 340 },
          { name: "Confectioners' powdered sugar", amount: "5 cups", weightGrams: 600 },
          { name: "Champagne reduction (simmered from 3/4 cup down to 3 tbsp)", amount: "3 tbsp", weightGrams: 45 },
          { name: "Fine salt", amount: "Pinch" },
        ],
      },
    ],
    steps: [
      {
        phase: "Prep & Dry Mix",
        instruction: "Preheat oven to 350°F (175°C). Grease and parchment-line two 8-inch round cake pans.",
      },
      {
        phase: "Prep & Dry Mix",
        instruction: "Simmer 3/4 cup of champagne in a saucepan over medium-low heat until reduced to 3 tablespoons. Cool completely for the buttercream.",
        proTip: "Reducing champagne concentrates the flavor without adding excess water that splits buttercream."
      },
      {
        phase: "Batter Mixing",
        instruction: "Whisk cake flour, baking powder, and salt in a bowl. Beat butter and sugar for 3 minutes until pale.",
      },
      {
        phase: "Batter Mixing",
        instruction: "Beat in egg whites in two additions. Whisk room-temperature champagne, milk, and vanilla together. Alternate adding flour and champagne mixture to the butter.",
      },
      {
        phase: "Baking & Cooling",
        instruction: "Divide batter between pans and bake 28–30 minutes until edges turn light golden.",
      },
      {
        phase: "Frosting & Assembling",
        instruction: "Beat butter and powdered sugar until smooth, then whip in the cooled champagne reduction. Fill, stack, and finish with gold leaf or pearl sprinkles.",
      },
    ],
    businessTip: "Champagne cake commands a 15% to 20% premium upcharge over standard vanilla. Couples are excited to pay for top-shelf ingredients that fit the celebratory wedding toast theme.",
    tieredAdvice: "Delicate crumb structure. Handle chilled when leveling and stacking.",
    pairingSuggestions: ["Strawberry Gelee", "White Chocolate Crisp", "Edible 24k Gold Leaf"],
    xpReward: 75,
  },
  {
    id: "funfetti",
    name: "Festive Funfetti Wedding Cake",
    emoji: "🎉",
    color: "#db2777",
    colorLight: "#fce7f3",
    tagline: "Playful, Colorful & Highly Popular For Rehearsal Dinners",
    description: "A buttery vanilla crumb bursting with rainbow sprinkle joy — the modern couple's nostalgic crowd-pleaser.",
    yieldInfo: "One 8-inch, 2-layer cake (approx. 16 wedding servings)",
    servings: 16,
    prepTime: "20 mins",
    bakeTime: "28–30 mins",
    ovenTemp: "350°F (175°C)",
    panSize: "Two 8-inch round cake pans",
    difficulty: "Easy",
    difficultyStars: 1,
    sections: [
      {
        title: "Confetti Cake Batter",
        ingredients: [
          { name: "Cake flour", amount: "3 cups", weightGrams: 375 },
          { name: "Baking powder", amount: "1 tbsp", weightGrams: 14 },
          { name: "Fine salt", amount: "1/2 tsp", weightGrams: 3 },
          { name: "Unsalted butter (softened)", amount: "1 cup", weightGrams: 225 },
          { name: "Granulated sugar", amount: "2 cups", weightGrams: 400 },
          { name: "Large eggs", amount: "4 whole eggs" },
          { name: "Pure vanilla extract", amount: "1 tbsp", weightGrams: 15 },
          { name: "Whole milk", amount: "1 cup", weightGrams: 240 },
          { name: "Rainbow sprinkles ('Jimmies' cylindrical style only)", amount: "3/4 cup", weightGrams: 140 },
        ],
      },
      {
        title: "Creamy Vanilla Buttercream",
        ingredients: [
          { name: "Unsalted butter (softened)", amount: "1 1/2 cups", weightGrams: 340 },
          { name: "Confectioners' powdered sugar", amount: "5 cups", weightGrams: 600 },
          { name: "Heavy cream", amount: "2 tbsp", weightGrams: 30 },
          { name: "Vanilla extract", amount: "1 tsp", weightGrams: 5 },
        ],
      },
    ],
    steps: [
      {
        phase: "Prep & Dry Mix",
        instruction: "Preheat oven to 350°F (175°C). Line two 8-inch pans with parchment paper.",
      },
      {
        phase: "Batter Mixing",
        instruction: "Whisk dry ingredients. Cream butter and sugar until light and fluffy. Beat in eggs one by one and vanilla.",
      },
      {
        phase: "Batter Mixing",
        instruction: "Alternate adding flour mixture and milk. Once batter is combined, gently fold in rainbow sprinkles with a rubber spatula by hand.",
        proTip: "Never use an electric mixer with sprinkles! 3 to 4 gentle hand folds prevent colors bleeding into grey batter."
      },
      {
        phase: "Baking & Cooling",
        instruction: "Immediately divide between pans and bake 28–30 minutes until tester is clean.",
      },
      {
        phase: "Frosting & Assembling",
        instruction: "Cool completely. Fill with buttercream and finish with pristine white exterior coating to give guests a colorful surprise slice!",
      },
    ],
    businessTip: "Always specify cylindrical 'Jimmies' sprinkles rather than round nonpareils. Round nonpareils immediately bleed color and turn the wedding batter muddy grey — an amateur mistake to avoid.",
    tieredAdvice: "Very sturdy and stacks cleanly on any tier level.",
    pairingSuggestions: ["Marshmallow Fluff", "White Chocolate Ganache", "Fresh Berries"],
    xpReward: 50,
  },
  {
    id: "almond-raspberry",
    name: "Almond Raspberry Wedding Cake",
    emoji: "🫐",
    color: "#9333ea",
    colorLight: "#f3e8ff",
    tagline: "Nutty, Sophisticated & Balanced With Tart Fruit Coulis",
    description: "A refined almond-infused crumb paired with vibrant seedless raspberry preserve and almond buttercream.",
    yieldInfo: "One 8-inch, 2-layer cake (approx. 16 wedding servings)",
    servings: 16,
    prepTime: "25 mins",
    bakeTime: "30–32 mins",
    ovenTemp: "350°F (175°C)",
    panSize: "Two 8-inch round cake pans",
    difficulty: "Easy to Moderate",
    difficultyStars: 2,
    sections: [
      {
        title: "Almond Sponge",
        ingredients: [
          { name: "Cake flour", amount: "2 3/4 cups", weightGrams: 345 },
          { name: "Baking powder", amount: "1 tbsp", weightGrams: 14 },
          { name: "Fine salt", amount: "1/2 tsp", weightGrams: 3 },
          { name: "Unsalted butter (softened)", amount: "1 cup", weightGrams: 225 },
          { name: "Granulated sugar", amount: "1 3/4 cups", weightGrams: 350 },
          { name: "Large eggs", amount: "4 whole eggs" },
          { name: "Pure almond extract", amount: "1 tsp", weightGrams: 5 },
          { name: "Pure vanilla extract", amount: "1 tsp", weightGrams: 5 },
          { name: "Whole milk", amount: "1 cup", weightGrams: 240 },
        ],
      },
      {
        title: "Raspberry Filling & Almond Buttercream",
        ingredients: [
          { name: "Premium seedless raspberry jam or coulis", amount: "1 cup", weightGrams: 320 },
          { name: "Unsalted butter (softened)", amount: "1 1/2 cups", weightGrams: 340 },
          { name: "Confectioners' powdered sugar", amount: "5 cups", weightGrams: 600 },
          { name: "Heavy whipping cream", amount: "2 tbsp", weightGrams: 30 },
          { name: "Pure almond extract", amount: "1/2 tsp", weightGrams: 2.5 },
        ],
      },
    ],
    steps: [
      {
        phase: "Prep & Dry Mix",
        instruction: "Preheat oven to 350°F (175°C). Grease and line two 8-inch round pans.",
      },
      {
        phase: "Batter Mixing",
        instruction: "Whisk flour, baking powder, and salt. Cream butter and sugar until pale and fluffy (3 mins).",
      },
      {
        phase: "Batter Mixing",
        instruction: "Add eggs one at a time, then blend in almond and vanilla extracts. Alternate flour and milk gently.",
      },
      {
        phase: "Baking & Cooling",
        instruction: "Bake 30–32 minutes until a skewer emerges clean. Cool completely on racks.",
      },
      {
        phase: "Frosting & Assembling",
        instruction: "Pipe a protective buttercream dam along the outer edge of the bottom cake layer, spread seedless raspberry preserve in the center, stack the top layer, and coat with silky almond buttercream.",
        proTip: "The buttercream dam locks the jam inside so it never oozes out the sides of your wedding tier!"
      },
    ],
    businessTip: "Always enquire in advance about tree nut allergies. Keep an allergy-safe alternative (such as Lemon or Classic Vanilla) ready to offer if guests require nut-free catering.",
    tieredAdvice: "Strong, stable, and easy to dowel across multiple tiers.",
    pairingSuggestions: ["White Chocolate", "Amaretto Glaze", "Fresh Raspberries"],
    xpReward: 60,
  },
];

export const getRecipeById = (id: string) => recipes.find((r) => r.id === id);
