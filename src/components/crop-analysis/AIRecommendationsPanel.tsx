import type React from "react";
import type { Recommendation } from "../../api/types/analysis";
import { Loader2, Sparkles } from "lucide-react";
import { recIconMap } from "../../hooks/useCropAnalysis";

interface Props {
  recommendations: Recommendation[];
  onRefresh: () => void;
  isRefreshing?: boolean;
}

export default function AIRecommendationsPanel({
  recommendations,
  onRefresh,
  isRefreshing,
}: Props): React.ReactElement {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5">
      <div className="flex items-center justify-between mb-5">
        <h2 className="flex items-center gap-2 text-base font-semibold text-gray-900">
          <Sparkles size={18} className="text-[#2e5d40]" />
          AI-Generated Recommendations
        </h2>
        <button
          className="flex items-center gap-2 bg-[#2e5d40] hover:bg-[#245033] text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors active:scale-[0.98]"
          onClick={onRefresh}
          disabled={isRefreshing}
        >
          {isRefreshing ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <Sparkles size={14} />
          )}
          {isRefreshing ? "Generating…" : "Generate New Analysis"}
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {recommendations.map((rec, idx) => {
          const isHigh = rec.priority === "High";
          const config = recIconMap[rec.type];
          const bg = isHigh ? config.highBg : config.defaultBg;
          const color = isHigh ? config.highColor : config.defaultColor;
          const { Icon } = config;

          return (
            <div
              key={idx}
              className="flex items-start gap-4 border border-gray-100 rounded-xl p-4 hover:border-[#2e5d40]/30 transition-colors"
            >
              <div
                className={`w-9 h-9 rounded-lg ${bg} flex items-center justify-center flex-shrink-0`}
              >
                <Icon size={16} className={color} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3 mb-1">
                  <p className="text-sm font-semibold text-gray-900">
                    {rec.title}
                  </p>
                  <span
                    className={`text-xs font-medium px-2.5 py-0.5 rounded-full flex-shrink-0 ${
                      rec.priority === "High"
                        ? "bg-orange-100 text-orange-600"
                        : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {rec.priority}
                  </span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {rec.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
