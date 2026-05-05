import { CalendarDays, Info } from 'lucide-react';
import type { FertilizerScheduleItem } from '../../api/types/fertilizer';
import type React from 'react';

interface ApplicationScheduleCardProps {
  schedule: FertilizerScheduleItem[];
}

export default function ApplicationScheduleCard({ schedule }: ApplicationScheduleCardProps): React.ReactElement {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-4">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base font-semibold text-gray-900">Application Schedule</h2>
        <span className="flex items-center gap-1.5 text-xs text-gray-500">
          <CalendarDays size={13} /> 12-Week Plan
        </span>
      </div>
      <div className="flex flex-col gap-4">
        {schedule.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-6">No schedule available for this field.</p>
        )}
        {schedule.map((s) => (
          <div key={s.week} className="border border-gray-100 rounded-xl p-5 flex items-center">
            <div className="w-10 h-10 rounded-xl bg-[#e4ebe5] flex items-center justify-center mr-5 flex-shrink-0">
              <CalendarDays size={16} className="text-[#2e5d40]" />
            </div>
            <div className="grid grid-cols-4 flex-1 gap-4">
              <div>
                <p className="text-xs text-gray-400">Period</p>
                <p className="text-sm font-semibold text-gray-900">{s.week}</p>
                <p className="text-xs text-gray-400">{s.dates}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Fertilizer Type</p>
                <div className="flex items-center gap-1">
                  <p className="text-sm font-semibold text-gray-900">{s.type}</p>
                  {s.type?.includes('NPK') && (
                    <div className="relative group">
                      <Info size={13} className="text-gray-400 cursor-pointer flex-shrink-0" />
                      <div className="absolute left-5 top-0 z-10 hidden group-hover:block w-56 bg-gray-800 text-white text-xs rounded-lg px-3 py-2 leading-relaxed shadow-lg">
                        <p className="font-semibold mb-1">NPK Ratio</p>
                        <p><span className="text-green-300">N</span> — Nitrogen: promotes leaf &amp; stem growth</p>
                        <p><span className="text-yellow-300">P</span> — Phosphorus: supports roots &amp; flowering</p>
                        <p><span className="text-blue-300">K</span> — Potassium: strengthens disease resistance</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-400">Application Rate</p>
                <p className="text-sm font-semibold text-gray-900">{s.rate}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Status</p>
                <span className={`inline-flex text-xs font-medium px-2.5 py-0.5 rounded-full mt-0.5 ${s.statusColor}`}>
                  {s.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
