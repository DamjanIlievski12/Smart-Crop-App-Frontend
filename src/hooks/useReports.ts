import { BarChart3, FileText, FileType2 } from "lucide-react";
import { useMemo, useState, useEffect, useCallback } from "react";
import type { ChangeEvent } from "react";
import type {
  ExportOption,
  ReportRow,
  ReportStat,
  ReportType,
} from "../api/types/report";
import { apiGetFields } from "../api/fieldsApi";
import type { FieldDTO } from "../api/types/field";
import {
  apiDownloadReportPdf,
  apiExportReportsCsv,
  apiGenerateReport,
  apiGetReports,
} from "../api/reportApi";
import { useNavigate } from "react-router-dom";

const typeBadgeStyles: Record<ReportType, string> = {
  "Crop Analysis": "bg-green-50 text-green-700",
  "Disease Risk": "bg-orange-50 text-orange-600",
  Fertilizer: "bg-amber-50 text-amber-700",
  "Weather Analysis": "bg-blue-50 text-blue-600",
  Irrigation: "bg-cyan-50 text-cyan-700",
};

const typeOptions: string[] = [
  "All Types",
  "Crop Analysis",
  "Disease Risk",
  "Fertilizer",
  "Weather Analysis",
  "Irrigation",
];
const dateOptions: string[] = [
  "Last 30 days",
  "Last 7 days",
  "Last 90 days",
  "This year",
];

function normalizeType(raw: string): ReportType {
  const map: Record<string, ReportType> = {
    crop_analysis: "Crop Analysis",
    "crop analysis": "Crop Analysis",
    disease_risk: "Disease Risk",
    "disease risk": "Disease Risk",
    fertilizer: "Fertilizer",
    weather_analysis: "Weather Analysis",
    "weather analysis": "Weather Analysis",
    irrigation: "Irrigation",
  };
  return map[raw.toLowerCase()] ?? (raw as ReportType);
}

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

export interface UseReportsReturn {
  stats: ReportStat[];
  reports: ReportRow[];
  filteredReports: ReportRow[];
  exportOptions: ExportOption[];
  typeBadgeStyles: Record<ReportType, string>;
  fieldOptions: string[];
  typeOptions: string[];
  dateOptions: string[];
  searchQuery: string;
  selectedField: string;
  selectedType: string;
  selectedDate: string;
  isLoading: boolean;
  isGenerating: boolean;
  error: string | null;
  fields: FieldDTO[];
  handleSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleFieldChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  handleTypeChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  handleDateChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  downloadReport: (id: number, name: string) => Promise<void>;
  generateReport: (fieldId: number, reportType: string) => Promise<void>;
}

export function useReports(): UseReportsReturn {
  const navigate = useNavigate();
  const [reports, setReports] = useState<ReportRow[]>([]);
  const [fields, setFields] = useState<FieldDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedField, setSelectedField] = useState("All Fields");
  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedDate, setSelectedDate] = useState(dateOptions[0]!);

  const fetchReports = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const rows = await apiGetReports();
      setReports(rows);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load reports.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchReports();
    apiGetFields()
      .then((res) => setFields(res.fields ?? []))
      .catch(() => null);
  }, [fetchReports]);

  const downloadReport = useCallback(async (id: number, name: string) => {
    try {
      const data = await apiDownloadReportPdf(id);
      triggerDownload(data as Blob, `${name}.pdf`);
    } catch {
      // silently ignore — user can retry
    }
  }, []);

  const exportCsv = useCallback(async () => {
    try {
      const data = await apiExportReportsCsv();
      triggerDownload(data as Blob, "reports.csv");
    } catch {
      // silently ignore
    }
  }, []);

  const generateReport = useCallback(
    async (fieldId: number, reportType: string) => {
      setIsGenerating(true);
      try {
        await apiGenerateReport(fieldId, reportType);
        await fetchReports();
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to generate report.",
        );
      } finally {
        setIsGenerating(false);
      }
    },
    [fetchReports],
  );

  const fieldOptions = useMemo(
    () => [
      "All Fields",
      ...Array.from(
        new Set(reports.map((r) => r.field).filter((f) => f !== "—")),
      ).sort(),
    ],
    [reports],
  );

  const stats: ReportStat[] = useMemo(
    () => [
      {
        label: "Total Reports",
        value: String(reports.length),
        change: "",
        icon: BarChart3,
      },
      {
        label: "Fields Analyzed",
        value: String(
          new Set(reports.map((r) => r.field).filter((f) => f !== "—")).size,
        ),
        change: "",
        icon: BarChart3,
      },
      {
        label: "Completed",
        value: String(reports.filter((r) => r.status === "Completed").length),
        change: "",
        icon: BarChart3,
      },
      {
        label: "Processing",
        value: String(reports.filter((r) => r.status === "Processing").length),
        change: "",
        icon: BarChart3,
      },
    ],
    [reports],
  );

  const exportOptions: ExportOption[] = useMemo(
    () => [
      {
        title: "Export as CSV",
        description: "Export all reports as CSV for further analysis",
        buttonLabel: "Download CSV",
        primary: false,
        icon: FileType2,
        iconBg: "bg-green-50",
        iconColor: "text-green-600",
        onAction: exportCsv,
      },
      {
        title: "Analytics Dashboard",
        description:
          "View comprehensive analytics and trends across all fields",
        buttonLabel: "View Dashboard",
        primary: false,
        icon: BarChart3,
        iconBg: "bg-blue-50",
        iconColor: "text-blue-600",
        onAction: () => navigate("/dashboard"),
      },
    ],
    [exportCsv, navigate],
  );

  const filteredReports = useMemo(
    () =>
      reports.filter((r) => {
        const matchesSearch =
          searchQuery.trim() === "" ||
          r.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesField =
          selectedField === "All Fields" || r.field === selectedField;
        const matchesType =
          selectedType === "All Types" || r.type === selectedType;
        return matchesSearch && matchesField && matchesType;
      }),
    [reports, searchQuery, selectedField, selectedType],
  );

  return {
    stats,
    reports,
    filteredReports,
    exportOptions,
    typeBadgeStyles,
    fieldOptions,
    typeOptions,
    dateOptions,
    searchQuery,
    selectedField,
    selectedType,
    selectedDate,
    isLoading,
    isGenerating,
    error,
    fields,
    handleSearchChange: (e) => setSearchQuery(e.target.value),
    handleFieldChange: (e) => setSelectedField(e.target.value),
    handleTypeChange: (e) => setSelectedType(e.target.value),
    handleDateChange: (e) => setSelectedDate(e.target.value),
    downloadReport,
    generateReport,
  };
}
