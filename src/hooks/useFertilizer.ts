import type {
    ApplicationGuideline,
    FertilizerScheduleItem,
    YieldDataPoint,
} from '../api/types/fertilizer';

export interface AiMetric {
    label: string;
    value: string;
}

export interface UseFertilizerReturn {
    schedule: FertilizerScheduleItem[];
    yieldData: YieldDataPoint[];
    guidelines: ApplicationGuideline[];
    aiMetrics: AiMetric[];
}

const schedule: FertilizerScheduleItem[] = [
    { week: 'Week 1', dates: 'March 28 - April 3', type: 'Urea (46-0-0)', rate: '50 kg/acre', status: 'Pending', statusColor: 'bg-orange-100 text-orange-600' },
    { week: 'Week 4', dates: 'April 18 - 24', type: 'NPK (15-15-15)', rate: '40 kg/acre', status: 'Scheduled', statusColor: 'bg-blue-100 text-blue-600' },
    { week: 'Week 8', dates: 'May 16 - 22', type: 'Potash (0-0-60)', rate: '30 kg/acre', status: 'Scheduled', statusColor: 'bg-blue-100 text-blue-600' },
];

const yieldData: YieldDataPoint[] = [
    { stage: 'Current', yield: 95 },
    { stage: 'After Application', yield: 120 },
    { stage: 'Expected Peak', yield: 145 },
];

const guidelines: ApplicationGuideline[] = [
    { title: 'Best Time to Apply', text: 'Early morning or late evening when temperature is below 25°C' },
    { title: 'Application Method', text: 'Broadcast evenly and incorporate into top 2-3 inches of soil' },
    { title: 'Precautions', text: 'Avoid application before heavy rain. Water crops lightly after application' },
    { title: 'Monitoring', text: 'Check soil nutrient levels 2 weeks after each application' },
];

const aiMetrics: AiMetric[] = [
    { label: 'Recommended Type', value: 'NPK 15-15-15' },
    { label: 'Application Rate', value: '120 kg/acre' },
    { label: 'Expected Yield Increase', value: '+25-45%' },
];

export function useFertilizer(): UseFertilizerReturn {
    return {
        schedule,
        yieldData,
        guidelines,
        aiMetrics,
    };
}
