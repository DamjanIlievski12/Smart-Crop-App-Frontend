import axiosInstance from "../axios/axios";
import type { FertilizerRecommendationResponse } from "./types/fertilizer";

export async function apiGetFertilizrRecommendation(
  fieldId: number,
): Promise<FertilizerRecommendationResponse> {
  const { data } = await axiosInstance.post<FertilizerRecommendationResponse>(
    "/fertilizer/recommend",
    { field_id: fieldId },
  );
  return data;
}
