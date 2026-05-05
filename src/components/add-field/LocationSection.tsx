import type { AddFieldForm, FieldCoordinates } from "../../api/types/field";
import type React from "react";
import { FieldWrapper, Input, Section } from "./FormPrimitives";
import LocationPickerMap from "../map/LocationPickerMap";

interface Props {
  form: AddFieldForm;
  coordinateText: string;
  isResolvingLocation: boolean;
  geocodeError: string | null;
  set: <K extends keyof AddFieldForm>(
    key: K,
  ) => (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => void;
  onCoordinateTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMapPick: (coords: FieldCoordinates) => void;
}

export default function LocationSection({
  form,
  coordinateText,
  isResolvingLocation,
  geocodeError,
  set,
  onCoordinateTextChange,
  onMapPick,
}: Props): React.ReactElement {
  return (
    <Section title="Location Details" fullWidth>
      {/* Map picker – placed above the text inputs */}
      <div>
        <p className="text-xs text-gray-400 mb-2">
          Click on the map to pin your field's location, or enter coordinates
          manually below.
        </p>
        {isResolvingLocation ? (
          <p className="text-xs text-gray-500 mb-2">
            Resolving address from selected coordinates...
          </p>
        ) : null}
        {geocodeError ? (
          <p className="text-xs text-amber-600 mb-2">{geocodeError}</p>
        ) : null}
        <LocationPickerMap
          value={form.coordinates ?? undefined}
          onChange={onMapPick}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {/* Coordinate input – synced with the map */}
        <FieldWrapper
          label="Coordinates"
          hint="Picked from map, or type: lat, lng (e.g. 41.99, 21.43)"
        >
          <Input
            placeholder="41.6086, 21.7453"
            value={coordinateText}
            onChange={onCoordinateTextChange}
          />
        </FieldWrapper>

        {/* Free-text address – still available for manual entry */}
        <FieldWrapper label="Address / Location (optional)">
          <Input
            placeholder="e.g., Kumanovo, North Macedonia"
            value={form.location}
            onChange={set("location")}
          />
        </FieldWrapper>
      </div>
    </Section>
  );
}
