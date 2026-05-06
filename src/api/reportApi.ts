import axiosInstance from "../axios/axios";
import { mapRawToReportRow } from "../components/reports/utils/reportHelpers";
import type {
  GenerateReportForExportResponse,
  RawReportRow,
  ReportRow,
  ReportsListResponse,
} from "./types/report";

export async function apiGetReports(): Promise<ReportRow[]> {
  const { data } = await axiosInstance.get<
    ReportsListResponse | RawReportRow[]
  >("/reports");
  const raw: RawReportRow[] = Array.isArray(data)
    ? data
    : ((data as ReportsListResponse).reports ?? []);
  return raw.map(mapRawToReportRow);
}

export async function apiGenerateReport(
  fieldId: number,
  reportType: string,
): Promise<void> {
  await axiosInstance.post("/reports/generate", {
    field_id: fieldId,
    report_type: reportType,
  });
}

export async function apiDownloadReportPdf(id: number): Promise<Blob> {
  const { data } = await axiosInstance.get<Blob>(
    `/reports/${id}/download/pdf`,
    { responseType: "blob" },
  );
  return data;
}

export async function apiExportReportsCsv(): Promise<Blob> {
  const { data } = await axiosInstance.get<Blob>("/reports/export/csv", {
    responseType: "blob",
  });
  return data;
}

export async function apiGenerateReportForExport(
  fieldId: number,
  reportType: string,
): Promise<GenerateReportForExportResponse> {
  const { data } = await axiosInstance.post<GenerateReportForExportResponse>(
    "/reports/generate",
    { field_id: fieldId, report_type: reportType },
  );
  return data;
}
