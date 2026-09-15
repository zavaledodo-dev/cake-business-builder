import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { recipes } from "../data/recipes";
import { achievements } from "../data/achievements";
import {
  getGameState,
  getLevelForXp,
  getXpProgressPercent,
  completeRecipe,
  registerOrderAdded,
  registerCalculatorUse,
  setBakerName,
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
  status: "Pendente" | "Em Preparo" | "Entregue";
}

function HomePage() {
  const [activeTab, setActiveTab] = useState<"recipes" | "progress" | "business">("recipes");
  const [selectedRecipeId, setSelectedRecipeId] = useState<string>("vanilla-bean");
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});
  const [checkedIngredients, setCheckedIngredients] = useState<Record<string, boolean>>({});
  
  // Game state
  const [gameState, setGameState] = useState(getGameState());
  const [justLeveledUp, setJustLeveledUp] = useState<string | null>(null);

  // Business calculator state
  const [calcServings, setCalcServings] = useState(30);
  const [calcTierType, setCalcTierType] = useState<"simple" | "decorated" | "luxury">("decorated");
  const [calcFlavor, setCalcFlavor] = useState("vanilla-bean");
  const [calcCostIngredients, setCalcCostIngredients] = useState(150);
  const [calcHours, setCalcHours] = useState(4);
  const [calcHourlyRate, setCalcHourlyRate] = useState(50);
  const [calcProfitMargin, setCalcProfitMargin] = useState(30);

  // Orders state
  const [orders, setOrders] = useState<OrderItem[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem("cake-builder-orders");
      return stored ? JSON.parse(stored) : [
        {
          id: "ord-1",
          clientName: "Mariana & Carlos",
          recipeName: "Bolo de Baunilha Clássico",
          servings: 50,
          date: "2026-10-15",
          price: 450,
          status: "Em Preparo"
        }
      ];
    } catch {
      return [];
    }
  });

  const [newClientName, setNewClientName] = useState("");
  const [newOrderRecipe, setNewOrderRecipe] = useState("vanilla-bean");
  const [newOrderServings, setNewOrderServings] = useState(25);
  const [newOrderDate, setNewOrderDate] = useState("");
  const [newOrderPrice, setNewOrderPrice] = useState(200);

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
      setJustLeveledUp(`Parabéns! Subiste para o Nível ${res.newState.level} - ${getLevelForXp(res.newState.xp).name}! 🎉`);
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
      recipeName: recipeObj?.name || "Bolo Personalizado",
      servings: Number(newOrderServings),
      date: newOrderDate || "Data a combinar",
      price: Number(newOrderPrice),
      status: "Pendente"
    };
    const updated = [newOrd, ...orders];
    setOrders(updated);
    try {
      localStorage.setItem("cake-builder-orders", JSON.stringify(updated));
    } catch {}
    registerOrderAdded();
    setNewClientName("");
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-slate-800 pb-20">
      {/* Toast Alert */}
      {justLeveledUp && (
        <div className="fixed top-20 right-4 z-50 bg-gradient-to-r from-pink-500 to-amber-500 text-white px-6 py-3 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce">
          <span className="text-2xl">🏆</span>
          <p className="font-bold text-sm sm:text-base">{justLeveledUp}</p>
        </div>
      )}

      {/* Hero Header */}
      <header className="relative overflow-hidden bg-gradient-to-b from-pink-100/60 via-amber-50/50 to-transparent pt-10 pb-12 px-4 sm:px-6">
        <div className="mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-semibold mb-4 border border-pink-200">
            <span>✨ Coleção The Home Baker's</span>
            <span>•</span>
            <span>Edição Casamento</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
            Transforma a Tua Paixão por Bolos num{" "}
            <span className="bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 bg-clip-text text-transparent">
              Negócio Rentável
            </span>
          </h1>
          <p className="mt-4 text-sm sm:text-lg text-slate-600 max-w-2xl mx-auto">
            Aprende 8 receitas comprovadas de bolos de casamento, ganha XP a cada fornada e usa a calculadora inteligente de preços para cobrar com segurança.
          </p>

          {/* Quick Stats Bar */}
          <div className="mt-8 max-w-2xl mx-auto bg-white/90 backdrop-blur border border-rose-100 rounded-3xl p-4 shadow-sm">
            <div className="flex items-center justify-between gap-4 mb-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">👩‍🍳</span>
                <div className="text-left">
                  <div className="text-xs text-slate-500 font-medium">Nível Atual</div>
                  <div className="font-bold text-sm sm:text-base text-slate-800">
                    {currentLevel.level}. {currentLevel.name}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-pink-600 bg-pink-50 px-2.5 py-1 rounded-full border border-pink-100">
                  {gameState.completedRecipes.length} de 8 Receitas Feitas
                </span>
              </div>
            </div>
            <XPBar xp={gameState.xp} size="md" />
          </div>

          {/* Main Navigation Tabs */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setActiveTab("recipes")}
              className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all flex items-center gap-2 ${
                activeTab === "recipes"
                  ? "bg-slate-900 text-white shadow-md scale-105"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <span>🧁</span> As 8 Receitas
            </button>
            <button
              onClick={() => setActiveTab("business")}
              className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all flex items-center gap-2 ${
                activeTab === "business"
                  ? "bg-pink-600 text-white shadow-md scale-105"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <span>💼</span> Calculadora & Encomendas
            </button>
            <button
              onClick={() => setActiveTab("progress")}
              className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all flex items-center gap-2 ${
                activeTab === "progress"
                  ? "bg-amber-500 text-white shadow-md scale-105"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <span>🏆</span> Conquistas & XP
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="mx-auto max-w-6xl px-4 sm:px-6 mt-4">
        {/* TAB 1: RECIPES */}
        {activeTab === "recipes" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sidebar with recipe list */}
            <div className="lg:col-span-4 space-y-3">
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-400 px-1">
                Catálogo de Bolos ({recipes.length})
              </h2>
              <div className="space-y-2">
                {recipes.map((recipe, index) => {
                  const isDone = gameState.completedRecipes.includes(recipe.id);
                  const isSelected = selectedRecipeId === recipe.id;
                  return (
                    <button
                      key={recipe.id}
                      onClick={() => setSelectedRecipeId(recipe.id)}
                      className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between ${
                        isSelected
                          ? "bg-white border-pink-500 shadow-md ring-2 ring-pink-500/20"
                          : "bg-white/80 border-slate-200/80 hover:bg-white hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl p-2 rounded-xl bg-slate-50 border border-slate-100">
                          {recipe.emoji}
                        </span>
                        <div>
                          <div className="font-bold text-sm text-slate-800 flex items-center gap-1.5">
                            <span>{index + 1}. {recipe.name}</span>
                          </div>
                          <div className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                            <span>⏱️ {recipe.prepTime}</span>
                            <span>•</span>
                            <span>⭐ {recipe.difficulty}</span>
                          </div>
                        </div>
                      </div>
                      {isDone ? (
                        <span className="h-6 w-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs font-black">
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

              {/* Tiered Cakes Advice Card */}
              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-900 text-xs leading-relaxed mt-4">
                <div className="font-bold flex items-center gap-1.5 text-amber-800 mb-1">
                  <span>💡</span> Dica Sobre Bolos de Andares
                </div>
                Todas as receitas rendem uma forma de 20cm (2 camadas). Para montar andares, dobre a receita e use sempre estacas (dowels) de suporte no bolo inferior antes de sobrepor!
              </div>
            </div>

            {/* Recipe Details Main Column */}
            <div className="lg:col-span-8 bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-6">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-4xl">{currentRecipe.emoji}</span>
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                        {currentRecipe.name}
                      </h2>
                      <p className="text-sm text-slate-500 mt-1">
                        {currentRecipe.description}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {isRecipeCompleted ? (
                    <div className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-4 py-2 rounded-2xl font-bold text-sm flex items-center gap-2">
                      <span>🎉</span> Concluída! (+{currentRecipe.xpReward} XP)
                    </div>
                  ) : (
                    <button
                      onClick={handleCompleteCurrentRecipe}
                      className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold px-5 py-2.5 rounded-2xl shadow-sm text-sm flex items-center gap-2 transition-transform active:scale-95"
                    >
                      <span>🔥</span> Marcar Como Feita (+{currentRecipe.xpReward} XP)
                    </button>
                  )}
                </div>
              </div>

              {/* Recipe Meta Info */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
                <div className="bg-slate-50 border border-slate-100 p-3 rounded-2xl text-center">
                  <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">Rendimento</div>
                  <div className="font-black text-slate-800 text-sm mt-0.5">{currentRecipe.servings} Fatias</div>
                </div>
                <div className="bg-slate-50 border border-slate-100 p-3 rounded-2xl text-center">
                  <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">Preparo</div>
                  <div className="font-black text-slate-800 text-sm mt-0.5">{currentRecipe.prepTime}</div>
                </div>
                <div className="bg-slate-50 border border-slate-100 p-3 rounded-2xl text-center">
                  <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">Forno</div>
                  <div className="font-black text-slate-800 text-sm mt-0.5">{currentRecipe.bakeTime}</div>
                </div>
                <div className="bg-slate-50 border border-slate-100 p-3 rounded-2xl text-center">
                  <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">Dificuldade</div>
                  <div className="font-black text-slate-800 text-sm mt-0.5">{currentRecipe.difficulty}</div>
                </div>
              </div>

              {/* Business Tip Highlight */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 p-4 rounded-2xl mb-8">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">💰</span>
                  <div>
                    <h3 className="font-bold text-amber-900 text-sm">Dica de Negócio & Venda</h3>
                    <p className="text-xs sm:text-sm text-amber-800/90 mt-1 leading-relaxed">
                      {currentRecipe.businessTip}
                    </p>
                  </div>
                </div>
              </div>

              {/* Ingredients Checklist */}
              <div className="mb-8">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-4">
                  <span>🥣</span> Ingredientes Separados
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {currentRecipe.sections.map((section, sIdx) => (
                    <div key={sIdx} className="bg-slate-50/70 border border-slate-200/60 rounded-2xl p-4">
                      <h4 className="font-bold text-xs uppercase tracking-wider text-slate-600 mb-3">
                        {section.title}
                      </h4>
                      <ul className="space-y-2">
                        {section.ingredients.map((ing, iIdx) => {
                          const key = `${currentRecipe.id}-${sIdx}-${iIdx}`;
                          const isChecked = !!checkedIngredients[key];
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
                                <span>{ing.amount}</span>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step-by-Step Instructions */}
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-4">
                  <span>👩‍🍳</span> Modo de Preparo Passo a Passo
                </h3>
                <div className="space-y-3">
                  {currentRecipe.steps.map((step, idx) => {
                    const stepKey = `${currentRecipe.id}-step-${idx}`;
                    const isStepDone = !!completedSteps[stepKey];
                    return (
                      <div
                        key={idx}
                        onClick={() => setCompletedSteps(prev => ({ ...prev, [stepKey]: !isStepDone }))}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
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
                        <p className={`text-xs sm:text-sm leading-relaxed ${isStepDone ? "line-through" : ""}`}>
                          {step}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: BUSINESS & CALCULATOR */}
        {activeTab === "business" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Price Calculator */}
            <div className="lg:col-span-7 bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-6">
                <span className="text-3xl">🧮</span>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Calculadora de Bolos de Casamento</h2>
                  <p className="text-xs text-slate-500">
                    Defina o preço correto por fatia com base no padrão internacional de mercado ($4 a $12 por fatia).
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                {/* Servings slider */}
                <div>
                  <div className="flex justify-between items-center text-sm font-semibold mb-2">
                    <label>Número Estimado de Fatias / Convidados</label>
                    <span className="text-pink-600 font-bold text-base">{calcServings} fatias</span>
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
                    <span>15 (1 andar pequeno)</span>
                    <span>100 (3 andares)</span>
                    <span>200 (casamento grande)</span>
                  </div>
                </div>

                {/* Flavor & Style */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase mb-2">Sabor do Bolo</label>
                    <select
                      value={calcFlavor}
                      onChange={(e) => setCalcFlavor(e.target.value)}
                      className="w-full rounded-xl border-slate-200 bg-slate-50 p-2.5 text-sm font-medium focus:ring-2 focus:ring-pink-400"
                    >
                      {recipes.map(r => (
                        <option key={r.id} value={r.id}>
                          {r.emoji} {r.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase mb-2">Complexidade / Decoração</label>
                    <select
                      value={calcTierType}
                      onChange={(e) => setCalcTierType(e.target.value as any)}
                      className="w-full rounded-xl border-slate-200 bg-slate-50 p-2.5 text-sm font-medium focus:ring-2 focus:ring-pink-400"
                    >
                      <option value="simple">Simples / Semi-naked ($6/fatia)</option>
                      <option value="decorated">Decorado / Flores Naturais ($8/fatia)</option>
                      <option value="luxury">Luxo / Andares Múltiplos ($12/fatia)</option>
                    </select>
                  </div>
                </div>

                {/* Advanced Cost Inputs */}
                <div className="pt-4 border-t border-slate-100">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Cálculo Baseado em Custos Reais
                  </h3>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-slate-500">Custo Ingredientes ($)</label>
                      <input
                        type="number"
                        value={calcCostIngredients}
                        onChange={(e) => setCalcCostIngredients(Number(e.target.value))}
                        className="w-full mt-1 p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-500">Horas de Trabalho</label>
                      <input
                        type="number"
                        value={calcHours}
                        onChange={(e) => setCalcHours(Number(e.target.value))}
                        className="w-full mt-1 p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-500">Sua Hora ($)</label>
                      <input
                        type="number"
                        value={calcHourlyRate}
                        onChange={(e) => setCalcHourlyRate(Number(e.target.value))}
                        className="w-full mt-1 p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Price Output Box */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-pink-50 via-rose-50 to-amber-50 border border-pink-200 mt-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <span className="text-xs font-bold text-pink-700 uppercase tracking-wider">
                        Preço Recomendado por Fatia
                      </span>
                      <div className="text-3xl font-black text-slate-900 mt-1">
                        ${suggestedSlicePrice} <span className="text-xs font-normal text-slate-500">/ fatia</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        Total Sugerido: <strong className="text-slate-800">${baseTotal.toFixed(2)}</strong>
                      </p>
                    </div>

                    <div className="sm:border-l sm:border-pink-200 sm:pl-6">
                      <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                        Com Margem de Custo
                      </span>
                      <div className="text-2xl font-bold text-amber-900 mt-1">
                        ${costBasedTotal}
                      </div>
                      <span className="text-[11px] text-slate-500">
                        Cobre ingredientes, suas {calcHours}h de produção + {calcProfitMargin}% lucro
                      </span>
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
                  <h3 className="font-bold text-slate-900 text-base">Nova Encomenda</h3>
                </div>

                <form onSubmit={handleAddOrder} className="space-y-3">
                  <div>
                    <input
                      type="text"
                      placeholder="Nome dos Noivos / Cliente"
                      value={newClientName}
                      onChange={(e) => setNewClientName(e.target.value)}
                      className="w-full text-sm p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
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
                      placeholder="Nº Fatias"
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
                      placeholder="Preço Total ($)"
                      value={newOrderPrice}
                      onChange={(e) => setNewOrderPrice(Number(e.target.value))}
                      className="text-xs p-2 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-xl text-xs transition"
                  >
                    Salvar Encomenda (+30 XP)
                  </button>
                </form>
              </div>

              {/* Order List */}
              <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <span>📦</span> Encomendas Registadas ({orders.length})
                  </h3>
                </div>

                <div className="space-y-3">
                  {orders.length === 0 ? (
                    <p className="text-xs text-slate-400 text-center py-6">
                      Nenhuma encomenda cadastrada ainda. Adicione a sua primeira no formulário acima!
                    </p>
                  ) : (
                    orders.map(ord => (
                      <div key={ord.id} className="p-3 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-between">
                        <div>
                          <div className="font-bold text-xs text-slate-800">{ord.clientName}</div>
                          <div className="text-[11px] text-slate-500">{ord.recipeName} • {ord.servings} fatias</div>
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

        {/* TAB 3: GAMIFICATION & PROGRESS */}
        {activeTab === "progress" && (
          <div className="space-y-8">
            {/* Level Card */}
            <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 rounded-3xl p-8 text-white shadow-lg">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <div>
                  <div className="inline-block bg-white/20 backdrop-blur px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
                    Jornada Confeiteira
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-black">
                    Nível {currentLevel.level}: {currentLevel.name}
                  </h2>
                  <p className="mt-2 text-white/90 text-sm max-w-md">
                    Continue a testar as receitas, calcular orçamentos e adicionar encomendas para atingir o topo como Mestre Confeiteira!
                  </p>
                </div>
                <div className="text-left sm:text-right bg-black/20 p-4 rounded-2xl backdrop-blur">
                  <div className="text-3xl font-black">{gameState.xp} <span className="text-sm font-normal">XP Total</span></div>
                  <div className="text-xs text-white/80 mt-1">
                    Próximo nível a partir de: {currentLevel.maxXp === Infinity ? "Nível Máximo!" : `${currentLevel.maxXp + 1} XP`}
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
                <span>🏅</span> Badges e Conquistas ({gameState.unlockedAchievements.length} de {achievements.length} Desbloqueados)
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
