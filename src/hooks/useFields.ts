import { useCallback, useEffect, useState } from "react";
import type {
  Field,
  FieldDTO,
  FieldStatus,
  RiskLevel,
} from "../api/types/field";
import type { StatCard } from "../api/types/ui";
import { apiDeleteField, apiGetFields } from "../api/fieldsApi";

export const ALL_CROPS = ["All Crops"];
export const ALL_STATUSES = [
  "All Status",
  "Healthy",
  "Good",
  "Excellent",
  "Monitoring",
];

function isValidStatus(value: unknown): value is FieldStatus {
  return (
    value === "Healthy" ||
    value === "Good" ||
    value === "Excellent" ||
    value === "Monitoring"
  );
}

function isValidRisk(value: unknown): value is RiskLevel {
  return value === "Low" || value === "Medium" || value === "High";
}

function dtoToField(dto: FieldDTO): Field {
  const coordinates =
    dto.latitude != null && dto.longitude != null
      ? {
          latitude: dto.latitude,
          longitude: dto.longitude,
        }
      : {
          latitude: 0,
          longitude: 0,
        };

  const status: FieldStatus = isValidStatus(dto.status)
    ? dto.status
    : "Monitoring";

  const risk: RiskLevel = isValidRisk(dto.risk) ? dto.risk : "NotAssessed";

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

export interface UseFieldsReturn {
  fields: Field[];
  filtered: Field[];
  stats: StatCard[];
  isLoading: boolean;
  error: string | null;
  search: string;
  cropFilter: string;
  statusFilter: string;
  availableCrops: string[];
  setSearch: (v: string) => void;
  setCropFilter: (v: string) => void;
  setStatusFilter: (v: string) => void;
  deleteField: (id: number) => Promise<void>;
  refresh: () => void;
}

export function useFields(): UseFieldsReturn {
  const [fields, setFields] = useState<Field[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [cropFilter, setCropFilter] = useState("All Crops");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const fetchFields = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiGetFields();
      setFields((response.fields ?? []).map(dtoToField));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load fields.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFields();
  }, [fetchFields]);

  const deleteField = useCallback(async (id: number) => {
    await apiDeleteField(id);
    setFields((f) => f.filter((field) => field.id !== id));
  }, []);

  const availableCrops = [
    "All Crops",
    ...Array.from(new Set(fields.map((f) => f.crop))).sort(),
  ];

  const filtered = fields.filter((field) => {
    const matchSearch =
      field.name.toLowerCase().includes(search.toLowerCase()) ||
      field.location.toLowerCase().includes(search.toLowerCase());
    const matchCrop = cropFilter === "All Crops" || field.crop === cropFilter;
    const matchStatus =
      statusFilter === "All Status" || field.status === statusFilter;
    return matchSearch && matchCrop && matchStatus;
  });

  const totalHa = fields.reduce((sum, f) => {
    const unit = f._raw.unit || "hectares";
    return sum + (unit === "acres" ? f.size * 0.404686 : f.size);
  }, 0);
  const avgHealth = fields.length
    ? Math.round(fields.reduce((s, f) => s + f.health, 0) / fields.length)
    : 0;
  const alerts = fields.filter(
    (f) => f.risk === "High" || f.risk === "Medium",
  ).length;
  const stats: StatCard[] = [
    { label: "Total Fields", value: fields.length, color: "text-gray-900" },
    {
      label: "Total Area",
      value: `${totalHa.toFixed(1)} ha`,
      color: "text-gray-900",
    },
    { label: "Avg Health", value: `${avgHealth}%`, color: "text-green-600" },
    { label: "Active Alerts", value: alerts, color: "text-orange-500" },
  ];

  return {
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
    deleteField,
    refresh: fetchFields,
  };
}
