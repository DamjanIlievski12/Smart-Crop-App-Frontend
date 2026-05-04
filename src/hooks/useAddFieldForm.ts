import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import type {
  AddFieldForm,
  FieldCoordinates,
  FieldDTO,
  FieldPayload,
  SizeUnit,
} from "../api/types/field";
import {
  apiCreateField,
  apiImportFieldsCsv,
  apiReverseGeocodeLocation,
} from "../api/fieldsApi";

const initialForm: AddFieldForm = {
  name: "",
  size: "",
  unit: "hectares",
  location: "",
  coordinates: undefined,
  crop_type: "",
  plantingDate: "",
  soil_type: "",
  irrigation_type: "",
  notes: "",
};

function parseCoordinateString(raw: string): FieldCoordinates | undefined {
  // const parts = raw.split(',').map(s => parseFloat(s.trim()));
  // if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
  //     return {
  //         latitude: parts[0],
  //         longitude: parts[1],
  //     }
  // }
  // return undefined;
  const [latStr, lngStr] = raw.split(",");

  if (!latStr || !lngStr) return undefined;

  const lat = parseFloat(latStr.trim());
  const lng = parseFloat(lngStr.trim());

  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return undefined;

  return {
    latitude: lat,
    longitude: lng,
  };
}

function convertSize(
  value: string,
  fromUnit: SizeUnit,
  toUnit: SizeUnit,
): string {
  const n = parseFloat(value);
  if (isNaN(n)) return value;

  if (fromUnit === toUnit) return value;

  const converted = fromUnit === "acres" ? n * 0.404686 : n / 0.404686;
  return converted.toFixed(4);
}

function dtoToFormValues(dto: FieldDTO, unit: SizeUnit): Partial<AddFieldForm> {
  const dtoUnit = (dto.unit as SizeUnit) || "hectares";
  const rawSize = dto.sizeValue?.toString() ?? "0";
  const size = convertSize(rawSize, dtoUnit, unit);

  return {
    name: dto.name,
    size,
    unit,
    location: dto.location,
    crop_type: dto.crop ?? "",
    plantingDate: dto.plantingDate ?? "",
    soil_type: dto.soilType ?? "",
    irrigation_type: dto.irrigation ?? "",
    notes: dto.notes ?? "",
    coordinates:
      dto.latitude != null && dto.longitude != null
        ? {
            latitude: dto.latitude,
            longitude: dto.longitude,
          }
        : undefined,
  };
}

export interface UseAddFieldFormReturn {
  form: AddFieldForm;
  coordinateText: string;
  isSubmitting: boolean;
  submitError: string | null;
  isResolvingLocation: boolean;
  geocodeError: string | null;
  isCsvLoading: boolean;
  csvError: string | null;
  csvSuccess: string | null;
  set: <K extends keyof AddFieldForm>(
    key: K,
  ) => (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => void;

  handleUnitChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;

  handleCoordinateTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

  handleMapPick: (coords: FieldCoordinates) => void;

  handleCsvImport: (file: File) => Promise<void>;

  handleSave: (e: React.SubmitEvent<HTMLFormElement>) => void;

  csvFileInputRef: React.RefObject<HTMLInputElement | null>;
}

export function useAddFieldForm(): UseAddFieldFormReturn {
  const navigate = useNavigate();
  const [form, setForm] = useState<AddFieldForm>(initialForm);
  const [coordinateText, setCoordinateText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isResolvingLocation, setIsResolvingLocation] = useState(false);
  const [geocodeError, setGeocodeError] = useState<string | null>(null);
  const [isCsvLoading, setIsCsvLoading] = useState(false);
  const [csvError, setCsvError] = useState<string | null>(null);
  const [csvSuccess, setCsvSuccess] = useState<string | null>(null);
  const csvFileInputRef = useRef<HTMLInputElement | null>(null);
  const latestGeocodeRequestRef = useRef(0);

  const set =
    <K extends keyof AddFieldForm>(key: K) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ): void => {
      setForm((f) => ({
        ...f,
        [key]: e.target.value as AddFieldForm[K],
      }));
    };

