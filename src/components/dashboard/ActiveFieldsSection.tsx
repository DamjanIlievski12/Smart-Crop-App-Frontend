import type React from "react";
import type { Field } from "../../api/types/field";
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";

const RISK_BADGE: Record<string, string> = {
  Low: "bg-green-100 text-green-700",
  Medium: "bg-yellow-100 text-yellow-700",
  High: "bg-red-100 text-red-700",
  NotAssessed: "bg-gray-100 text-gray-500",
};

function FieldMiniCard({ field }: { field: Field }): React.ReactElement {
  const healthColor =
    field.health >= 90
      ? "bg-green-500"
      : field.health >= 70
        ? "bg-yellow-400"
        : "bg-orange-400";

  return (
    <Link
      to={`/fields/${field.id}`}
      className="block p-4 border border-gray-100 rounded-xl hover:border-[#2e5d40]/30 hover:shadow-sm transition-all group"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="w-9 h-9 rounded-lg bg-[#2e5d40]/8 flex items-center justify-center flex-shrink-0">
          <MapPin className="w-4 h-4 text-[#2e5d40]" />
        </div>
        <span
          className={`text-xs px-2 py-0.5 rounded-full font-medium ${RISK_BADGE[field.risk] ?? RISK_BADGE["NotAssessed"]}`}
        >
          {field.risk === "NotAssessed" ? "N/A" : `${field.risk} Risk`}
        </span>
      </div>

      <h3 className="font-semibold text-gray-900 text-sm mb-0.5 group-hover:text-[#2e5d40] transition-colors">
        {field.name}
      </h3>
      <p className="text-xs text-gray-400 mb-3">
        {field.crop} · {field._raw.size}
      </p>

      <div>
        <div className="flex justify-between text-xs mb-1">
          <span className="text-gray-400">Health</span>
          <span className="font-medium text-gray-700">{field.health}%</span>
        </div>
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full ${healthColor}`}
            style={{ width: `${field.health}%` }}
          />
        </div>
      </div>
    </Link>
  );
}

function SkeletonCard(): React.ReactElement {
  return (
    <div className="p-4 border border-gray-100 rounded-xl animate-pulse">
      <div className="flex justify-between mb-3">
        <div className="w-9 h-9 rounded-lg bg-gray-100" />
        <div className="w-16 h-5 bg-gray-100 rounded-full" />
      </div>
      <div className="h-4 w-2/3 bg-gray-100 rounded mb-1.5" />
      <div className="h-3 w-1/2 bg-gray-100 rounded mb-3" />
      <div className="h-1.5 bg-gray-100 rounded-full" />
    </div>
  );
}

interface Props {
  fields: Field[];
  isLoading: boolean;
}

export default function ActiveFieldsSection({
  fields,
  isLoading,
}: Props): React.ReactElement {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-gray-900">Active Fields</h2>
        <Link
          to="/fields"
          className="text-sm text-[#2e5d40] hover:text-[#245033] font-medium transition-colors"
        >
          View all →
        </Link>
      </div>

      {isLoading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[0, 1, 2].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : fields.length === 0 ? (
        <p className="text-sm text-gray-400 py-4 text-center">No fields yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {fields.map((f) => (
            <FieldMiniCard key={f.id} field={f} />
          ))}
        </div>
      )}
    </div>
  );
}
