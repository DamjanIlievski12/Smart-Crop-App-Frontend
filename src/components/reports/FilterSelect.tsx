import { ChevronDown } from 'lucide-react';
import type { ChangeEvent } from 'react';
import type React from 'react';

interface FilterSelectProps {
  options: string[];
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export default function FilterSelect({ options, value, onChange }: FilterSelectProps): React.ReactElement {
  return (
    <div className="relative">
      <select
        className="w-full appearance-none pl-4 pr-10 py-2.5 text-sm bg-white border border-gray-200 rounded-lg outline-none focus:border-[#2e5d40] focus:ring-2 focus:ring-[#2e5d40]/10 transition-colors text-gray-700 cursor-pointer"
        value={value}
        onChange={onChange}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      <ChevronDown size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
    </div>
  );
}
