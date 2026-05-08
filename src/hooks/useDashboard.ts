import { useCallback, useEffect, useState } from "react";
import type {
  DashboardStats,
  DashboardWeatherSummary,
  UseDashboardReturn,
} from "../api/types/dashboard";
import type { Field } from "../api/types/field";
import type { ReportRow } from "../api/types/report";
import { apiGetFields } from "../api/fieldsApi";
import { dtoToField } from "../components/dashboard/utils/dashboardHelpers";
import { apiGetWeatherByField } from "../api/weatherApi";
import { apiGetReports } from "../api/reportApi";

export default function useDashboard(): UseDashboardReturn {
  const [fields, setFields] = useState<Field[]>([]);
  const [recentReports, setRecentReports] = useState<ReportRow[]>([]);
  const [weather, setWeather] = useState<DashboardWeatherSummary>({
    temperature: null,
    humidity: null,
    windSpeed: null,
    rainfall: null,
    description: null,
    location: null,
  });

  const [isLoadingFields, setIsLoadingFields] = useState(true);
  const [isLoadingWeather, setIsLoadingWeather] = useState(false);
  const [isLoadingReports, setIsLoadingReports] = useState(true);
  const [errorFields, setErrorFields] = useState<string | null>(null);
  const [errorWeather, setErrorWeather] = useState<string | null>(null);

  const fetchFields = useCallback(async () => {
    setIsLoadingFields(true);
    setErrorFields(null);

    try {
      const res = await apiGetFields();
      const mapped = (res.fields ?? []).map(dtoToField);
      setFields(mapped);
      return mapped;
    } catch (err) {
      setErrorFields(
        err instanceof Error ? err.message : "Failed to load fields.",
      );
      return [];
    } finally {
      setIsLoadingFields(false);
    }
  }, []);

  const fetchWeather = useCallback(async (fieldsList: Field[]) => {
    const firstField = fieldsList[0];
    if (!firstField) return;

    setIsLoadingWeather(true);
    setErrorWeather(null);

    try {
      const data = await apiGetWeatherByField(firstField.id);
      const current = data.current;
      setWeather({
        temperature: current.temperature ?? null,
        humidity: current.humidity ?? null,
        windSpeed: current.wind_speed_kmh ?? null,
        rainfall: current.rain_1h_mm ?? 0,
        description: current.description ?? null,
        location: data.location?.found_name ?? firstField.location,
      });
    } catch (err) {
      setErrorWeather(
        err instanceof Error ? err.message : "Weather unavailable.",
      );
    } finally {
      setIsLoadingWeather(false);
    }
  }, []);

  const fetchReports = useCallback(async () => {
    setIsLoadingReports(true);

    try {
      const rows = await apiGetReports();
      setRecentReports(rows.slice(0, 5));
    } catch {
      // Non-critical - silently fail
    } finally {
      setIsLoadingReports(false);
    }
  }, []);

  const refresh = useCallback(() => {
    void fetchFields().then((f) => fetchWeather(f));
    void fetchReports();
  }, [fetchFields, fetchWeather, fetchReports]);

  useEffect(() => {
    void fetchFields().then((f) => fetchWeather(f));
    void fetchReports();
  }, [fetchFields, fetchWeather, fetchReports]);

  // Computed stats
  const totalAreaHa = fields.reduce((sum, f) => {
    const unit = f._raw.unit ?? "hectares";
    return sum + (unit === "acres" ? f.size * 0.404686 : f.size);
  }, 0);
  const avgHealth = fields.length
    ? Math.round(fields.reduce((s, f) => s + f.health, 0) / fields.length)
    : 0;
  const activeAlerts = fields.filter(
    (f) => f.risk === "High" || f.risk === "Medium",
  ).length;

  const stats: DashboardStats = {
    totalFields: fields.length,
    totalAreaHa: Math.round(totalAreaHa * 10) / 10,
    avgHealth,
    activeAlerts,
  };

  // Most recent 3 fields (by id descending as a proxy)
  const recentFields = [...fields].sort((a, b) => b.id - a.id).slice(0, 3);

  return {
    fields,
    recentFields,
    stats,
    weather,
    recentReports,
    isLoadingFields,
    isLoadingWeather,
    isLoadingReports,
    errorFields,
    errorWeather,
    refresh,
  };
}
