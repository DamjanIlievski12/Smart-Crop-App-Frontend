import type { WeatherImpact } from '../../api/types/weather';
import type React from 'react';

interface WeatherImpactCardProps {
  impacts: WeatherImpact[];
}

export default function WeatherImpactCard({ impacts }: WeatherImpactCardProps): React.ReactElement {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5">
      <h2 className="text-base font-semibold text-gray-900 mb-4">Weather Impact on Crops</h2>
      <div className="grid grid-cols-3 gap-4">
        {impacts.map(({ label, description, level, percent, icon: Icon, iconBg, iconColor, barColor, levelColor }) => (
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
              <span className={`text-xs font-medium ${levelColor}`}>{level}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
