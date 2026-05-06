import type React from "react";
import type { CropCondition } from "../../hooks/useCropAnalysis";

interface Props {
  conditions: CropCondition[];
}

export default function CurrentConditionsCard({
  conditions,
}: Props): React.ReactElement {
  return (
    <div className="flex-1 bg-white rounded-2xl border border-gray-100 p-5">
      <h2 className="text-sm font-semibold text-gray-800 mb-4">
        Current Conditions
      </h2>
      <div className="flex flex-col gap-3">
        {conditions.map(
          ({
            label,
            value,
            status,
            statusBadge,
            bg,
            iconBg,
            Icon,
            iconColor,
          }) => (
            <div
              key={label}
              className={`flex items-center justify-between px-4 py-3 rounded-xl ${bg}`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-lg ${iconBg} flex items-center justify-center`}
                >
                  <Icon size={15} className={iconColor} />
                </div>
                <div>
                  <p className="text-xs text-gray-400">{label}</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {String(value)}
                  </p>
                </div>
              </div>
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusBadge}`}
              >
                {status}
              </span>
            </div>
          ),
        )}
      </div>
    </div>
  );
}
