import { FileText, Calendar, Download } from 'lucide-react';
import type { ReportRow, ReportType } from '../../api/types/report';
import type React from 'react';

interface ReportsTableProps {
  reports: ReportRow[];
  typeBadgeStyles: Record<ReportType, string>;
  onDownload: (id: number, name: string) => void;
}

export default function ReportsTable({ reports, typeBadgeStyles, onDownload }: ReportsTableProps): React.ReactElement {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 mb-4 overflow-hidden">
      {/* Table header */}
      <div className="grid grid-cols-[2fr_1fr_1fr_1fr_0.7fr_1fr_0.7fr] gap-4 px-5 py-3 bg-gray-50/60 border-b border-gray-100">
        <p className="text-xs font-semibold text-gray-500">Report Name</p>
        <p className="text-xs font-semibold text-gray-500">Field</p>
        <p className="text-xs font-semibold text-gray-500">Type</p>
        <p className="text-xs font-semibold text-gray-500">Date</p>
        <p className="text-xs font-semibold text-gray-500">Size</p>
        <p className="text-xs font-semibold text-gray-500">Status</p>
        <p className="text-xs font-semibold text-gray-500 text-right pr-2">Actions</p>
      </div>

      {/* Empty state */}
      {reports.length === 0 && (
        <div className="px-5 py-12 text-center text-sm text-gray-400">No reports found.</div>
      )}

      {/* Table rows */}
      {reports.map((r) => (
        <div
          key={r.name}
          className="grid grid-cols-[2fr_1fr_1fr_1fr_0.7fr_1fr_0.7fr] gap-4 px-5 py-4 border-b border-gray-100 last:border-b-0 items-center hover:bg-gray-50/40 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
              <FileText size={16} className="text-gray-500" />
            </div>
            <p className="text-sm font-semibold text-gray-900">{r.name}</p>
          </div>
          <p className="text-sm text-gray-600">{r.field}</p>
          <div>
            <span className={`inline-flex text-xs font-medium px-2.5 py-1 rounded-full ${typeBadgeStyles[r.type]}`}>
              {r.type}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-gray-600">
            <Calendar size={13} className="text-gray-400" />
            {r.date}
          </div>
          <p className="text-sm text-gray-500">{r.size}</p>
          <div>
            <span className="inline-flex text-xs font-medium px-2.5 py-1 rounded-full bg-green-50 text-green-700">
              {r.status}
            </span>
          </div>
          <div className="flex justify-end pr-2">
            <button
              className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-40"
              onClick={() => r.id != null && onDownload(r.id, r.name)}
              disabled={r.id == null}
              title={r.id == null ? 'No download available' : 'Download PDF'}
            >
              <Download size={15} className="text-gray-600" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
