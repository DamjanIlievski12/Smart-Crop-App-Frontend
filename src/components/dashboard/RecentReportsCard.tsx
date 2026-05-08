import type React from "react";
import type { ReportRow } from "../../api/types/report";
import { CheckCircle2, Clock, FileText, XCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { report } from "node:process";

interface Props {
  reports: ReportRow[];
  isLoading: boolean;
}

const STATUS_CONFIG = {
  Completed: {
    icon: CheckCircle2,
    color: "text-green-600",
    bg: "bg-green-50",
  },
  Processing: {
    icon: Clock,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  Failed: {
    icon: XCircle,
    color: "text-red-500",
    bg: "bg-red-50",
  },
};

const TYPE_COLORS: Record<string, string> = {
  "Crop Analysis": "bg-green-100 text-green-700",
  "Disease Risk": "bg-red-100 text-red-700",
  Fertilizer: "bg-yellow-100 text-yellow-700",
  "Weather Analysis": "bg-blue-100 text-blue-700",
  Irrigation: "bg-cyan-100 text-cyan-700",
};

export default function RecentReportsCard({
  reports,
  isLoading,
}: Props): React.ReactElement {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-gray-900">
          Recent Reports
        </h2>
        <Link
          to="/reports"
          className="text-sm text-[#2e5d40] hover:text-[#245033] font-medium transition-colors"
        >
          View all →
        </Link>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center gap-3 animate-pulse">
              <div className="w-9 h-9 rounded-lg bg-gray-100 flex-shrink-0" />
              <div className="flex-1 space-y-1.5">
                <div className="h-3.5 w-3/4 bg-gray-100 rounded" />
                <div className="h-3 w-1/2 bg-gray-100 rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : reports.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-6 gap-2 text-gray-400">
          <FileText className="w-8 h-8 opacity-40" />
          <p className="text-sm">No reports yet</p>
          <Link
            to="/reports"
            className="text-xs text-[#2e5d40] hover:underline"
          >
            Generate your first report
          </Link>
        </div>
      ) : (
        <div className="space-y-2.5">
          {reports.map((report) => {
            const cfg =
              STATUS_CONFIG[report.status] ?? STATUS_CONFIG.Processing;
            const StatusIcon = cfg.icon;
            return (
              <div
                key={report.id}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${cfg.bg}`}
                >
                  <StatusIcon className={`w-4 h-4 ${cfg.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {report.name}
                  </p>
                  <p className="text-xs text-gray-400 truncate">
                    {report.field} · {report.date}
                  </p>
                </div>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${TYPE_COLORS[report.type] ?? "bg-gray-100 text-gray-600"}`}
                >
                  {report.type}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
