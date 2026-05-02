import { ChevronDown } from 'lucide-react';
import type React from 'react';

export default function FieldSelectorRow(): React.ReactElement {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-4">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <p className="text-xs text-gray-400 mb-2">Select Field</p>
          <div className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-4 py-2.5">
            <span className="text-sm font-medium text-gray-900">North Field - Wheat</span>
            <ChevronDown size={15} className="text-gray-400" />
          </div>
        </div>
        <div>
          <p className="text-xs text-gray-400 mb-2">Growth Stage</p>
          <div className="bg-[#ece8e1] rounded-lg px-4 py-2.5">
            <span className="text-sm font-medium text-gray-900">Vegetative</span>
          </div>
        </div>
        <div>
          <p className="text-xs text-gray-400 mb-2">Last Application</p>
          <div className="bg-[#ece8e1] rounded-lg px-4 py-2.5">
            <span className="text-sm font-medium text-gray-900">15 days ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}
