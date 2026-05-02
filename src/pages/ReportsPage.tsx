import AppLayout from '../components/layout/AppLayout';
import {
  FileText, BarChart3, Search, Calendar, Download,
  ChevronDown, FileType2,
} from 'lucide-react';
import type {
  ReportStat, ReportRow, ReportType, ExportOption,
} from '../api/types/report';
import type React from 'react';

/* ── Data ─────────────────────────────────────────────── */
const stats: ReportStat[] = [
  { label: 'Total Reports',     value: '24', change: '+6 this month',  icon: BarChart3 },
  { label: 'Fields Analyzed',   value: '6',  change: 'All active',     icon: BarChart3 },
  { label: 'AI Recommendations',value: '18', change: '+4 pending',     icon: BarChart3 },
  { label: 'PDF Downloads',     value: '42', change: '+12 this week',  icon: BarChart3 },
];

const reports: ReportRow[] = [
  { name: 'Wheat Field - March Analysis',           field: 'North Field',     type: 'Crop Analysis',    date: 'Mar 24, 2026', size: '2.4 MB', status: 'Completed' },
  { name: 'Disease Risk Assessment - South Valley', field: 'South Valley',    type: 'Disease Risk',     date: 'Mar 22, 2026', size: '1.8 MB', status: 'Completed' },
  { name: 'Fertilizer Recommendations - All Fields',field: 'Multiple Fields', type: 'Fertilizer',       date: 'Mar 20, 2026', size: '3.2 MB', status: 'Completed' },
  { name: 'Weather Impact Report - Q1 2026',        field: 'All Fields',      type: 'Weather Analysis', date: 'Mar 15, 2026', size: '4.1 MB', status: 'Completed' },
  { name: 'East Garden - Pepper Crop Health',       field: 'East Garden',     type: 'Crop Analysis',    date: 'Mar 10, 2026', size: '2.1 MB', status: 'Completed' },
  { name: 'Irrigation Optimization Report',         field: 'North Field',     type: 'Irrigation',       date: 'Mar 8, 2026',  size: '1.5 MB', status: 'Completed' },
];

const exportOptions: ExportOption[] = [
  {
    title: 'Export as PDF',
    description: 'Download detailed reports in PDF format with charts and analysis',
    buttonLabel: 'Download PDF',
    primary: true,
    icon: FileText,
    iconBg: 'bg-red-50',
    iconColor: 'text-red-500',
  },
  {
    title: 'Export as CSV',
    description: 'Export raw data in CSV format for further analysis',
    buttonLabel: 'Download CSV',
    primary: false,
    icon: FileType2,
    iconBg: 'bg-green-50',
    iconColor: 'text-green-600',
  },
  {
    title: 'Analytics Dashboard',
    description: 'View comprehensive analytics and trends across all fields',
    buttonLabel: 'View Dashboard',
    primary: false,
    icon: BarChart3,
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
];

const typeBadgeStyles: Record<ReportType, string> = {
  'Crop Analysis':    'bg-green-50 text-green-700',
  'Disease Risk':     'bg-orange-50 text-orange-600',
  'Fertilizer':       'bg-amber-50 text-amber-700',
  'Weather Analysis': 'bg-blue-50 text-blue-600',
  'Irrigation':       'bg-cyan-50 text-cyan-700',
};

/* ── Page ──────────────────────────────────────────────── */
export default function ReportsPage(): React.ReactElement {
  return (
    <AppLayout>
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Reports &amp; Analytics</h1>
          <p className="text-sm text-gray-500 mt-1">Access and download your crop analysis reports</p>
        </div>
        <button className="flex items-center gap-2 bg-[#2e5d40] hover:bg-[#264c34] text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors">
          <FileText size={15} /> Generate New Report
        </button>
      </div>

      {/* ── Stat cards ── */}
      <div className="grid grid-cols-4 gap-4 mb-4">
        {stats.map(({ label, value, change, icon: Icon }) => (
          <div key={label} className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="flex items-start justify-between mb-4">
              <p className="text-sm text-gray-500">{label}</p>
              <Icon size={16} className="text-[#2e5d40]" />
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-2">{value}</p>
            <p className="text-xs text-green-600 flex items-center gap-1">
              <span className="text-[10px]">▲</span> {change}
            </p>
          </div>
        ))}
      </div>

      {/* ── Filters bar ── */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-4">
        <div className="grid grid-cols-4 gap-3">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search reports..."
              className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-gray-200 rounded-lg outline-none focus:border-[#2e5d40] focus:ring-2 focus:ring-[#2e5d40]/10 transition-colors placeholder:text-gray-400"
            />
          </div>
          <FilterSelect options={['All Fields', 'North Field', 'South Valley', 'East Garden', 'Multiple Fields']} />
          <FilterSelect options={['All Types', 'Crop Analysis', 'Disease Risk', 'Fertilizer', 'Weather Analysis', 'Irrigation']} />
          <FilterSelect options={['Last 30 days', 'Last 7 days', 'Last 90 days', 'This year']} />
        </div>
      </div>

      {/* ── Reports table ── */}
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
              <button className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
                <Download size={15} className="text-gray-600" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ── Export Options ── */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <h2 className="text-base font-semibold text-gray-900 mb-4">Export Options</h2>
        <div className="grid grid-cols-3 gap-4">
          {exportOptions.map(({ title, description, buttonLabel, primary, icon: Icon, iconBg, iconColor }) => (
            <div key={title} className="border border-gray-100 rounded-xl p-5 flex flex-col">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-3 ${iconBg}`}>
                <Icon size={20} className={iconColor} />
              </div>
              <p className="text-base font-semibold text-gray-900 mb-1">{title}</p>
              <p className="text-xs text-gray-500 leading-relaxed mb-4 flex-1">{description}</p>
              <button
                className={
                  primary
                    ? 'w-full bg-[#2e5d40] hover:bg-[#264c34] text-white text-sm font-medium py-2.5 rounded-lg transition-colors'
                    : 'w-full bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 text-sm font-medium py-2.5 rounded-lg transition-colors'
                }
              >
                {buttonLabel}
              </button>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}

/* ── Helper: styled select ──────────────────────────────── */
function FilterSelect({ options }: { options: string[] }): React.ReactElement {
  return (
    <div className="relative">
      <select
        className="w-full appearance-none pl-4 pr-10 py-2.5 text-sm bg-white border border-gray-200 rounded-lg outline-none focus:border-[#2e5d40] focus:ring-2 focus:ring-[#2e5d40]/10 transition-colors text-gray-700 cursor-pointer"
        defaultValue={options[0]}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      <ChevronDown size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
    </div>
  );
}
