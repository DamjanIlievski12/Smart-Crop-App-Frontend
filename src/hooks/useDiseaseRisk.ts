import type {
    BadgeType,
    DiseaseAlert,
    PreventionRecommendation,
    RiskMetric,
    SeverityLevel,
    TrendDataPoint,
    VulnerabilityFactor,
} from '../api/types/disease';

export interface UseDiseaseRiskReturn {
    riskMetrics: RiskMetric[];
    trendData: TrendDataPoint[];
    vulnerabilityData: VulnerabilityFactor[];
    diseaseAlerts: DiseaseAlert[];
    recommendations: PreventionRecommendation[];
    severityStyles: Record<SeverityLevel, string>;
    getRecommendationBadgeStyle: (type: BadgeType) => string;
}

const riskMetrics: RiskMetric[] = [
    { label: 'Fungal Risk', value: 15 },
    { label: 'Viral Risk', value: 22 },
    { label: 'Bacterial Risk', value: 12 },
    { label: 'Soil Risk', value: 8 },
];

const trendData: TrendDataPoint[] = [
    { month: 'Jan', risk: 28 },
    { month: 'Feb', risk: 22 },
    { month: 'Mar', risk: 30 },
    { month: 'Apr', risk: 25 },
    { month: 'May', risk: 20 },
    { month: 'Jun', risk: 18 },
];

const vulnerabilityData: VulnerabilityFactor[] = [
    { factor: 'Temperature', value: 65 },
    { factor: 'Humidity', value: 72 },
    { factor: 'Rainfall', value: 48 },
    { factor: 'Soil Moisture', value: 55 },
    { factor: 'Wind', value: 30 },
];

const diseaseAlerts: DiseaseAlert[] = [
    {
        name: 'Early Blight',
        probability: 35,
        severity: 'Medium',
        symptoms: 'Brown spots with concentric rings on leaves',
        prevention: 'Apply fungicide, improve air circulation',
        barColor: '#f97316',
    },
    {
        name: 'Powdery Mildew',
        probability: 20,
        severity: 'Low',
        symptoms: 'White powdery coating on leaves and stems',
        prevention: 'Reduce humidity, apply sulfur-based fungicide',
        barColor: '#eab308',
    },
    {
        name: 'Leaf Spot',
        probability: 15,
        severity: 'Low',
        symptoms: 'Small dark spots on leaves',
        prevention: 'Remove affected leaves, ensure proper spacing',
        barColor: '#eab308',
    },
];

const recommendations: PreventionRecommendation[] = [
    { title: 'Crop Rotation', description: 'Rotate with non-solanaceous crops to break disease cycles', badge: 'Recommended' },
    { title: 'Proper Spacing', description: 'Maintain 18-24 inch spacing for better air circulation', badge: 'Active' },
    { title: 'Mulching', description: 'Apply organic mulch to prevent soil splash', badge: 'Recommended' },
    { title: 'Early Detection', description: 'Regular monitoring and quick removal of infected plants', badge: 'Active' },
];

const severityStyles: Record<SeverityLevel, string> = {
    Medium: 'bg-orange-100 text-orange-600',
    Low: 'bg-yellow-100 text-yellow-600',
    High: 'bg-red-100 text-red-600',
};

export function useDiseaseRisk(): UseDiseaseRiskReturn {
    const getRecommendationBadgeStyle = (type: BadgeType): string =>
        type === 'Active'
            ? 'bg-green-100 text-green-700'
            : 'bg-blue-100 text-blue-600';

    return {
        riskMetrics,
        trendData,
        vulnerabilityData,
        diseaseAlerts,
        recommendations,
        severityStyles,
        getRecommendationBadgeStyle,
    };
}