  const handleUnitChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const newUnit = e.target.value as SizeUnit;
    setForm((f) => ({
      ...f,
      unit: newUnit,
      size: convertSize(f.size, f.unit, newUnit),
    }));
  };

  const handleCoordinateTextChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const raw = e.target.value;
    setCoordinateText(raw);
    setForm((f) => ({
      ...f,
      coordinates: parseCoordinateString(raw),
    }));
  };

  const handleMapPick = async (coords: FieldCoordinates): Promise<void> => {
    const requestId = ++latestGeocodeRequestRef.current;

    setForm((f) => ({
      ...f,
      coordinates: coords,
    }));
    setCoordinateText(`${coords.latitude}, ${coords.longitude}`);
    setIsResolvingLocation(true);
    setGeocodeError(null);

    try {
      const response = await apiReverseGeocodeLocation(
        coords.latitude,
        coords.longitude,
      );

      if (requestId !== latestGeocodeRequestRef.current) {
        return;
      }

      setForm((f) => ({
        ...f,
        location: response.location ?? "",
      }));
    } catch {
      if (requestId !== latestGeocodeRequestRef.current) {
        return;
      }

      setForm((f) => ({
        ...f,
        location: "",
      }));
      setGeocodeError(
        "Could not resolve location name for these coordinates. Please pick another point.",
      );
    } finally {
      if (requestId === latestGeocodeRequestRef.current) {
        setIsResolvingLocation(false);
      }
    }
  };

  const handleCsvImport = async (file: File): Promise<void> => {
    setIsCsvLoading(true);
    setCsvError(null);
    setCsvSuccess(null);

    try {
      const response = await apiImportFieldsCsv(file);
      const imported = response.fields ?? [];

      const [first] = imported;

      if (!first) {
        setCsvError("CSV contained no valid rows.");
        return;
      }

      // Fill the form with the FIRST row from the CSV
      const patch = dtoToFormValues(first, form.unit);
      setForm((f) => ({ ...f, ...patch }));

      if (imported.length === 1) {
        setCsvSuccess(`Imported 1 field. Form filled with "${first.name}".`);
      } else {
        setCsvSuccess(
          `Imported ${imported.length} fields. Form filled with the first row ("${first.name}"). ` +
            `The other ${imported.length - 1} field(s) were saved directly.`,
        );
      }
    } catch (err) {
      setCsvError(err instanceof Error ? err.message : "CSV import failed.");
    } finally {
      setIsCsvLoading(false);
      // Reset the file input so the same file can be re-selected
      if (csvFileInputRef.current) csvFileInputRef.current.value = "";
    }
  };

  const handleSave = async (
    e: React.SubmitEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const sizeNum = parseFloat(form.size);

      if (!form.name.trim()) {
        setSubmitError("Field name is required.");
        return;
      }

      // Allow empty location when coordinates are picked — use coords as fallback
      const locationValue = form.location.trim();

      if (!locationValue && !form.coordinates) {
        setSubmitError("Location or coordinates is required.");
        return;
      }

      if (!form.crop_type.trim()) {
        setSubmitError("Crop type is required.");
        return;
      }

      if (isNaN(sizeNum) || sizeNum <= 0) {
        setSubmitError("Size must be a positive number.");
        return;
      }

      const payload: FieldPayload = {
        name: form.name.trim(),
        size: sizeNum,
        size_unit: form.unit,
        crop_type: form.crop_type.trim(),
      };

      if (locationValue) payload.location = locationValue;

      if (form.soil_type) payload.soil_type = form.soil_type;
      if (form.irrigation_type) payload.irrigation_type = form.irrigation_type;
      if (form.notes) payload.notes = form.notes;
      if (form.plantingDate) payload.planting_date = form.plantingDate;

      if (form.coordinates) {
        payload.latitude = form.coordinates.latitude;
        payload.longitude = form.coordinates.longitude;
      }

      await apiCreateField(payload);

      // await apiCreateField({
      //   name: form.name.trim(),
      //   size: sizeNum,
      //   location: form.location.trim(),
      //   crop_type: form.crop_type.trim(),
      //   soil_type: form.soil_type || undefined,
      //   irrigation_type: form.irrigation_type || undefined,
      //   notes: form.notes || undefined,
      //   planting_date: form.plantingDate || undefined,

      //   latitude: form.coordinates?.latitude,
      //   longitude: form.coordinates?.longitude,
      // });
      navigate("/fields");
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Failed to create field.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
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
  };
}
