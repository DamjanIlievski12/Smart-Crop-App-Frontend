import AppLayout from "../components/layout/AppLayout";
import PageHeader from "../components/ui/PageHeader";
import AIRecommendationCard from "../components/fertilizer/AIRecommendationCard";
import ApplicationScheduleCard from "../components/fertilizer/ApplicationScheduleCard";
import YieldImpactCard from "../components/fertilizer/YieldImpactCard";
import GuidelinesCard from "../components/fertilizer/GuidelinesCard";
import { useFertilizer } from "../hooks/useFertilizer";
import type React from "react";
import NoFieldsPrompt from "../components/shared/NoFieldsPrompt";
import FieldSelectorPrompt from "../components/shared/FieldSelectorPrompt";

export default function FertilizerPage(): React.ReactElement {
  const {
    schedule,
    yieldData,
    guidelines,
    aiMetrics,
    fields,
    selectedFieldId,
    setSelectedFieldId,
    isLoadingFields,
    isLoadingData,
    hasFields,
    isExporting,
    exportPdf,
  } = useFertilizer();

  const header = (
    <PageHeader
      title="Fertilizer Recommendations"
      subtitle="AI-powered fertilizer optimization for maximum crop yield"
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
        <NoFieldsPrompt message="Add a field first to receive AI-powered fertilizer recommendations and application schedules." />
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
          message="Select a field to view its fertilizer recommendation."
        />
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

      {isLoadingData ? (
        <div className="flex items-center justify-center py-20 text-gray-400 text-sm">
          Loading recommendation…
        </div>
      ) : (
        <>
          <AIRecommendationCard
            metrics={aiMetrics}
            onExportPdf={exportPdf}
            isExporting={isExporting}
          />
          <ApplicationScheduleCard schedule={schedule} />
          <div className="flex gap-4">
            <YieldImpactCard data={yieldData} />
            <GuidelinesCard guidelines={guidelines} />
          </div>
        </>
      )}
    </AppLayout>
  );
}
