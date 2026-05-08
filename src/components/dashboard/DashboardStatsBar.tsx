import type React from "react";
import type { DashboardStats } from "../../api/types/dashboard";
import { Activity, AlertTriangle, Layers, MapPin } from "lucide-react";

interface Props {
  stats: DashboardStats;
  isLoading: boolean;
}

interface StatItemProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color: string;
  iconBg: string;
}

function StatItem({
  icon,
  label,
  value,
  color,
  iconBg,
}: StatItemProps): React.ReactElement {
  return (
    <div className="bg-white border border-gray-100 rounded-xl px-5 py-4 shadow-sm flex items-center gap-4">
      <div
        className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${iconBg}`}
      >
        {icon}
      </div>
      <div>
        <p className={`text-xl font-bold leading-tight ${color}`}>{value}</p>
        <p className="text-xs text-gray-500">{label}</p>
      </div>
    </div>
  );
}

export default function DashboardStatsBar({
  stats,
  isLoading,
}: Props): React.ReactElement {
  if (isLoading) {
    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white border border-gray-100 rounded-xl px-5 py-4 shadow-sm animate-pulse flex gap-4 items-center"
          >
            <div className="w-10 h-10 rounded-lg bg-gray-100" />
            <div className="space-y-2">
              <div className="h-5 w-10 bg-gray-100 rounded" />
              <div className="h-3 w-20 bg-gray-100 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatItem
        icon={<MapPin className="w-4.5 h-4.5 text-[#2e5d40]" />}
        iconBg="bg-[#2e5d40]/8"
        label="Total Fields"
        value={stats.totalFields}
        color="text-gray-900"
      />
      <StatItem
        icon={<Layers className="w-4.5 h-4.5 text-blue-600" />}
        iconBg="bg-blue-50"
        label="Total Area"
        value={`${stats.totalAreaHa} ha`}
        color="text-gray-900"
      />
      <StatItem
        icon={<Activity className="w-4.5 h-4.5 text-green-600" />}
        iconBg="bg-green-50"
        label="Avg Health"
        value={`${stats.avgHealth}%`}
        color="text-green-600"
      />
      <StatItem
        icon={<AlertTriangle className="w-4.5 h-4.5 text-orange-500" />}
        iconBg="bg-orange-50"
        label="Active Alerts"
        value={stats.activeAlerts}
        color={stats.activeAlerts > 0 ? "text-orange-500" : "text-gray-900"}
      />
    </div>
  );
}
