import { useState } from "react";
import type { DashboardStats } from "../../api/types/dashboard";
import { AlertTriangle, X } from "lucide-react";

interface Props {
  stats: DashboardStats;
}

export default function DashboardAlertBanner({
  stats,
}: Props): React.ReactElement | null {
  const [dismissed, setDismissed] = useState(false);

  if (stats.activeAlerts === 0 || dismissed) return null;

  return (
    <div className="flex items-center gap-3 bg-orange-50 border border-orange-200 rounded-xl px-4 py-3 text-sm">
      <AlertTriangle className="w-4 h-4 text-orange-500 flex-shrink-0" />
      <p className="text-orange-800 flex-1">
        <span className="font-semibold">
          {stats.activeAlerts} field{stats.activeAlerts > 1 ? "s" : ""}
        </span>{" "}
        {stats.activeAlerts > 1 ? "have" : "has"} medium or high disease risk.
        Review the{" "}
        <a href="/disease-risk" className="underline hover:no-underline">
          Disease Risk
        </a>{" "}
        page for details.
      </p>
      <button
        onClick={() => setDismissed(true)}
        className="p-1 hover:bg-orange-100 rounded transition-colors text-orange-400 hover:text-orange-600"
      >
        <X size={14} />
      </button>
    </div>
  );
}
