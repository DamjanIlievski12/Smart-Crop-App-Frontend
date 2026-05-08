import type { LucideIcon } from "lucide-react";

export interface CurrentWeatherMetric {
  label: string;
  value: string;
  level?: string;
  icon: LucideIcon;
}

export interface ForecastDay {
  day: string;
  date: string;
  icon: LucideIcon;
  temp: number;
  humidity: number;
  rainfall?: number;
}

export interface TemperaturePoint {
  time: string;
  temp: number;
}

export interface HumidityPoint {
  day: string;
  humidity: number;
}

export interface RainfallPoint {
  month: string;
  rainfall: number;
}

export type ImpactLevel =
  | "Excellent"
  | "Good"
  | "Moderate"
  | "Poor"
  | "Unknown";

export interface WeatherImpact {
  label: string;
  description: string;
  level: ImpactLevel;
  percent: number;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  barColor: string;
  levelColor: string;
}

export interface WeatherDashboardResponse {
  current?: {
    temperature?: number;
    description?: string;
    lastUpdated?: string;
  };
  currentMetrics?: Array<{
    label: string;
    value: string;
    level?: string;
    iconName?: string;
  }>;
  forecast?: Array<{
    day: string;
    date: string;
    temp: number;
    humidity: number;
    rainfall?: number;
    description?: string;
  }>;
  temperatureData?: Array<{ time: string; temp: number }>;
  humidityData?: Array<{ day: string; humidity: number }>;
  rainfallData?: Array<{ month: string; rainfall: number }>;
  impacts?: Array<{
    label: string;
    description: string;
    level: string;
    percent: number;
    iconName?: string;
    iconBg: string;
    iconColor: string;
    barColor: string;
    levelColor: string;
  }>;
}

// Response shape returned by:
//   GET /weather/by-field/:id
//   GET /weather/by-coords
//   GET /weather/by-location

export interface FieldWeatherCurrent {
  temperature: number;
  feels_like: number;
  humidity: number;
  pressure: number;
  wind_speed: number;
  wind_speed_kmh: number;
  visibility: number;
  description: string;
  icon: string;
  rain_1h_mm?: number;
}

export interface FieldWeatherForecastDay {
  date: string;
  temp_min: number;
  temp_max: number;
  temp_avg: number;
  humidity_avg: number;
  total_rain_mm: number;
  rain_probability: number;
  description: string;
  wind_max?: number;
}

export interface FieldWeatherAlert {
  severity: "low" | "medium" | "high";
  type: string;
  message: string;
}

export interface FieldWeatherLocation {
  found_name: string;
  country: string;
  lat: number;
  lon: number;
}

export interface FieldWeatherResponse {
  location: FieldWeatherLocation;
  current: FieldWeatherCurrent;
  forecast_5_days: FieldWeatherForecastDay[];
  agricultural_alerts: FieldWeatherAlert[];
}
