import type {
  Field,
  FieldDTO,
  FieldStatus,
  RiskLevel,
} from "../../../api/types/field";

export function isValidStatus(v: unknown): v is FieldStatus {
  return (
    v === "Healthy" || v === "Good" || v === "Excellent" || v === "Monitoring"
  );
}

export function isValidRisk(v: unknown): v is RiskLevel {
  return v === "Low" || v === "Medium" || v === "High";
}

export function dtoToField(dto: FieldDTO): Field {
  return {
    id: dto.id,
    name: dto.name,
    crop: dto.crop ?? "-",
    location: dto.location,
    size: dto.sizeValue,
    status: isValidStatus(dto.status) ? dto.status : "Monitoring",
    soilType: dto.soilType ?? "-",
    lastAnalysis: dto.lastAnalysis ?? "Never",
    health: dto.health ?? 0,
    risk: isValidRisk(dto.risk) ? dto.risk : "NotAssessed",
    coordinates:
      dto.latitude != null && dto.longitude != null
        ? { latitude: dto.latitude, longitude: dto.longitude }
        : { latitude: 0, longitude: 0 },
    _raw: dto,
  };
}
