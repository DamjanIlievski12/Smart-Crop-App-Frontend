import type React from "react";
import type { FieldDTO } from "../../api/types/field";
import { ChevronDown, MapPin } from "lucide-react";

interface FieldSelectorPromptProps {
  fields: FieldDTO[];
  selectedFieldId?: number | null;
  onSelect: (id: number) => void;
  message?: string;
  // When true, renders a compact inline fields switcher instead of the full prompt card
  compact?: boolean;
}

export default function FieldSelectorPrompt({
  fields,
  selectedFieldId,
  onSelect,
  message,
  compact,
}: FieldSelectorPromptProps): React.ReactElement {
  if (compact) {
    return (
      <div className="flex items-center gap-3">
        <MapPin size={16} className="text-[#2e5d40] shrink-0" />
        <span className="text-sm text-gray-500 font-medium">Field:</span>
        <div className="relative">
          <select
            value={selectedFieldId ?? ""}
            onChange={(e) => onSelect(Number(e.target.value))}
            className="appearance-none pl-3 pr-8 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#2e5d40]/30 cursor-pointer"
          >
            {fields.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name}
              </option>
            ))}
          </select>
          <ChevronDown
            size={14}
            className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border-2 border-dashed border-[#2e5d40]/25 rounded-2xl p-10 flex flex-col items-center text-center gap-6">
      <div className="w-16 h-16 rounded-full bg-[#2e5d40]/8 flex items-center justify-center">
        <MapPin className="w-8 h-8 text-[#2e5d40]" />
      </div>

      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Select a Field</h2>
        <p className="text-sm text-gray-500 max-w-sm">{message}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full max-w-xl">
        {fields.map((field) => (
          <button
            key={field.id}
            onClick={() => onSelect(field.id)}
            className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-[#2e5d40]/50 hover:bg-[#2e5d40]/4 transition-all text-left group"
          >
            <div className="w-9 h-9 rounded-lg bg-[#2e5d40]/10 flex items-center justify-center shrink-0 group-hover:bg-[#2e5d40]/20 transition-colors">
              <MapPin size={16} className="text-[#2e5d40]" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">
                {field.name}
              </p>
              <p className="text-xs text-gray-400 truncate">
                {field.crop ?? "No crop set"}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
