import { useState, useEffect, useCallback } from "react";
import type {
  ApplicationGuideline,
  FertilizerScheduleItem,
  YieldDataPoint,
} from "../api/types/fertilizer";
import { apiGetFields } from "../api/fieldsApi";
import { apiGetFertilizrRecommendation } from "../api/fertilizerApi";
import {
  apiDownloadReportPdf,
  apiGenerateReportForExport,
} from "../api/reportApi";
import type { FieldDTO } from "../api/types/field";

function triggerDownload(data: Blob, filename: string): void {
  const url = URL.createObjectURL(data);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export interface AiMetric {
  label: string;
  value: string;
}

export interface FertilizerField {
  id: number;
  name: string;
  crop: string;
}

export interface UseFertilizerReturn {
  schedule: FertilizerScheduleItem[];
  yieldData: YieldDataPoint[];
  guidelines: ApplicationGuideline[];
  aiMetrics: AiMetric[];
  fields: FieldDTO[];
  selectedFieldId: number | null;
  setSelectedFieldId: (id: number) => void;
  isLoadingFields: boolean;
  isLoadingData: boolean;
  hasFields: boolean;
  isExporting: boolean;
  error: string | null;
  exportPdf: () => Promise<void>;
}

export function useFertilizer(): UseFertilizerReturn {
  const [fields, setFields] = useState<FieldDTO[]>([]);
  const [selectedFieldId, setSelectedFieldId] = useState<number | null>(null);
  const [schedule, setSchedule] = useState<FertilizerScheduleItem[]>([]);
  const [yieldData, setYieldData] = useState<YieldDataPoint[]>([]);
  const [guidelines, setGuidelines] = useState<ApplicationGuideline[]>([]);
  const [aiMetrics, setAiMetrics] = useState<AiMetric[]>([]);
  const [isLoadingFields, setIsLoadingFields] = useState(true);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
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

  const fetchRecommendation = useCallback(async (fieldId: number) => {
    setIsLoadingData(true);
    setError(null);
    try {
      const data = await apiGetFertilizrRecommendation(fieldId);
      setAiMetrics(data.aiMetrics ?? []);
      setSchedule(data.schedule ?? []);
      setYieldData(data.yieldData ?? data.yield_data ?? []);
      setGuidelines(data.guidelines ?? []);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load fertilizer recommendation.",
      );
    } finally {
      setIsLoadingData(false);
    }
  }, []);

  useEffect(() => {
    if (selectedFieldId !== null) {
      void fetchRecommendation(selectedFieldId);
    }
  }, [selectedFieldId, fetchRecommendation]);

  const exportPdf = useCallback(async () => {
    if (selectedFieldId === null) return;
    setIsExporting(true);
    try {
      const report = await apiGenerateReportForExport(
        selectedFieldId,
        "Fertilizer",
      );
      const reportId = report.id ?? report.report?.id;
      if (!reportId) return;
      const file = await apiDownloadReportPdf(reportId);
      triggerDownload(file as Blob, `fertilizer-report-${selectedFieldId}.pdf`);
    } catch {
      // silently ignore
    } finally {
      setIsExporting(false);
    }
  }, [selectedFieldId]);

  return {
    schedule,
    yieldData,
    guidelines,
    aiMetrics,
    fields,
    selectedFieldId,
    setSelectedFieldId,
    isLoadingFields,
    isLoadingData,
    hasFields: !isLoadingFields && fields.length > 0,
    isExporting,
    error,
    exportPdf,
  };
}
