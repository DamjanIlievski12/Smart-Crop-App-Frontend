import { useState, useEffect, useCallback } from "react";
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
import { apiAssessDiseaseRisk } from "../api/diseaseApi";
import type { FieldDTO } from "../api/types/field";

const severityStyles: Record<SeverityLevel, string> = {
  Medium: "bg-orange-100 text-orange-600",
  Low: "bg-yellow-100 text-yellow-600",
  High: "bg-red-100 text-red-600",
};

export interface UseDiseaseRiskReturn {
  fields: FieldDTO[];
  selectedFieldId: number | null;
  setSelectedFieldId: (id: number) => void;
  riskMetrics: RiskMetric[];
  overallRisk: number | null;
  trendData: TrendDataPoint[];
  vulnerabilityData: VulnerabilityFactor[];
  diseaseAlerts: DiseaseAlert[];
  recommendations: PreventionRecommendation[];
  severityStyles: Record<SeverityLevel, string>;
  getRecommendationBadgeStyle: (type: BadgeType) => string;
  isLoadingFields: boolean;
  isLoadingData: boolean;
  hasFields: boolean;
  error: string | null;
}

export function useDiseaseRisk(): UseDiseaseRiskReturn {
  const [fields, setFields] = useState<FieldDTO[]>([]);
  const [selectedFieldId, setSelectedFieldId] = useState<number | null>(null);
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
  const [isLoadingFields, setIsLoadingFields] = useState(true);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadFields() {
      setIsLoadingFields(true);
      try {
        const res = await apiGetFields();
        setFields(res.fields ?? []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load fields.");
      } finally {
        setIsLoadingFields(false);
      }
    }
    void loadFields();
  }, []);

  const fetchData = useCallback(async (fieldId: number) => {
    setIsLoadingData(true);
    setError(null);
    try {
      const data = await apiAssessDiseaseRisk(fieldId);

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
      setIsLoadingData(false);
    }
  }, []);

  useEffect(() => {
    if (selectedFieldId !== null) {
      void fetchData(selectedFieldId);
    }
  }, [selectedFieldId, fetchData]);

  const getRecommendationBadgeStyle = (type: BadgeType): string =>
    type === "Active"
      ? "bg-green-100 text-green-700"
      : "bg-blue-100 text-blue-600";

  return {
    fields,
    selectedFieldId,
    setSelectedFieldId,
    riskMetrics,
    overallRisk,
    trendData,
    vulnerabilityData,
    diseaseAlerts,
    recommendations,
    severityStyles,
    getRecommendationBadgeStyle,
    isLoadingFields,
    isLoadingData,
    hasFields: !isLoadingFields && fields.length > 0,
    error,
  };
}
