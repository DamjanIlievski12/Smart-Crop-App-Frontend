import type React from "react";
import type { Field } from "../../api/types/field";
import { Activity, Eye } from "lucide-react";

interface Props {
  field: Field;
}

export default function FieldDetailsMetrics({
  field,
}: Props): React.ReactElement {
  const healthLabel =
    field.health >= 90
      ? "Excellent condition"
      : field.health >= 80
        ? "Good condition"
        : "Needs attention";

  const healthColor =
    field.health >= 90
      ? "text-green-600"
      : field.health >= 80
        ? "text-yellow-500"
        : "text-orange-500";

  const healthBarColor =
    field.health >= 90
      ? "bg-green-500"
      : field.health >= 80
        ? "bg-yellow-400"
        : "bg-orange-400";

  return (
    <div className="grid md:grid-cols-2 gap-5">
      {/* Health Score */}
      <div
        className="bg-white border rounded-xl p-6"
        style={{ borderColor: "var(--color-border)" }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-green-50 rounded-lg">
            <Activity className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-sm text-gray-500">Health Score</p>
        </div>
        <p className={`text-4xl font-bold mb-1 ${healthColor}`}>
          {field.health}%
        </p>
        <p className="text-xs text-gray-400 mb-3">{healthLabel}</p>
        {/* Health bar */}
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${healthBarColor}`}
            style={{ width: `${field.health}%` }}
          />
        </div>
      </div>

      {/* Last Analysis */}
      <div
        className="bg-white border rounded-xl p-6"
        style={{ borderColor: "var(--color-border)" }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Eye className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-sm text-gray-500">Last Analysis</p>
        </div>
        <p className="text-4xl font-bold text-gray-900 mb-1">
          {field.lastAnalysis}
        </p>
        <p className="text-xs text-gray-400">Regular monitoring active</p>
      </div>
    </div>
  );
}
