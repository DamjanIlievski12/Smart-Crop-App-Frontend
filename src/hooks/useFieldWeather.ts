import { useCallback, useEffect, useState } from "react";
import { apiGetWeatherByField } from "../api/weatherApi";
import type { FieldWeatherResponse } from "../api/types/weather";

export interface UseFieldWeatherReturn {
  weather: FieldWeatherResponse | null;
  isLoadingWeather: boolean;
  weatherError: string | null;
  refetchWeather: () => void;
}

export function useFieldWeather(fieldId: number): UseFieldWeatherReturn {
  const [weather, setWeather] = useState<FieldWeatherResponse | null>(null);
  const [isLoadingWeather, setIsLoadingWeather] = useState(true);
  const [weatherError, setWeatherError] = useState<string | null>(null);

  const fetchWeather = useCallback(async () => {
    setIsLoadingWeather(true);
    setWeatherError(null);
    try {
      const data = await apiGetWeatherByField(fieldId);
      setWeather(data);
    } catch (err) {
      setWeatherError(
        err instanceof Error ? err.message : "Failed to load weather data.",
      );
    } finally {
      setIsLoadingWeather(false);
    }
  }, [fieldId]);

  useEffect(() => {
    void fetchWeather();
  }, [fetchWeather]);

  return {
    weather,
    isLoadingWeather,
    weatherError,
    refetchWeather: fetchWeather,
  };
}
