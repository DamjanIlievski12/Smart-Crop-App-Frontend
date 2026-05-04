import { MapPin, TrendingUp } from "lucide-react";
import type { Field } from "../../api/types/field";
import type React from "react";
import { Link } from "react-router-dom";

interface Props {
  field: Field;
}

const RISK_CLASSES: Record<string, string> = {
  Low: "bg-green-100 text-green-700",
  Medium: "bg-yellow-100 text-yellow-700",
  High: "bg-red-100 text-red-700",
  NotAssessed: "bg-gray-100 text-gray-500",
};

export default function FieldCard({ field }: Props): React.ReactElement {
  return (
    <div
      className="bg-white border rounded-xl p-5 hover:shadow-md transition-all group"
      style={{ borderColor: "var(--color-border)" }}
    >
      {/* Top row */}
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-11 h-11 rounded-lg flex items-center justify-center"
          style={{ background: "rgba(46,93,64,0.08)" }}
        >
          <MapPin
            className="w-5 h-5"
            style={{ color: "var(--color-primary)" }}
          />
        </div>
        <span
          className={`text-xs px-2.5 py-1 rounded-full font-medium ${RISK_CLASSES[field.risk] ?? RISK_CLASSES['NotAssessed']}`}
        >
          {field.risk === 'NotAssessed' ? 'Not Assessed' : `${field.risk} Risk`}
        </span>
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-0.5">
        {field.name}
      </h3>
      <p className="text-xs text-gray-400 mb-4">{field.location}</p>

      {/* Details grid */}
      <div className="space-y-2 mb-4">
        {(
          [
            { label: "Crop Type", value: field.crop },
            { label: "Field Size", value: field._raw.size },
            { label: "Soil Type", value: field.soilType },
          ] as { label: string; value: string }[]
        ).map(({ label, value }) => (
          <div key={label} className="flex justify-between text-sm">
            <span className="text-gray-400">{label}</span>
            <span className="font-medium text-gray-800">{value}</span>
          </div>
        ))}
      </div>

      {/* Health bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1.5">
          <span className="text-gray-400">Health Score</span>
          <span className="font-medium text-gray-800">{field.health}%</span>
        </div>
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full ${
              field.health >= 90
                ? "bg-green-500"
                : field.health >= 80
                  ? "bg-yellow-400"
                  : "bg-orange-400"
            }`}
            style={{ width: `${field.health}%` }}
          />
        </div>
      </div>

      {/* Last analysis */}
      <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-4">
        <TrendingUp className="w-3.5 h-3.5" />
        <span>Last analysis: {field.lastAnalysis}</span>
      </div>

      {/* Action buttons */}
      <div className="grid grid-cols-2 gap-2">
        <Link
          to="/crop-analysis"
          className="py-2 text-center text-sm font-medium rounded-lg text-white transition-colors"
          style={{ background: "var(--color-primary)" }}
          onMouseOver={(e) =>
            (e.currentTarget.style.background = "var(--color-primary-hover)")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.background = "var(--color-primary)")
          }
        >
          Analyze
        </Link>
        <Link
          to={`/fields/${field.id}`}
          className="py-2 text-center text-sm font-medium rounded-lg border transition-colors hover:bg-gray-50"
          style={{ borderColor: "var(--color-border)" }}
        >
          Details
        </Link>
      </div>
    </div>
  );
}
