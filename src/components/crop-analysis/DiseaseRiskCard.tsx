import type React from "react";
import type { CropDiseaseRisk } from "../../hooks/useCropAnalysis";

interface Props {
  diseaseRisks: CropDiseaseRisk[];
}

export default function DiseaseRiskCard({
  diseaseRisks,
}: Props): React.ReactElement {
  return (
    <div className="flex-1 bg-white rounded-2xl border border-gray-100 p-5">
      <h2 className="text-sm font-semibold text-gray-800 mb-4">Disease Risk</h2>
      <div className="flex flex-col gap-3">
        {diseaseRisks.map(({ label, level, pct, bar }) => (
          <div key={label}>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-500">{label}</span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  level === "High"
                    ? "bg-red-100 text-red-600"
                    : level === "Medium"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-green-100 text-green-600"
                }`}
              >
                {level}
              </span>
            </div>
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full ${bar} rounded-full`}
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
