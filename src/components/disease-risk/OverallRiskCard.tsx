import { TrendingDown, CheckCircle2 } from 'lucide-react';
import type { RiskMetric } from '../../api/types/disease';
import type React from 'react';

interface OverallRiskCardProps {
  riskMetrics: RiskMetric[];
}

export default function OverallRiskCard({ riskMetrics }: OverallRiskCardProps): React.ReactElement {
  return (
    <div className="rounded-2xl p-6 mb-4 bg-gradient-to-r from-[#1ea34c] to-[#2ecc71] flex gap-6">
      {/* Left – overall assessment */}
      <div className="flex-1 flex flex-col justify-center">
        <div className="mb-4">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-white bg-white/20 px-3 py-1 rounded-full">
            <CheckCircle2 size={12} /> Overall Risk Assessment
          </span>
        </div>
        <div className="flex items-end gap-3">
          <span className="text-5xl font-bold text-white">18%</span>
          <span className="flex items-center gap-1 text-sm text-white/80 font-medium mb-1">
            <TrendingDown size={15} /> -5% from last month
          </span>
        </div>
        <p className="text-sm text-white/70 mt-2">
          Low risk level. Your crops are in good health with minimal disease threat.
        </p>
      </div>

      {/* Right – 4 risk metrics */}
      <div className="grid grid-cols-2 gap-3 flex-1">
        {riskMetrics.map(({ label, value }) => (
          <div key={label} className="bg-white/15 backdrop-blur-sm rounded-xl p-5 flex flex-col justify-center">
            <p className="text-sm text-white/80 mb-1">{label}</p>
            <p className="text-3xl font-bold text-white">{value}%</p>
          </div>
        ))}
      </div>
    </div>
  );
}
