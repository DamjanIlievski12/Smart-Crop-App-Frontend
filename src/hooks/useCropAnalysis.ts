import {
  AlertTriangle,
  Droplets,
  ThermometerSun,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import type { Recommendation, RecommendationType } from "../api/types/analysis";
import type { FieldDTO } from "../api/types/field";
import { useEffect, useEffectEvent, useState } from "react";
import { apiGetFields } from "../api/fieldsApi";
import { apiAnalyzeCrop } from "../api/cropAnalysisApi";
import { useLocation } from "react-router-dom";

/* ── Helpers ──────────────────────────────────────────── */

export function colorToStatus(value: number): {
  status: string;
  statusBadge: string;
} {
  if (value >= 80)
    return {
      status: "Optimal",
      statusBadge: "bg-emerald-100 text-emerald-700",
    };
  if (value >= 60)
    return { status: "Good", statusBadge: "bg-green-100 text-green-700" };
  if (value >= 40)
    return { status: "Moderate", statusBadge: "bg-yellow-100 text-yellow-700" };
  return { status: "Low", statusBadge: "bg-blue-100 text-blue-700" };
}

export function riskLevel(pct: number): { level: string; bar: string } {
  if (pct >= 60) return { level: "High", bar: "bg-red-500" };
  if (pct >= 30) return { level: "Medium", bar: "bg-yellow-500" };
  return { level: "Low", bar: "bg-green-500" };
}

export function deriveHealthLabel(score: number): string {
  if (score >= 90) return "Excellent";
  if (score >= 75) return "Good";
  if (score >= 50) return "Moderate";
  return "Poor";
}

/* ── Types ────────────────────────────────────────────── */

export interface CropCondition {
  label: string;
  value: number | string;
  status: string;
  statusBadge: string;
  bg: string;
  iconBg: string;
  Icon: LucideIcon;
  iconColor: string;
}

export interface CropDiseaseRisk {
  label: string;
  level: string;
  pct: number;
  bar: string;
}

export interface AnalysisData {
  healthScore: number;
  healthLabel: string;
  conditions: CropCondition[];
  diseaseRisks: CropDiseaseRisk[];
  recommendations: Recommendation[];
}

/* ── Icon-map ───────────────────────────────────── */

const conditionIconMap: Record<
  string,
  { bg: string; iconBg: string; Icon: LucideIcon; iconColor: string }
> = {
  Temperature: {
    bg: "bg-blue-50",
    iconBg: "bg-blue-500/10",
    Icon: ThermometerSun,
    iconColor: "text-blue-500",
  },
  Humidity: {
    bg: "bg-cyan-50",
    iconBg: "bg-cyan-500/10",
    Icon: Droplets,
    iconColor: "text-cyan-500",
  },
  Rainfall: {
    bg: "bg-indigo-50",
    iconBg: "bg-indigo-500/10",
    Icon: Droplets,
    iconColor: "text-indigo-500",
  },
};

const defaultConditionStyle = {
  bg: "bg-gray-50",
  iconBg: "bg-gray-500/10",
  Icon: ThermometerSun,
  iconColor: "text-gray-500",
};

export const recIconMap: Record<
  RecommendationType,
  {
    Icon: LucideIcon;
    highBg: string;
    highColor: string;
    defaultBg: string;
    defaultColor: string;
  }
> = {
  irrigation: {
    Icon: Droplets,
    highBg: "bg-orange-50",
    highColor: "text-orange-500",
    defaultBg: "bg-blue-50",
    defaultColor: "text-blue-500",
  },
  fertilizer: {
    Icon: TrendingUp,
    highBg: "bg-orange-50",
    highColor: "text-orange-500",
    defaultBg: "bg-blue-50",
    defaultColor: "text-blue-500",
  },
  disease: {
    Icon: AlertTriangle,
    highBg: "bg-orange-50",
    highColor: "text-orange-500",
    defaultBg: "bg-blue-50",
    defaultColor: "text-blue-500",
  },
};

export interface UseCropAnalysisReturn {
  fields: FieldDTO[];
  selectedFieldId: number | null;
  selectedField: FieldDTO | undefined;
  analysis: AnalysisData | null;
  radicalData: Array<{ name: string; value: number; fill: string }>;
  isLoading: boolean;
  isLoadingFields: boolean;
  hasFields: boolean;
  error: string | null;
  setSelectedFieldId: (id: number) => void;
  refresh: () => void;
}

export function useCropAnalysis(): UseCropAnalysisReturn {
  const location = useLocation();
  const incomingFieldId =
    (location.state as { fieldId?: number } | null)?.fieldId ?? null;

  const [fields, setFields] = useState<FieldDTO[]>([]);
  const [selectedFieldId, setSelectedFieldId] = useState<number | null>(
    incomingFieldId,
  );
  const [refreshTick, setRefreshTick] = useState(0);
  const [analysis, setAnalysis] = useState<AnalysisData | null>(null);
  const [isLoading, setIsLoading] = useState(incomingFieldId !== null);
  const [isLoadingFields, setIsLoadingFields] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadFields() {
      setIsLoadingFields(true);
      try {
        const res = await apiGetFields();
        const loaded = res.fields ?? [];
        setFields(loaded);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to lead fields.");
        setIsLoading(false);
      } finally {
        setIsLoadingFields(false);
      }
    }
    void loadFields();
  }, []);

  // Run analysis when field changes or refresh requested
  useEffect(() => {
    if (selectedFieldId === null) return;

    async function analyze() {
      setIsLoading(true);
      setError(null);
      try {
        const data = await apiAnalyzeCrop(selectedFieldId!);

        const healthScore: number = data.healthData?.[0]?.value ?? 0;
        const healthLabel = deriveHealthLabel(healthScore);

        const conditions: CropCondition[] = (data.conditions ?? []).map((c) => {
          const numericValue = parseFloat(String(c.value));
          const style = conditionIconMap[c.label] ?? defaultConditionStyle;
          const { status, statusBadge } = colorToStatus(
            isNaN(numericValue) ? 0 : numericValue,
          );
          return {
            label: c.label,
            value: c.value,
            status,
            statusBadge,
            ...style,
          };
        });

        const diseaseRisks: CropDiseaseRisk[] = (
          data.diseaseRisks ??
          data.disease_risks ??
          []
        ).map((d) => {
          const label = d.name ?? d.label ?? "";
          const pct = d.risk ?? d.pct ?? 0;
          const { level, bar } = riskLevel(pct);
          return { label, pct, level, bar };
        });

        const recommendations: Recommendation[] = data.recommendations ?? [];

        setAnalysis({
          healthScore,
          healthLabel,
          conditions,
          diseaseRisks,
          recommendations,
        });
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to run crop analysis.",
        );
      } finally {
        setIsLoading(false);
      }
    }
    void analyze();
  }, [selectedFieldId, refreshTick]);

  const selectedField = fields.find((f) => f.id === selectedFieldId);
  const radicalData = [
    { name: "Health", value: analysis?.healthScore ?? 0, fill: "#2e5d40" },
  ];

  return {
    fields,
    selectedFieldId,
    selectedField,
    analysis,
    radicalData,
    isLoading,
    isLoadingFields,
    hasFields: !isLoadingFields && fields.length > 0,
    error,
    setSelectedFieldId,
    refresh: () => setRefreshTick((t) => t + 1),
  };
}
