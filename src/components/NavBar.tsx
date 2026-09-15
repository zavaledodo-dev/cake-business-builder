import { Link, useRouterState } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { getGameState, getLevelForXp, getXpProgressPercent } from "../lib/gamification";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/#recipes", label: "Wedding Recipes" },
  { to: "/#equipment", label: "Equipment Guide" },
  { to: "/#pricing", label: "Pricing Engine" },
];

export function NavBar() {
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [levelName, setLevelName] = useState("Apprentice Baker");
  const [progress, setProgress] = useState(0);
  const routerState = useRouterState();

  useEffect(() => {
    const refresh = () => {
      const state = getGameState();
      const lvl = getLevelForXp(state.xp);
      setXp(state.xp);
      setLevel(lvl.level);
      setLevelName(lvl.name);
      setProgress(getXpProgressPercent(state.xp));
    };
    refresh();
    window.addEventListener("xp-updated", refresh);
    return () => window.removeEventListener("xp-updated", refresh);
  }, [routerState.location.pathname]);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-rose-100 bg-white/95 backdrop-blur shadow-sm">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-black text-lg sm:text-xl tracking-tight">
            <span className="text-2xl">🎂</span>
            <span className="bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 bg-clip-text text-transparent">
              Cake Business Builder
            </span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-1.5">
            {navLinks.map((link) => (
              <a
                key={link.to}
                href={link.to}
                className="rounded-full px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 transition"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* XP & Level Badge */}
          <div className="flex items-center gap-2.5 rounded-full bg-gradient-to-r from-rose-500 to-amber-500 px-3.5 py-1.5 text-white shadow-sm">
            <span className="text-xs font-black uppercase tracking-wider">Lvl {level}</span>
            <div className="flex flex-col items-end">
              <span className="text-[11px] font-bold opacity-95">{xp} XP</span>
              <div className="w-14 sm:w-18 h-1.5 bg-white/30 rounded-full mt-0.5 overflow-hidden">
                <div
                  className="h-full bg-white rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
