import type { Field } from "./field";
import type { ReportRow } from "./report";

export interface DashboardWeatherSummary {
  temperature: number | null;
  humidity: number | null;
  windSpeed: number | null;
  rainfall: number | null;
  description: string | null;
  location: string | null;
}

export interface DashboardStats {
  totalFields: number;
  totalAreaHa: number;
  avgHealth: number;
  activeAlerts: number;
}

export interface UseDashboardReturn {
  fields: Field[];
  recentFields: Field[];
  stats: DashboardStats;
  weather: DashboardWeatherSummary;
  isLoadingFields: boolean;
  isLoadingWeather: boolean;
  errorFields: string | null;
  errorWeather: string | null;
  refresh: () => void;
}
