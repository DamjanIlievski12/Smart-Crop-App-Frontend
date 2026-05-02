import AppLayout from '../components/layout/AppLayout';
import PageHeader from '../components/ui/PageHeader';
import ReportsStats from '../components/reports/ReportsStats';
import ReportsFilters from '../components/reports/ReportsFilters';
import ReportsTable from '../components/reports/ReportsTable';
import ExportOptionsCard from '../components/reports/ExportOptionsCard';
import { FileText } from 'lucide-react';
import { useReports } from '../hooks/useReports';
import type React from 'react';

export default function ReportsPage(): React.ReactElement {
  const {
    stats,
    filteredReports,
    exportOptions,
    typeBadgeStyles,
    fieldOptions,
    typeOptions,
    dateOptions,
    searchQuery,
    selectedField,
    selectedType,
    selectedDate,
    handleSearchChange,
    handleFieldChange,
    handleTypeChange,
    handleDateChange,
  } = useReports();

  return (
    <AppLayout>
      <PageHeader
        title="Reports & Analytics"
        subtitle="Access and download your crop analysis reports"
        actions={
          <button className="flex items-center gap-2 bg-[#2e5d40] hover:bg-[#264c34] text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors">
            <FileText size={15} /> Generate New Report
          </button>
        }
      />

      <ReportsStats stats={stats} />

      <ReportsFilters
        searchQuery={searchQuery}
        selectedField={selectedField}
        selectedType={selectedType}
        selectedDate={selectedDate}
        fieldOptions={fieldOptions}
        typeOptions={typeOptions}
        dateOptions={dateOptions}
        onSearchChange={handleSearchChange}
        onFieldChange={handleFieldChange}
        onTypeChange={handleTypeChange}
        onDateChange={handleDateChange}
      />

      <ReportsTable reports={filteredReports} typeBadgeStyles={typeBadgeStyles} />

      <ExportOptionsCard options={exportOptions} />
    </AppLayout>
  );
}
