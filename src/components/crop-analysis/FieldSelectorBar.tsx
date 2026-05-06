import type React from "react";
import type { FieldDTO } from "../../api/types/field";
import { Calendar, ChevronDown, MapPin } from "lucide-react";

interface Props {
  fields: FieldDTO[];
  selectedFieldId: number | null;
  selectedField: FieldDTO | undefined;
  onSelect: (id: number) => void;
}

export default function FieldSelectorBar({
  fields,
  selectedFieldId,
  selectedField,
  onSelect,
}: Props): React.ReactElement {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-4">
      <div className="grid grid-cols-4 gap-4">
        <div>
          <p className="text-xs text-gray-400 mb-2">Select Field</p>
          <div className="relative">
            <select
              className="w-full appearance-none text-sm font-medium text-gray-800 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 pr-9 outline-none focus:border-[#2e5d40] focus:ring-2 focus:ring-[#2e5d40]/10 transition-colors cursor-pointer"
              value={selectedFieldId ?? ""}
              onChange={(e) => onSelect(Number(e.target.value))}
            >
              {fields.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name}
                </option>
              ))}
            </select>
            <ChevronDown
              size={14}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
          </div>
        </div>

        <div>
          <p className="text-xs text-gray-400 mb-2">Crop Type</p>
          <div className="text-sm font-medium text-gray-800 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5">
            {selectedField?.crop ?? "-"}
          </div>
        </div>

        <div>
          <p className="text-xs text-gray-400 mb-2">Location</p>
          <div className="flex items-center gap-2 text-sm font-medium text-gray-800 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5">
            <MapPin size={13} className="text-gray-400 flex-shrink-0" />
            {selectedField?.location ?? "-"}
          </div>
        </div>

        <div>
          <p className="text-xs text-gray-400 mb-2">Last Updated</p>
          <div className="flex items-center gap-2 text-sm font-medium text-gray-800 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5">
            <Calendar size={13} className="text-gray-400 flex-shrink-0" />
            {selectedField?.lastAnalysis ?? "-"}
          </div>
        </div>
      </div>
    </div>
  );
}
