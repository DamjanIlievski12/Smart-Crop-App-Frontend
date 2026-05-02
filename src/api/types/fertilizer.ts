export interface FertilizerScheduleItem {
  week: string;
  dates: string;
  type: string;
  rate: string;
  status: 'Pending' | 'Scheduled' | 'Completed';
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