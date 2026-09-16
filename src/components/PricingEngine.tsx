import React, { useState, useRef } from "react";
import { recipes } from "../data/recipes";
import {
  baseRecipeIngredientCostUSD,
  defaultIngredientPrices,
  premiumFlavorsList,
} from "../data/ingredientPrices";
import { registerCalculatorUse } from "../lib/gamification";

interface PricingEngineProps {
  onQuoteSaved?: (quote: QuoteSummary) => void;
}

export interface QuoteSummary {
  id: string;
  clientName: string;
  weddingDate: string;
  flavorId: string;
  flavorName: string;
  servings: number;
  tierConfig: string;
  decorStyle: string;
  costBreakdown: {
    ingredientsCost: number;
    laborCost: number;
    overheadCost: number;
    deliveryFee: number;
    netCost: number;
    profitAmount: number;
  };
  pricePerSlice: number;
  totalPrice: number;
  depositAmount: number;
  balanceAmount: number;
  createdAt: string;
}

export function PricingEngine({ onQuoteSaved }: PricingEngineProps) {
  // Core Parameters
  const [flavorId, setFlavorId] = useState<string>("vanilla-bean");
  const [servings, setServings] = useState<number>(65);
  const [decorStyle, setDecorStyle] = useState<"naked" | "smooth_floral" | "luxury_piped">("smooth_floral");
  const [applyPremiumUpcharge, setApplyPremiumUpcharge] = useState<boolean>(true);
  const [premiumPercent, setPremiumPercent] = useState<number>(18); // 15-20% recommended

  // Labor & Overhead
  const [bakingHours, setBakingHours] = useState<number>(3.5);
  const [decoratingHours, setDecoratingHours] = useState<number>(4.0);
  const [hourlyRate, setHourlyRate] = useState<number>(35); // $/hr
  const [overheadAndPackaging, setOverheadAndPackaging] = useState<number>(25); // Dowels, drums, boxes, utilities

  // Delivery & On-site Setup
  const [includeDelivery, setIncludeDelivery] = useState<boolean>(true);
  const [deliveryMiles, setDeliveryMiles] = useState<number>(18); // one-way or roundtrip
  const [deliveryRatePerMile, setDeliveryRatePerMile] = useState<number>(1.5);
  const [onSiteSetupFee, setOnSiteSetupFee] = useState<number>(40); // Stacking & chilling at venue

  // Margin & Discount
  const [profitMargin, setProfitMargin] = useState<number>(35); // 10% to 55%

  // Client Details for Quote Export
  const [clientName, setClientName] = useState<string>("Sarah & Michael");
  const [weddingDate, setWeddingDate] = useState<string>("2026-10-18");
  const [venueLocation, setVenueLocation] = useState<string>("The Grand Estate Gardens");
  const [specialNotes, setSpecialNotes] = useState<string>("Fresh organic floral placement; allergen-safe cake table placement.");
  
  // Custom Ingredient Unit Overrides
  const [showIngredientEditor, setShowIngredientEditor] = useState<boolean>(false);
  const [ingredientUnitPrices, setIngredientUnitPrices] = useState(defaultIngredientPrices);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const selectedRecipe = recipes.find((r) => r.id === flavorId) || recipes[0];
  const isInherentlyPremium = premiumFlavorsList.includes(flavorId);

  // --- Dynamic Calculations ---
  // Baseline cost scaled by servings ratio (standard recipe yields 16 servings)
  const batchMultiplier = servings / 16;
  const baseFlavCost = baseRecipeIngredientCostUSD[flavorId] || 18.0;
  
  // Apply decoration ingredient allowance
  const decorExtraCost =
    decorStyle === "naked" ? 8 : decorStyle === "smooth_floral" ? 18 : 35;

  const rawIngredientsTotal = Number((baseFlavCost * batchMultiplier + decorExtraCost).toFixed(2));

  // Labor Total
  const totalLaborHours = Number((bakingHours + decoratingHours).toFixed(1));
  const laborTotal = Number((totalLaborHours * hourlyRate).toFixed(2));

  // Delivery Total
  const deliveryTotal = includeDelivery
    ? Number((deliveryMiles * deliveryRatePerMile + onSiteSetupFee).toFixed(2))
    : 0;

  // Subtotal Net Cost
  const netProductionCost = Number(
    (rawIngredientsTotal + laborTotal + overheadAndPackaging + deliveryTotal).toFixed(2)
  );

  // Apply Margin to derive selling base
  // Price = Cost / (1 - Margin%) OR Cost * (1 + Margin%)
  const profitMultiplier = 1 + profitMargin / 100;
  let subtotalPriceWithMargin = netProductionCost * profitMultiplier;

  // Premium flavor surcharge
  const isPremiumActive = isInherentlyPremium && applyPremiumUpcharge;
  const premiumUpchargeAmount = isPremiumActive
    ? subtotalPriceWithMargin * (premiumPercent / 100)
    : 0;

  const finalTotalPrice = Math.round(subtotalPriceWithMargin + premiumUpchargeAmount);
  const finalPricePerSlice = Number((finalTotalPrice / servings).toFixed(2));
  const depositAmount = Math.round(finalTotalPrice * 0.5);
  const balanceAmount = finalTotalPrice - depositAmount;

  // Recommended Tier Configuration based on servings
  const getTierRecommendation = (s: number) => {
    if (s <= 24) return "Single Tier (8-inch round • 2 layers)";
    if (s <= 45) return "2-Tier Petit (6\" top + 8\" base)";
    if (s <= 80) return "2-Tier Standard (6\" top + 9\" base)";
    if (s <= 125) return "3-Tier Classic (6\" + 8\" + 10\" rounds)";
    return "3-Tier Grand + Sheet Cake (6\" + 9\" + 12\" rounds)";
  };

  const currentTierConfig = getTierRecommendation(servings);

  // Trigger XP event on calculator touch
  const handleParamChange = () => {
    registerCalculatorUse();
  };

  // Generate shareable snapshot / quote export
  const currentQuote: QuoteSummary = {
    id: `QUOTE-${Date.now().toString().slice(-6)}`,
    clientName,
    weddingDate,
    flavorId,
    flavorName: selectedRecipe.name,
    servings,
    tierConfig: currentTierConfig,
    decorStyle:
      decorStyle === "naked"
        ? "Semi-Naked Rustic"
        : decorStyle === "smooth_floral"
        ? "Textured Buttercream & Florals"
        : "Luxury Multi-Tier Piped / Fondant",
    costBreakdown: {
      ingredientsCost: rawIngredientsTotal,
      laborCost: laborTotal,
      overheadCost: overheadAndPackaging,
      deliveryFee: deliveryTotal,
      netCost: netProductionCost,
      profitAmount: Math.round(finalTotalPrice - netProductionCost),
    },
    pricePerSlice: finalPricePerSlice,
    totalPrice: finalTotalPrice,
    depositAmount,
    balanceAmount,
    createdAt: new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
  };

  const handlePrintQuote = () => {
    window.print();
  };

  const handleShareQuoteLink = () => {
    const quotePayload = encodeURIComponent(
      JSON.stringify({
        c: clientName,
        d: weddingDate,
        f: selectedRecipe.name,
        s: servings,
        p: finalTotalPrice,
        pps: finalPricePerSlice,
      })
    );
    const shareableUrl = `${window.location.origin}${window.location.pathname}?quote=${quotePayload}#pricing`;
    navigator.clipboard.writeText(shareableUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3500);
  };

  return (
    <div className="space-y-8" id="pricing-engine">
      {/* Engine Header & Switcher */}
      <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 text-pink-700 text-xs font-bold mb-2 border border-pink-100">
              <span>💼 Commercial Cake Business Tool</span>
              <span>•</span>
              <span>Cost-Plus & Per-Slice Formula</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Wedding Cake Pricing Engine
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
              Calculate profitable quotes based on true ingredient costs, professional hourly labor, venue delivery, and specialty flavor premiums.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowIngredientEditor(!showIngredientEditor)}
              className="px-3.5 py-2 rounded-xl text-xs font-bold border border-slate-200 text-slate-700 hover:bg-slate-50 transition flex items-center gap-1.5"
            >
              <span>⚙️</span>
              <span>{showIngredientEditor ? "Hide Supplies Cost" : "Edit Supply Costs"}</span>
            </button>
          </div>
        </div>

        {/* Optional Supplies Unit Cost Editor Drawer */}
        {showIngredientEditor && (
          <div className="my-6 p-5 rounded-2xl bg-slate-50 border border-slate-200 animate-fadeIn">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Pantry Supply Unit Costs (Adjust to your local supplier rates)
              </h4>
              <span className="text-[11px] text-slate-400">Auto-saved for session</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {Object.entries(ingredientUnitPrices).slice(0, 8).map(([key, item]) => (
                <div key={key} className="bg-white p-2.5 rounded-xl border border-slate-200 text-xs">
                  <span className="font-semibold text-slate-800 block truncate">{item.name}</span>
                  <div className="flex items-center gap-1 mt-1 text-[11px] text-slate-500">
                    <span>$</span>
                    <input
                      type="number"
                      step="0.5"
                      value={item.defaultUnitCost}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setIngredientUnitPrices((prev) => ({
                          ...prev,
                          [key]: { ...prev[key], defaultUnitCost: val },
                        }));
                      }}
                      className="w-16 p-1 border rounded text-xs text-slate-800 font-bold bg-slate-50"
                    />
                    <span className="text-[10px] text-slate-400 truncate">/ {item.unit}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Main 2-Column Calculator Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
          {/* Left Column: Input Variables */}
          <div className="lg:col-span-7 space-y-6">
            {/* 1. Cake Flavor & Servings */}
            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <span>1. Cake Specification & Servings</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Selected Flavor
                  </label>
                  <select
                    value={flavorId}
                    onChange={(e) => {
                      setFlavorId(e.target.value);
                      handleParamChange();
                    }}
                    className="w-full text-xs sm:text-sm p-3 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-pink-400 focus:bg-white transition"
                  >
                    {recipes.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.emoji} {r.name} {premiumFlavorsList.includes(r.id) ? "★ (Premium)" : ""}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Decoration & Finish Level
                  </label>
                  <select
                    value={decorStyle}
                    onChange={(e) => {
                      setDecorStyle(e.target.value as any);
                      handleParamChange();
                    }}
                    className="w-full text-xs sm:text-sm p-3 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-pink-400 focus:bg-white transition"
                  >
                    <option value="naked">Semi-Naked Rustic (Baseline)</option>
                    <option value="smooth_floral">Smooth Buttercream + Florals (+$18 supplies)</option>
                    <option value="luxury_piped">Lambeth Vintage Piped / Gold Leaf (+$35 supplies)</option>
                  </select>
                </div>
              </div>

              {/* Servings Slider */}
              <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/70 space-y-2">
                <div className="flex justify-between items-center text-xs sm:text-sm font-bold">
                  <label className="text-slate-800">Total Wedding Slices / Guests</label>
                  <span className="text-pink-600 bg-pink-50 border border-pink-200 px-3 py-0.5 rounded-full text-sm">
                    {servings} Slices
                  </span>
                </div>
                <input
                  type="range"
                  min="16"
                  max="200"
                  step="2"
                  value={servings}
                  onChange={(e) => {
                    setServings(Number(e.target.value));
                    handleParamChange();
                  }}
                  className="w-full accent-pink-500 cursor-pointer"
                />
                <div className="flex justify-between items-center text-[11px] text-slate-500 pt-1">
                  <span>16 (1 Tier)</span>
                  <span className="font-semibold text-slate-700">{currentTierConfig}</span>
                  <span>200+ (Grand Tier)</span>
                </div>
              </div>

              {/* Premium Upcharge Toggle (Special for Champagne / Almond) */}
              {isInherentlyPremium && (
                <div className="p-4 rounded-2xl bg-purple-50/80 border border-purple-200 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🥂</span>
                    <div>
                      <div className="text-xs font-bold text-purple-900">
                        Specialty Ingredient Surcharge Detected
                      </div>
                      <div className="text-[11px] text-purple-700">
                        {selectedRecipe.name} uses specialty top-shelf ingredients (+{premiumPercent}% surcharge).
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => setApplyPremiumUpcharge(!applyPremiumUpcharge)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-black transition ${
                        applyPremiumUpcharge
                          ? "bg-purple-600 text-white shadow-sm"
                          : "bg-white text-purple-700 border border-purple-300"
                      }`}
                    >
                      {applyPremiumUpcharge ? "Active (+18%)" : "Waived (0%)"}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 2. Labor & Hourly Breakdown */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">
                2. Professional Baker Labor & Overhead
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">Baking Time</label>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      step="0.5"
                      value={bakingHours}
                      onChange={(e) => setBakingHours(Number(e.target.value))}
                      className="w-full text-sm font-bold bg-white border border-slate-200 p-1.5 rounded-lg"
                    />
                    <span className="text-xs text-slate-400">hrs</span>
                  </div>
                </div>

                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">Decorating Time</label>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      step="0.5"
                      value={decoratingHours}
                      onChange={(e) => setDecoratingHours(Number(e.target.value))}
                      className="w-full text-sm font-bold bg-white border border-slate-200 p-1.5 rounded-lg"
                    />
                    <span className="text-xs text-slate-400">hrs</span>
                  </div>
                </div>

                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">Your Hourly Rate</label>
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-slate-500 font-bold">$</span>
                    <input
                      type="number"
                      value={hourlyRate}
                      onChange={(e) => setHourlyRate(Number(e.target.value))}
                      className="w-full text-sm font-bold bg-white border border-slate-200 p-1.5 rounded-lg"
                    />
                    <span className="text-xs text-slate-400">/hr</span>
                  </div>
                </div>

                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">Boxes & Dowels</label>
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-slate-500 font-bold">$</span>
                    <input
                      type="number"
                      value={overheadAndPackaging}
                      onChange={(e) => setOverheadAndPackaging(Number(e.target.value))}
                      className="w-full text-sm font-bold bg-white border border-slate-200 p-1.5 rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Delivery & Venue Setup */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">
                  3. Wedding Venue Delivery & On-Site Setup
                </h3>
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
                  <input
                    type="checkbox"
                    checked={includeDelivery}
                    onChange={(e) => setIncludeDelivery(e.target.checked)}
                    className="rounded text-pink-500 focus:ring-pink-400"
                  />
                  <span>Include Delivery Fee</span>
                </label>
              </div>

              {includeDelivery && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50/70 p-3.5 rounded-2xl border border-slate-200">
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">Distance to Venue</label>
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        value={deliveryMiles}
                        onChange={(e) => setDeliveryMiles(Number(e.target.value))}
                        className="w-full text-xs sm:text-sm font-bold bg-white border border-slate-200 p-1.5 rounded-lg"
                      />
                      <span className="text-xs text-slate-400">miles</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">Mileage Rate</label>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-slate-500 font-bold">$</span>
                      <input
                        type="number"
                        step="0.25"
                        value={deliveryRatePerMile}
                        onChange={(e) => setDeliveryRatePerMile(Number(e.target.value))}
                        className="w-full text-xs sm:text-sm font-bold bg-white border border-slate-200 p-1.5 rounded-lg"
                      />
                      <span className="text-xs text-slate-400">/mi</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">On-Site Stacking Fee</label>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-slate-500 font-bold">$</span>
                      <input
                        type="number"
                        value={onSiteSetupFee}
                        onChange={(e) => setOnSiteSetupFee(Number(e.target.value))}
                        className="w-full text-xs sm:text-sm font-bold bg-white border border-slate-200 p-1.5 rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 4. Profit Margin Slider */}
            <div className="space-y-2 pt-4 border-t border-slate-100">
              <div className="flex justify-between items-center text-xs font-bold text-slate-800">
                <label>Target Profit Margin Percentage</label>
                <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-0.5 rounded-full">
                  +{profitMargin}% Profit
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="60"
                step="5"
                value={profitMargin}
                onChange={(e) => {
                  setProfitMargin(Number(e.target.value));
                  handleParamChange();
                }}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>10% (Low Margin)</span>
                <span>35% (Industry Standard)</span>
                <span>60% (High-End Luxury)</span>
              </div>
            </div>
          </div>

          {/* Right Column: Live Price Summary & Printable Quote Sheet */}
          <div className="lg:col-span-5 space-y-5">
            {/* Live Pricing Summary Card */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="text-[11px] uppercase tracking-wider text-pink-300 font-bold mb-1">
                Calculated Client Quote
              </div>
              <div className="flex items-baseline gap-2">
                <div className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                  ${finalTotalPrice}
                </div>
                <div className="text-xs text-slate-300 font-medium">
                  (${finalPricePerSlice} / slice)
                </div>
              </div>

              {/* Cost Stack Table */}
              <div className="mt-6 space-y-2 text-xs border-t border-white/10 pt-4">
                <div className="flex justify-between text-slate-300">
                  <span>Raw Baking Supplies:</span>
                  <span className="font-bold text-white">${rawIngredientsTotal}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Labor ({totalLaborHours} hrs @ ${hourlyRate}/hr):</span>
                  <span className="font-bold text-white">${laborTotal}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Overhead & Drums:</span>
                  <span className="font-bold text-white">${overheadAndPackaging}</span>
                </div>
                {includeDelivery && (
                  <div className="flex justify-between text-slate-300">
                    <span>Delivery & Setup ({deliveryMiles} mi):</span>
                    <span className="font-bold text-white">${deliveryTotal}</span>
                  </div>
                )}
                <div className="flex justify-between text-emerald-400 font-semibold pt-1 border-t border-white/5">
                  <span>Project Profit Margin ({profitMargin}%):</span>
                  <span>+${Math.round(finalTotalPrice - netProductionCost)}</span>
                </div>
                {isPremiumActive && (
                  <div className="flex justify-between text-purple-300 font-semibold">
                    <span>Premium Flavor Upcharge (+{premiumPercent}%):</span>
                    <span>+${Math.round(premiumUpchargeAmount)}</span>
                  </div>
                )}
              </div>

              {/* Payment Schedule Recommendation */}
              <div className="mt-5 p-3 rounded-xl bg-white/10 backdrop-blur text-[11px] flex justify-between items-center text-slate-200">
                <div>
                  <span className="font-bold block text-white">50% Retainer Deposit:</span>
                  Due upon contract signing
                </div>
                <div className="text-right font-black text-pink-300 text-sm">
                  ${depositAmount}
                </div>
              </div>

              {/* Quote Actions */}
              <div className="grid grid-cols-2 gap-2.5 mt-5">
                <button
                  onClick={handlePrintQuote}
                  className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-2.5 rounded-xl text-xs transition flex items-center justify-center gap-1.5 active:scale-95 shadow-md"
                >
                  <span>🖨️</span>
                  <span>Print / Save PDF</span>
                </button>
                <button
                  onClick={handleShareQuoteLink}
                  className="w-full bg-white/20 hover:bg-white/30 text-white font-bold py-2.5 rounded-xl text-xs transition flex items-center justify-center gap-1.5 active:scale-95 border border-white/20"
                >
                  <span>{copiedLink ? "✓ Copied!" : "🔗 Share Link"}</span>
                </button>
              </div>
            </div>

            {/* Client Contract Quote Preview Form */}
            <div className="bg-white border border-slate-200/80 rounded-3xl p-5 shadow-sm space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">
                Client Quotation Details (For PDF / Print)
              </h4>
              <div className="space-y-2">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-0.5">
                    Couple's Names
                  </label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg font-medium"
                    placeholder="e.g. Jessica & David"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-0.5">
                      Wedding Date
                    </label>
                    <input
                      type="date"
                      value={weddingDate}
                      onChange={(e) => setWeddingDate(e.target.value)}
                      className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg font-medium"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-0.5">
                      Venue Location
                    </label>
                    <input
                      type="text"
                      value={venueLocation}
                      onChange={(e) => setVenueLocation(e.target.value)}
                      className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg font-medium"
                      placeholder="Venue Name"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-0.5">
                    Special Design Notes
                  </label>
                  <textarea
                    rows={2}
                    value={specialNotes}
                    onChange={(e) => setSpecialNotes(e.target.value)}
                    className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg font-medium resize-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden Printable Invoice/Quote Sheet for window.print() */}
      <div className="hidden print:block fixed inset-0 bg-white p-8 z-[9999] text-slate-900">
        <div className="max-w-2xl mx-auto border border-slate-300 rounded-2xl p-8 space-y-6">
          <div className="flex justify-between items-start border-b border-slate-200 pb-6">
            <div>
              <h1 className="text-2xl font-black tracking-tight text-slate-900">
                The Home Baker's Wedding Cake Studio
              </h1>
              <p className="text-xs text-slate-500 mt-1">Artisan Tiered Wedding Cakes & Confections</p>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold px-3 py-1 bg-pink-50 text-pink-700 rounded-full border border-pink-200">
                OFFICIAL PRICE QUOTE
              </span>
              <p className="text-xs text-slate-400 mt-1">Ref: {currentQuote.id}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="font-bold text-slate-500 uppercase text-[10px] block">Client / Couple</span>
              <p className="font-bold text-base text-slate-900">{clientName}</p>
              <p className="text-slate-600 mt-0.5">Venue: {venueLocation}</p>
            </div>
            <div className="text-right">
              <span className="font-bold text-slate-500 uppercase text-[10px] block">Wedding Date</span>
              <p className="font-bold text-base text-slate-900">{weddingDate}</p>
              <p className="text-slate-600 mt-0.5">Issued: {currentQuote.createdAt}</p>
            </div>
          </div>

          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 text-xs space-y-2">
            <div className="flex justify-between font-bold border-b border-slate-200 pb-2">
              <span>Item & Specification</span>
              <span>Amount</span>
            </div>
            <div className="flex justify-between py-1">
              <div>
                <p className="font-bold">{selectedRecipe.name} ({servings} servings)</p>
                <p className="text-[11px] text-slate-500">{currentTierConfig}</p>
              </div>
              <span className="font-bold">${finalTotalPrice - (includeDelivery ? deliveryTotal : 0)}</span>
            </div>
            {includeDelivery && (
              <div className="flex justify-between py-1 border-t border-slate-200/60">
                <div>
                  <p className="font-bold">Venue Delivery & On-Site Stacking</p>
                  <p className="text-[11px] text-slate-500">{deliveryMiles} miles transport + setup</p>
                </div>
                <span className="font-bold">${deliveryTotal}</span>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center text-sm font-black border-t border-slate-200 pt-4">
            <span>Total Contract Value:</span>
            <span className="text-xl text-pink-600">${finalTotalPrice} (${finalPricePerSlice}/slice)</span>
          </div>

          <div className="bg-rose-50/60 border border-rose-100 rounded-xl p-3 text-[11px] text-slate-700 space-y-1">
            <p className="font-bold text-slate-900">Payment Terms:</p>
            <p>• 50% non-refundable retainer (${depositAmount}) required to secure wedding date.</p>
            <p>• Remaining balance of ${balanceAmount} due 14 days prior to delivery.</p>
            {specialNotes && <p className="pt-1 text-slate-600">• Note: {specialNotes}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
