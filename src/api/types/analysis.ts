export type RecommendationType = "irrigation" | "fertilizer" | "disease";
export type Priority = "High" | "Medium" | "Low";

export interface Recommendation {
  title: string;
  description: string;
  priority: Priority;
  type: RecommendationType;
}

export interface RawCondition {
  label: string;
  value: string;
  color?: string;
}

export interface RawDiseaseRisk {
  name?: string;
  label?: string;
  risk?: number;
  pct?: number;
}

export interface CropAnalysisResponse {
  healthData?: Array<{ value: number }>;
  conditions?: RawCondition[];
  diseaseRisks?: RawDiseaseRisk[];
  disease_risks?: RawDiseaseRisk[];
  recommendations?: Recommendation[];
}
