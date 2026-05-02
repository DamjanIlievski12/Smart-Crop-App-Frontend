import type { ReportStat } from '../../api/types/report';
import type React from 'react';

interface ReportsStatsProps {
  stats: ReportStat[];
}

export default function ReportsStats({ stats }: ReportsStatsProps): React.ReactElement {
  return (
    <div className="grid grid-cols-4 gap-4 mb-4">
      {stats.map(({ label, value, change, icon: Icon }) => (
        <div key={label} className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex items-start justify-between mb-4">
            <p className="text-sm text-gray-500">{label}</p>
            <Icon size={16} className="text-[#2e5d40]" />
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-2">{value}</p>
          <p className="text-xs text-green-600 flex items-center gap-1">
            <span className="text-[10px]">▲</span> {change}
          </p>
        </div>
      ))}
    </div>
  );
}
