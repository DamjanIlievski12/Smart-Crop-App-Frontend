import { Download, Sparkles } from 'lucide-react';
import type { AiMetric } from '../../hooks/useFertilizer';
import type React from 'react';

interface AIRecommendationCardProps {
  metrics: AiMetric[];
  onExportPdf?: () => void;
  isExporting?: boolean;
}

export default function AIRecommendationCard({ metrics, onExportPdf, isExporting }: AIRecommendationCardProps): React.ReactElement {
  return (
    <div className="rounded-2xl bg-[#2e5d40] p-6 mb-4">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
            <Sparkles size={18} className="text-white" />
          </div>
          <div>
            <p className="text-base font-semibold text-white">AI Fertilizer Recommendation</p>
            <p className="text-xs text-white/60">Based on soil analysis, crop type, and growth stage</p>
          </div>
        </div>
        <button
          onClick={onExportPdf}
          disabled={!onExportPdf || isExporting}
          className="flex items-center gap-2 bg-white text-gray-800 text-xs font-medium px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Download size={14} /> {isExporting ? 'Exporting…' : 'Export PDF'}
        </button>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {metrics.map((m) => (
          <div key={m.label} className="bg-white/15 rounded-xl p-4">
            <p className="text-xs text-white/70 mb-1">{m.label}</p>
            <p className="text-xl font-bold text-white">{m.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
