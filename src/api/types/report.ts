import type { LucideIcon } from 'lucide-react';

export interface ReportStat {
  label: string;
  value: string;
  change: string;
  icon: LucideIcon;
}

export type ReportType =
  | 'Crop Analysis'
  | 'Disease Risk'
  | 'Fertilizer'
  | 'Weather Analysis'
  | 'Irrigation';

export type ReportStatus = 'Completed' | 'Processing' | 'Failed';

export interface ReportRow {
  id?: number;
  name: string;
  field: string;
  type: ReportType;
  date: string;
  size: string;
  status: ReportStatus;
}

export interface ExportOption {
  title: string;
  description: string;
  buttonLabel: string;
  primary: boolean;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  onAction?: () => void;
}
