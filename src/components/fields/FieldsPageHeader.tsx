import { Plus } from "lucide-react";
import type React from "react";
import { Link } from "react-router-dom";

export default function FieldsPageHeader(): React.ReactElement {
  return (
    <div className="flex items-center justify-between my-5">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-1">
          Field Management
        </h1>
        <p className="text-sm text-gray-500">
          Manage and monitor all your agricultural fields
        </p>
      </div>
      <Link
        to="/fields/new"
        className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-colors"
        style={{ background: "var(--color-primary)" }}
        onMouseOver={(e) =>
          (e.currentTarget.style.background = "var(--color-primary-hover)")
        }
        onMouseOut={(e) =>
          (e.currentTarget.style.background = "var(--color-primary)")
        }
      >
        <Plus className="w-4 h-4" />
        Add New Field
      </Link>
    </div>
  );
}
