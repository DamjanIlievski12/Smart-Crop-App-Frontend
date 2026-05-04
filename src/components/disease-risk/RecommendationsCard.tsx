import { CheckCircle2 } from 'lucide-react';
import type { BadgeType, PreventionRecommendation } from '../../api/types/disease';
import type React from 'react';

interface RecommendationsCardProps {
  recommendations: PreventionRecommendation[];
  getRecommendationBadgeStyle: (type: BadgeType) => string;
}

export default function RecommendationsCard({
  recommendations,
  getRecommendationBadgeStyle,
}: RecommendationsCardProps): React.ReactElement {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5">
      <h2 className="flex items-center gap-2 text-base font-semibold text-gray-900 mb-4">
        <CheckCircle2 size={18} className="text-[#2e5d40]" />
        Prevention Recommendations
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {recommendations.length === 0 && (
          <p className="col-span-2 text-sm text-gray-400 text-center py-6">No recommendations available.</p>
        )}
        {recommendations.map((rec) => (
          <div key={rec.title} className="border border-gray-100 rounded-xl p-4 flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-gray-900 mb-1">{rec.title}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{rec.description}</p>
            </div>
            <div className="flex-shrink-0">
              <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getRecommendationBadgeStyle(rec.badge)}`}>
                {rec.badge}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
