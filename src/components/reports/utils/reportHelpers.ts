import type {
  RawReportRow,
  ReportRow,
  ReportType,
} from "../../../api/types/report";

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

export function mapRawToReportRow(r: RawReportRow): ReportRow {
  return {
    id: r.id ?? 0,
    name: r.name ?? r.title ?? "Report",
    field: r.field ?? "-",
    type: normalizeType(r.type ?? r.report_type ?? "Crop Analysis"),
    date: r.date ?? r.created_at ?? "-",
    size: r.size ?? (r.file_size != null ? `${r.file_size} MB` : "-"),
    status: (r.status as ReportRow["status"]) ?? "Completed",
  };
}
