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
    <div className="bg-white border border-border rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div
          className={`p-3 rounded-lg flex items-center justify-center ${iconBg}`}
        >
          {icon}
        </div>

        {sub && (
          <span className="text-sm text-muted-foreground capitalize">
            {sub}
          </span>
        )}
      </div>

      <div className="space-y-1">
        <p className="text-3xl font-bold text-foreground">{value}</p>

        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}

function SkeletonCard(): React.ReactElement {
  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-sm animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 rounded-lg bg-muted" />
        <div className="h-4 w-16 rounded bg-muted" />
      </div>

      <div className="space-y-2">
        <div className="h-8 w-20 rounded bg-muted" />
        <div className="h-4 w-24 rounded bg-muted" />
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
    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
      <WeatherCard
        icon={<ThermometerSun className="w-6 h-6 text-orange-600" />}
        iconBg="bg-orange-500/10"
        label="Temperature"
        value={
          hasData && weather.temperature !== null
            ? `${Math.round(weather.temperature)}°C`
            : "—"
        }
        sub={weather.description ?? undefined}
      />
      <WeatherCard
        icon={<Droplets className="w-6 h-6 text-cyan-600" />}
        iconBg="bg-cyan-500/10"
        label="Humidity"
        value={
          hasData && weather.humidity !== null ? `${weather.humidity}%` : "—"
        }
      />
      <WeatherCard
        icon={<Cloud className="w-6 h-6 text-indigo-600" />}
        iconBg="bg-indigo-500/10"
        label="Rainfall (1h)"
        value={
          hasData && weather.rainfall !== null ? `${weather.rainfall} mm` : "—"
        }
      />
      <WeatherCard
        icon={<Wind className="w-6 h-6 text-teal-600" />}
        iconBg="bg-teal-500/10"
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
