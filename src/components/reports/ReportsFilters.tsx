import { Search } from 'lucide-react';
import FilterSelect from './FilterSelect';
import type { ChangeEvent } from 'react';
import type React from 'react';

interface ReportsFiltersProps {
  searchQuery: string;
  selectedField: string;
  selectedType: string;
  selectedDate: string;
  fieldOptions: string[];
  typeOptions: string[];
  dateOptions: string[];
  onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onFieldChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  onTypeChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  onDateChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export default function ReportsFilters({
  searchQuery,
  selectedField,
  selectedType,
  selectedDate,
  fieldOptions,
  typeOptions,
  dateOptions,
  onSearchChange,
  onFieldChange,
  onTypeChange,
  onDateChange,
}: ReportsFiltersProps): React.ReactElement {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-4">
      <div className="grid grid-cols-4 gap-3">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search reports..."
            value={searchQuery}
            onChange={onSearchChange}
            className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-gray-200 rounded-lg outline-none focus:border-[#2e5d40] focus:ring-2 focus:ring-[#2e5d40]/10 transition-colors placeholder:text-gray-400"
          />
        </div>
        <FilterSelect options={fieldOptions} value={selectedField} onChange={onFieldChange} />
        <FilterSelect options={typeOptions} value={selectedType} onChange={onTypeChange} />
        <FilterSelect options={dateOptions} value={selectedDate} onChange={onDateChange} />
      </div>
    </div>
  );
}
