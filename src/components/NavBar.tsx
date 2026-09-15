import { Link, useRouterState } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { getGameState, getLevelForXp, getXpProgressPercent } from "../lib/gamification";

const navLinks = [
  { to: "/", label: "🏠 Home" },
  { to: "/receitas", label: "🧁 Receitas" },
  { to: "/gamificacao", label: "🏆 Progresso" },
  { to: "/negocio", label: "💼 Negócio" },
];

export function NavBar() {
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [levelName, setLevelName] = useState("Aprendiz");
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
    <nav className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur shadow-sm">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <span className="text-2xl">🎂</span>
            <span className="bg-gradient-to-r from-pink-500 to-orange-400 bg-clip-text text-transparent hidden sm:block">
              Cake Builder
            </span>
          </Link>

          {/* Nav Links */}
          <div className="flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = routerState.location.pathname === link.to ||
                (link.to !== "/" && routerState.location.pathname.startsWith(link.to));
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`rounded-full px-3 py-1.5 text-sm font-medium transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-pink-500 to-orange-400 text-white shadow"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* XP Badge */}
          <Link
            to="/gamificacao"
            className="flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-1.5 text-white text-xs font-bold shadow hover:opacity-90 transition"
          >
            <span>Nível {level}</span>
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-xs opacity-90">{xp} XP</span>
              <div className="w-16 h-1 bg-white/30 rounded-full mt-0.5">
                <div
                  className="h-full bg-white rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
}
