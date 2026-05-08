import type React from "react";
import { ThermometerSun, Droplets, Cloud, Wind } from "lucide-react";
import type { DashboardWeatherSummary } from "../../api/types/dashboard";

interface Props {
  weather: DashboardWeatherSummary;
  isLoading: boolean;
}

interface WeatherCardProps {
  icon: React.ReactNode;
  iconBg: string;
  label: string;
  value: string;
  sub?: string | undefined;
}

function WeatherCard({
  icon,
  iconBg,
  label,
  value,
  sub,
}: WeatherCardProps): React.ReactElement {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm flex items-center gap-4">
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${iconBg}`}
      >
        {icon}
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-900 leading-tight">
          {value}
        </p>
        <p className="text-sm text-gray-500">{label}</p>
        {sub && (
          <p className="text-xs text-gray-400 mt-0.5 capitalize">{sub}</p>
        )}
      </div>
    </div>
  );
}

function SkeletonCard(): React.ReactElement {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm flex items-center gap-4 animate-pulse">
      <div className="w-12 h-12 rounded-xl bg-gray-100 flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-5 w-16 bg-gray-100 rounded" />
        <div className="h-3 w-24 bg-gray-100 rounded" />
      </div>
    </div>
  );
}

export default function WeatherSummaryCards({
  weather,
  isLoading,
}: Props): React.ReactElement {
  if (isLoading) {
    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[0, 1, 2, 3].map((i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  const hasData = weather.temperature !== null;

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <WeatherCard
        icon={<ThermometerSun className="w-5 h-5 text-orange-600" />}
        iconBg="bg-orange-50"
        label="Temperature"
        value={
          hasData && weather.temperature !== null
            ? `${Math.round(weather.temperature)}°C`
            : "—"
        }
        sub={weather.description ?? undefined}
      />
      <WeatherCard
        icon={<Droplets className="w-5 h-5 text-cyan-600" />}
        iconBg="bg-cyan-50"
        label="Humidity"
        value={
          hasData && weather.humidity !== null ? `${weather.humidity}%` : "—"
        }
      />
      <WeatherCard
        icon={<Cloud className="w-5 h-5 text-indigo-600" />}
        iconBg="bg-indigo-50"
        label="Rainfall (1h)"
        value={
          hasData && weather.rainfall !== null ? `${weather.rainfall} mm` : "—"
        }
      />
      <WeatherCard
        icon={<Wind className="w-5 h-5 text-teal-600" />}
        iconBg="bg-teal-50"
        label="Wind Speed"
        value={
          hasData && weather.windSpeed !== null
            ? `${Math.round(weather.windSpeed)} km/h`
            : "—"
        }
        sub={weather.location ?? undefined}
      />
    </div>
  );
}
