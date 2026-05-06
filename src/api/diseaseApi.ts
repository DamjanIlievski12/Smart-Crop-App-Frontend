import axiosInstance from "../axios/axios";
import type { DiseaseAssessmentResponse } from "./types/disease";

export async function apiAssessDiseaseRisk(
  fieldId: number,
): Promise<DiseaseAssessmentResponse> {
  const { data } = await axiosInstance.post<DiseaseAssessmentResponse>(
    "/diseases/assess",
    { field_id: fieldId },
  );
  return data;
}
