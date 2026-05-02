import { Droplets, CloudRain } from 'lucide-react';
import type { ForecastDay } from '../../api/types/weather';
import type React from 'react';

interface ForecastCardProps {
  forecast: ForecastDay[];
}

export default function ForecastCard({ forecast }: ForecastCardProps): React.ReactElement {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-4">
      <h2 className="text-base font-semibold text-gray-900 mb-4">7-Day Forecast</h2>
      <div className="grid grid-cols-7 gap-3">
        {forecast.map(({ day, date, icon: Icon, temp, humidity, rainfall }, idx) => {
          const selected = idx === 0;
          return (
            <div
              key={day}
              className={`rounded-xl p-4 flex flex-col items-center text-center transition-colors ${
                selected ? 'bg-[#2e5d40] text-white' : 'bg-[#ece8e1] text-gray-900'
              }`}
            >
              <p className={`text-sm font-semibold ${selected ? 'text-white' : 'text-gray-900'}`}>{day}</p>
              <p className={`text-xs mb-3 ${selected ? 'text-white/70' : 'text-gray-500'}`}>{date}</p>
              <Icon
                size={32}
                strokeWidth={1.5}
                className={selected ? 'text-white' : 'text-gray-700'}
              />
              <p className={`text-2xl font-bold mt-3 ${selected ? 'text-white' : 'text-gray-900'}`}>{temp}°</p>
              <div className={`flex items-center gap-1 text-xs mt-2 ${selected ? 'text-white/80' : 'text-gray-500'}`}>
                <Droplets size={11} />
                <span>{humidity}%</span>
              </div>
              {rainfall !== undefined && (
                <div className={`flex items-center gap-1 text-xs mt-1 ${selected ? 'text-white/80' : 'text-gray-500'}`}>
                  <CloudRain size={11} />
                  <span>{rainfall}mm</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
