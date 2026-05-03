import type { StatCard } from "../../api/types/ui";
import type React from "react";

interface Props {
  stats: StatCard[];
}

export default function FieldsStatsBar({ stats }: Props): React.ReactElement {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map(({ label, value, color }) => (
        <div
          key={label}
          className="bg-white border rounded-xl p-5"
          style={{ borderColor: "var(--color-border)" }}
        >
          <p className="text-xs text-gray-500 mb-1">{label}</p>
          <p className={`text-3xl font-bold ${color}`}>{value}</p>
        </div>
      ))}
    </div>
  );
}
