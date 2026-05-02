import AppLayout from '../components/layout/AppLayout';
import PageHeader from '../components/ui/PageHeader';
import OverallRiskCard from '../components/disease-risk/OverallRiskCard';
import RiskTrendChart from '../components/disease-risk/RiskTrendChart';
import VulnerabilityChart from '../components/disease-risk/VulnerabilityChart';
import DiseaseAlertsCard from '../components/disease-risk/DiseaseAlertsCard';
import RecommendationsCard from '../components/disease-risk/RecommendationsCard';
import { useDiseaseRisk } from '../hooks/useDiseaseRisk';
import type React from 'react';

export default function DiseaseRiskPage(): React.ReactElement {
  const {
    riskMetrics,
    trendData,
    vulnerabilityData,
    diseaseAlerts,
    recommendations,
    severityStyles,
    getRecommendationBadgeStyle,
  } = useDiseaseRisk();

  return (
    <AppLayout>
      <PageHeader
        title="Disease Risk Prediction"
        subtitle="AI powered disease detection and prevention recommendations"
      />

      <OverallRiskCard riskMetrics={riskMetrics} />

      <div className="flex gap-4 mb-4">
        <RiskTrendChart data={trendData} />
        <VulnerabilityChart data={vulnerabilityData} />
      </div>

      <DiseaseAlertsCard alerts={diseaseAlerts} severityStyles={severityStyles} />

      <RecommendationsCard
        recommendations={recommendations}
        getRecommendationBadgeStyle={getRecommendationBadgeStyle}
      />
    </AppLayout>
  );
}
