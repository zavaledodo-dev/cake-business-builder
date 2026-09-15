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
        <div className="mb-1 flex justify-between text-xs font-medium text-gray-600">
          <span>
            ⭐ Nível {level.level} — {level.name}
          </span>
          <span>
            {xp} XP{nextLevel ? ` / ${nextLevel} XP` : " (Máx!)"}
          </span>
        </div>
      )}
      <div className={`w-full ${heights[size]} rounded-full bg-gray-200 overflow-hidden`}>
        <div
          className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-700"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
