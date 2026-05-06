export interface FertilizerScheduleItem {
  week: string;
  dates: string;
  type: string;
  rate: string;
  status: "Pending" | "Scheduled" | "Completed";
  statusColor: string;
}

export interface YieldDataPoint {
  stage: string;
  yield: number;
}

export interface ApplicationGuideline {
  title: string;
  text: string;
}

export interface AiMetric {
  label: string;
  value: string;
}

export interface FertilizerRecommendationResponse {
  aiMetrics?: AiMetric[];
  schedule?: FertilizerScheduleItem[];
  yieldData?: YieldDataPoint[];
  yield_data?: YieldDataPoint[];
  guidelines?: ApplicationGuideline[];
}
