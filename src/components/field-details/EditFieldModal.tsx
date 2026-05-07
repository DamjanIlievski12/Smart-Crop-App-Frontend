import type React from "react";
import type { EditFieldForm } from "../../api/types/fieldDetails";
import { Loader2, X } from "lucide-react";

const inputClass =
  "w-full px-4 py-2.5 text-sm bg-white border rounded-lg outline-none focus:ring-2 focus:border-transparent transition-colors";
const inputStyle: React.CSSProperties = {
  borderColor: "var(--color-border)",
};
const focusRingStyle = "focus:ring-[#2e5d40]/20 focus:border-[#2e5d40]";

const SOIL_TYPES = ["Loamy", "Clay", "Sandy", "Sandy Loam", "Silty", "Peat"];
const IRRIGATION_TYPES = [
  "Drip Irrigation",
  "Sprinkler",
  "Center Pivot",
  "Flood",
  "Surface",
  "None",
];

interface Props {
  isOpen: boolean;
  form: EditFieldForm;
  isUpdating: boolean;
  updateError: string | null;
  onClose: () => void;
  onChange: <K extends keyof EditFieldForm>(
    key: K,
    value: EditFieldForm[K],
  ) => void;
  onSubmit: (e: React.SubmitEvent) => void;
}

export default function EditFieldModal({
  isOpen,
  form,
  isUpdating,
  updateError,
  onClose,
  onChange,
  onSubmit,
}: Props): React.ReactElement | null {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={!isUpdating ? onClose : undefined}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto z-10">
        {/* Header */}
        <div
          className="flex items-center justify-between px-7 py-5 border-b sticky top-0 bg-white z-10"
          style={{ borderColor: "var(--color-border)" }}
        >
          <h2 className="text-xl font-bold text-gray-900">Edit Field</h2>
          {!isUpdating && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="px-7 py-6 space-y-5">
          {/* Row 1 */}
          <div>
            <div className="grid sm:grid-cols-2 gap-4">
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                Field Name *
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => onChange("name", e.target.value)}
                className={`${inputClass} ${focusRingStyle}`}
                style={inputStyle}
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                Crop Type *
              </label>
              <input
                type="text"
                value={form.crop_type}
                onChange={(e) => onChange("crop_type", e.target.value)}
                className={`${inputClass} ${focusRingStyle}`}
                style={inputStyle}
                required
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
              Location
            </label>
            <input
              type="text"
              value={form.location}
              onChange={(e) => onChange("location", e.target.value)}
              className={`${inputClass} ${focusRingStyle}`}
              style={inputStyle}
            />
          </div>

          {/* Row 2 */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                Size *
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={form.size}
                  onChange={(e) => onChange("size", e.target.value)}
                  className={`flex-1 ${inputClass} ${focusRingStyle}`}
                  style={inputStyle}
                  required
                />
                <select
                  value={form.size_unit}
                  onChange={(e) =>
                    onChange(
                      "size_unit",
                      e.target.value as EditFieldForm["size_unit"],
                    )
                  }
                  className={`w-28 ${inputClass} ${focusRingStyle}`}
                  style={inputStyle}
                >
                  <option value="hectares">ha</option>
                  <option value="acres">acres</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                Soil Type
              </label>
              <select
                value={form.soil_type}
                onChange={(e) => onChange("soil_type", e.target.value)}
                className={`${inputClass} ${focusRingStyle}`}
                style={inputStyle}
              >
                <option value="">Select soil type</option>
                {SOIL_TYPES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                Irrigation System
              </label>
              <select
                value={form.irrigations_type}
                onChange={(e) => onChange("irrigations_type", e.target.value)}
                className={`${inputClass} ${focusRingStyle}`}
                style={inputStyle}
              >
                <option value="">Select irrigation</option>
                {IRRIGATION_TYPES.map((i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                Planting Date
              </label>
              <input
                type="date"
                value={form.planting_date}
                onChange={(e) => onChange("planting_date", e.target.value)}
                className={`${inputClass} ${focusRingStyle}`}
                style={inputStyle}
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
              Notes
            </label>
            <textarea
              rows={3}
              value={form.notes}
              onChange={(e) => onChange("notes", e.target.value)}
              className={`${inputClass} ${focusRingStyle} resize-none`}
              style={inputStyle}
            />
          </div>

          {/* Error */}
          {updateError && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2.5">
              {updateError}
            </p>
          )}

          {/* Footer */}
          <div
            className="flex gap-3 pt-2 border-t"
            style={{ borderColor: "var(--color-border)" }}
          >
            <button
              type="button"
              onClick={onClose}
              disabled={isUpdating}
              className="flex-1 py-3 rounded-xl border text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
              style={{ borderColor: "var(--color-border)" }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUpdating}
              className="flex-1 py-3 rounded-xl text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
              style={{ background: "var(--color-primary)" }}
              onMouseOver={(e) => {
                if (!isUpdating)
                  e.currentTarget.style.background =
                    "var(--color-primary-hover)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = "var(--color-primary)";
              }}
            >
              {isUpdating && <Loader2 className="w-4 h-4 animate-spin" />}
              {isUpdating ? "Saving…" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
