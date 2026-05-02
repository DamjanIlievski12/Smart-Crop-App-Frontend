import { TriangleAlert } from 'lucide-react';
import type { DiseaseAlert, SeverityLevel } from '../../api/types/disease';
import type React from 'react';

interface DiseaseAlertsCardProps {
  alerts: DiseaseAlert[];
  severityStyles: Record<SeverityLevel, string>;
}

export default function DiseaseAlertsCard({ alerts, severityStyles }: DiseaseAlertsCardProps): React.ReactElement {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-4">
      <h2 className="flex items-center gap-2 text-base font-semibold text-gray-900 mb-4">
        <TriangleAlert size={18} className="text-orange-500" />
        Possible Disease Alerts
      </h2>
      <div className="flex flex-col gap-4">
        {alerts.map((disease) => (
          <div key={disease.name} className="border border-gray-100 rounded-xl p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-yellow-50 flex items-center justify-center text-base flex-shrink-0">
                  🌿
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{disease.name}</p>
                  <p className="text-xs text-gray-400">Probability: {disease.probability}%</p>
                </div>
              </div>
              <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${severityStyles[disease.severity]}`}>
                {disease.severity}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-4">
              <div>
                <p className="text-xs text-gray-400 mb-1">Symptoms</p>
                <p className="text-sm text-gray-700">{disease.symptoms}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Prevention</p>
                <p className="text-sm text-gray-700">{disease.prevention}</p>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-gray-400 mb-1.5">
                <span>Risk Level</span>
                <span>{disease.probability}%</span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${disease.probability}%`, backgroundColor: disease.barColor }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
