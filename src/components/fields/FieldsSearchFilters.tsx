import { Search } from "lucide-react";
import type React from "react";
import { ALL_STATUSES } from "../../hooks/useFields";

const inputStyle: React.CSSProperties = {
  background: "white",
  borderColor: "var(--color-border)",
  color: "var(--color-text-primary)",
};

interface Props {
  search: string;
  cropFilter: string;
  statusFilter: string;
  availableCrops: string[];
  onSearchChange: (v: string) => void;
  onCropChange: (v: string) => void;
  onStatusChange: (v: string) => void;
}

export default function FieldsSearchFilters({
  search,
  cropFilter,
  statusFilter,
  availableCrops,
  onSearchChange,
  onCropChange,
  onStatusChange,
}: Props): React.ReactElement {
  return (
    <div className="flex items-center gap-4 flex-wrap my-5">
      <div className="relative flex-1 min-w-[200px] max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search fields…"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-3 text-sm rounded-lg border outline-none"
          style={inputStyle}
        />
      </div>

      <select
        value={cropFilter}
        onChange={(e) => onCropChange(e.target.value)}
        className="px-4 py-3 text-sm rounded-lg border outline-none"
        style={inputStyle}
      >
        {availableCrops.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>

      <select
        value={statusFilter}
        onChange={(e) => onStatusChange(e.target.value)}
        className="px-4 py-3 text-sm rounded-lg border outline-none"
        style={inputStyle}
      >
        {ALL_STATUSES.map((s) => (
          <option key={s}>{s}</option>
        ))}
      </select>
    </div>
  );
}
