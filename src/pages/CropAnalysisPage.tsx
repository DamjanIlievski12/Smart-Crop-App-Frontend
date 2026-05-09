import AppLayout from "../components/layout/AppLayout";
import type React from "react";
import { useCropAnalysis } from "../hooks/useCropAnalysis";
import FieldSelectorBar from "../components/crop-analysis/FieldSelectorBar";
import HealthScoreCard from "../components/crop-analysis/HealthScoreCard";
import CurrentConditionsCard from "../components/crop-analysis/CurrentConditionsCard";
import DiseaseRiskCard from "../components/crop-analysis/DiseaseRiskCard";
import AIRecommendationsPanel from "../components/crop-analysis/AIRecommendationsPanel";
import NoFieldsPrompt from "../components/shared/NoFieldsPrompt";
import FieldSelectorPrompt from "../components/shared/FieldSelectorPrompt";
import { useAnalysisResults } from "../context/analysis/analysisResultsContexts";

export default function CropAnalysisPage(): React.ReactElement {
  const {
    fields,
    selectedFieldId,
    selectedField,
    analysis,
    isLoading,
    isLoadingFields,
    hasFields,
    error,
    setSelectedFieldId,
    refresh,
  } = useCropAnalysis();

  const { results: analysisResults } = useAnalysisResults();
  const cachedResult = selectedFieldId
    ? analysisResults[selectedFieldId]
    : null;

  const header = (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
        Crop Analysis
      </h1>
      <p className="text-sm text-gray-500 mt-1">
        Detailed analysis and AI-powered recommendations for your crops
      </p>
    </div>
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
        <NoFieldsPrompt message="Add a field first to run AI-powered crop analysis and get personalized recommendations." />
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
          message="Select a field to run crop analysis and view AI-powered recommendations."
        />
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      {header}

      {/* ── Field Selector ── */}
      <FieldSelectorBar
        fields={fields}
        selectedFieldId={selectedFieldId}
        selectedField={selectedField}
        onSelect={setSelectedFieldId}
      />

      {/* Loading */}
      {isLoading && (
        <div className="flex items-center justify-center py-20 text-gray-400 text-sm">
          Running analysis…
        </div>
      )}

      {/* Error */}
      {error && !isLoading && (
        <div className="flex items-center justify-center py-10 text-red-500 text-sm">
          {error}
        </div>
      )}

      {/* Analysis Results */}
      {analysis && !isLoading && (
        <>
          {/* Row: Health Score + Conditions + Disease Risk */}
          <div className="flex gap-4 mb-4">
            <HealthScoreCard
              healthScore={analysis.healthScore}
              healthLabel={analysis.healthLabel}
            />
            <CurrentConditionsCard conditions={analysis.conditions} />
            <DiseaseRiskCard diseaseRisks={analysis.diseaseRisks} />
          </div>

          {/* AI Recommendations */}
          <AIRecommendationsPanel
            recommendations={analysis.recommendations}
            onRefresh={refresh}
            isRefreshing={isLoading}
            lastUpdated={cachedResult?.lastAnalyzed ?? null}
          />
        </>
      )}
    </AppLayout>
  );
}
