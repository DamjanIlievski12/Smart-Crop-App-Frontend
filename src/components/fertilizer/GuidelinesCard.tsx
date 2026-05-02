import { Info } from 'lucide-react';
import type { ApplicationGuideline } from '../../api/types/fertilizer';
import type React from 'react';

interface GuidelinesCardProps {
  guidelines: ApplicationGuideline[];
}

export default function GuidelinesCard({ guidelines }: GuidelinesCardProps): React.ReactElement {
  return (
    <div className="w-[380px] bg-white rounded-2xl border border-gray-100 p-5">
      <h2 className="text-base font-semibold text-gray-900 mb-4">Application Guidelines</h2>
      <div className="flex flex-col gap-3">
        {guidelines.map((g) => (
          <div key={g.title} className="bg-green-50 rounded-xl p-4 flex items-start gap-3">
            <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Info size={13} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-green-800">{g.title}</p>
              <p className="text-xs text-green-600 leading-relaxed">{g.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
