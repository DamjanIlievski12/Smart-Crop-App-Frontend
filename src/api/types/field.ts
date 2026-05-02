export type RiskLevel = 'Low' | 'Medium' | 'High';
export type FieldStatus = 'Healthy' | 'Good' | 'Excellent' | 'Monitoring';

export interface Field {
  id: number;
  name: string;
  crop: string;
  location: string;
  size: string;
  status: FieldStatus;
  soilType: string;
  lastAnalysis: string;
  health: number;
  risk: RiskLevel;
}

export type SizeUnit = 'acres' | 'hectares';

export interface AddFieldForm {
  name: string;
  size: string;
  unit: SizeUnit;
  location: string;
  coordinates?: string;
  crop: string;
  plantingDate: string;
  soilType: string;
  irrigation: string;
  notes?: string;
}