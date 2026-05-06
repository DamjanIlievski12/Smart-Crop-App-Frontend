import { Sun } from "lucide-react";
import type { CurrentWeatherMetric } from "../../api/types/weather";
import type React from "react";

interface CurrentWeatherCardProps {
  metrics: CurrentWeatherMetric[];
  temp?: number | null;
  condition?: string | null;
  location?: string | null;
  lastUpdated?: string | null;
}

const levelBadgeClasses: Record<string, string> = {
  low: "bg-blue-100 text-blue-700",
  good: "bg-green-100 text-green-700",
  moderate: "bg-yellow-100 text-yellow-700",
  high: "bg-red-100 text-red-700",
  poor: "bg-red-100 text-red-700",
  excellent: "bg-emerald-100 text-emerald-700",
  unknown: "bg-gray-200 text-gray-700",
};

const knownLevels = new Set(Object.keys(levelBadgeClasses));

function extractMetricDisplay(
  value: string,
  level?: string,
): { valueText: string; levelText: string | null } {
  const explicitLevel = (level ?? "").trim();
  if (explicitLevel && knownLevels.has(explicitLevel.toLowerCase())) {
    return { valueText: value, levelText: explicitLevel };
  }

  const lines = value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length > 1) {
    const maybeLevel = lines[lines.length - 1]!;
    if (knownLevels.has(maybeLevel.toLowerCase())) {
      return { valueText: lines.slice(0, -1).join(" "), levelText: maybeLevel };
    }
  }

  return { valueText: value, levelText: null };
}

export default function CurrentWeatherCard({
  metrics,
  temp,
  condition,
  location,
  lastUpdated,
}: CurrentWeatherCardProps): React.ReactElement {
  return (
    <div className="rounded-2xl bg-gradient-to-r from-[#3b82f6] to-[#2563eb] p-6 mb-4 flex gap-6">
      <div className="flex-1 flex flex-col justify-center">
        <p className="text-sm text-white/80 mb-3">Current Weather</p>
        <div className="flex items-center gap-5 mb-5">
          <Sun size={64} className="text-white" strokeWidth={1.5} />
          <div>
            <p className="text-5xl font-bold text-white leading-none">
              {temp != null ? `${temp}°C` : "—"}
            </p>
            <p className="text-base text-white/90 mt-2">{condition ?? "—"}</p>
          </div>
        </div>
        <p className="text-sm text-white font-medium">{location ?? "—"}</p>
        {lastUpdated && (
          <p className="text-xs text-white/70 mt-1">
            Last updated: {lastUpdated}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3 flex-1">
        {metrics.map(({ label, value, level, icon: Icon }) => {
          const { valueText, levelText } = extractMetricDisplay(value, level);
          const badgeClasses = levelText
            ? (levelBadgeClasses[levelText.toLowerCase()] ??
              levelBadgeClasses.unknown)
            : null;

          return (
            <div
              key={label}
              className="bg-white/15 backdrop-blur-sm rounded-xl p-5 flex flex-col justify-center"
            >
              <div className="flex items-center gap-2 mb-1">
                <Icon size={15} className="text-white/90" />
                <p className="text-sm text-white/90">{label}</p>
              </div>
              <p className="text-2xl font-bold text-white">{valueText}</p>
              {levelText && (
                <span
                  className={`mt-2 inline-flex w-fit items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${badgeClasses}`}
                >
                  {levelText}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
