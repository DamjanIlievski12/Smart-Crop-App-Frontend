export type RiskLevel = "Low" | "Medium" | "High" | "NotAssessed";
export type FieldStatus = "Healthy" | "Good" | "Excellent" | "Monitoring";
export type SizeUnit = "acres" | "hectares";

export interface FieldCoordinates {
  latitude: number;
  longitude: number;
}

// Backend DTO

export interface FieldDTO {
  id: number;
  name: string;

  crop: string;
  location: string;
  country?: string | null;

  size: string; // "2.5 acres"
  sizeValue: number; // 2.5
  unit: "acres" | "hectares";

  status: string | null;
  lastAnalysis: string | null;
  health: number | null;
  risk: string | null;

  soilType: string | null;
  irrigation: string | null; // backend sends alias

  plantingDate: string | null;
  notes: string | null;

  latitude: number | null;
  longitude: number | null;

  created_at: string;
}

// Body sent to POST /api/fields/ and PUT /api/fields/:id
export interface FieldPayload {
  name: string;
  size: number;
  location: string;
  crop_type: string;

  soil_type?: string;
  irrigation_type?: string;
  notes?: string;
  planting_date?: string;

  latitude?: number;
  longitude?: number;
}

// API reponse envelopes

export interface GetFieldsResponse {
  success: boolean;
  fields: FieldDTO[];
}

export interface GetFieldResponse {
  success: boolean;
  field: FieldDTO;
}

export interface CreateFieldResponse {
  success: boolean;
  message: string;
  field: FieldDTO;
}

export interface UpdateFieldResponse {
  success: boolean;
  message: string;
  field: FieldDTO;
}

export interface DeleteFieldResponse {
  success: boolean;
  message: string;
}

export interface ImportFieldsResponse {
  success: boolean;
  message: string;
  imported_count: number;
  fields: FieldDTO[];
}

// Frontend display model

export interface Field {
  id: number;
  name: string;
  crop: string;
  location: string;
  size: number;
  status: FieldStatus;
  soilType: string;
  lastAnalysis: string;
  health: number;
  risk: RiskLevel;
  coordinates?: FieldCoordinates;
  _raw: FieldDTO;
}

// Frontend form model

export interface AddFieldForm {
  name: string;
  size: string;
  unit: SizeUnit;
  location: string;
  coordinates?: FieldCoordinates | undefined;
  crop_type: string;
  plantingDate: string;
  soil_type: string;
  irrigation_type: string;
  notes: string;
}
