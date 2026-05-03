import AppLayout from "../components/layout/AppLayout";
import { Loader2, AlertCircle } from "lucide-react";
import type React from "react";
import { useFields } from "../hooks/useFields";
import FieldsPageHeader from "../components/fields/FieldsPageHeader";
import FieldsStatsBar from "../components/fields/FieldsStatsBar";
import FieldsSearchFilters from "../components/fields/FieldsSearchFilters";
import FieldsGrid from "../components/fields/FieldsGrid";
import FieldsOverviewMap from "../components/map/FieldsOverviewMap";

export default function FieldsPage(): React.ReactElement {
  const {
    fields,
    filtered,
    stats,
    isLoading,
    error,
    search,
    cropFilter,
    statusFilter,
    availableCrops,
    setSearch,
    setCropFilter,
    setStatusFilter,
    refresh,
  } = useFields();

  return (
    <AppLayout>
      <FieldsPageHeader />
      <FieldsStatsBar stats={stats} />

      {isLoading && (
        <div className="flex items-center justify-center py-20 gap-3 text-gray-400">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span className="text-sm">Loading fields…</span>
        </div>
      )}

      {!isLoading && error && (
        <div className="flex flex-col items-center justify-center py-16 gap-3 text-red-500">
          <AlertCircle className="w-8 h-8" />
          <p className="text-sm">{error}</p>
          <button
            onClick={refresh}
            className="text-sm underline hover:no-underline"
          >
            Try again
          </button>
        </div>
      )}

      {!isLoading && !error && (
        <>
          <FieldsSearchFilters
            search={search}
            cropFilter={cropFilter}
            statusFilter={statusFilter}
            availableCrops={availableCrops}
            onSearchChange={setSearch}
            onCropChange={setCropFilter}
            onStatusChange={setStatusFilter}
          />
          <FieldsGrid fields={filtered} />
          <FieldsOverviewMap fields={fields} />
        </>
      )}
    </AppLayout>
  );
}
