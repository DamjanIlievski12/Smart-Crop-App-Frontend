import type React from "react";
import type { DeleteState } from "../../api/types/fieldDetails";
import { AlertTriangle, Loader2, X } from "lucide-react";

interface Props {
  fieldName: string;
  deleteState: DeleteState;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function DeleteConfirmDialog({
  fieldName,
  deleteState,
  onCancel,
  onConfirm,
}: Props): React.ReactElement | null {
  if (deleteState.phase === "idle" || deleteState.phase === "undone")
    return null;

  const isDeleting = deleteState.phase === "deleting";
  const secondsLeft =
    deleteState.phase === "confirming" ? deleteState.secondsLeft : 0;

  // SVG circle countdown ring
  const RADIUS = 22;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
  const progress =
    deleteState.phase === "confirming" ? (secondsLeft / 10) * CIRCUMFERENCE : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={!isDeleting ? onCancel : undefined}
      />

      {/* Dialog */}
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-7 z-10"
        style={{ borderColor: "var(--color-border)" }}
      >
        {/* Close button */}
        {!isDeleting && (
          <button
            onClick={onCancel}
            className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
            aria-label="Cancel"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Icon + Countdown ring */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative mb-4">
            {isDeleting ? (
              <div className="w-16 h-16 flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-red-500 animate-spin" />
              </div>
            ) : (
              <svg width="64" height="64" className="-rotate-90">
                {/* Track */}
                <circle
                  cx="32"
                  cy="32"
                  r={RADIUS}
                  fill="none"
                  stroke="#fee2e2"
                  strokeWidth="4"
                />
                {/* Progress */}
                <circle
                  cx="32"
                  cy="32"
                  r={RADIUS}
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="4"
                  strokeDasharray={CIRCUMFERENCE}
                  strokeDashoffset={CIRCUMFERENCE - progress}
                  strokeLinecap="round"
                  style={{ transition: "stroke-dashoffset 1s linear" }}
                />
              </svg>
            )}

            {/* Center content */}
            {!isDeleting && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold text-red-600 tabular-nums">
                  {secondsLeft}
                </span>
              </div>
            )}
          </div>

          <div className="p-2.5 bg-red-50 rounded-full mb-3">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>

          <h2 className="text-xl font-bold text-gray-900 text-center">
            {isDeleting ? "Deleting field…" : "Delete Field?"}
          </h2>
        </div>

        {!isDeleting && (
          <>
            <p className="text-sm text-gray-500 text-center mb-1">
              You're about to permanently delete
            </p>
            <p className="text-base font-semibold text-gray-900 text-center mb-2">
              "{fieldName}"
            </p>
            <p className="text-xs text-gray-400 text-center mb-6">
              All associated data will be removed. This action cannot be undone.
              <br />
              <span className="text-red-500 font-medium">
                Auto-deleting in {secondsLeft} second
                {secondsLeft !== 1 ? "s" : ""}…
              </span>
            </p>

            {/* Progress bar */}
            <div className="h-1 bg-red-100 rounded-full overflow-hidden mb-7">
              <div
                className="h-full bg-red-500 rounded-full transition-all"
                style={{
                  width: `${(secondsLeft / 10) * 100}%`,
                  transition: "width 1s linear",
                }}
              />
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={onCancel}
                className="py-3 rounded-xl border text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                style={{ borderColor: "var(--color-border)" }}
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition-colors"
              >
                Delete Now
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
