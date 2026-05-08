import {
  AlertTriangle,
  Cloud,
  CloudRain,
  Droplets,
  Eye,
  Gauge,
  Loader2,
  RefreshCw,
  Thermometer,
  Wind,
} from "lucide-react";
import type React from "react";
import type {
  FieldWeatherAlert,
  FieldWeatherForecastDay,
  FieldWeatherResponse,
} from "../../api/types/weather";
import { shortDate, shortDay } from "./utils/fieldDetailsHelpers";

const ALERT_STYLES: Record<
  FieldWeatherAlert["severity"],
  { wrapper: string; icon: string; title: string; text: string }
> = {
  high: {
    wrapper: "bg-red-50 border-red-200",
    icon: "text-red-600",
    title: "text-red-900",
    text: "text-red-700",
  },
  medium: {
    wrapper: "bg-yellow-50 border-yellow-200",
    icon: "text-yellow-600",
    title: "text-yellow-900",
    text: "text-yellow-700",
  },
  low: {
    wrapper: "bg-blue-50 border-blue-200",
    icon: "text-blue-600",
    title: "text-blue-900",
    text: "text-blue-700",
  },
};

function CurrentWeatherPanel({
  current,
  locationName,
}: {
  current: FieldWeatherResponse["current"];
  locationName: string;
}) {
  return (
    <div className="flex flex-col items-center py-3 mb-5">
      <Cloud className="w-14 h-14 text-blue-400 mb-2" />
      <p className="text-4xl font-bold text-gray-900">
        {current.temperature}°C
      </p>
      <p className="text-sm text-gray-500 mt-1 capitalize">
        {current.description}
      </p>
      <p className="text-xs text-gray-400 mt-0.5">{locationName}</p>
    </div>
  );
}

function MetricsGrid({
  current,
}: {
  current: FieldWeatherResponse["current"];
}) {
  const metrics = [
    {
      Icon: Thermometer,
      color: "text-red-500",
      value: `${current.feels_like}°C`,
      label: "Feels Like",
    },
    {
      Icon: Droplets,
      color: "text-blue-500",
      value: `${current.humidity}%`,
      label: "Humidity",
    },
    {
      Icon: Wind,
      color: "text-gray-500",
      value: `${current.wind_speed_kmh} km/h`,
      label: "Wind",
    },
    {
      Icon: Eye,
      color: "text-indigo-400",
      value: `${current.visibility} km`,
      label: "Visibility",
    },
    {
      Icon: Gauge,
      color: "text-orange-400",
      value: `${current.pressure} mb`,
      label: "Pressure",
    },
    ...(current.rain_1h_mm != null && current.rain_1h_mm > 0
      ? [
          {
            Icon: CloudRain,
            color: "text-blue-600",
            value: `${current.rain_1h_mm} mm`,
            label: "Rain/hr",
          },
        ]
      : []),
  ];

  return (
    <div className="grid grid-cols-3 gap-2.5 mb-5">
      {metrics.map(({ Icon, color, value, label }) => (
        <div
          key={label}
          className="flex flex-col items-center p-2.5 rounded-xl bg-gray-50"
        >
          <Icon className={`w-4 h-4 mb-1 ${color}`} />
          <p className="text-sm font-semibold text-gray-900 tabular-nums">
            {value}
          </p>
          <p className="text-xs text-gray-400">{label}</p>
        </div>
      ))}
    </div>
  );
}

