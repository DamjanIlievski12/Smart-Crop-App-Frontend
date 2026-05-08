import type React from "react";
import type { Field } from "../../api/types/field";
import type { DeleteState } from "../../api/types/fieldDetails";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  BarChart3,
  Edit,
  MapPin,
  Trash2,
  Undo2,
} from "lucide-react";

const RISK_CLASSES: Record<string, string> = {
  Low: "bg-green-100 text-green-700",
  Medium: "bg-yellow-100 text-yellow-700",
  High: "bg-red-100 text-red-700",
  NotAssessed: "bg-gray-100 text-gray-500",
};

const STATUS_CLASSES: Record<string, string> = {
  Healthy: "bg-emerald-100 text-emerald-700",
  Excellent: "bg-green-100 text-green-700",
  Good: "bg-blue-100 text-blue-700",
  Monitoring: "bg-orange-100 text-orange-700",
};

interface Props {
  field: Field;
  deleteState: DeleteState;
  onEdit: () => void;
  onDelete: () => void;
  onUndoDelete: () => void;
}

export default function FieldDetailsHeader({
  field,
  deleteState,
  onEdit,
  onDelete,
  onUndoDelete,
}: Props): React.ReactElement {
  const isDeleting =
    deleteState.phase === "deleting" || deleteState.phase === "confirming";

  return (
    <div className="flex items-start justify-between flex-wrap gap-4">
      {/* Left: breadcrumb + title */}
      <div className="space-y-3">
        <Link
          to="/fields"
          className="inline-flex items-center gap-2 text-sm font-medium transition-colors"
          style={{ color: "var(--color-primary)" }}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Fields
        </Link>

        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1.5">
            {field.name}
          </h1>
          <div className="flex items-center gap-4 text-sm text-gray-500 flex-wrap">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              {field.location}
            </span>
            <span className="flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4" />
              {field._raw.size}
            </span>
          </div>
        </div>
      </div>

      {/* Right: badges + actions */}
      <div className="flex items-center gap-3 flex-wrap">
        <span
          className={`px-3.5 py-1.5 rounded-lg text-sm font-medium ${RISK_CLASSES[field.risk] ?? RISK_CLASSES.NotAssessed}`}
        >
          {field.risk === "NotAssessed" ? "Not Assessed" : `${field.risk} Risk`}
        </span>
        <span
          className={`px-3.5 py-1.5 rounded-lg text-sm font-medium ${STATUS_CLASSES[field.status] ?? "bg-gray-100 text-gray-600"}`}
        >
          {field.status}
        </span>

        {/* Undo button — shown when a delete is in progress or confirming */}
        {(deleteState.phase === "confirming" ||
          deleteState.phase === "undone") && (
          <button
            onClick={onUndoDelete}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold border-2 border-orange-400 text-orange-600 hover:bg-orange-50 transition-colors"
          >
            <Undo2 className="w-4 h-4" />
            Undo
          </button>
        )}

        <button
          onClick={onEdit}
          disabled={isDeleting}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ background: "var(--color-primary)" }}
          onMouseOver={(e) => {
            if (!isDeleting)
              e.currentTarget.style.background = "var(--color-primary-hover)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = "var(--color-primary)";
          }}
        >
          <Edit className="w-4 h-4" />
          Edit Field
        </button>

        <button
          onClick={onDelete}
          disabled={isDeleting}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </button>
      </div>
    </div>
  );
}
