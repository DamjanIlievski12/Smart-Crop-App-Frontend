import { Sun } from 'lucide-react';
import type { CurrentWeatherMetric } from '../../api/types/weather';
import type React from 'react';

interface CurrentWeatherCardProps {
  metrics: CurrentWeatherMetric[];
}

export default function CurrentWeatherCard({ metrics }: CurrentWeatherCardProps): React.ReactElement {
  return (
    <div className="rounded-2xl bg-gradient-to-r from-[#3b82f6] to-[#2563eb] p-6 mb-4 flex gap-6">
      <div className="flex-1 flex flex-col justify-center">
        <p className="text-sm text-white/80 mb-3">Current Weather</p>
        <div className="flex items-center gap-5 mb-5">
          <Sun size={64} className="text-white" strokeWidth={1.5} />
          <div>
            <p className="text-5xl font-bold text-white leading-none">26°C</p>
            <p className="text-base text-white/90 mt-2">Partly Cloudy</p>
          </div>
        </div>
        <p className="text-sm text-white font-medium">Northern Valley, CA</p>
        <p className="text-xs text-white/70 mt-1">Last updated: 2 minutes ago</p>
      </div>

      <div className="grid grid-cols-2 gap-3 flex-1">
        {metrics.map(({ label, value, icon: Icon }) => (
          <div key={label} className="bg-white/15 backdrop-blur-sm rounded-xl p-5 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-1">
              <Icon size={15} className="text-white/90" />
              <p className="text-sm text-white/90">{label}</p>
            </div>
            <p className="text-2xl font-bold text-white">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