function ForecastStrip({ days }: { days: FieldWeatherForecastDay[] }) {
  if (!days.length) return null;

  const maxRain = Math.max(...days.map((d) => d.total_rain_mm ?? 0), 1);

  return (
    <div
      className="border-t pt-4 mb-5"
      style={{ borderColor: "var(--color-border)" }}
    >
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
        5-Day Forecast
      </p>
      <div className="space-y-2">
        {days.slice(0, 5).map((day) => (
          <div key={day.date} className="flex items-center gap-3 text-sm">
            <div className="w-8 text-xs font-semibold text-gray-500">
              {shortDay(day.date)}
            </div>
            <div className="w-12 text-xs text-gray-400">
              {shortDate(day.date)}
            </div>
            <div className="flex-1 flex items-center gap-1">
              <span className="text-blue-500 font-medium tabular-nums">
                {Math.round(day.temp_min)}°
              </span>
              <div className="flex-1 h-1.5 bg-gradient-to-r from-blue-300 to-orange-400 rounded-full" />
              <span className="text-orange-500 font-medium tabular-nums">
                {Math.round(day.temp_max)}°
              </span>
            </div>
            <div className="flex items-center gap-1 w-16">
              <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-400 rounded-full"
                  style={{
                    width: `${Math.min(
                      100,
                      ((day.total_rain_mm ?? 0) / maxRain) * 100,
                    )}%`,
                  }}
                />
              </div>
              <span className="text-xs text-gray-400 tabular-nums w-7 text-right">
                {day.rain_probability}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AlertsList({ alerts }: { alerts: FieldWeatherAlert[] }) {
  if (!alerts.length) return null;

  return (
    <div
      className="border-t pt-4"
      style={{ borderColor: "var(--color-border)" }}
    >
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
        Agricultural Alerts
      </p>
      <div className="space-y-2">
        {alerts.map((alert, i) => {
          const s = ALERT_STYLES[alert.severity] ?? ALERT_STYLES.low;
          return (
            <div
              key={i}
              className={`flex items-start gap-2.5 p-3 rounded-xl border ${s.wrapper}`}
            >
              <AlertTriangle
                className={`w-4 h-4 mt-0.5 flex-shrink-0 ${s.icon}`}
              />
              <div>
                <p className={`text-xs font-semibold capitalize ${s.title}`}>
                  {alert.type.replace(/_/g, " ")}
                </p>
                <p className={`text-xs mt-0.5 ${s.text}`}>{alert.message}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface Props {
  weather: FieldWeatherResponse | null;
  isLoading: boolean;
  error: string | null;
  onRetry: () => void;
}

export default function FieldDetailsWeatherCard({
  weather,
  isLoading,
  error,
  onRetry,
}: Props): React.ReactElement {
  return (
    <div
      className="bg-white border rounded-xl p-6"
      style={{ borderColor: "var(--color-border)" }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-gray-900 mb-4">
          Current Weather
        </h3>
        <button
          onClick={onRetry}
          disabled={isLoading}
          className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600 disabled:opacity-40"
          aria-label="Refresh weather"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
        </button>
      </div>

      {isLoading && (
        <div className="flex flex-col items-center justify-center py-12 gap-3 text-gray-400">
          <Loader2 className="w-7 h-7 animate-spin" />
          <p className="text-sm">Fetching weather…</p>
        </div>
      )}

      {!isLoading && error && (
        <div className="flex flex-col items-center justify-center py-12 gap-3 text-red-400">
          <AlertTriangle className="w-7 h-7" />
          <p className="text-sm text-center">{error}</p>
          <button
            onClick={onRetry}
            className="text-xs underline hover:no-underline"
            style={{ color: "var(--color-primary)" }}
          >
            Try again
          </button>
        </div>
      )}

      {!isLoading && !error && weather && (
        <>
          <CurrentWeatherPanel
            current={weather.current}
            locationName={weather.location.found_name}
          />
          <MetricsGrid current={weather.current} />
          <ForecastStrip days={weather.forecast_5_days} />
          <AlertsList alerts={weather.agricultural_alerts} />
        </>
      )}

      {!isLoading && !error && !weather && (
        <div className="flex flex-col items-center justify-center py-12 gap-2 text-gray-400">
          <Cloud className="w-8 h-8" />
          <p className="text-sm">No weather data available.</p>
        </div>
      )}
    </div>
  );
}
