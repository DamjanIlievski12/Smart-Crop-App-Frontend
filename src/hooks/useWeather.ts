import { useState, useEffect } from "react";
import {
  Sun,
  Cloud,
  CloudRain,
  Droplets,
  Wind,
  Eye,
  Gauge,
  Thermometer,
  CloudDrizzle,
  CloudSnow,
  type LucideIcon,
} from "lucide-react";
import type {
  CurrentWeatherMetric,
  ForecastDay,
  TemperaturePoint,
  HumidityPoint,
  RainfallPoint,
  WeatherImpact,
} from "../api/types/weather";
import { apiGetFields } from "../api/fieldsApi";
import { apiGetWeatherDashboard } from "../api/weatherApi";
import toImpactLevel from "../components/weather/utils/weatherHelpers";

const descriptionIconMap: Record<string, LucideIcon> = {
  sunny: Sun,
  clear: Sun,
  cloudy: Cloud,
  overcast: Cloud,
  rain: CloudRain,
  drizzle: CloudDrizzle,
  snow: CloudSnow,
  wind: Wind,
  humid: Droplets,
};

function descriptionToIcon(description: string): LucideIcon {
  const lower = description.toLowerCase();
  for (const [key, icon] of Object.entries(descriptionIconMap)) {
    if (lower.includes(key)) return icon;
  }
  return Sun;
}

const metricIconConfig: Record<string, LucideIcon> = {
  Humidity: Droplets,
  "Wind Speed": Wind,
  Visibility: Eye,
  Pressure: Gauge,
  Wind: Wind,
  Temperature: Thermometer,
};

export interface UseWeatherReturn {
  temp: number | null;
  condition: string | null;
  lastUpdated: string | null;
  fieldLocation: string | null;
  currentMetrics: CurrentWeatherMetric[];
  forecast: ForecastDay[];
  temperatureData: TemperaturePoint[];
  humidityData: HumidityPoint[];
  rainfallData: RainfallPoint[];
  impacts: WeatherImpact[];
  isLoading: boolean;
  error: string | null;
}

export function useWeather(): UseWeatherReturn {
  const [temp, setTemp] = useState<number | null>(null);
  const [condition, setCondition] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [fieldLocation, setFieldLocation] = useState<string | null>(null);
  const [currentMetrics, setCurrentMetrics] = useState<CurrentWeatherMetric[]>(
    [],
  );
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [temperatureData, setTemperatureData] = useState<TemperaturePoint[]>(
    [],
  );
  const [humidityData, setHumidityData] = useState<HumidityPoint[]>([]);
  const [rainfallData, setRainfallData] = useState<RainfallPoint[]>([]);
  const [impacts, setImpacts] = useState<WeatherImpact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      setError(null);
      try {
        const fieldsRes = await apiGetFields();
        const fields = fieldsRes.fields ?? [];
        const firstField = fields[0];
        if (!firstField) {
          setIsLoading(false);
          return;
        }
        setFieldLocation(firstField.location);
        const data = await apiGetWeatherDashboard(firstField.location);

        setTemp(data.current?.temperature ?? null);
        setCondition(data.current?.description ?? null);
        setLastUpdated(data.current?.lastUpdated ?? null);

        setCurrentMetrics(
          (data.currentMetrics ?? []).map((m) => ({
            label: m.label,
            value: m.value,
            ...(m.level !== undefined && { level: m.level }),
            icon:
              metricIconConfig[m.label] ??
              metricIconConfig[m.iconName ?? ""] ??
              Gauge,
          })),
        );

        setForecast(
          (data.forecast ?? []).map((f) => ({
            day: f.day,
            date: f.date,
            icon: descriptionToIcon(f.description ?? ""),
            temp: f.temp,
            humidity: f.humidity,
            ...(f.rainfall !== undefined && { rainfall: f.rainfall }),
          })),
        );

        setTemperatureData(data.temperatureData ?? []);
        setHumidityData(data.humidityData ?? []);
        setRainfallData(data.rainfallData ?? []);

        setImpacts(
          (data.impacts ?? []).map((imp) => ({
            label: imp.label,
            description: imp.description,
            level: toImpactLevel(imp.level),
            percent: imp.percent,
            icon:
              metricIconConfig[imp.label] ??
              metricIconConfig[imp.iconName ?? ""] ??
              Thermometer,
            iconBg: imp.iconBg,
            iconColor: imp.iconColor,
            barColor: imp.barColor,
            levelColor: imp.levelColor,
          })),
        );
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load weather data.",
        );
      } finally {
        setIsLoading(false);
      }
    }
    void load();
  }, []);

  return {
    temp,
    condition,
    lastUpdated,
    fieldLocation,
    currentMetrics,
    forecast,
    temperatureData,
    humidityData,
    rainfallData,
    impacts,
    isLoading,
    error,
  };
}
