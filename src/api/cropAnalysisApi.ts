import axiosInstance from "../axios/axios";
import type { CropAnalysisResponse } from "./types/analysis";

export async function apiAnalyzeCrop(
  fieldId: number,
): Promise<CropAnalysisResponse> {
  const { data } = await axiosInstance.post<CropAnalysisResponse>(
    "/crop-analysis/analyze",
    { field_id: fieldId },
  );
  return data;
}
