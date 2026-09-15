import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { recipes } from "../data/recipes";
import { achievements } from "../data/achievements";
import { equipmentList, kitchenHabits } from "../data/equipment";
import {
  getGameState,
  getLevelForXp,
  completeRecipe,
  registerOrderAdded,
  registerCalculatorUse,
} from "../lib/gamification";
import { XPBar } from "../components/XPBar";

export const Route = createFileRoute("/")({
  component: HomePage,
});

interface OrderItem {
  id: string;
  clientName: string;
  recipeName: string;
  servings: number;
  date: string;
  price: number;
  status: "Pending Deposit" | "In Preparation" | "Delivered & Setup";
}

function HomePage() {
  const [activeTab, setActiveTab] = useState<"recipes" | "equipment" | "business" | "progress">("recipes");
  const [selectedRecipeId, setSelectedRecipeId] = useState<string>("vanilla-bean");
  const [unitMode, setUnitMode] = useState<"volume" | "weight">("volume");
  const [tierMultiplier, setTierMultiplier] = useState<number>(1);
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});
  const [checkedIngredients, setCheckedIngredients] = useState<Record<string, boolean>>({});
  const [checkedEquipment, setCheckedEquipment] = useState<Record<string, boolean>>({});
  
  // Game state
  const [gameState, setGameState] = useState(getGameState());
  const [justLeveledUp, setJustLeveledUp] = useState<string | null>(null);

  // Business calculator state
  const [calcServings, setCalcServings] = useState(40);
  const [calcTierType, setCalcTierType] = useState<"simple" | "decorated" | "luxury">("decorated");
  const [calcFlavor, setCalcFlavor] = useState("vanilla-bean");
  const [calcCostIngredients, setCalcCostIngredients] = useState(120);
  const [calcHours, setCalcHours] = useState(6);
  const [calcHourlyRate, setCalcHourlyRate] = useState(35);
  const [calcProfitMargin, setCalcProfitMargin] = useState(30);

  // Tasting Box simulator state
  const [tastingFlavors, setTastingFlavors] = useState<string[]>(["vanilla-bean", "chocolate-fudge", "lemon-elderflower"]);
  const [tastingBoxPrice, setTastingBoxPrice] = useState(45);

  // Orders state
  const [orders, setOrders] = useState<OrderItem[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem("cake-builder-orders");
      return stored ? JSON.parse(stored) : [
        {
          id: "ord-1",
          clientName: "Emily & Jason's Botanical Wedding",
          recipeName: "Lemon Elderflower Cake",
          servings: 65,
          date: "2026-11-20",
          price: 520,
          status: "In Preparation"
        }
      ];
    } catch {
      return [];
    }
  });

  const [newClientName, setNewClientName] = useState("");
  const [newOrderRecipe, setNewOrderRecipe] = useState("vanilla-bean");
  const [newOrderServings, setNewOrderServings] = useState(30);
  const [newOrderDate, setNewOrderDate] = useState("");
  const [newOrderPrice, setNewOrderPrice] = useState(240);

  // Sync state
  useEffect(() => {
    const handleUpdate = () => {
      setGameState(getGameState());
    };
    window.addEventListener("xp-updated", handleUpdate);
    return () => window.removeEventListener("xp-updated", handleUpdate);
  }, []);

  const currentRecipe = recipes.find((r) => r.id === selectedRecipeId) || recipes[0];
  const currentLevel = getLevelForXp(gameState.xp);
  const isRecipeCompleted = gameState.completedRecipes.includes(currentRecipe.id);

  // Calculator logic
  const basePricePerSlice = calcTierType === "simple" ? 6 : calcTierType === "decorated" ? 8 : 12;
  const flavorBonus = calcFlavor === "champagne" ? 1.2 : calcFlavor === "almond-raspberry" ? 1.15 : 1;
  const suggestedSlicePrice = (basePricePerSlice * flavorBonus).toFixed(2);
  const baseTotal = (Number(suggestedSlicePrice) * calcServings);
  const costBasedTotal = ((calcCostIngredients + (calcHours * calcHourlyRate)) * (1 + calcProfitMargin / 100)).toFixed(2);

  const handleCompleteCurrentRecipe = () => {
    const res = completeRecipe(currentRecipe.id);
    setGameState(res.newState);
    if (res.leveledUp) {
      setJustLeveledUp(`Level Up! You attained Level ${res.newState.level} — ${getLevelForXp(res.newState.xp).name}! 🏆`);
      setTimeout(() => setJustLeveledUp(null), 5000);
    }
  };

  const handleAddOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientName) return;
    const recipeObj = recipes.find(r => r.id === newOrderRecipe);
    const newOrd: OrderItem = {
      id: "ord-" + Date.now(),
      clientName: newClientName,
      recipeName: recipeObj?.name || "Custom Wedding Cake",
      servings: Number(newOrderServings),
      date: newOrderDate || "TBD with Client",
      price: Number(newOrderPrice),
      status: "Pending Deposit"
    };
    const updated = [newOrd, ...orders];
    setOrders(updated);
    try {
      localStorage.setItem("cake-builder-orders", JSON.stringify(updated));
    } catch {}
    registerOrderAdded();
    setNewClientName("");
  };

  const toggleTastingFlavor = (id: string) => {
    if (tastingFlavors.includes(id)) {
      if (tastingFlavors.length > 1) {
        setTastingFlavors(tastingFlavors.filter(f => f !== id));
      }
    } else {
      if (tastingFlavors.length < 4) {
        setTastingFlavors([...tastingFlavors, id]);
      }
    }
  };

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const heroSlides = [
    {
      image: "/cakes/cake-lemon-elderflower.jpg",
      title: "Lemon Elderflower Tier",
      badge: "Royal Wedding Botanical",
      desc: "Bright zesty citrus sponge paired with delicate elderflower blossom buttercream and candied lemon slices.",
      recipeId: "lemon-elderflower"
    },
    {
      image: "/cakes/cake-red-velvet.jpg",
      title: "Southern Red Velvet",
      badge: "Dramatic Crimson Tier",
      desc: "Striking ruby red sponge with semi-naked cream cheese finish, garden roses and fresh berries.",
      recipeId: "red-velvet"
    },
    {
      image: "/cakes/cake-white-cherry.jpg",
      title: "Classic Vanilla Bean",
      badge: "Timeless White Wedding",
      desc: "Delicate vanilla bean sponge crowned with maraschino cherries & velvety white buttercream.",
      recipeId: "vanilla-bean"
    },
    {
      image: "/cakes/cake-chocolate-drip.jpg",
      title: "Chocolate Ganache Drip",
      badge: "Decadent Modern Tier",
      desc: "Rich chocolate fudge sponge layered with peanut butter cups & glossy dark chocolate drip.",
      recipeId: "chocolate-fudge"
    },
    {
      image: "/cakes/cake-almond-raspberry.jpg",
      title: "Almond Raspberry Wedding Cake",
      badge: "Artisan 3-Tier Stunner",
      desc: "Ivory almond buttercream layered with ruby red raspberries, sliced flaked almonds and edible gold leaf.",
      recipeId: "almond-raspberry"
    },
    {
      image: "/cakes/cake-carrot-cake.jpg",
      title: "Spiced Countryside Carrot Cake",
      badge: "Rustic Barn Wedding",
      desc: "Naturally moist spiced carrot layers with textured cream cheese frosting, cinnamon sticks and toasted pecans.",
      recipeId: "carrot-cake"
    },
    {
      image: "/cakes/cake-pink-vintage.jpg",
      title: "Vintage Ribbon Tier",
      badge: "Romantic Lambeth Style",
      desc: "Sparkling Champagne sponge adorned with delicate satin ribbons & edible royal icing pearls.",
      recipeId: "champagne"
    },
    {
      image: "/cakes/cake-blue-sprinkles.jpg",
      title: "Celebration Confetti",
      badge: "Crowd-Pleasing Favorite",
      desc: "Festive funfetti crumb paired with bright sky-blue rosette piping & rainbow crunch.",
      recipeId: "funfetti"
    }
  ];

  // Auto-play hero slides every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  return (
    <div className="min-h-screen relative text-slate-800 pb-24 selection:bg-pink-100 selection:text-pink-900">
      {/* Dynamic Background Image Layer */}
      <div 
        className="fixed inset-0 pointer-events-none transition-all duration-1000 ease-in-out bg-cover bg-center opacity-[0.07] blur-sm -z-10"
        style={{
          backgroundImage: `url('${heroSlides[currentSlideIndex].image}')`
        }}
      />
      {/* Background Soft Gradient Wash */}
      <div className="fixed inset-0 pointer-events-none bg-gradient-to-b from-[#faf8f5]/90 via-[#fffdfa]/95 to-[#faf8f5] -z-10" />

      {/* Toast Alert */}
      {justLeveledUp && (
        <div className="fixed top-20 right-4 z-50 bg-gradient-to-r from-pink-600 to-amber-500 text-white px-6 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce border border-white/20">
          <span className="text-2xl">🏆</span>
          <p className="font-bold text-sm sm:text-base">{justLeveledUp}</p>
        </div>
      )}

      {/* Hero Header with Interactive Carousel */}
      <header className="relative overflow-hidden pt-10 pb-12 px-4 sm:px-6 border-b border-rose-100/60">
        <div className="mx-auto max-w-6xl">
          {/* Top Title Bar */}
          <div className="text-center max-w-3xl mx-auto mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-100/80 text-pink-800 text-xs font-bold mb-3 border border-pink-200">
              <span>✨ The Home Baker's Wedding Cake Collection</span>
              <span>•</span>
              <span>Visual Showcase</span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-tight">
              Launch Your Home-Based{" "}
              <span className="bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 bg-clip-text text-transparent">
                Wedding Cake Business
              </span>
            </h1>
            <p className="mt-3 text-sm sm:text-base text-slate-600">
              Transform tested recipes into a thriving business with step-by-step masterclasses, batch scaling, and pricing tools.
            </p>
          </div>

          {/* Interactive Hero Cake Slide Showcase */}
          <div className="relative mx-auto max-w-4xl rounded-3xl overflow-hidden shadow-2xl border border-rose-100/80 bg-slate-900 text-white mb-10 group">
            <div className="relative h-72 sm:h-96 w-full overflow-hidden">
              {heroSlides.map((slide, sIdx) => {
                const isActive = sIdx === currentSlideIndex;
                return (
                  <div
                    key={slide.title}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                      isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                    }`}
                  >
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-7000 group-hover:scale-110"
                    />
                    {/* Gradient Overlay for Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                    {/* Slide Content Caption */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                      <div>
                        <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-pink-500/90 text-white mb-2 shadow-sm">
                          {slide.badge}
                        </span>
                        <h3 className="text-2xl sm:text-4xl font-black tracking-tight text-white drop-shadow-md">
                          {slide.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-200 mt-1 max-w-lg leading-relaxed">
                          {slide.desc}
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          setSelectedRecipeId(slide.recipeId);
                          setActiveTab("recipes");
                        }}
                        className="self-start sm:self-auto px-5 py-2.5 rounded-full bg-white text-slate-900 hover:bg-pink-100 font-black text-xs uppercase tracking-wider transition shadow-lg flex items-center gap-1.5 active:scale-95"
                      >
                        <span>View Recipe</span>
                        <span>→</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={() => setCurrentSlideIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 backdrop-blur hover:bg-black/70 text-white flex items-center justify-center font-bold transition text-lg"
              aria-label="Previous Slide"
            >
              ‹
            </button>
            <button
              onClick={() => setCurrentSlideIndex((prev) => (prev + 1) % heroSlides.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 backdrop-blur hover:bg-black/70 text-white flex items-center justify-center font-bold transition text-lg"
              aria-label="Next Slide"
            >
              ›
            </button>

            {/* Indicators Dots */}
            <div className="absolute top-4 right-4 z-20 flex gap-2">
              {heroSlides.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => setCurrentSlideIndex(dotIdx)}
                  className={`h-2.5 rounded-full transition-all ${
                    dotIdx === currentSlideIndex
                      ? "w-8 bg-pink-500 shadow-md"
                      : "w-2.5 bg-white/50 hover:bg-white"
                  }`}
                  aria-label={`Slide ${dotIdx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Quick Stats Bar */}
          <div className="max-w-2xl mx-auto bg-white/95 backdrop-blur border border-rose-100 rounded-3xl p-4 sm:p-5 shadow-sm">
            <div className="flex items-center justify-between gap-4 mb-2.5">
              <div className="flex items-center gap-3">
                <span className="text-3xl p-1.5 rounded-2xl bg-pink-50 border border-pink-100">👩‍🍳</span>
                <div className="text-left">
                  <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">Current Standing</div>
                  <div className="font-black text-sm sm:text-base text-slate-800">
                    Level {currentLevel.level} • {currentLevel.name}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-pink-600 bg-pink-50 px-3 py-1 rounded-full border border-pink-100">
                  {gameState.completedRecipes.length} of 8 Flavors Mastered
                </span>
              </div>
            </div>
            <XPBar xp={gameState.xp} size="md" />
          </div>

          {/* Main Navigation Tabs */}
          <div className="mt-8 flex flex-wrap justify-center gap-2.5">
            <button
              onClick={() => setActiveTab("recipes")}
              className={`px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all flex items-center gap-2 ${
                activeTab === "recipes"
                  ? "bg-slate-900 text-white shadow-md scale-105"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <span>🧁</span> 8 Wedding Recipes
            </button>
            <button
              onClick={() => setActiveTab("equipment")}
              className={`px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all flex items-center gap-2 ${
                activeTab === "equipment"
                  ? "bg-rose-600 text-white shadow-md scale-105"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <span>🛠️</span> Equipment & Kitchen Setup
            </button>
            <button
              onClick={() => setActiveTab("business")}
              className={`px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all flex items-center gap-2 ${
                activeTab === "business"
                  ? "bg-pink-600 text-white shadow-md scale-105"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <span>💼</span> Pricing Engine & Orders
            </button>
            <button
              onClick={() => setActiveTab("progress")}
              className={`px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all flex items-center gap-2 ${
                activeTab === "progress"
                  ? "bg-amber-500 text-white shadow-md scale-105"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <span>🏆</span> Badges & Level Progress
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Body */}
      <main className="mx-auto max-w-6xl px-4 sm:px-6 mt-8">
        {/* TAB 1: 8 RECIPES */}
        {activeTab === "recipes" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Recipe Selector */}
            <div className="lg:col-span-4 space-y-3">
              <div className="flex items-center justify-between px-1 mb-2">
                <h2 className="text-xs font-black uppercase tracking-wider text-slate-400">
                  Flavor Collection ({recipes.length})
                </h2>
                <span className="text-[11px] text-pink-600 font-bold">Tested & Scalable</span>
              </div>
              
              <div className="space-y-2">
                {recipes.map((recipe, index) => {
                  const isDone = gameState.completedRecipes.includes(recipe.id);
                  const isSelected = selectedRecipeId === recipe.id;
                  return (
                    <button
                      key={recipe.id}
                      onClick={() => {
                        setSelectedRecipeId(recipe.id);
                        setTierMultiplier(1);
                      }}
                      className={`w-full text-left p-3 rounded-2xl border transition-all flex items-center justify-between ${
                        isSelected
                          ? "bg-white border-pink-500 shadow-md ring-2 ring-pink-500/20"
                          : "bg-white/90 border-slate-200/80 hover:bg-white hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {recipe.image ? (
                          <img
                            src={recipe.image}
                            alt={recipe.name}
                            className="w-11 h-11 rounded-xl object-cover border border-rose-100 shadow-sm flex-shrink-0"
                          />
                        ) : (
                          <span className="text-2xl p-2 rounded-xl bg-slate-50 border border-slate-100 flex-shrink-0">
                            {recipe.emoji}
                          </span>
                        )}
                        <div>
                          <div className="font-bold text-sm text-slate-900 leading-snug">
                            {index + 1}. {recipe.name}
                          </div>
                          <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5 font-medium">
                            <span>⏱️ {recipe.bakeTime}</span>
                            <span>•</span>
                            <span>⭐ {recipe.difficulty}</span>
                          </div>
                        </div>
                      </div>
                      {isDone ? (
                        <span className="h-6 w-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-black">
                          ✓
                        </span>
                      ) : (
                        <span className="text-[11px] font-bold text-pink-500 bg-pink-50 px-2 py-0.5 rounded-full">
                          +{recipe.xpReward} XP
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Tiered Cakes Note Callout */}
              <div className="p-4 rounded-2xl bg-amber-50/90 border border-amber-200/80 text-amber-900 text-xs leading-relaxed mt-4 shadow-sm">
                <div className="font-bold flex items-center gap-1.5 text-amber-900 mb-1">
                  <span>💡</span> Professional Tier Stacking Note
                </div>
                Every recipe is formulated for an 8-inch round layer cake (16 slices). When scaling up for 2-tier or 3-tier weddings, use the multiplier buttons above and <strong>always install food-safe support dowels</strong> in the lower tier before stacking!
              </div>
            </div>

            {/* Right Column: Active Recipe Details */}
            <div className="lg:col-span-8 bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm">
              {/* Optional Recipe Real Cake Photo Banner */}
              {currentRecipe.image && (
                <div className="relative w-full h-56 sm:h-72 rounded-2xl overflow-hidden mb-6 border border-rose-100 shadow-sm">
                  <img
                    src={currentRecipe.image}
                    alt={currentRecipe.name}
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4">
                    <span className="text-white text-xs font-bold bg-pink-600/90 px-3 py-1 rounded-full backdrop-blur">
                      Real Baker Presentation Sample
                    </span>
                  </div>
                </div>
              )}

              {/* Header */}
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-6">
                <div>
                  <div className="inline-block px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[11px] font-bold mb-2">
                    {currentRecipe.tagline}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{currentRecipe.emoji}</span>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                      {currentRecipe.name}
                    </h2>
                  </div>
                  <p className="text-sm text-slate-500 mt-2 max-w-xl">
                    {currentRecipe.description}
                  </p>
                </div>

                <div>
                  {isRecipeCompleted ? (
                    <div className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-4 py-2 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-2">
                      <span>🎉</span> Completed (+{currentRecipe.xpReward} XP)
                    </div>
                  ) : (
                    <button
                      onClick={handleCompleteCurrentRecipe}
                      className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold px-4 sm:px-5 py-2.5 rounded-2xl shadow-sm text-xs sm:text-sm flex items-center gap-2 transition-transform active:scale-95"
                    >
                      <span>🔥</span> Mark as Baked (+{currentRecipe.xpReward} XP)
                    </button>
                  )}
                </div>
              </div>

              {/* Meta Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
                <div className="bg-slate-50 border border-slate-100 p-3 rounded-2xl text-center">
                  <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Servings</div>
                  <div className="font-black text-slate-800 text-sm mt-0.5">
                    {currentRecipe.servings * tierMultiplier} Slices
                  </div>
                </div>
                <div className="bg-slate-50 border border-slate-100 p-3 rounded-2xl text-center">
                  <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Prep Time</div>
                  <div className="font-black text-slate-800 text-sm mt-0.5">{currentRecipe.prepTime}</div>
                </div>
                <div className="bg-slate-50 border border-slate-100 p-3 rounded-2xl text-center">
                  <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Oven & Time</div>
                  <div className="font-black text-slate-800 text-sm mt-0.5">{currentRecipe.bakeTime}</div>
                </div>
                <div className="bg-slate-50 border border-slate-100 p-3 rounded-2xl text-center">
                  <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Difficulty</div>
                  <div className="font-black text-slate-800 text-sm mt-0.5">{currentRecipe.difficulty}</div>
                </div>
              </div>

              {/* Controls Bar: Units Toggle & Multiplier */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-pink-50/60 border border-pink-100 p-3.5 rounded-2xl mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-700">Display Units:</span>
                  <div className="flex bg-white rounded-lg border border-pink-200 p-0.5">
                    <button
                      onClick={() => setUnitMode("volume")}
                      className={`px-2.5 py-1 rounded-md text-xs font-bold transition ${
                        unitMode === "volume" ? "bg-pink-500 text-white" : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      Cups / Tbsp
                    </button>
                    <button
                      onClick={() => setUnitMode("weight")}
                      className={`px-2.5 py-1 rounded-md text-xs font-bold transition ${
                        unitMode === "weight" ? "bg-pink-500 text-white" : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      Grams (Scale)
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-slate-700">Scale Tier:</span>
                  {[1, 1.5, 2, 3].map((mult) => (
                    <button
                      key={mult}
                      onClick={() => setTierMultiplier(mult)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                        tierMultiplier === mult
                          ? "bg-slate-900 text-white"
                          : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                      }`}
                    >
                      {mult}x
                    </button>
                  ))}
                </div>
              </div>

              {/* Business Tip Box */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 p-4 rounded-2xl mb-8">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">💰</span>
                  <div>
                    <h3 className="font-bold text-amber-900 text-xs sm:text-sm">Wedding Business & Sales Strategy</h3>
                    <p className="text-xs sm:text-sm text-amber-800/90 mt-1 leading-relaxed">
                      {currentRecipe.businessTip}
                    </p>
                    <div className="mt-2 text-[11px] text-amber-700 font-semibold flex items-center gap-1">
                      <span>✨ Recommended Pairings:</span> {currentRecipe.pairingSuggestions.join(" • ")}
                    </div>
                  </div>
                </div>
              </div>

              {/* Ingredients Checklist */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                    <span>🥣</span> Measured Ingredients ({tierMultiplier > 1 ? `${tierMultiplier}x Scaled` : "Base 8-inch Cake"})
                  </h3>
                  <span className="text-[11px] text-slate-400">Click to check off</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentRecipe.sections.map((section, sIdx) => (
                    <div key={sIdx} className="bg-slate-50/70 border border-slate-200/60 rounded-2xl p-4">
                      <h4 className="font-bold text-xs uppercase tracking-wider text-slate-600 mb-3 border-b border-slate-200 pb-1.5">
                        {section.title}
                      </h4>
                      <ul className="space-y-2">
                        {section.ingredients.map((ing, iIdx) => {
                          const key = `${currentRecipe.id}-${sIdx}-${iIdx}`;
                          const isChecked = !!checkedIngredients[key];
                          const displayAmount = unitMode === "weight" && ing.weightGrams
                            ? `${Math.round(ing.weightGrams * tierMultiplier)}g`
                            : tierMultiplier > 1
                              ? `${ing.amount} (x${tierMultiplier})`
                              : ing.amount;

                          return (
                            <li
                              key={iIdx}
                              onClick={() => setCheckedIngredients(prev => ({ ...prev, [key]: !isChecked }))}
                              className={`flex items-start gap-2.5 text-xs sm:text-sm cursor-pointer select-none p-1.5 rounded-lg transition-colors ${
                                isChecked ? "text-slate-400 line-through bg-slate-100/60" : "text-slate-700 hover:bg-white"
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => {}}
                                className="mt-0.5 rounded border-slate-300 text-pink-500 focus:ring-pink-400"
                              />
                              <div>
                                <span className="font-semibold text-slate-900">{ing.name}</span>:{" "}
                                <span className="text-pink-600 font-bold">{displayAmount}</span>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step-by-Step Instructions by Phase */}
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2 mb-3">
                  <span>👩‍🍳</span> Step-by-Step Production Roadmap
                </h3>
                <div className="space-y-3">
                  {currentRecipe.steps.map((step, idx) => {
                    const stepKey = `${currentRecipe.id}-step-${idx}`;
                    const isStepDone = !!completedSteps[stepKey];
                    return (
                      <div
                        key={idx}
                        onClick={() => setCompletedSteps(prev => ({ ...prev, [stepKey]: !isStepDone }))}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                          isStepDone
                            ? "bg-slate-50/50 border-slate-200 text-slate-400"
                            : "bg-white border-slate-200 hover:border-pink-300 text-slate-700"
                        }`}
                      >
                        <span className={`w-7 h-7 flex-shrink-0 rounded-full flex items-center justify-center text-xs font-black ${
                          isStepDone ? "bg-slate-200 text-slate-500" : "bg-pink-100 text-pink-700"
                        }`}>
                          {isStepDone ? "✓" : idx + 1}
                        </span>
                        <div className="flex-1">
                          <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-0.5">
                            {step.phase}
                          </div>
                          <p className={`text-xs sm:text-sm leading-relaxed ${isStepDone ? "line-through" : ""}`}>
                            {step.instruction}
                          </p>
                          {step.proTip && !isStepDone && (
                            <div className="mt-2 text-[11px] text-pink-700 bg-pink-50 border border-pink-100/80 rounded-lg p-2 font-medium">
                              💡 <strong>Pro Tip:</strong> {step.proTip}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: EQUIPMENT & KITCHEN HABITS */}
        {activeTab === "equipment" && (
          <div className="space-y-8">
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm">
              <div className="border-b border-slate-100 pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">🛠️</span>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">Essential Equipment for Wedding Cakes</h2>
                    <p className="text-xs text-slate-500">
                      You don't need a commercial kitchen to build wedding tiers, but these specific tools guarantee structural stability and smooth edges.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {equipmentList.map((item) => {
                  const isChecked = !!checkedEquipment[item.id];
                  return (
                    <div
                      key={item.id}
                      onClick={() => setCheckedEquipment(prev => ({ ...prev, [item.id]: !isChecked }))}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                        isChecked
                          ? "bg-pink-50/40 border-pink-200 shadow-sm"
                          : "bg-white border-slate-200/70 hover:border-slate-300"
                      }`}
                    >
                      <span className="text-3xl p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                        {item.emoji}
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold text-sm text-slate-800">{item.name}</h3>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            item.importance === "Essential" ? "bg-rose-100 text-rose-700" : "bg-blue-100 text-blue-700"
                          }`}>
                            {item.importance}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                          {item.description}
                        </p>
                        <div className="text-[11px] text-pink-700 font-medium bg-white/80 border border-pink-100 rounded-lg p-1.5 mt-2">
                          💡 <strong>Kitchen Tip:</strong> {item.practicalTip}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Kitchen Habits Guide */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50/50 border border-amber-200/70 rounded-3xl p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">🎯</span>
                <div>
                  <h3 className="text-lg font-bold text-amber-950">Kitchen Habits That Separate Amateurs From Dependable Businesses</h3>
                  <p className="text-xs text-amber-800/80">Standards from the ebook to prevent disasters on delivery morning.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {kitchenHabits.map((habit) => (
                  <div key={habit.id} className="bg-white/90 backdrop-blur border border-amber-100 rounded-2xl p-4">
                    <div className="flex items-center gap-2 font-bold text-slate-900 text-sm mb-1.5">
                      <span className="text-xl">{habit.emoji}</span>
                      <h4>{habit.title}</h4>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {habit.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: BUSINESS & PRICING ENGINE */}
        {activeTab === "business" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Price Calculator */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-6">
                  <span className="text-3xl">🧮</span>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">Wedding Cake Pricing Calculator</h2>
                    <p className="text-xs text-slate-500">
                      Standard industry formula based on servings ($4 to $12/slice) and real production costs.
                    </p>
                  </div>
                </div>

                <div className="space-y-5">
                  {/* Servings slider */}
                  <div>
                    <div className="flex justify-between items-center text-sm font-semibold mb-2">
                      <label>Guest Count / Wedding Servings</label>
                      <span className="text-pink-600 font-bold text-base">{calcServings} slices</span>
                    </div>
                    <input
                      type="range"
                      min="15"
                      max="200"
                      step="5"
                      value={calcServings}
                      onChange={(e) => {
                        setCalcServings(Number(e.target.value));
                        registerCalculatorUse();
                      }}
                      className="w-full accent-pink-500"
                    />
                    <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                      <span>15 (Small 1-Tier)</span>
                      <span>80 (2-Tier Standard)</span>
                      <span>150+ (3-Tier Grand Wedding)</span>
                    </div>
                  </div>

                  {/* Flavor & Style */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase mb-2">Cake Flavor</label>
                      <select
                        value={calcFlavor}
                        onChange={(e) => setCalcFlavor(e.target.value)}
                        className="w-full rounded-xl border-slate-200 bg-slate-50 p-2.5 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-pink-400"
                      >
                        {recipes.map(r => (
                          <option key={r.id} value={r.id}>
                            {r.emoji} {r.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase mb-2">Decoration Tier</label>
                      <select
                        value={calcTierType}
                        onChange={(e) => setCalcTierType(e.target.value as any)}
                        className="w-full rounded-xl border-slate-200 bg-slate-50 p-2.5 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-pink-400"
                      >
                        <option value="simple">Semi-Naked / Minimal Buttercream ($6/slice)</option>
                        <option value="decorated">Floral Buttercream / Textured Finish ($8/slice)</option>
                        <option value="luxury">Multi-Tier Luxury with Fondant/Gold Leaf ($12/slice)</option>
                      </select>
                    </div>
                  </div>

                  {/* Real Cost Engine */}
                  <div className="pt-4 border-t border-slate-100">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                      Production Cost Reality Check
                    </h3>
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="text-[11px] font-bold text-slate-500">Ingredients ($)</label>
                        <input
                          type="number"
                          value={calcCostIngredients}
                          onChange={(e) => setCalcCostIngredients(Number(e.target.value))}
                          className="w-full mt-1 p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-slate-500">Labor Hours</label>
                        <input
                          type="number"
                          value={calcHours}
                          onChange={(e) => setCalcHours(Number(e.target.value))}
                          className="w-full mt-1 p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-slate-500">Hourly Rate ($)</label>
                        <input
                          type="number"
                          value={calcHourlyRate}
                          onChange={(e) => setCalcHourlyRate(Number(e.target.value))}
                          className="w-full mt-1 p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Output Display */}
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-pink-50 via-rose-50 to-amber-50 border border-pink-200 mt-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div>
                        <span className="text-xs font-bold text-pink-700 uppercase tracking-wider">
                          Recommended Price Per Serving
                        </span>
                        <div className="text-3xl font-black text-slate-900 mt-1">
                          ${suggestedSlicePrice} <span className="text-xs font-normal text-slate-500">/ slice</span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">
                          Contract Total: <strong className="text-slate-800">${baseTotal.toFixed(2)}</strong>
                        </p>
                      </div>

                      <div className="sm:border-l sm:border-pink-200 sm:pl-6">
                        <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                          Cost-Plus Margin Total
                        </span>
                        <div className="text-2xl font-bold text-amber-900 mt-1">
                          ${costBasedTotal}
                        </div>
                        <span className="text-[11px] text-slate-500">
                          Covers raw goods, {calcHours}h baking time + {calcProfitMargin}% profit
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tasting Box Simulator */}
              <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-4">
                  <span className="text-3xl">🎁</span>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">Client Tasting Box Simulator</h3>
                    <p className="text-xs text-slate-500">
                      Offer a curated 3-flavor tasting box to win over couples before they sign their wedding contract.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {recipes.map((r) => {
                      const isSelected = tastingFlavors.includes(r.id);
                      return (
                        <button
                          key={r.id}
                          onClick={() => toggleTastingFlavor(r.id)}
                          className={`px-3 py-1.5 rounded-full text-xs font-bold transition flex items-center gap-1.5 ${
                            isSelected
                              ? "bg-pink-600 text-white shadow-sm"
                              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                          }`}
                        >
                          <span>{r.emoji}</span>
                          <span>{r.name}</span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/70 text-xs text-amber-900 flex justify-between items-center">
                    <div>
                      <span className="font-bold">Ebook Strategy:</span> Classic Vanilla + Rich Chocolate + One Specialty Flavor (Champagne or Lemon).
                    </div>
                    <div className="text-right pl-4">
                      <div className="text-[10px] uppercase font-bold text-amber-700">Tasting Box Fee</div>
                      <div className="text-lg font-black text-amber-950">${tastingBoxPrice}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Orders Management */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">📝</span>
                  <h3 className="font-bold text-slate-900 text-base">Log New Wedding Booking</h3>
                </div>

                <form onSubmit={handleAddOrder} className="space-y-3">
                  <div>
                    <input
                      type="text"
                      placeholder="Couple's Names (e.g., Sarah & Mike)"
                      value={newClientName}
                      onChange={(e) => setNewClientName(e.target.value)}
                      className="w-full text-xs sm:text-sm p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <select
                      value={newOrderRecipe}
                      onChange={(e) => setNewOrderRecipe(e.target.value)}
                      className="text-xs p-2 bg-slate-50 border border-slate-200 rounded-xl"
                    >
                      {recipes.map(r => (
                        <option key={r.id} value={r.id}>{r.name}</option>
                      ))}
                    </select>
                    <input
                      type="number"
                      placeholder="Servings"
                      value={newOrderServings}
                      onChange={(e) => setNewOrderServings(Number(e.target.value))}
                      className="text-xs p-2 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="date"
                      value={newOrderDate}
                      onChange={(e) => setNewOrderDate(e.target.value)}
                      className="text-xs p-2 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                    <input
                      type="number"
                      placeholder="Price ($)"
                      value={newOrderPrice}
                      onChange={(e) => setNewOrderPrice(Number(e.target.value))}
                      className="text-xs p-2 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-xl text-xs transition"
                  >
                    Save Booking (+30 XP)
                  </button>
                </form>
              </div>

              {/* Order List */}
              <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <span>📦</span> Active Client Orders ({orders.length})
                  </h3>
                </div>

                <div className="space-y-3">
                  {orders.length === 0 ? (
                    <p className="text-xs text-slate-400 text-center py-6">
                      No client bookings logged yet. Add your first booking above!
                    </p>
                  ) : (
                    orders.map(ord => (
                      <div key={ord.id} className="p-3 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-between">
                        <div>
                          <div className="font-bold text-xs text-slate-800">{ord.clientName}</div>
                          <div className="text-[11px] text-slate-500">{ord.recipeName} • {ord.servings} slices</div>
                          <div className="text-[10px] text-slate-400 mt-0.5">📅 {ord.date}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-black text-sm text-pink-600">${ord.price}</div>
                          <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 mt-1">
                            {ord.status}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: GAMIFICATION & PROGRESS */}
        {activeTab === "progress" && (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 rounded-3xl p-8 text-white shadow-lg">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <div>
                  <div className="inline-block bg-white/20 backdrop-blur px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
                    Baker Career Roadmap
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-black">
                    Level {currentLevel.level}: {currentLevel.name}
                  </h2>
                  <p className="mt-2 text-white/90 text-sm max-w-md">
                    Test recipes, calibrate slice pricing, and log wedding bookings to advance from Apprentice to Master Wedding Cake Artist!
                  </p>
                </div>
                <div className="text-left sm:text-right bg-black/20 p-4 rounded-2xl backdrop-blur">
                  <div className="text-3xl font-black">{gameState.xp} <span className="text-sm font-normal">Total XP</span></div>
                  <div className="text-xs text-white/80 mt-1">
                    Next milestone: {currentLevel.maxXp === Infinity ? "Peak Level!" : `${currentLevel.maxXp + 1} XP`}
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <XPBar xp={gameState.xp} size="lg" showLabel={false} />
              </div>
            </div>

            {/* Achievements Grid */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span>🏅</span> Badges & Milestones ({gameState.unlockedAchievements.length} of {achievements.length} Unlocked)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {achievements.map((ach) => {
                  const isUnlocked = gameState.unlockedAchievements.includes(ach.id);
                  return (
                    <div
                      key={ach.id}
                      className={`p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${
                        isUnlocked
                          ? "bg-white border-pink-200 shadow-sm"
                          : "bg-slate-100/50 border-slate-200 opacity-60 grayscale"
                      }`}
                    >
                      <div className="text-3xl p-2 rounded-xl bg-slate-50 border border-slate-100">
                        {ach.emoji}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm text-slate-800">{ach.name}</h4>
                          {isUnlocked && (
                            <span className="text-[10px] font-bold bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full">
                              ✓
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                          {ach.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
