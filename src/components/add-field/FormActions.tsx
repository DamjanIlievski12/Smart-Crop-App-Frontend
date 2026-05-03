import { Link } from "react-router-dom";
import { Save, Loader2 } from "lucide-react";
import CsvImportButton from "./CsvImportButton";
import type React from "react";

interface Props {
  isSubmitting: boolean;
  submitError: string | null;
  isCsvLoading: boolean;
  csvError: string | null;
  csvSuccess: string | null;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onCsvFileSelected: (file: File) => void;
}

export default function FormActions({
  isSubmitting,
  submitError,
  isCsvLoading,
  csvError,
  csvSuccess,
  fileInputRef,
  onCsvFileSelected,
}: Props): React.ReactElement {
  return (
    <div className="flex flex-col gap-3 pt-2">
      {/* Submit error */}
      {submitError && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2">
          {submitError}
        </p>
      )}

      <div className="flex items-start justify-between gap-3 flex-wrap">
        {/* Left: CSV import */}
        <CsvImportButton
          isLoading={isCsvLoading}
          error={csvError}
          success={csvSuccess}
          fileInputRef={fileInputRef}
          onFileSelect={onCsvFileSelected}
        />

        {/* Right: Cancel + Save */}
        <div className="flex items-center gap-3">
          <Link
            to="/fields"
            className="px-6 py-2.5 text-sm font-medium rounded-lg border transition-colors hover:bg-gray-50"
            style={{ borderColor: "var(--color-border)" }}
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            style={{ background: "var(--color-primary)" }}
            onMouseOver={(e) => {
              if (!isSubmitting)
                e.currentTarget.style.background = "var(--color-primary-hover)";
            }}
            onMouseOut={(e) =>
              (e.currentTarget.style.background = "var(--color-primary)")
            }
          >
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {isSubmitting ? "Saving…" : "Save Field"}
          </button>
        </div>
      </div>
    </div>
  );
}
