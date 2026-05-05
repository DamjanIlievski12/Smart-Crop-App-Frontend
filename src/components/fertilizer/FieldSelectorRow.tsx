import { ChevronDown } from 'lucide-react';
import type React from 'react';
import type { FertilizerField } from '../../hooks/useFertilizer';

interface FieldSelectorRowProps {
  fields: FertilizerField[];
  selectedFieldId: number | null;
  onSelect: (id: number) => void;
}

export default function FieldSelectorRow({ fields, selectedFieldId, onSelect }: FieldSelectorRowProps): React.ReactElement {
  const selected = fields.find((f) => f.id === selectedFieldId);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-4">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <p className="text-xs text-gray-400 mb-2">Select Field</p>
          <div className="relative">
            <select
              className="w-full appearance-none text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg px-4 py-2.5 pr-9 outline-none focus:border-[#2e5d40] transition-colors cursor-pointer"
              value={selectedFieldId ?? ''}
              onChange={(e) => onSelect(Number(e.target.value))}
            >
              {fields.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name} - {f.crop}
                </option>
              ))}
            </select>
            <ChevronDown size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
        <div>
          <p className="text-xs text-gray-400 mb-2">Crop Type</p>
          <div className="bg-[#ece8e1] rounded-lg px-4 py-2.5">
            <span className="text-sm font-medium text-gray-900">{selected?.crop ?? '—'}</span>
          </div>
        </div>
        <div>
          <p className="text-xs text-gray-400 mb-2">Last Application</p>
          <div className="bg-[#ece8e1] rounded-lg px-4 py-2.5">
            <span className="text-sm font-medium text-gray-900">—</span>
          </div>
        </div>
      </div>
    </div>
  );
}