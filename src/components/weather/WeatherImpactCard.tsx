import type { WeatherImpact } from '../../api/types/weather';
import type React from 'react';

interface WeatherImpactCardProps {
  impacts: WeatherImpact[];
}

const levelBadgeClasses: Record<WeatherImpact['level'], string> = {
  Excellent: 'bg-emerald-100 text-emerald-700',
  Good: 'bg-green-100 text-green-700',
  Moderate: 'bg-yellow-100 text-yellow-700',
  Poor: 'bg-red-100 text-red-700',
  Unknown: 'bg-gray-100 text-gray-700',
};

export default function WeatherImpactCard({ impacts }: WeatherImpactCardProps): React.ReactElement {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5">
      <h2 className="text-base font-semibold text-gray-900 mb-4">Weather Impact on Crops</h2>
      <div className="grid grid-cols-3 gap-4">
        {impacts.map(({ label, description, level, percent, icon: Icon, iconBg, iconColor, barColor }) => (
          <div key={label} className="border border-gray-100 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${iconBg}`}>
                <Icon size={16} className={iconColor} />
              </div>
              <p className="text-sm font-semibold text-gray-900">{label}</p>
            </div>
            <p className="text-xs text-gray-500 mb-3 leading-relaxed">{description}</p>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${barColor}`} style={{ width: `${percent}%` }} />
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${levelBadgeClasses[level]}`}>{level}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
