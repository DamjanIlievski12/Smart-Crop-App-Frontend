import { useState, useEffect, use, useCallback } from "react";
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
import type { FieldDTO } from "../api/types/field";

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
  fields: FieldDTO[];
  selectedFieldId: number | null;
  setSelectedFieldId: (id: number) => void;
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
  isLoadingFields: boolean;
  isLoadingWeather: boolean;
  hasFields: boolean;
  error: string | null;
}

export function useWeather(): UseWeatherReturn {
  const [fields, setFields] = useState<FieldDTO[]>([]);
  const [selectedFieldId, setSelectedFieldId] = useState<number | null>(null);
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
  const [isLoadingFields, setIsLoadingFields] = useState(true);
  const [isLoadingWeather, setIsLoadingWeather] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadFields() {
      setIsLoadingFields(true);
      try {
        const res = await apiGetFields();
        setFields(res.fields ?? []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load fields.");
      } finally {
        setIsLoadingFields(false);
      }
    }
    void loadFields();
  }, []);

  const fetchWeather = useCallback(
    async (fieldId: number) => {
      const field = fields.find((f) => f.id === fieldId);
      if (!field) return;

      setIsLoadingWeather(true);
      setError(null);
      try {
        setFieldLocation(field.location);
        const data = await apiGetWeatherDashboard(field.location);

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
          (data.forecast ?? []).slice(0, 5).map((f) => ({
            day: f.day,
            date: f.date,
            icon: descriptionToIcon(f.description ?? ""),
            temp: f.temp,
            humidity: f.humidity,
            ...(f.rainfall !== undefined && { rainfall: f.rainfall }),
          })),
        );

        setTemperatureData((data.temperatureData ?? []).slice(0, 5));
        setHumidityData((data.humidityData ?? []).slice(0, 5));
        setRainfallData((data.rainfallData ?? []).slice(0, 5));

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
        setIsLoadingWeather(false);
      }
    },
    [fields],
  );

  useEffect(() => {
    if (selectedFieldId !== null) {
      void fetchWeather(selectedFieldId);
    }
  }, [selectedFieldId, fetchWeather]);

  return {
    fields,
    selectedFieldId,
    setSelectedFieldId,
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
    isLoadingFields,
    isLoadingWeather,
    hasFields: !isLoadingFields && fields.length > 0,
    error,
  };
}
