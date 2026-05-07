import type React from "react";
import type { Field } from "../../api/types/field";

interface Props {
  field: Field;
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="flex items-start justify-between py-2 border-b last:border-0"
      style={{ borderColor: "var(--color-border)" }}
    >
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-sm font-medium text-gray-900 text-right max-w-[55%]">
        {value || "—"}
      </span>
    </div>
  );
}

export default function FieldInformationCard({
  field,
}: Props): React.ReactElement {
  const raw = field._raw;

  const plantingDate = raw.plantingDate
    ? new Date(raw.plantingDate).toLocaleDateString()
    : "—";

  return (
    <div
      className="bg-white border rounded-xl p-6"
      style={{ borderColor: "var(--color-border)" }}
    >
      <h3 className="text-base font-semibold text-gray-900 mb-2">
        Field Information
      </h3>
      <div>
        <Row label="Crop Type" value={field.crop} />
        <Row label="Field Size" value={raw.size} />
        <Row label="Soil Type" value={field.soilType} />
        <Row label="Irrigation" value={raw.irrigation ?? "—"} />
        <Row label="Planting Date" value={plantingDate} />
        <Row label="Country" value={raw.country ?? "—"} />
        {raw.notes && <Row label="Notes" value={raw.notes} />}
      </div>
    </div>
  );
}
