import { useState } from 'react';
import AppLayout from '../components/layout/AppLayout';
import PageHeader from '../components/ui/PageHeader';
import ReportsStats from '../components/reports/ReportsStats';
import ReportsFilters from '../components/reports/ReportsFilters';
import ReportsTable from '../components/reports/ReportsTable';
import ExportOptionsCard from '../components/reports/ExportOptionsCard';
import { FileText, X } from 'lucide-react';
import { useReports } from '../hooks/useReports';
import type React from 'react';

const REPORT_TYPES = ['Crop Analysis', 'Disease Risk', 'Fertilizer', 'Weather Analysis', 'Irrigation'];

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
    isLoading,
    isGenerating,
    fields,
    handleSearchChange,
    handleFieldChange,
    handleTypeChange,
    handleDateChange,
    downloadReport,
    generateReport,
  } = useReports();

  const [showModal, setShowModal] = useState(false);
  const [modalFieldId, setModalFieldId] = useState<number | ''>('');
  const [modalType, setModalType] = useState(REPORT_TYPES[0]!);

  async function handleGenerate() {
    if (modalFieldId === '') return;
    await generateReport(Number(modalFieldId), modalType);
    setShowModal(false);
  }

  return (
    <AppLayout>
      <PageHeader
        title="Reports & Analytics"
        subtitle="Access and download your crop analysis reports"
        actions={
          <button
            onClick={() => {
              setModalFieldId(fields[0]?.id ?? '');
              setShowModal(true);
            }}
            className="flex items-center gap-2 bg-[#2e5d40] hover:bg-[#264c34] text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
          >
            <FileText size={15} /> Generate New Report
          </button>
        }
      />

      {isLoading ? (
        <div className="flex items-center justify-center py-20 text-gray-400 text-sm">
          Loading reports…
        </div>
      ) : (
        <>
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

          <ReportsTable
            reports={filteredReports}
            typeBadgeStyles={typeBadgeStyles}
            onDownload={downloadReport}
          />

          <ExportOptionsCard options={exportOptions} />
        </>
      )}

      {/* Generate Report Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-96 shadow-xl">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-semibold text-gray-900">Generate New Report</h2>
              <button onClick={() => setShowModal(false)} className="p-1 rounded-lg hover:bg-gray-100">
                <X size={18} className="text-gray-500" />
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <label className="text-xs text-gray-500 mb-1.5 block">Field</label>
                <select
                  className="w-full text-sm text-gray-800 border border-gray-200 rounded-xl px-3 py-2.5 outline-none focus:border-[#2e5d40]"
                  value={modalFieldId}
                  onChange={(e) => setModalFieldId(Number(e.target.value))}
                >
                  {fields.map((f) => (
                    <option key={f.id} value={f.id}>{f.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs text-gray-500 mb-1.5 block">Report Type</label>
                <select
                  className="w-full text-sm text-gray-800 border border-gray-200 rounded-xl px-3 py-2.5 outline-none focus:border-[#2e5d40]"
                  value={modalType}
                  onChange={(e) => setModalType(e.target.value)}
                >
                  {REPORT_TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 border border-gray-200 text-gray-700 text-sm font-medium py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleGenerate}
                disabled={isGenerating || modalFieldId === ''}
                className="flex-1 bg-[#2e5d40] hover:bg-[#264c34] text-white text-sm font-medium py-2.5 rounded-xl transition-colors disabled:opacity-50"
              >
                {isGenerating ? 'Generating…' : 'Generate'}
              </button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}