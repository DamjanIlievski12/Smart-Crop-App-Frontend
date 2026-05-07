import { Cloud, CloudRain, Droplets, Thermometer, Wind } from "lucide-react";
import type React from "react";

export interface WeatherCurrent {
  temperature: number;
  humidity: number;
  wind_speed: number;
  clouds_percent: number;
  description: string;
  rain_1h_mm?: number;
}

interface Props {
  weather: WeatherCurrent;
}

export default function FieldDetailsWeatherCard({
  weather,
}: Props): React.ReactElement {
  return (
    <div
      className="bg-white border rounded-xl p-6"
      style={{ borderColor: "var(--color-border)" }}
    >
      <h3 className="text-base font-semibold text-gray-900 mb-4">
        Current Weather
      </h3>

      {/* Main temperature display */}
      <div className="flex flex-col items-center mb-5 py-2">
        <Cloud className="w-14 h-14 text-blue-400 mb-2" />
        <p className="text-5xl font-bold text-gray-900">
          {weather.temperature}°C
        </p>
        <p className="text-sm text-gray-500 mt-1 capitalize">
          {weather.description}
        </p>
      </div>

      {/* Metrics grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col items-center p-3 rounded-xl bg-gray-50">
          <Thermometer className="w-5 h-5 text-red-500 mb-1" />
          <p className="text-sm font-semibold text-gray-900">
            {weather.temperature}°C
          </p>
          <p className="text-xs text-gray-400">Temperature</p>
        </div>
        <div className="flex flex-col items-center p-3 rounded-xl bg-gray-50">
          <Droplets className="w-5 h-5 text-blue-500 mb-1" />
          <p className="text-sm font-semibold text-gray-900">
            {weather.humidity}%
          </p>
          <p className="text-xs text-gray-400">Humidity</p>
        </div>
        <div className="flex flex-col items-center p-3 rounded-xl bg-gray-50">
          <Wind className="w-5 h-5 text-gray-500 mb-1" />
          <p className="text-sm font-semibold text-gray-900">
            {weather.wind_speed} km/h
          </p>
          <p className="text-xs text-gray-400">Wind Speed</p>
        </div>
        <div className="flex flex-col items-center p-3 rounded-xl bg-gray-50">
          <Cloud className="w-5 h-5 text-gray-400 mb-1" />
          <p className="text-sm font-semibold text-gray-900">
            {weather.clouds_percent}%
          </p>
          <p className="text-xs text-gray-400">Cloud Cover</p>
        </div>
      </div>

      {/* Current rainfall alert */}
      {weather.rain_1h_mm !== undefined && weather.rain_1h_mm > 0 && (
        <div className="flex items-center gap-2.5 mt-4 p-3 bg-blue-50 border border-blue-200 rounded-xl">
          <CloudRain className="w-5 h-5 text-blue-600 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-blue-900">Active Rainfall</p>
            <p className="text-xs text-blue-700">
              {weather.rain_1h_mm} mm in the last hour
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
