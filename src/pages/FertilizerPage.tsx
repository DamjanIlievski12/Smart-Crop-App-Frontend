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
  const { schedule, yieldData, guidelines, aiMetrics } = useFertilizer();

  return (
    <AppLayout>
      <PageHeader
        title="Fertilizer Recommendations"
        subtitle="AI-powered fertilizer optimization for maximum crop yield"
      />

      <FieldSelectorRow />
      <AIRecommendationCard metrics={aiMetrics} />
      <ApplicationScheduleCard schedule={schedule} />

      <div className="flex gap-4">
        <YieldImpactCard data={yieldData} />
        <GuidelinesCard guidelines={guidelines} />
      </div>
    </AppLayout>
  );
}
