import { Upload, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import type React from "react";

interface Props {
  isLoading: boolean;
  error: string | null;
  success: string | null;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onFileSelect: (file: File) => void;
}

export default function CsvImportButton({
  isLoading,
  error,
  success,
  fileInputRef,
  onFileSelect,
}: Props): React.ReactElement {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) onFileSelect(file);
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        onChange={handleChange}
        className="hidden"
      />

      {/* Visible button */}
      <button
        type="button"
        disabled={isLoading}
        onClick={() => fileInputRef.current?.click()}
        className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg border transition-colors hover:bg-gray-50 disabled:opacity-60 disabled:cursor-not-allowed"
        style={{ borderColor: "var(--color-border)" }}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin text-gray-500" />
        ) : (
          <Upload className="w-4 h-4 text-gray-500" />
        )}
        {isLoading ? "Importing..." : "Import from CSV"}
      </button>

      {/* Feedback messages */}
      {error && (
        <div className="flex items-start gap-2 text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          <AlertCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}
      {success && (
        <div className="flex items-start gap-2 text-xs text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
          <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0" />
          <span>{success}</span>
        </div>
      )}

      {/* CSV format hint */}
      <p className="text-xs text-gray-400">
        Required columns:{" "}
        <code className="font-mono">name, size, location, crop_type</code>.
        Optional:{" "}
        <code className="font-mono">
          soil_type, irrigation_type, notes, planting_date
        </code>
        .
      </p>
    </div>
  );
}
