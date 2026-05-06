import axiosInstance from "../axios/axios";
import type { WeatherDashboardResponse } from "./types/weather";

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
