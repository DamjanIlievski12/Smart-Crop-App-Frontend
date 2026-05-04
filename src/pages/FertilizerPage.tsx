import AppLayout from '../components/layout/AppLayout';
import PageHeader from '../components/ui/PageHeader';
import FieldSelectorRow from '../components/fertilizer/FieldSelectorRow';
import AIRecommendationCard from '../components/fertilizer/AIRecommendationCard';
import ApplicationScheduleCard from '../components/fertilizer/ApplicationScheduleCard';
import YieldImpactCard from '../components/fertilizer/YieldImpactCard';
import GuidelinesCard from '../components/fertilizer/GuidelinesCard';
import { useFertilizer } from '../hooks/useFertilizer';
import type React from 'react';

export default function FertilizerPage(): React.ReactElement {
  const {
    schedule,
    yieldData,
    guidelines,
    aiMetrics,
    fields,
    selectedFieldId,
    setSelectedFieldId,
    isLoading,
    isExporting,
    exportPdf,
  } = useFertilizer();

  return (
    <AppLayout>
      <PageHeader
        title="Fertilizer Recommendations"
        subtitle="AI-powered fertilizer optimization for maximum crop yield"
      />

      <FieldSelectorRow
        fields={fields}
        selectedFieldId={selectedFieldId}
        onSelect={setSelectedFieldId}
      />

      {isLoading ? (
        <div className="flex items-center justify-center py-20 text-gray-400 text-sm">
          Loading recommendation…
        </div>
      ) : (
        <>
          <AIRecommendationCard metrics={aiMetrics} onExportPdf={exportPdf} isExporting={isExporting} />
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