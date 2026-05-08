import type { Field, FieldDTO, SizeUnit } from "../../../api/types/field";
import type { EditFieldForm } from "../../../api/types/fieldDetails";

export function dtoToField(dto: FieldDTO): Field {
  const coordinates =
    dto.latitude != null && dto.longitude != null
      ? { latitude: dto.latitude, longitude: dto.longitude }
      : { latitude: 0, longitude: 0 };

  const status =
    dto.status === "Healthy" ||
    dto.status == "Good" ||
    dto.status === "Excellent" ||
    dto.status === "Monitoring"
      ? dto.status
      : ("Monitoring" as const);

  const risk =
    dto.risk === "Low" || dto.risk === "Medium" || dto.risk === "High"
      ? dto.risk
      : ("NotAssessed" as const);

  return {
    id: dto.id,
    name: dto.name,
    crop: dto.crop ?? "-",
    location: dto.location,
    size: dto.sizeValue,
    status,
    soilType: dto.soilType ?? "-",
    lastAnalysis: dto.lastAnalysis ?? "Never",
    health: dto.health ?? 0,
    risk,
    coordinates,
    _raw: dto,
  };
}

export function dtoToEditForm(dto: FieldDTO): EditFieldForm {
  return {
    name: dto.name,
    crop_type: dto.crop ?? "",
    location: dto.location ?? "",
    size: dto.sizeValue?.toString() ?? "",
    size_unit: (dto.unit as SizeUnit) ?? "hectares",
    soil_type: dto.soilType ?? "",
    irrigations_type: dto.irrigation ?? "",
    planting_date: dto.plantingDate ?? "",
    notes: dto.notes ?? "",
  };
}

export function shortDay(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString("en-US", { weekday: "short" });
  } catch {
    return dateStr;
  }
}

export function shortDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}
