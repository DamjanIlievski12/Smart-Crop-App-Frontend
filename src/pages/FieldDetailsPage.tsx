import type React from "react";
import { Link, useParams } from "react-router-dom";
import { useFieldDetails } from "../hooks/useFieldDetails";
import AppLayout from "../components/layout/AppLayout";
import { AlertCircle, BarChart3, Loader2 } from "lucide-react";
import FieldDetailsHeader from "../components/field-details/FieldDeatilsHeader";
import FieldDetailsMetrics from "../components/field-details/FieldDetailsMetrics";
import FieldInformationCard from "../components/field-details/FieldInformationCard";
import FieldDetailsWeatherCard from "../components/field-details/FieldDetailsWeatherCard";
import { useFieldWeather } from "../hooks/useFieldWeather";
import EditFieldModal from "../components/field-details/EditFieldModal";
import DeleteConfirmDialog from "../components/field-details/DeleteConfirmDialog";
import UndoDeleteToast from "../components/field-details/UndoDeleteToast";

export default function FieldDetailsPage(): React.ReactElement {
  const { id } = useParams<{ id: string }>();
  const fieldId = Number(id);

  const {
    field,
    isLoading,
    error,
    isEditOpen,
    editForm,
    isUpdating,
    updateError,
    openEdit,
    closeEdit,
    setEditField,
    submitEdit,
    deleteState,
    openDeleteDialog,
    cancelDelete,
    confirmDelete,
    undoDelete,
  } = useFieldDetails(fieldId);

  const { weather, isLoadingWeather, weatherError, refetchWeather } =
    useFieldWeather(fieldId);

  if (isLoading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center py-32 gap-3 text-gray-400">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span className="text-sm">Loading field details…</span>
        </div>
      </AppLayout>
    );
  }

  if (error || !field) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center py-32 gap-4 text-red-500">
          <AlertCircle className="w-10 h-10" />
          <p className="text-sm">{error ?? "Field not found."}</p>
          <Link
            to="/fields"
            className="text-sm underline hover:no-underline"
            style={{ color: "var(--color-primary)" }}
          >
            Back to Fields
          </Link>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      {/* Page wrapper — slightly dimmed while a delete is in progress */}
      <div
        className="space-y-7 transition-opacity duration-300"
        style={{
          opacity:
            deleteState.phase === "confirming" ||
            deleteState.phase === "deleting"
              ? 0.6
              : 1,
          pointerEvents: deleteState.phase === "deleting" ? "none" : undefined,
        }}
      >
        <FieldDetailsHeader
          field={field}
          deleteState={deleteState}
          onEdit={openEdit}
          onDelete={openDeleteDialog}
          onUndoDelete={undoDelete}
        />

        <FieldDetailsMetrics field={field} />

        <div className="grid lg:grid-cols-2 gap-5">
          <FieldInformationCard field={field} />

          <FieldDetailsWeatherCard
            weather={weather}
            isLoading={isLoadingWeather}
            error={weatherError}
            onRetry={refetchWeather}
          />
        </div>

        {/* Quick-action cards */}
        <div className="grid sm:grid-cols-3 gap-4">
          <Link
            to={`/crop-analysis?fieldId=${field.id}`}
            className="flex items-center gap-3 px-5 py-4 rounded-xl text-sm font-semibold text-white transition-colors"
            style={{ background: "var(--color-primary)" }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = "var(--color-primary-hover)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "var(--color-primary)";
            }}
          >
            <BarChart3 className="w-5 h-5" />
            Run Crop Analysis
          </Link>
        </div>
      </div>

      {/* Overlays (rendered outside the dimmes weapper) */}
      <EditFieldModal
        isOpen={isEditOpen}
        form={editForm}
        isUpdating={isUpdating}
        updateError={updateError}
        onClose={closeEdit}
        onChange={setEditField}
        onSubmit={submitEdit}
      />

      <DeleteConfirmDialog
        fieldName={field.name}
        deleteState={deleteState}
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
      />

      <UndoDeleteToast
        fieldName={field.name}
        deleteState={deleteState}
        onUndo={undoDelete}
        onDismiss={cancelDelete}
      />
    </AppLayout>
  );
}
