import { Activity, Cloud, FileText, Plus } from "lucide-react";
import type React from "react";
import { Link } from "react-router-dom";

const ACTIONS = [
  {
    label: "Add Field",
    to: "/fields/new",
    icon: Plus,
    primary: true,
  },
  {
    label: "Analyze Crop",
    to: "/crop-analysis",
    icon: Activity,
    primary: false,
  },
  {
    label: "Check Weather",
    to: "/weather",
    icon: Cloud,
    primary: false,
  },
  {
    label: "Generate Report",
    to: "/reports",
    icon: FileText,
    primary: false,
  },
];

export default function QuickActionsCard(): React.ReactElement {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
      <h2 className="text-base font-semibold text-gray-900 mb-4">
        Quick Actions
      </h2>
      <div className="space-y-2.5">
        {ACTIONS.map(({ label, to, icon: Icon, primary }) => (
          <Link
            key={to}
            to={to}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
              primary
                ? "bg-[#2e5d40] text-white hover:bg-[#245033]"
                : "border border-gray-200 text-gray-700 hover:bg-gray-50"
            }`}
          >
            <Icon size={16} strokeWidth={2} />
          </Link>
        ))}
      </div>
    </div>
  );
}
