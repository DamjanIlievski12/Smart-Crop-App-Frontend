export type SeverityLevel = "Low" | "Medium" | "High";
export type BadgeType = "Active" | "Recommended";

export interface RiskMetric {
  label: string;
  value: number;
}

export interface TrendDataPoint {
  month: string;
  risk: number;
}

export interface VulnerabilityFactor {
  factor: string;
  value: number;
}

export interface DiseaseAlert {
  name: string;
  probability: number;
  severity: SeverityLevel;
  symptoms: string;
  prevention: string;
  barColor: string;
}

export interface PreventionRecommendation {
  title: string;
  description: string;
  badge: BadgeType;
}

export interface DiseaseAssessmentResponse {
  riskMetrics?: RiskMetric[];
  trendData?: TrendDataPoint[];
  vulnerabilityData?: VulnerabilityFactor[];
  diseaseAlerts?: DiseaseAlert[];
  recommendations?: PreventionRecommendation[];
}
