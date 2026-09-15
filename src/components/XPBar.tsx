import { getLevelForXp, getXpProgressPercent } from "../lib/gamification";

interface XPBarProps {
  xp: number;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
}

export function XPBar({ xp, showLabel = true, size = "md" }: XPBarProps) {
  const level = getLevelForXp(xp);
  const progress = getXpProgressPercent(xp);
  const nextLevel = level.maxXp === Infinity ? null : level.maxXp + 1;

  const heights = { sm: "h-2", md: "h-3", lg: "h-4" };

  return (
    <div className="w-full">
      {showLabel && (
        <div className="mb-1.5 flex justify-between text-xs font-semibold text-slate-600">
          <span className="flex items-center gap-1.5">
            <span>⭐</span> Level {level.level} — <span className="text-slate-900">{level.name}</span>
          </span>
          <span className="text-slate-500 font-medium">
            {xp} XP{nextLevel ? ` / ${nextLevel} XP` : " (Max Level Achieved!)"}
          </span>
        </div>
      )}
      <div className={`w-full ${heights[size]} rounded-full bg-slate-200/80 overflow-hidden shadow-inner`}>
        <div
          className="h-full rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 transition-all duration-700"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
