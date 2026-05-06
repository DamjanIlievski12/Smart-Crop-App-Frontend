import type React from "react";
import type { FieldDTO } from "../../api/types/field";
import { useState } from "react";
import { X } from "lucide-react";

const ReportTypes = [
  "Crop Analysis",
  "Disease Risk",
  "Fertilizer",
  "Weather Analysis",
  "Irrigation",
];

interface Props {
  fields: FieldDTO[];
  isGenerating: boolean;
  onClose: () => void;
  onGenerate: (fieldId: number, reportType: string) => Promise<void>;
}

export default function GenerateReportModal({
  fields,
  isGenerating,
  onClose,
  onGenerate,
}: Props): React.ReactElement {
  const [modalFieldId, setModalFieldId] = useState<number | "">(
    fields[0]?.id ?? "",
  );
  const [modalType, setModalType] = useState(ReportTypes[0]!);

  async function handleGenerate() {
    if (modalFieldId === "") return;
    await onGenerate(Number(modalFieldId), modalType);
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-96 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-semibold text-gray-900">
            Generate New Report
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-gray-100"
          >
            <X size={18} className="text-gray-500" />
          </button>
        </div>

        {/* Fields */}
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-xs text-gray-500 mb-1.5 block">Field</label>
            <select
              className="w-full text-sm text-gray-800 border border-gray-200 rounded-xl px-3 py-2.5 outline-none focus:border-[#2e5d40]"
              value={modalFieldId}
              onChange={(e) => setModalFieldId(Number(e.target.value))}
            >
              {fields.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs text-gray-500 mb-1.5 block">
              Report Type
            </label>
            <select
              className="w-full text-sm text-gray-800 border border-gray-200 rounded-xl px-3 py-2.5 outline-none focus:border-[#2e5d40]"
              value={modalType}
              onChange={(e) => setModalType(e.target.value)}
            >
              {ReportTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 border border-gray-200 text-gray-700 text-sm font-medium py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleGenerate}
            disabled={isGenerating || modalFieldId === ""}
            className="flex-1 bg-[#2e5d40] hover:bg-[#264c34] text-white text-sm font-medium py-2.5 rounded-xl transition-colors disabled:opacity-50"
          >
            {isGenerating ? "Generating…" : "Generate"}
          </button>
        </div>
      </div>
    </div>
  );
}
