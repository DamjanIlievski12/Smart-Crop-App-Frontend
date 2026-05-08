import axiosInstance from "../axios/axios";
import type {
  FieldWeatherResponse,
  WeatherDashboardResponse,
} from "./types/weather";

export async function apiGetWeatherDashboard(
  location: string,
  country = "MK",
): Promise<WeatherDashboardResponse> {
  const { data } = await axiosInstance.get<WeatherDashboardResponse>(
    "/weather/dashboard",
    { params: { location, country } },
  );
  return data;
}

// Fetch weather for a specific field using its saved lat/lon
export async function apiGetWeatherByField(
  fieldId: number,
): Promise<FieldWeatherResponse> {
  const { data } = await axiosInstance.get<FieldWeatherResponse>(
    `/weather/by-field/${fieldId}`,
  );
  return data;
}
