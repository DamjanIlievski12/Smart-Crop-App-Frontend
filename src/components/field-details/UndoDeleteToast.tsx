import type React from "react";
import type { DeleteState } from "../../api/types/fieldDetails";
import { Undo2, X } from "lucide-react";

interface Props {
  fieldName: string;
  deleteState: DeleteState;
  onUndo: () => void;
  onDismiss: () => void;
}

export default function UndoDeleteToast({
  fieldName,
  deleteState,
  onUndo,
  onDismiss,
}: Props): React.ReactElement | null {
  if (deleteState.phase !== "confirming") return null;

  const { secondsLeft } = deleteState;
  const pct = (secondsLeft / 10) * 100;

  return (
    <div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-full max-w-md px-4"
      style={{ animation: "slideUp 0.3s ease-out" }}
    >
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateX(-50%) translateY(16px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>

      <div className="bg-gray-900 text-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Progress bar at top */}
        <div className="h-1 bg-gray-700">
          <div
            className="h-full bg-red-500 transition-all"
            style={{ width: `${pct}%`, transition: "width 1s linear" }}
          />
        </div>

        <div className="flex items-center gap-4 px-5 py-4">
          {/* Text */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">
              Deleting "{fieldName}"
            </p>
            <p className="text-xs text-gray-400 mt-0.5">
              Auto-deleting in{" "}
              <span className="text-red-400 font-bold tabular-nums">
                {secondsLeft}s
              </span>
            </p>
          </div>

          {/* Undo button */}
          <button
            onClick={onUndo}
            className="flex items-center gap-1.5 px-4 py-2 bg-white text-gray-900 hover:bg-gray-100 rounded-xl text-sm font-bold transition-colors flex-shrink-0"
          >
            <Undo2 className="w-4 h-4" />
            Undo
          </button>

          {/* Dismiss */}
          <button
            onClick={onDismiss}
            className="p-1.5 rounded-lg hover:bg-gray-700 transition-colors text-gray-400 flex-shrink-0"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
