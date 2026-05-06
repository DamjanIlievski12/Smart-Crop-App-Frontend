import { useState, useEffect } from "react";
import type {
  BadgeType,
  DiseaseAlert,
  PreventionRecommendation,
  RiskMetric,
  SeverityLevel,
  TrendDataPoint,
  VulnerabilityFactor,
} from "../api/types/disease";
import { apiGetFields } from "../api/fieldsApi";
import axiosInstance from "../axios/axios";
import { apiAssessDiseaseRisk } from "../api/diseaseApi";

const severityStyles: Record<SeverityLevel, string> = {
  Medium: "bg-orange-100 text-orange-600",
  Low: "bg-yellow-100 text-yellow-600",
  High: "bg-red-100 text-red-600",
};

export interface UseDiseaseRiskReturn {
  riskMetrics: RiskMetric[];
  overallRisk: number | null;
  trendData: TrendDataPoint[];
  vulnerabilityData: VulnerabilityFactor[];
  diseaseAlerts: DiseaseAlert[];
  recommendations: PreventionRecommendation[];
  severityStyles: Record<SeverityLevel, string>;
  getRecommendationBadgeStyle: (type: BadgeType) => string;
  isLoading: boolean;
  error: string | null;
}

export function useDiseaseRisk(): UseDiseaseRiskReturn {
  const [riskMetrics, setRiskMetrics] = useState<RiskMetric[]>([]);
  const [overallRisk, setOverallRisk] = useState<number | null>(null);
  const [trendData, setTrendData] = useState<TrendDataPoint[]>([]);
  const [vulnerabilityData, setVulnerabilityData] = useState<
    VulnerabilityFactor[]
  >([]);
  const [diseaseAlerts, setDiseaseAlerts] = useState<DiseaseAlert[]>([]);
  const [recommendations, setRecommendations] = useState<
    PreventionRecommendation[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      setError(null);
      try {
        const fieldsRes = await apiGetFields();
        const fields = fieldsRes.fields ?? [];
        const firstField = fields[0];
        if (!firstField) {
          setIsLoading(false);
          return;
        }
        // const { data } = await axiosInstance.post("/diseases/assess", {
        //   field_id: firstField.id,
        // });
        const data = await apiAssessDiseaseRisk(firstField.id);

        const metrics: RiskMetric[] = data.riskMetrics ?? [];
        setRiskMetrics(metrics);
        if (metrics.length > 0) {
          setOverallRisk(
            Math.round(
              metrics.reduce((sum, m) => sum + m.value, 0) / metrics.length,
            ),
          );
        }
        setTrendData(data.trendData ?? []);
        setVulnerabilityData(data.vulnerabilityData ?? []);
        setDiseaseAlerts(data.diseaseAlerts ?? []);
        setRecommendations(data.recommendations ?? []);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load disease risk data.",
        );
      } finally {
        setIsLoading(false);
      }
    }
    void load();
  }, []);

  const getRecommendationBadgeStyle = (type: BadgeType): string =>
    type === "Active"
      ? "bg-green-100 text-green-700"
      : "bg-blue-100 text-blue-600";

  return {
    riskMetrics,
    overallRisk,
    trendData,
    vulnerabilityData,
    diseaseAlerts,
    recommendations,
    severityStyles,
    getRecommendationBadgeStyle,
    isLoading,
    error,
  };
}
