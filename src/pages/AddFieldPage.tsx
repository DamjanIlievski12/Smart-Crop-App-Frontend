import AppLayout from "../components/layout/AppLayout";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import type React from "react";
import { useAddFieldForm } from "../hooks/useAddFieldForm";
import BasicInfoSection from "../components/add-field/BasicInfoSection";
import LocationSection from "../components/add-field/LocationSection";
import SoilIrrigationSection from "../components/add-field/SoilIrrigationSection";
import NotesSection from "../components/add-field/NotesSection";
import FormActions from "../components/add-field/FormActions";

export default function AddFieldPage(): React.ReactElement {
  const {
    form,
    coordinateText,
    isSubmitting,
    submitError,
    isResolvingLocation,
    geocodeError,
    isCsvLoading,
    csvError,
    csvSuccess,
    set,
    handleUnitChange,
    handleCoordinateTextChange,
    handleMapPick,
    handleCsvImport,
    handleSave,
    csvFileInputRef,
  } = useAddFieldForm();

  return (
    <AppLayout>
      {/* Page Header */}
      <div>
        <Link
          to="/fields"
          className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Fields
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mb-1">Add New Field</h1>
        <p className="text-sm text-gray-500">
          Enter details about your new agricultural field
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-5">
        <BasicInfoSection
          form={form}
          set={set}
          onUnitChange={handleUnitChange}
        />

        {/* Location: map picker is rendered inside, above the text inputs */}
        <LocationSection
          form={form}
          coordinateText={coordinateText}
          isResolvingLocation={isResolvingLocation}
          geocodeError={geocodeError}
          set={set}
          onCoordinateTextChange={handleCoordinateTextChange}
          onMapPick={handleMapPick}
        />

        <SoilIrrigationSection form={form} set={set} />
        <NotesSection form={form} set={set} />

        <FormActions
          isSubmitting={isSubmitting}
          submitError={submitError}
          isCsvLoading={isCsvLoading}
          csvError={csvError}
          csvSuccess={csvSuccess}
          fileInputRef={csvFileInputRef}
          onCsvFileSelected={handleCsvImport}
        />
      </form>
    </AppLayout>
  );
}
