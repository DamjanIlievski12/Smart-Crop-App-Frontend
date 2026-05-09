import AppLayout from "../components/layout/AppLayout";
import PageHeader from "../components/ui/PageHeader";
import OverallRiskCard from "../components/disease-risk/OverallRiskCard";
import RiskTrendChart from "../components/disease-risk/RiskTrendChart";
import VulnerabilityChart from "../components/disease-risk/VulnerabilityChart";
import DiseaseAlertsCard from "../components/disease-risk/DiseaseAlertsCard";
import RecommendationsCard from "../components/disease-risk/RecommendationsCard";
import { useDiseaseRisk } from "../hooks/useDiseaseRisk";
import type React from "react";
import FieldSelectorPrompt from "../components/shared/FieldSelectorPrompt";
import NoFieldsPrompt from "../components/shared/NoFieldsPrompt";

export default function DiseaseRiskPage(): React.ReactElement {
  const {
    fields,
    selectedFieldId,
    setSelectedFieldId,
    riskMetrics,
    overallRisk,
    trendData,
    vulnerabilityData,
    diseaseAlerts,
    recommendations,
    severityStyles,
    getRecommendationBadgeStyle,
    isLoadingFields,
    isLoadingData,
    hasFields,
  } = useDiseaseRisk();

  const header = (
    <PageHeader
      title="Disease Risk Prediction"
      subtitle="AI powered disease detection and prevention recommendations"
    />
  );

  if (isLoadingFields) {
    return (
      <AppLayout>
        {header}
        <div className="flex items-center justify-center py-20 text-gray-400 text-sm">
          Loading fields…
        </div>
      </AppLayout>
    );
  }

  if (!hasFields) {
    return (
      <AppLayout>
        {header}
        <NoFieldsPrompt message="Add a field first to receive AI-powered disease risk predictions and prevention recommendations." />
      </AppLayout>
    );
  }

  if (selectedFieldId === null) {
    return (
      <AppLayout>
        {header}
        <FieldSelectorPrompt
          fields={fields}
          onSelect={setSelectedFieldId}
          message="Select a field to view its disease risk assessment."
        />
      </AppLayout>
    );
  }

  if (isLoadingData) {
    return (
      <AppLayout>
        {header}
        <div className="flex items-center justify-center py-20 text-gray-400 text-sm">
          Loading disease risk data…
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      {header}

      {/* Compact field switcher */}
      <div className="mb-4">
        <FieldSelectorPrompt
          fields={fields}
          selectedFieldId={selectedFieldId}
          onSelect={setSelectedFieldId}
          compact
        />
      </div>

      <OverallRiskCard riskMetrics={riskMetrics} overallRisk={overallRisk} />

      <div className="flex gap-4 mb-4">
        <RiskTrendChart data={trendData} />
        <VulnerabilityChart data={vulnerabilityData} />
      </div>

      <DiseaseAlertsCard
        alerts={diseaseAlerts}
        severityStyles={severityStyles}
      />

      <RecommendationsCard
        recommendations={recommendations}
        getRecommendationBadgeStyle={getRecommendationBadgeStyle}
      />
    </AppLayout>
  );
}
